import React, { FC, useEffect, useReducer } from 'react';
import { Row, Spinner } from 'react-bootstrap';
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
        <Row className="mt-4">
            {isLoading ? <Spinner animation="grow" /> : <p>{JSON.stringify(data)}</p>}

            {isError && <p>Oups</p>}
        </Row>
    );
};

export default AllTokens;
