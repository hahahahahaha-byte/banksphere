import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

const Modal = ({ show, onHide, title, children, onConfirm, confirmText = 'Confirm', confirmVariant = 'primary' }) => (
  <BootstrapModal show={show} onHide={onHide} centered>
    <BootstrapModal.Header closeButton>
      <BootstrapModal.Title>{title}</BootstrapModal.Title>
    </BootstrapModal.Header>
    <BootstrapModal.Body>{children}</BootstrapModal.Body>
    <BootstrapModal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Cancel
      </Button>
      {onConfirm && (
        <Button variant={confirmVariant} onClick={onConfirm}>
          {confirmText}
        </Button>
      )}
    </BootstrapModal.Footer>
  </BootstrapModal>
);

export default Modal;