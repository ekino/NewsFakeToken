import { Button, Modal } from 'react-bootstrap';
import { useState, FC, Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import RemintForm from './RemintForm';

interface Props {
    id: number;
    setOpHash: Dispatch<SetStateAction<string>>;
}

const InvalidModal: FC<Props> = ({ ...props }) => {
    const { id } = props;
    const { setOpHash } = props;
    const [show, setShow] = useState(false);

    const handleClose = (): void => setShow(false);
    const handleShow = (): void => setShow(true);

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
                    <RemintForm id={id} setOpHash={setOpHash} closeModal={handleClose} />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default InvalidModal;
