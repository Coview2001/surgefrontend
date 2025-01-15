import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const CongratulationPopup = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
                    

            <Button variant="primary" onClick={handleShow}>
                Trigger Congratulation Popup
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body className="text-center">
                    <div className="blaster">
                        <h5>Congratulations!</h5>
                        <h2>You did it!</h2>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CongratulationPopup;
