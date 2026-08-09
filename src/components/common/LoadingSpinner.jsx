import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ text = 'Loading...' }) => (
  <div className="loading-container">
    <Spinner animation="border" variant="primary" role="status" />
    <span>{text}</span>
  </div>
);

export default LoadingSpinner;