import { FC, useEffect, useReducer } from 'react';
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

export const AllTokens: FC = () => {
    const useAllTokensFetcher = (): any => {
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
        }, []);

        return state;
    };

    const { data, isLoading, isError } = useAllTokensFetcher();

    const status = 'success';
    const classStatus = 'bg-success';

    // eslint-disable-next-line consistent-return
    function articleTitle(id: any): any {
        // eslint-disable-next-line no-restricted-syntax
        for (const article of data) {
            if (article.token_id === Number(id)) {
                const title = article.name.toString();
                const url = article.identifier.toString();
                return [title, url];
            }
        }
    }

    // function checkStatus(id: any): any {
    //     const status: string;
    //     const classStatus: string;
    //     if ('addressToken' === 'addressBurn' || 'sourcesInvalid') {
    //         'status = danger;'
    //         'classStatus = bg-danger;'
    //     } else if ('sourceInvalid') {
    //         'status = warning;'
    //         'classStatus = bg-warning;'
    //     } else {
    //         'status = success'
    //         'classStatus = bg-success;'
    //    }
    //    return [status, classStatus];
    // }

    return (
        <Container>
            {isLoading ? (
                <Spinner animation="grow" />
            ) : (
                <p>
                    <Row xs={1} md={4}>
                        {data.map((article: any) => (
                            <Col>
                                <Card bg={status} text="light" style={{ width: '18rem' }}>
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
                                                    className="text-light"
                                                    href={article.identifier}
                                                >
                                                    {article.name}
                                                </Nav.Link>
                                            </Nav.Item>
                                        </OverlayTrigger>
                                    </Card.Header>
                                    <Card.Body>
                                        <ListGroup variant="flush">
                                            {article.listOfSources?.map((source: any) => (
                                                <ListGroup.Item className={classStatus}>
                                                    <Nav.Item>
                                                        <Nav.Link
                                                            className="text-light"
                                                            href={articleTitle(source)[1]}
                                                        >
                                                            {articleTitle(source)[0]}
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Card.Body>
                                    <Card.Footer>
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
