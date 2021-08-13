import { TezosToolkit, MichelsonMap } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { buf2hex } from '@taquito/utils';
import saveContractAddress from '../helpers/saveContractAddress';
import conf from '../config';
import metadata from '../metadata.json';
import code from '../build/NFTS_contract.json';

const Tezos = new TezosToolkit(conf.node);

const deploy = async () => {
    try {
        const signer = await InMemorySigner.fromSecretKey(conf.accounts.alice.sk);
        Tezos.setProvider({ signer });

        const storage = {
            ledger: new MichelsonMap(),
            operators: new MichelsonMap(),
            reverse_ledger: new MichelsonMap(),
            metadata: MichelsonMap.fromLiteral({
                '': buf2hex(Buffer.from('tezos-storage:contents')),
                contents: buf2hex(Buffer.from(JSON.stringify(metadata))),
            }),
            token_metadata: new MichelsonMap(),
            next_token_id: 0,
            admin: conf.accounts.alice.pkh,
            all_tokens: [],
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
