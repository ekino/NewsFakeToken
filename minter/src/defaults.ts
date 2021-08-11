import { NetworkType } from '@airgap/beacon-sdk';

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

export const DEFAULT_NETWORK = NETWORKS[0];
