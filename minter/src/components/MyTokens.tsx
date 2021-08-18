import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { FC, useEffect, useReducer, useMemo, useState } from 'react';
import * as React from 'react';
import Datatable from 'react-data-table-component';
import InvalidModal from './InvalidModal';
import MintButton from './MintButton';
import { Action, dataFetchReducer } from '../services/reducer';
import { getMyTokens } from '../services/contract';

interface Props {
    activeAccountAddress?: string;
}

const MyTokens: FC<Props> = ({ ...props }) => {
    const { activeAccountAddress } = props;
    const [opHash, setOpHash] = useState<string>('');

    const useMyTokensFetcher = (): any => {
        const [state, dispatch] = useReducer(dataFetchReducer, {
            isLoading: false,
            isError: false,
            data: [],
        });

        useEffect(() => {
            (async (): Promise<void> => {
                dispatch({ type: 'FETCH_INIT' } as Action);

                let tokens = [];
                if (activeAccountAddress !== undefined) {
                    tokens = await getMyTokens(activeAccountAddress);
                }

                try {
                    dispatch({ type: 'FETCH_SUCCESS', payload: tokens } as Action);
                } catch (error) {
                    dispatch({ type: 'FETCH_FAILURE' } as Action);
                }
            })();
        }, [activeAccountAddress]);

        return state;
    };

    const { data, isLoading, isError } = useMyTokensFetcher();

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

    const actionsMemo = React.useMemo(() => <MintButton setOpHash={setOpHash} />, []);

    return (
        <Container>
            <h2 className="mt-5">Minted NewsFT</h2>
            {opHash !== '' && <p>{opHash}</p>}
            <p className="lead">
                Those are your minted NewsFT. You can see their status, and invalid them here if
                need be. Click on &quot;Mint&quot; to create a new NewsFT.
            </p>
            <Row>
                {isLoading ? (
                    <Spinner animation="grow" />
                ) : (
                    <Col md={{ span: 10, offset: 1 }}>
                        <Datatable
                            title="My NFTs"
                            columns={headers}
                            data={data.map((meta: any) => ({
                                tokenId: meta.token_id,
                                tokenName: meta.name,
                                url: meta.identifier,
                            }))}
                            pagination
                            actions={actionsMemo}
                        />
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default MyTokens;
