import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const NotFound = () => (
  <Container className="text-center py-5">
    <h1 className="display-1">404</h1>
    <h2>Page Not Found</h2>
    <p className="text-muted">The page you're looking for doesn't exist.</p>
    <Link to="/login">
      <Button variant="primary">Go to Login</Button>
    </Link>
  </Container>
);

export default NotFound;