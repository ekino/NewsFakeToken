import { FC, useEffect, useReducer, FormEvent, useState, SyntheticEvent } from 'react';
import {
    Row,
    Spinner,
    Card,
    ListGroup,
    Nav,
    Col,
    Container,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import { getAllTokens } from '../services/contract';
import { Action, dataFetchReducer } from '../services/reducer';
import { SearchBar } from './SearchBar';

export const AllTokens: FC = () => {
    const [query, setQuery] = useState('');

    const useAllTokensFetcher = (initialQuery: string): any => {
        const [filter, setFilter] = useState(initialQuery);

        const [state, dispatch] = useReducer(dataFetchReducer, {
            isLoading: false,
            isError: false,
            data: [],
        });

        useEffect(() => {
            (async (): Promise<void> => {
                dispatch({ type: 'FETCH_INIT' } as Action);
                const tokens = await getAllTokens();
                try {
                    dispatch({ type: 'FETCH_SUCCESS', payload: tokens } as Action);
                } catch (error) {
                    dispatch({ type: 'FETCH_FAILURE' } as Action);
                }
            })();
        }, [filter]);

        state.data = state.data.filter((article: any) => article.name.includes(filter));

        return [state, setFilter];
    };

    const [{ data, isLoading, isError }, doFilter] = useAllTokensFetcher('');

    const classStatus = 'bg-success';

    // eslint-disable-next-line consistent-return
    function articleTitle(id: number): any {
        // eslint-disable-next-line no-restricted-syntax
        for (const article of data) {
            if (article.token_id === Number(id)) {
                return (
                    <Nav.Link className="text-dark" href={article.identifier}>
                        {article.name}
                    </Nav.Link>
                );
            }
        }
        return <> </>;
    }

    return (
        <Container>
            {isLoading ? (
                <Spinner animation="grow" />
            ) : (
                <p>
                    <SearchBar
                        value={query}
                        onChange={(e: FormEvent<HTMLInputElement>): void =>
                            setQuery(e.currentTarget.value)
                        }
                        onSubmit={(e: SyntheticEvent) => {
                            doFilter(query);
                            e.preventDefault();
                        }}
                    />
                    <Row xs={1} md={4}>
                        {data.map((article: any) => (
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Header>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip id="tooltip-dispabled">
                                                    Clic to go to the article page
                                                </Tooltip>
                                            }
                                        >
                                            <Nav.Item>
                                                <Nav.Link
                                                    className="text-dark"
                                                    href={article.identifier}
                                                >
                                                    {article.name}
                                                </Nav.Link>
                                            </Nav.Item>
                                        </OverlayTrigger>
                                    </Card.Header>
                                    <Card.Body>
                                        <ListGroup variant="flush">
                                            {/* {JSON.stringify(article)} */}
                                            {article.listOfSources !== undefined &&
                                                article.listOfSources.map((source: number) => (
                                                    <ListGroup.Item>
                                                        <Nav.Item>{articleTitle(source)}</Nav.Item>
                                                    </ListGroup.Item>
                                                ))}
                                        </ListGroup>
                                    </Card.Body>
                                    <Card.Footer className={classStatus}>
                                        <Card.Text>
                                            Id of this article : {article.token_id}
                                        </Card.Text>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </p>
            )}

            {isError && <p>Oups</p>}
        </Container>
    );
};

export default AllTokens;
