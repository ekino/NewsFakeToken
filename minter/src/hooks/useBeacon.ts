import { useCallback, useState } from 'react';
import constate from 'constate';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { PermissionScope, NetworkType } from '@airgap/beacon-sdk';
import { TezosToolkit } from '@taquito/taquito';
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

    return {
        connect,
        disconnect,
        isConnected: !!pkh,
        Tezos,
        wallet,
        pkh,
        network,
    };
});

export default useBeacon;
