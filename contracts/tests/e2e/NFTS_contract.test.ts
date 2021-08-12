import 'mocha';
import * as assert from 'assert';
import { BigMapAbstraction, TezosToolkit } from '@taquito/taquito';
import { BigNumber } from 'bignumber.js';
import { InMemorySigner } from '@taquito/signer';
import contractAddress from '../../deployments/NFTS_contract';
import getConfig, { NetworkConfig } from '../../config';
import getAccounts, { Account } from '../../accounts';
import { bytes2Char, char2Bytes } from '@taquito/utils';

const alice: Account = getAccounts('dev')['alice'];

const conf: NetworkConfig = getConfig('dev');
const Tezos = new TezosToolkit(conf.node);

type Storage = {
    admin: string;
    ledger: BigMapAbstraction;
    metadata: BigMapAbstraction;
    next_token_id: BigNumber;
    operators: BigMapAbstraction;
    reverse_ledger: BigMapAbstraction;
    token_metadata: BigMapAbstraction;
};

beforeEach(async () => {
    const signer = await InMemorySigner.fromSecretKey(alice.sk);
    Tezos.setProvider({ signer });
});

describe('Token', async () => {
    it('should check initial storage', async () => {
        const instance = await Tezos.contract.at(contractAddress);
        const storage: Storage = await instance.storage();
        const { metadata } = storage;
        assert.strictEqual(bytes2Char(await metadata.get('')), 'tezos-storage:contents');
        assert.strictEqual(
            bytes2Char(await metadata.get('contents')),
            '{"name":"News Fake Token","description":"FA2 NFT Contract News Articles Minter","version":"beta","license":{"name":"MIT"},"authors":"ekino <blockchain@ekino.com>","homepage":"htpps://newsfaketoken.web.app","source":{"tools":"cameligo","location":"https://github.com/ekino/NewsFakeToken"},"interfaces":["TZIP-012","TZIP-016"],"permissions":{"operator":"no-transfer"}}',
        );
    });

    it('should mint', async () => {
        const instance = await Tezos.contract.at(contractAddress);
        const op = await instance.methods.mint(char2Bytes('ipfs://dududududu'), alice.pkh).send();
        await op.confirmation(1, 1);
        const storage: Storage = await instance.storage();
        const list: BigNumber[] = await storage.reverse_ledger.get(alice.pkh);
        assert.strictEqual(list.length, 1);
    });
});
