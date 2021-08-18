export interface NFT {
    name: string;
    description: string;
    symbol: string;
    decimals: number;
    artifactUri: string;
    displayUri: string;
    thumbnailUri: string;
    creators: string[];
    // eslint-disable-next-line  camelcase
    is_transferable: boolean;
    lastUpdate: number;
    formats: { uri: string; mimeType: string }[];
    isBooleanAmount: boolean;
    shouldPreferSymbol: boolean;
}
