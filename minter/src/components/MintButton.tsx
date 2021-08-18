import { FC, Dispatch, SetStateAction, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import MintForm from './MintForm';

interface Props {
    setOpHash: Dispatch<SetStateAction<string>>;
}

const MintButton: FC<Props> = ({ ...props }) => {
    const { setOpHash } = props;
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
                    <MintForm setOpHash={setOpHash} closeModal={handleClose} />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default MintButton;
