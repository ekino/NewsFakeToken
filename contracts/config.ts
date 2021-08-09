import getAccounts from './accounts';

type Config = {
    [key: string]: NetworkConfig;
};

const devAcc = getAccounts('dev')['alice'];
const testnetAcc = getAccounts('testnet')['alice'];

export type NetworkConfig = {
    node: string;
    publicKeyHash: string;
    secretKey: string;
};

const config: Config = {
    dev: {
        node: 'http://localhost:8732',
        publicKeyHash: devAcc.pkh,
        secretKey: devAcc.sk,
    },
    testnet: {
        node: 'https://testnet-tezos.giganode.io/',
        publicKeyHash: testnetAcc.pkh,
        secretKey: testnetAcc.sk,
    },
};

export default (env: string): NetworkConfig => config[env];
