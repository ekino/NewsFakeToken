import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';

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
    const [state, setState] = useState(false);
    const [NFT, setName] = useState(NftName);
    const [NftSource, setNftSource] = useState('');
    const [url, setUrl] = useState(URL);
    const [listNFTSource, setList] = useState(NftSources);

    const handleSubmit = (event: any): void => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const handleChange = (event: any): void => {
        setNftSource(event.target.value);
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
                    <Form.Label>Title : {NFT}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="OldUrl">
                    <Form.Label>Url of the article : </Form.Label>
                    <Form.Label>{url}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" controlId="NewUrl">
                    <Form.Label>Url of the new article :</Form.Label>
                    <Form.Control required type="url" placeholder="url of the new article" />
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
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a source
                        </Form.Control.Feedback>
                        <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            onClick={handleClick}
                        >
                            Add source
                        </Button>
                    </InputGroup>
                    <ListGroup id="ListNFT">
                        {listNFTSource.map((item: any) => (
                            <ListGroup.Item variant="light" key={item.id}>
                                <ListItemText primary={item} />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={(evt) => deleteItem(item, evt)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="swap"
                                        onClick={(evt) => swapItem(item, evt)}
                                    >
                                        <SwapHorizIcon />
                                    </IconButton>
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
