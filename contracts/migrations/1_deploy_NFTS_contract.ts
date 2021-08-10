import { TezosToolkit, MichelsonMap } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { buf2hex } from '@taquito/utils';
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
            metadata: MichelsonMap.fromLiteral({
                '': buf2hex(Buffer.from('tezos-storage:contents')),
                contents: buf2hex(
                    Buffer.from(
                        JSON.stringify({
                            name: 'News Fake Token',
                            description: 'FA2 NFT Contract News Articles Minter',
                            version: 'beta',
                            license: { name: 'MIT' },
                            authors: 'ekino <blockchain@ekino.com>',
                            homepage: 'htpps://newsfaketoken.web.app',
                            source: {
                                tools: 'cameligo',
                                location: 'https://github.com/ekino/NewsFakeToken',
                            },
                            interfaces: ['TZIP-012', 'TZIP-016'],
                            permissions: { operator: 'no-transfer' },
                        }),
                    ),
                ),
            }),
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
