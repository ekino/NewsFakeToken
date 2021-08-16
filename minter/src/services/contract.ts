import { TezosToolkit, compose } from '@taquito/taquito';
import { Tzip12Module, tzip12 } from '@taquito/tzip12';
import { tzip16 } from '@taquito/tzip16';
// eslint-disable-next-line import/no-extraneous-dependencies
import CONTRACT_ADDRESS from '@newsfaketoken/contracts/deployments/NFTS_contract';

const RPC_URL = process.env.REACT_APP_RPC_URL || 'https://florencenet.smartpy.io/';

export const getMetadata = async (): Promise<any> => {
    const tezos = new TezosToolkit(RPC_URL);
    tezos.addExtension(new Tzip12Module());
    const contract = await tezos.contract.at(CONTRACT_ADDRESS, compose(tzip12, tzip16));

    return contract.tzip16().getMetadata();
};

export const getTokenMetadata = async (tokenId: number): Promise<any> => {
    const tezos = new TezosToolkit(RPC_URL);
    tezos.addExtension(new Tzip12Module());
    const contract = await tezos.contract.at(CONTRACT_ADDRESS, compose(tzip12, tzip16));

    return contract.tzip12().getTokenMetadata(tokenId);
};

export const getAllTokens = async (): Promise<any[]> => {
    const tezos = new TezosToolkit(RPC_URL);
    const contract = await tezos.contract.at(CONTRACT_ADDRESS);

    console.log(await contract.storage());

    // const storage: Promise<{ all_tokens: number }> = await contract.storage();
    // return storage.all_tokens;

    return [];
};
