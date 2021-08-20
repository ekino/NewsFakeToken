import { BeaconWallet } from '@taquito/beacon-wallet';
import {
    TezosToolkit,
    TransactionWalletOperation,
    compose,
    MichelCodecPacker,
    WalletOperationBatch,
} from '@taquito/taquito';
import { Tzip12Module, tzip12 } from '@taquito/tzip12';
import { Tzip16Module, tzip16, MetadataProvider, Handler, IpfsHttpHandler } from '@taquito/tzip16';
import { char2Bytes } from '@taquito/utils';
import BigNumber from 'bignumber.js';
// eslint-disable-next-line import/no-extraneous-dependencies
import CONTRACT_ADDRESS from '@newsfaketoken/contracts/deployments/NFTS_contract';

const RPC_URL = process.env.REACT_APP_RPC_URL || 'https://florencenet.smartpy.io/';
const BURN_ADDRESS = process.env.REACT_APP_BURN_ADDRESS;

let tezos: TezosToolkit;
let minterContract: any;

export const initTezos = (url: string): void => {
    tezos = new TezosToolkit(url);
    tezos.addExtension(new Tzip12Module());
    tezos.setPackerProvider(new MichelCodecPacker());
};

export const setWalletProvider = (wallet: BeaconWallet): void => {
    // eslint-disable-next-line no-unused-expressions
    tezos && tezos.setProvider({ wallet });
};

export const initMinterContract = async (address: string | null = null): Promise<void> => {
    if (!address || tezos === null) {
        throw new Error('contract address not set or Tezos not initialized');
    }

    minterContract = await tezos.wallet.at(address, compose(tzip12, tzip16));
};

export const getMetadata = async (): Promise<any> => {
    return minterContract.tzip16().getMetadata();
};

export const getTokenMetadata = async (tokenId: number): Promise<any> => {
    const tz = new TezosToolkit(RPC_URL);
    tz.addExtension(
        new Tzip16Module(
            new MetadataProvider(
                new Map<string, Handler>([['ipfs', new IpfsHttpHandler('cloudflare-ipfs.com')]]),
            ),
        ),
    );
    const contract = await tz.contract.at(CONTRACT_ADDRESS, compose(tzip12, tzip16));

    return contract.tzip12().getTokenMetadata(tokenId);
};

export const getAllTokens = async (): Promise<any[]> => {
    const tz = new TezosToolkit(RPC_URL);
    tz.addExtension(
        new Tzip16Module(
            new MetadataProvider(
                new Map<string, Handler>([['ipfs', new IpfsHttpHandler('cloudflare-ipfs.com')]]),
            ),
        ),
    );
    const contract = await tz.contract.at(CONTRACT_ADDRESS, tzip12);

    // eslint-disable-next-line  camelcase
    const { all_tokens } = await contract.storage();
    const promises: any = [];
    all_tokens.forEach((tokenId: BigNumber) =>
        promises.push(contract.tzip12().getTokenMetadata(tokenId.toNumber())),
    );

    return Promise.all(promises);
};

export const getMyTokens = async (address: string): Promise<any[]> => {
    const tz = new TezosToolkit(RPC_URL);
    tz.addExtension(
        new Tzip16Module(
            new MetadataProvider(
                new Map<string, Handler>([['ipfs', new IpfsHttpHandler('cloudflare-ipfs.com')]]),
            ),
        ),
    );
    const contract = await tz.contract.at(CONTRACT_ADDRESS, tzip12);

    // eslint-disable-next-line  camelcase
    const { reverse_ledger } = await contract.storage();
    const myTokens = await reverse_ledger.get(address);

    if (undefined === myTokens) {
        return [];
    }

    const promises: any = [];
    myTokens.forEach((tokenId: BigNumber) =>
        promises.push(contract.tzip12().getTokenMetadata(tokenId.toNumber())),
    );

    return Promise.all(promises);
};

export const mint = async (cid: string, address: string): Promise<TransactionWalletOperation> => {
    return minterContract.methods.mint(char2Bytes(`ipfs://${cid}`), address).send();
};

export const remint = async (oldId: number, cid: string, address: string): Promise<string> => {
    // TODO burn and mint in one operation
    const batch = tezos.wallet
        .batch()
        .withContractCall(
            minterContract.methods.transfer([
                { from_: address, txs: [{ to_: BURN_ADDRESS, token_id: oldId, amount: 1 }] },
            ]),
        )
        .withContractCall(minterContract.methods.mint(char2Bytes(`ipfs://${cid}`), address));

    const batchOp = await batch.send();
    await batchOp.confirmation();

    return batchOp.opHash;
};
