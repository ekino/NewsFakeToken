import { useState } from 'react';
import {
    Container,
    Form,
    Button,
    InputGroup,
    ListGroup,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { RepostInfo } from '../hooks/upload';

function UpdateForm({
    NftName,
    NftSources,
    URL,
}: {
    NftName: string;
    NftSources: string[];
    URL: string;
}): JSX.Element {
    const [validated, setValidated] = useState(false);
    const [oldTokenId, setOldTokenId] = useState('');
    const [state, setState] = useState(false);
    const [NFT, setNft] = useState(NftName);
    const [NftSource, setNftSource] = useState('');
    const [url, setUrl] = useState(URL);
    const [newUrl, setNewUrl] = useState('');
    const [listNFTSource, setList] = useState(NftSources);
    const doMint = RepostInfo(NFT, url, oldTokenId, listNFTSource);

    const handleSubmit = (event: any): void => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            alert('The form is not well completed');
        } else {
            doMint('e');
        }
        setValidated(true);
    };

    const handleChangeNftSource = (event: any): void => {
        setNftSource(event.target.value);
    };

    const handleChangeUrl = (event: any): void => {
        setNewUrl(event.target.value);
    };

    const handleChangeNft = (event: any): void => {
        setNft(event.target.value);
    };

    const handleClick = (evt: any): void => {
        if (NftSource === '') {
            alert('Please enter a source !');
        } else {
            listNFTSource.push(NftSource);
            setList(listNFTSource);
            setState(evt);
            setNftSource('');
        }
    };

    const deleteItem = (item: any, evt: any): void => {
        listNFTSource.splice(
            listNFTSource.findIndex((element: any) => element === item),
            1,
        );
        setState(evt);
    };

    const swapItem = (index: any, evt: any): void => {
        alert('You want to swap this item');
    };

    return (
        <Container>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>
                        <h2>Complete this form to update your news.</h2>
                        In this form you need to modify the title,add the new url address of your
                        article and add/swap/delete the sources of the article.{' '}
                        <b>Be sure to write the right IDs.</b>
                    </Form.Label>
                    <Form.Label>Title of the article</Form.Label>
                    <Form.Control required type="string" value={NFT} onChange={handleChangeNft} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="OldUrl">
                    <Form.Label>Url of the article : </Form.Label>
                    <Form.Label>{url}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="NewUrl">
                    <Form.Label>Url of the new article :</Form.Label>
                    <Form.Control
                        required
                        type="url"
                        placeholder="Url of the new article"
                        value={newUrl}
                        onChange={handleChangeUrl}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter an url
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="NFTSources">
                    <Form.Label>Sources of the article</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="NFT source of the article"
                            value={NftSource}
                            onChange={handleChangeNftSource}
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
                                onClick={handleClick}
                            >
                                Add source
                            </Button>
                        </OverlayTrigger>
                    </InputGroup>
                    <ListGroup id="ListNFT">
                        {listNFTSource.map((item: any) => (
                            <ListGroup.Item variant="light" key={item.id}>
                                <ListItemText primary={item} />
                                <ListItemSecondaryAction>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip id="tooltip-disabled">
                                                Swap this source against another
                                            </Tooltip>
                                        }
                                    >
                                        <IconButton
                                            edge="end"
                                            aria-label="swap"
                                            onClick={(evt) => swapItem(item, evt)}
                                        >
                                            <SwapHorizIcon />
                                        </IconButton>
                                    </OverlayTrigger>
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
                                            onClick={(evt) => deleteItem(item, evt)}
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
        </Container>
    );
}

export default UpdateForm;
