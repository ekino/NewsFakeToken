import React, { FC, useEffect, useReducer } from 'react';
import { Row, Spinner } from 'react-bootstrap';
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
            <h2>Metadata</h2>
            {isLoading || data.length === 0 ? (
                <Spinner animation="grow" />
            ) : (
                <p>{JSON.stringify(data)}</p>
            )}

            {isError && <p>Oups</p>}
        </Row>
    );
};

export default Metadata;
