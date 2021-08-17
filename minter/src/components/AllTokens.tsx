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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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

    return (
        <Container>
            {isLoading ? (
                <Spinner animation="grow" />
            ) : (
                <p>
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
                                                <Nav.Link href={article.identifier}>
                                                    {article.name}
                                                </Nav.Link>
                                            </Nav.Item>
                                        </OverlayTrigger>
                                    </Card.Header>
                                    <Card.Body>
                                        <ListGroup variant="flush">
                                            {article.listOfSources?.map((source: any) => (
                                                <ListGroup.Item>{source}</ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Card.Text>
                                            Current status of this article :
                                            <CheckCircleIcon />
                                        </Card.Text>
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
