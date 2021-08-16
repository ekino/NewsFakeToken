import { Container, Row, Col } from 'react-bootstrap';
import { FC, useEffect, useReducer, useMemo, useState } from 'react';
import * as React from 'react';
import Datatable from 'react-data-table-component';
import InvalidModal from './InvalidModal';
import MintButton from './MintButton';

interface Props {
    activeAccountAddress: string;
}

const MyTokens: FC<Props> = ({ ...props }) => {
    const { activeAccountAddress } = props;

    const headers = [
        { name: 'Token ID', selector: 'tokenId', grow: 0 },
        { name: 'Token Name', selector: 'tokenName', grow: 1 },
        { name: 'Url of the article', selector: 'url', grow: 3 },
        { name: 'Sources', selector: 'sourcesNames', grow: 2 },
        { name: 'Status', selector: 'status', grow: 1 },
        {
            name: 'Actions',
            button: true,
            minWidth: '150px',
            cell: (row: any): JSX.Element => {
                const { tokenName, sourcesNames, url } = row;
                return <InvalidModal nftName={tokenName} nftSource={sourcesNames} Url={url} />;
            },
        },
    ];
    const data = [
        { tokenId: 1, tokenName: 'fomo', url: 'http://url1.com', sourcesNames: ['a', 'b'] },
        { tokenId: 2, tokenName: 'folo', url: 'http://url1.com', sourcesNames: ['cd', 'ef'] },
        { tokenId: 3, tokenName: 'fowo', url: 'http://url1.com', sourcesNames: ['NFT1', 'NFT2'] },
    ];

    const actionsMemo = React.useMemo(() => <MintButton />, []);

    return (
        <Container>
            <h2 className="mt-5">Minted NewsFT</h2>
            <p className="lead">
                Those are your minted NewsFT. You can see their status, and invalid them here if
                need be. Click on &quot;Mint&quot; to create a new NewsFT.
            </p>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <Datatable
                        title="My NFTs"
                        columns={headers}
                        data={data}
                        pagination
                        actions={actionsMemo}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default MyTokens;
