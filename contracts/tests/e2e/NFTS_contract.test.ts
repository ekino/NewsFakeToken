import 'mocha';
import * as assert from 'assert';
import { BigMapAbstraction, TezosToolkit } from '@taquito/taquito';
import { BigNumber } from 'bignumber.js';
import { InMemorySigner } from '@taquito/signer';
import contractAddress from '../../deployments/NFTS_contract';
import conf from '../../config';
import metadata from '../../metadata.json';
import { bytes2Char, char2Bytes } from '@taquito/utils';

const { accounts } = conf;
const { alice } = accounts;
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
        assert.strictEqual(bytes2Char(await storage.metadata.get('')), 'tezos-storage:contents');
        assert.strictEqual(
            bytes2Char(await storage.metadata.get('contents')),
            JSON.stringify(metadata),
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
