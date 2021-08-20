import { useEffect, useReducer, useState, FC, Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
    Container,
    Form,
    Button,
    InputGroup,
    ListGroup,
    Spinner,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
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
    const [currentSource, setCurrentSource] = useState<number>();
    const [sources, setSources] = useState<number[]>([]);

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
        url: Yup.string().required('url is required').url(),
        sources: Yup.array().of(Yup.number()),
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
                    <Form.Group className="mb-3" controlId="NFTSources">
                        <Form.Label>Sources of the article</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="NFT source of the article"
                                onChange={(e: any) => setCurrentSource(e.currentTarget.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a source
                            </Form.Control.Feedback>
                            <OverlayTrigger
                                overlay={
                                    <Tooltip id="tooltip-disabled">
                                        Add a source to this article
                                    </Tooltip>
                                }
                            >
                                <Button
                                    variant="outline-secondary"
                                    id="button-addon2"
                                    onClick={(): void => {
                                        if (undefined !== currentSource) {
                                            setSources([...sources, currentSource]);
                                            setCurrentSource(0);
                                        }
                                    }}
                                >
                                    Add source
                                </Button>
                            </OverlayTrigger>
                        </InputGroup>
                        <ListGroup id="ListNFT">
                            {sources.map((item: any) => (
                                <ListGroup.Item variant="light" key={item}>
                                    <ListItemText primary={item} />
                                    <ListItemSecondaryAction>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip id="tooltip-disabled">
                                                    Delete this source
                                                </Tooltip>
                                            }
                                        >
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => {
                                                    sources.splice(
                                                        sources.findIndex(
                                                            (element: any) => element === item,
                                                        ),
                                                        1,
                                                    );
                                                    setSources(Array.from(sources));
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </OverlayTrigger>
                                    </ListItemSecondaryAction>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Form.Group>

                    <Button type="submit">Mint your news</Button>
                </Form>
            )}
        </Container>
    );
};

export default MintForm;
