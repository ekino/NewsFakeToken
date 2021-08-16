import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import UpdateForm from './RemintForm';

function InvalidModal({
    nftName,
    nftSource,
    Url,
}: {
    nftName: string;
    nftSource: string[];
    Url: string;
}): JSX.Element {
    const [show, setShow] = useState(false);

    function handleClose(): void {
        setShow(false);
    }
    function handleShow(): void {
        setShow(true);
    }
    return (
        <>
            <Button variant="outline-warning" size="sm" onClick={handleShow}>
                <FontAwesomeIcon icon={faTimesCircle} /> Set Invalid
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update your news </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateForm NftName={nftName} NftSources={nftSource} URL={Url} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default InvalidModal;
