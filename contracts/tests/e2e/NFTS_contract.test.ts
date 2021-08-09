import 'mocha';
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import token from '../../deployments/NFTS_contract';
import getConfig, { NetworkConfig } from '../../config';
import getAccounts, { Account } from '../../accounts';

const alice: Account = getAccounts('dev')['alice'];

const conf: NetworkConfig = getConfig('dev');
const Tezos = new TezosToolkit(conf.node);

beforeEach(async () => {
    const signer = await InMemorySigner.fromSecretKey(alice.sk);
    Tezos.setProvider({ signer });
});

describe('Token', async () => {
    it('should check initial storage', async () => {
        const instance = await Tezos.contract.at(token);
        console.log(instance);
    });
});
