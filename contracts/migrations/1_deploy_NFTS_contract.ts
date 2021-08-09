import { TezosToolkit, MichelsonMap } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import saveContractAddress from '../helpers/saveContractAddress';
import getConfig, { NetworkConfig } from '../config';
import code from '../build/NFTS_contract.json';
import getAccounts, { Account } from '../accounts';

const alice: Account = getAccounts('dev')['alice'];
const args = process.argv;
const env = args[2];

if (env == undefined || !['dev', 'testnet', 'next'].includes(env)) {
    console.log('please supply valid env.');
    process.exit(1);
}

const conf: NetworkConfig = getConfig(env);
const Tezos = new TezosToolkit(conf.node);

const deploy = async () => {
    try {
        const signer = await InMemorySigner.fromSecretKey(conf.secretKey);
        Tezos.setProvider({ signer });

        const storage = {
            ledger: new MichelsonMap(),
            operators: new MichelsonMap(),
            reverse_ledger: new MichelsonMap(),
            metadata: new MichelsonMap(),
            token_metadata: new MichelsonMap(),
            next_token_id: 0,
            admin: alice.pkh,
        };

        const op = await Tezos.contract.originate({
            code,
            storage,
        });
        saveContractAddress('NFTS_contract', op.contractAddress);
    } catch (e) {
        console.log(e);
    }
};

deploy();
