import { CardTravelRounded } from '@material-ui/icons';
import { FC, useEffect, useReducer } from 'react';
import { Card, Row, Spinner } from 'react-bootstrap';
import { getMetadata } from '../services/contract';
import { Action, dataFetchReducer } from '../services/reducer';

export const Metadata: FC = () => {
    const useMetadataFetcher = (): any => {
        const [state, dispatch] = useReducer(dataFetchReducer, {
            isLoading: false,
            isError: false,
            data: [],
        });

        useEffect(() => {
            (async (): Promise<void> => {
                dispatch({ type: 'FETCH_INIT' } as Action);
                const metadata = await getMetadata();

                try {
                    dispatch({ type: 'FETCH_SUCCESS', payload: metadata } as Action);
                } catch (error) {
                    dispatch({ type: 'FETCH_FAILURE' } as Action);
                }
            })();
        }, []);

        return state;
    };

    const { data, isLoading, isError } = useMetadataFetcher();

    return (
        <Row className="mt-4">
            {isLoading || data.length === 0 ? (
                <Spinner animation="grow" />
            ) : (
                <Card className="text-center">
                    <Card.Header>
                        <h2>Metadata</h2>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Title: {data.metadata?.name}</Card.Title>
                        <Card.Text>Description: {data.metadata?.description}</Card.Text>
                        <Card.Text>Url of the homepage: {data.metadata?.homepage}</Card.Text>
                        <Card.Text>Version: {data.metadata?.version}</Card.Text>
                        <Card.Text>Licence: {data.metadata?.license?.name}</Card.Text>
                        <Card.Text>Authors of this site : {data.metadata?.authors}</Card.Text>
                        <Card.Link href={data.metadata?.source?.location}>
                            Repository Github{' '}
                        </Card.Link>
                    </Card.Body>
                </Card>
            )}

            {isError && <p>Oups</p>}
        </Row>
    );
};

export default Metadata;
