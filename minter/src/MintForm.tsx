import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';

interface MyProps{
}


interface MyState{
    NFT: string;
    listNFTSource: Array<string>;
}

class MintForm extends Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        this.state = { 
            NFT: "",
            listNFTSource: [] 
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClickDel = this.handleClickDel.bind(this);
        this.submitNFT = this.submitNFT.bind(this);
    }

    handleClick(evt :any){
        this.state.listNFTSource.push(this.state.NFT);
        this.setState({NFT: evt.target.value});
    }

    handleClickDel(evt :any){
        this.state.listNFTSource.pop();
        this.setState({NFT: evt.target.value});
    }

    handleChange(evt :any){
        this.setState({NFT: evt.target.value});
    }

    submitNFT(){
        alert("You mint an NFT !")
    }

    render() {
        return (
            <Container>
                <Form>
                    <h2>Complete this form to mint your news.</h2>
                    <Form.Group className="mb-3" controlId="formURLArticle">

                        <Form.Label>URL of the article</Form.Label>
                        <Form.Control type="url" placeholder="Url of the article" />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="NFTSources">
                        <Form.Label>Sources of the article</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control type="text" placeholder="NFT source of the article" value={this.state.NFT} onChange={this.handleChange}/>
                            <Button variant="outline-secondary" id="button-addon2" onClick={this.handleClick}>
                                Add source
                            </Button>
                            <Button variant="outline-secondary" id="button-addon2" onClick={this.handleClickDel}>
                                Delete source
                            </Button>
                        </InputGroup>
                        <ListGroup id="ListNFT">
                            {this.state.listNFTSource.map(item =>(
                                <ListGroup.Item variant="light">
                                    {item}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Form.Group>

                    <Button variant="outline-primary" type="submit" onClick={this.submitNFT}>
                        Mint the news 
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default MintForm;