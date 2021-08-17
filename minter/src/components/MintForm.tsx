import { useEffect, useReducer, useState, FC, Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useBeaconWallet, useWallet } from '@tezos-contrib/react-wallet-provider';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { Action, dataFetchReducer } from '../services/reducer';
import { newNFT } from '../services/api';
import { mint } from '../services/contract';

interface Props {
    setOpHash: Dispatch<SetStateAction<string>>;
    closeModal: () => void;
}

const MintForm: FC<Props> = ({ ...props }) => {
    const { setOpHash, closeModal } = props;
    const { activeAccount } = useWallet();

    const useNewNFTApi = (): any => {
        const [formData, setFormData] = useState(null);

        const [state, dispatch] = useReducer(dataFetchReducer, {
            isLoading: false,
            isError: false,
            data: [],
        });

        useEffect(() => {
            if (
                formData === null ||
                activeAccount?.address === undefined ||
                activeAccount?.address === null
            )
                return;

            (async (): Promise<void> => {
                dispatch({ type: 'FETCH_INIT' } as Action);
                const apiPinNFTResponse = await newNFT(formData);
                const jsonResponse = await apiPinNFTResponse.json();
                if (jsonResponse.status !== true) {
                    throw new Error('could not pin NFT');
                }

                const op = await mint(jsonResponse.msg.metadataHash, activeAccount.address);
                setOpHash(op.opHash);

                try {
                    dispatch({
                        type: 'FETCH_SUCCESS',
                        payload: { operationHash: op.opHash },
                    } as Action);
                } catch (error) {
                    dispatch({ type: 'FETCH_FAILURE' } as Action);
                }

                closeModal();
            })();
        }, [formData]);

        return [state, setFormData];
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('title is required'),
        url: Yup.string().required('url is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [{ isLoading, isError, data }, setFormData] = useNewNFTApi();

    const onSubmit = async (submittedData: FormData): Promise<void> => {
        setFormData(submittedData);
    };

    console.log(data);

    return (
        <Container>
            <h2>Complete this form to mint your news.</h2>
            In this form you need to complete the title, the url address of your article and find
            the id of the articles you are using as sources. <b>Be sure to write the right IDs.</b>
            {isError && <p>Oups</p>}
            {isLoading ? (
                <Spinner animation="grow" />
            ) : (
                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label className="required">Title of the article</Form.Label>
                        <Form.Control
                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                            placeholder="Title of the article"
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...register('title')}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="required">Url of the article</Form.Label>
                        <Form.Control
                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                            placeholder="Url of the article"
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...register('url')}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.url?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit">Mint your news</Button>
                </Form>
            )}
        </Container>
    );
};

export default MintForm;
