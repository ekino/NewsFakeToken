import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';

function MintForm(): JSX.Element {
    const [validated, setValidated] = useState(false);
    const [state, setState] = useState(false);
    const [NFT, setname] = useState('');
    const [listNFTSource, setList] = useState([] as any);

    const handleSubmit = (event: any): void => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const handleChange = (event: any): void => {
        setname(event.target.value);
    };

    const handleClick = (evt: any): void => {
        if (NFT === '') {
            alert('Please enter a source');
        } else {
            listNFTSource.push(NFT);
            setState(evt);
            setname('');
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
                <Form.Group className="mb-3" controlId="Url">
                    <Form.Label>Url of the article</Form.Label>
                    <Form.Control required type="url" placeholder="Url of the article" />
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
                            value={NFT}
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

export default MintForm;
