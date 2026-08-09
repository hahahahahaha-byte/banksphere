import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ message, onClose }) => (
  <Alert variant="danger" dismissible={!!onClose} onClose={onClose} className="alert-error">
    {message || 'An error occurred. Please try again.'}
  </Alert>
);

export default ErrorMessage;