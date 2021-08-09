import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';

function UpdateForm(props: any): JSX.Element {
    const [validated, setValidated] = useState(false);
    const [state, setState] = useState(false);
    const [NFT, setName] = useState(props.NftName);
    const [NftSource, setNftSource] = useState('');
    const [url, setUrl] = useState(props.Url);
    const [listNFTSource, setList] = useState(props.NftSources);

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
        listNFTSource.push(NftSource);
        setList(listNFTSource);
        setState(evt);
        setNftSource('');
    };

    const handleClickDel = (evt: any): void => {
        listNFTSource.pop();
        setList(listNFTSource);
        setState(evt);
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
                        <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            onClick={handleClickDel}
                        >
                            Delete source
                        </Button>
                    </InputGroup>
                    <ListGroup id="ListNFT">
                        {listNFTSource.map((item: any) => (
                            <ListGroup.Item variant="light">{item}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Form.Group>
                <Button type="submit">Mint your news</Button>
            </Form>
        </Container>
    );
}

export default UpdateForm;
