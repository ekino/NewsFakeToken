require("dotenv").config();
const { execSync } = require("child_process");
const fs = require("fs");
const { TezosToolkit } = require("@taquito/taquito");
const { InMemorySigner } = require("@taquito/signer");
const env = require("../env");
const { outputFile } = require('fs-extra');

const getLigo = isDockerizedLigo => {
  let path = "ligo";
  if (isDockerizedLigo) {
    path = `docker run -v $PWD:$PWD --rm -i ligolang/ligo:${env.ligoVersion}`;
    try {
      execSync(`${path}  --help`);
    } catch (err) {
      path = "ligo";
      execSync(`${path}  --help`);
    }
  } else {
    try {
      execSync(`${path}  --help`);
    } catch (err) {
      path = `docker run -v $PWD:$PWD --rm -i ligolang/ligo:${env.ligoVersion}`;
      execSync(`${path}  --help`);
    }
  }
  return path;
};

const getContractsList = () => {
  return fs
    .readdirSync(env.contractsDir)
    .filter(file => file.endsWith(".ligo"))
    .map(file => file.slice(0, file.length - 5));
};

const getMigrationsList = () => {
  return fs
    .readdirSync(env.migrationsDir)
    .filter(file => file.endsWith(".js"))
    .map(file => file.slice(0, file.length - 3));
};

const compile = async contract => {
  const ligo = getLigo(true);
  const contracts = !contract ? getContractsList() : [contract];
  contracts.forEach(contract => {
    const michelson = execSync(
      `${ligo} compile-contract --michelson-format=json $PWD/${env.contractsDir}/${contract}.ligo main`,
      { maxBuffer: 1024 * 500 },
    ).toString();
    try {
      const artifacts = JSON.stringify(
        {
          michelson: JSON.parse(michelson),
          networks: {},
          compiler: "ligo:" + env.ligoVersion,
        },
        null,
        2,
      );
      if (!fs.existsSync(env.buildsDir)) {
        fs.mkdirSync(env.buildsDir);
      }
      fs.writeFileSync(`${env.buildsDir}/${contract}.json`, artifacts);
    } catch (e) {
      console.error(michelson);
    }
  });
};

const migrate = async (tezos, contract, storage) => {
  try {
    const artifacts = JSON.parse(
      fs.readFileSync(`${env.buildsDir}/${contract}.json`),
    );
    const operation = await tezos.contract
      .originate({
        code: artifacts.michelson,
        storage: storage,
      })
      .catch(e => {
        console.error(JSON.stringify(e));
        return { contractAddress: null };
      });
    artifacts.networks[env.network] = { [contract]: operation.contractAddress };
    if (!fs.existsSync(env.buildsDir)) {
      fs.mkdirSync(env.buildsDir);
    }
    fs.writeFileSync(
      `${env.buildsDir}/${contract}.json`,
      JSON.stringify(artifacts, null, 2),
    );
    await operation.confirmation();
    const address =  operation.contractAddress;
    saveDeployedAddress(contract, address);
    return address;
  } catch (e) {
    console.error(e);
  }
};

const getDeployedAddress = contract => {
  try {
    const artifacts = JSON.parse(
      fs.readFileSync(`${env.buildsDir}/${contract}.json`),
    );
    return artifacts.networks[env.network][contract];
  } catch (e) {
    console.error(e);
  }
};

const runMigrations = async options => {
  try {
    const migrations = getMigrationsList();
    options.network = options.network || "development";
    options.optionFrom = options.from || 0;
    options.optionTo = options.to || migrations.length;
    options.confirmationPollingTimeoutSecond = options.confirmationPollingTimeoutSecond || 500000;

    const networkConfig = env.networks[options.network];

    const tezos = new TezosToolkit(networkConfig.rpc);
    tezos.setProvider({
      config: {
        confirmationPollingTimeoutSecond: options.confirmationPollingTimeoutSecond,
      },
      rpc: networkConfig.rpc,
      signer: await InMemorySigner.fromSecretKey(networkConfig.secretKey),
    });
    for (const migration of migrations) {
      const execMigration = require(`../${env.migrationsDir}/${migration}.js`);
      await execMigration(tezos);
    }
  } catch (e) {
    console.error(e);
  }
};

const saveDeployedAddress = (name, address) =>
    outputFile(`${process.cwd()}/deployments/${name}.js`, `module.exports = "${address}";`);

module.exports = {
  getLigo,
  getContractsList,
  getMigrationsList,
  getDeployedAddress,
  saveDeployedAddress,
  compile,
  migrate,
  runMigrations,
  env,
};
