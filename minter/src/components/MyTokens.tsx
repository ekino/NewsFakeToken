import { Alert, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { FC, useEffect, useReducer, useMemo, useState } from 'react';
import Datatable from 'react-data-table-component';
import InvalidModal from './InvalidModal';
import MintButton from './MintButton';
import { Action, dataFetchReducer } from '../services/reducer';
import { getAllTokens, getMyTokens } from '../services/contract';

interface Props {
    activeAccountAddress?: string;
}

interface AlertProps {
    hash: string;
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

                let myTokens = [];

                if (activeAccountAddress !== undefined) {
                    myTokens = await getMyTokens(activeAccountAddress);
                    let allTokens = await getAllTokens();
                    allTokens = allTokens.reduce((acc: any[], token: any) => {
                        acc[token.token_id] = token;
                        return acc;
                    }, []);

                    myTokens = myTokens.map((token) => {
                        let listOfSources: any[] = [];
                        if (token.listOfSources !== undefined && token.listOfSources.length > 0) {
                            listOfSources = token.listOfSources.map((id: number) => allTokens[id]);
                        }
                        return { ...token, listOfSources };
                    });
                }

                try {
                    dispatch({ type: 'FETCH_SUCCESS', payload: myTokens } as Action);
                } catch (error) {
                    dispatch({ type: 'FETCH_FAILURE' } as Action);
                }
            })();
        }, [activeAccountAddress]);

        return state;
    };

    const { data, isLoading, isError } = useMyTokensFetcher();

    const columns = [
        { name: 'Token ID', selector: 'id', grow: 0 },
        {
            name: 'Title / URL',
            cell: ({ url, name }: { url: string; name: string }) => (
                <a href={url} target="_new">
                    {name}
                </a>
            ),
            grow: 1,
        },
        {
            name: 'Sources',
            cell: (row: any) =>
                row.sources
                    .map(
                        ({ identifier, name }: { identifier: string; name: string }) =>
                            `➕ ${name} ${identifier}`,
                    )
                    .join(','),
            grow: 2,
        },
        {
            name: 'Actions',
            button: true,
            minWidth: '150px',
            cell: (row: any) => {
                const { id } = row;
                return <InvalidModal id={id} setOpHash={setOpHash} />;
            },
        },
    ];

    const actionsMemo = useMemo(() => <MintButton setOpHash={setOpHash} />, []);

    const AlertOpHash: FC<AlertProps> = ({ ...p }) => {
        const [show, setShow] = useState(true);
        const { hash } = p;

        if (show) {
            return (
                <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Operation injected!</Alert.Heading>
                    <p>{hash}</p>
                </Alert>
            );
        }
        return <Button onClick={() => setShow(true)}>Show Alert</Button>;
    };

    return (
        <Container>
            <h2 className="mt-5">Minted NewsFT</h2>
            {opHash !== '' && <AlertOpHash hash={opHash} />}
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
                            columns={columns}
                            data={data.map((meta: any) => ({
                                id: meta.token_id,
                                name: meta.name,
                                url: meta.identifier,
                                sources: meta.listOfSources,
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
