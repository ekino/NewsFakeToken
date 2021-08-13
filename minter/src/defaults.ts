import { NetworkType } from '@airgap/beacon-sdk';

const DEFAULT_NETWORK_INDEX_ENV: string = process.env.REACT_APP_DEFAULT_NETWORK_INDEX ?? '';
const DEFAULT_NETWORK_INDEX: number = parseInt(DEFAULT_NETWORK_INDEX_ENV, 10);

export const NETWORKS = [
    {
        id: NetworkType.CUSTOM,
        nextNetworkIndex: 1,
        name: 'Local Sandbox',
        type: 'test',
        rpcBaseURL: 'http://localhost:8732',
    },
    {
        id: NetworkType.GRANADANET,
        nextNetworkIndex: 2,
        name: 'Granadanet',
        type: 'test',
        rpcBaseURL: 'https://granadanet.smartpy.io/',
    },
];

export const DEFAULT_NETWORK = NETWORKS[DEFAULT_NETWORK_INDEX];
