import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { createTransaction } from '../../features/transactions/transactionSlice';
import { toast } from 'react-toastify';

const DepositRequestForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    dispatch(createTransaction({
      customerId: user.uid,
      customerName: user.name,
      customerEmail: user.email,
      type: 'deposit',
      amount: Number(amount),
      status: 'pending'
    }));
    
    toast.success('Deposit request submitted!');
    setAmount('');
    setError('');
  };

  return (
    <Container fluid>
      <h2 className="mb-4">Deposit Request</h2>
      <Card className="shadow-sm" style={{ maxWidth: '500px' }}>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Amount (PKR)</Form.Label>
              <Form.Control type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
            </Form.Group>
            <Button variant="success" type="submit">Submit Deposit Request</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DepositRequestForm;