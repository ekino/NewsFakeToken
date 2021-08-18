import { FC, useState } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';

interface Props {
    value: string;
    onChange: (e: any) => void;
    onSubmit: (e: any) => void;
}

export const SearchBar: FC<Props> = ({ ...props }) => {
    const { value, onChange, onSubmit } = props;
    return (
        <Row>
            <Col md>
                <p> </p>
            </Col>
            <Col md>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="searchBar" className="mb-3">
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Search an article"
                                value={value}
                                onChange={onChange}
                            />
                            <Button variant="outline-secondary" id="button-addon2" type="submit">
                                Search
                            </Button>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    );
};
