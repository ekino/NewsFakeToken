import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import MintForm from './MintForm';

function MintButton(): JSX.Element {
    const [show, setShow] = useState(false);

    function handleClose(): void {
        setShow(false);
    }

    function handleShow(): void {
        setShow(true);
    }

    return (
        <>
            <Button variant="success" size="sm" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlusCircle} /> Mint news
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Mint your news</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MintForm />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default MintButton;
