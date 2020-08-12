import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

const ModalWindow = (props) => {
    return (
	    <Modal isOpen={props.isOpen} toggle={props.toggleModal}>
		    <ModalBody>
			    {props.children}
		    </ModalBody>
	    </Modal>
        );
};

export default ModalWindow;
