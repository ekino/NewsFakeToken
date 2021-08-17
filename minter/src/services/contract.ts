import { BigMapAbstraction, TezosToolkit, compose } from '@taquito/taquito';
import { Tzip12Module, tzip12 } from '@taquito/tzip12';
import { Tzip16Module, tzip16 } from '@taquito/tzip16';
// eslint-disable-next-line import/no-extraneous-dependencies
import CONTRACT_ADDRESS from '@newsfaketoken/contracts/deployments/NFTS_contract';
import BigNumber from 'bignumber.js';

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
    tezos.addExtension(new Tzip12Module());
    const contract = await tezos.contract.at(CONTRACT_ADDRESS, tzip12);

    // eslint-disable-next-line  camelcase
    const { all_tokens } = await contract.storage();
    const promises: any = [];
    all_tokens.forEach((tokenId: BigNumber) =>
        promises.push(contract.tzip12().getTokenMetadata(tokenId.toNumber())),
    );

    return Promise.all(promises);
};

export const getMyTokens = async (address: string): Promise<any[]> => {
    const tezos = new TezosToolkit(RPC_URL);
    tezos.addExtension(new Tzip12Module());
    const contract = await tezos.contract.at(CONTRACT_ADDRESS, tzip12);

    // eslint-disable-next-line  camelcase
    const { reverse_ledger } = await contract.storage();
    const myTokens = await reverse_ledger.get(address);

    const promises: any = [];
    myTokens.forEach((tokenId: BigNumber) =>
        promises.push(contract.tzip12().getTokenMetadata(tokenId.toNumber())),
    );

    return Promise.all(promises);
};
