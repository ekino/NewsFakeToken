import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Upload, PostInfo } from '../hooks/upload';

function MintForm(): JSX.Element {
    const [validated, setValidated] = useState(false);
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [state, setState] = useState(false);
    const [NFT, setNft] = useState('');
    const [listNFTSource, setList] = useState([] as any);
    const [data, setData] = useState({});
    const doMint = PostInfo(title, url, listNFTSource);

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

    const handleChangeTitle = (event: any): void => {
        setTitle(event.target.value);
    };

    const handleChangeUrl = (event: any): void => {
        setUrl(event.target.value);
    };

    const handleChangeNft = (event: any): void => {
        setNft(event.target.value);
    };

    const handleClick = (evt: any): void => {
        if (NFT === '') {
            alert('Please enter a source !');
        } else {
            listNFTSource.push(NFT);
            setState(evt);
            setNft('');
        }
    };

    const deleteItem = (item: any, evt: any): void => {
        listNFTSource.splice(
            listNFTSource.findIndex((element: any) => element === item),
            1,
        );
        setState(evt);
    };

    return (
        <Container>
            <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                method="post"
            >
                <Form.Group className="mb-3" controlId="Url">
                    <Form.Label>Title of the article</Form.Label>
                    <Form.Control
                        required
                        type="string"
                        placeholder="Title of the article"
                        value={title}
                        onChange={handleChangeTitle}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a title
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Url">
                    <Form.Label>Url of the article</Form.Label>
                    <Form.Control
                        required
                        type="url"
                        placeholder="Url of the article"
                        value={url}
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
                            value={NFT}
                            onChange={handleChangeNft}
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
                            <ListGroup.Item variant="light" key={item}>
                                <ListItemText primary={item} />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={(evt) => deleteItem(item, evt)}
                                    >
                                        <DeleteIcon />
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
