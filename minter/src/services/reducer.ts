export type Action = {
    type: string;
    payload: any;
};

type State = {
    data: any;
    isLoading: boolean;
    isError: boolean;
};

export const dataFetchReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'FETCH_INIT': {
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        }
        case 'FETCH_SUCCESS': {
            const { payload } = action;
            return {
                ...state,
                data: payload,
                isLoading: false,
                isError: false,
            };
        }
        case 'FETCH_FAILURE': {
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        }
        default:
            throw new Error();
    }
};
