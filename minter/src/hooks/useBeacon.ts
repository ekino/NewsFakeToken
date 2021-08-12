import { useCallback, useState } from 'react';
import constate from 'constate';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { PermissionScope, NetworkType } from '@airgap/beacon-sdk';
import { ContractAbstraction, TezosToolkit } from '@taquito/taquito';
import { bytes2Char, char2Bytes } from '@taquito/utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import contractAddress from '@newsfaketoken/contracts/deployments/NFTS_contract';
import { DEFAULT_NETWORK } from '../defaults';

const options = {
    name: 'News Fake Token',
    iconUrl: 'https://tezostaquito.io/img/favicon.png',
};

const Tezos = new TezosToolkit(DEFAULT_NETWORK.rpcBaseURL);
const wallet = new BeaconWallet(options);
Tezos.setWalletProvider(wallet);

export const [UseBeaconProvider, useBeacon] = constate(() => {
    const [pkh, setUserPkh] = useState<string>();
    const [network, setNetwork] = useState(DEFAULT_NETWORK);
    let userAddress: string;
    const serverUrl =
        process.env.NODE_ENV !== 'production'
            ? 'http://localhost:8080'
            : 'https://my-cool-backend-app.com';
    let userNfts: { tokenId: number; ipfsHash: string }[] = [];
    let nftStorage: any;
    let pinningMetadata = false;
    let mintingToken = false;
    let article: string;
    let title: string;
    let newNft: undefined | { imageHash: string; metadataHash: string; opHash: string };

    const connect = useCallback(async (currentNetwork) => {
        await wallet.disconnect();
        await wallet.clearActiveAccount();
        await wallet.requestPermissions({
            network: { type: NetworkType.CUSTOM, rpcUrl: currentNetwork.rpcBaseURL },
            scopes: [
                PermissionScope.OPERATION_REQUEST,
                PermissionScope.SIGN,
                PermissionScope.THRESHOLD,
            ],
        });
        Tezos.setRpcProvider(currentNetwork.rpcBaseURL);
        setUserPkh(await wallet.getPKH());
        setNetwork(currentNetwork);
    }, []);

    const disconnect = useCallback(async () => {
        await wallet.disconnect();
        await wallet.clearActiveAccount();
        Tezos.setWalletProvider(wallet);
        setUserPkh(undefined);
        setNetwork(DEFAULT_NETWORK);
    }, []);

    const getUserNfts = async (address: string): Promise<any> => {
        const contract = await Tezos.wallet.at(contractAddress);
        nftStorage = await contract.storage();
        const getTokenIds = await nftStorage.reverse_ledger.get(address);
        if (getTokenIds) {
            userNfts = await Promise.all([
                ...getTokenIds.map(async (id: any) => {
                    const tokenId = id.toNumber();
                    const metadata = await nftStorage.token_metadata.get(tokenId);
                    const tokenInfoBytes = metadata.token_info.get('');
                    const tokenInfo = bytes2Char(tokenInfoBytes);
                    return {
                        tokenId,
                        ipfsHash: tokenInfo.slice(0, 7) === 'ipfs://' ? tokenInfo.slice(7) : null,
                    };
                }),
            ]);
        }
    };

    const upload = async (): Promise<any> => {
        try {
            pinningMetadata = true;
            const Data = new FormData();
            Data.append('title', title);
            Data.append('article', article);
            Data.append('creator', userAddress);

            const response = await fetch(`${serverUrl}/mint`, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: Data,
            });
            if (response) {
                const data = await response.json();
                if (data.status === 200 && data.msg.metadataHash && data.msg.imageHash) {
                    pinningMetadata = false;
                    mintingToken = true;
                    const contract = await Tezos.wallet.at(contractAddress);
                    const op = await contract.methods
                        .mint(char2Bytes(`ipfs://${data.msg.metadataHash}`), userAddress)
                        .send();
                    await op.confirmation();

                    newNft = {
                        imageHash: data.msg.imageHash,
                        metadataHash: data.msg.metadataHash,
                        opHash: op.opHash,
                    };

                    article = '';
                    title = '';

                    await getUserNfts(userAddress);
                } else {
                    // eslint-disable-next-line no-throw-literal
                    throw 'No IPFS Hash';
                }
            } else {
                // eslint-disable-next-line no-throw-literal
                throw 'No response';
            }
        } catch (error) {
            console.log(error);
        } finally {
            pinningMetadata = false;
            mintingToken = false;
        }
    };

    return {
        connect,
        disconnect,
        getUserNfts,
        upload,
        isConnected: !!pkh,
        Tezos,
        wallet,
        pkh,
        network,
    };
});

export default useBeacon;
