import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createLoan } from '../../features/loans/loanSlice';
import { toast } from 'react-toastify';

const LoanRequestForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({ amount: '', purpose: '', duration: '', notes: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || formData.amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    dispatch(createLoan({
      customerId: user.uid,
      customerName: user.name,
      customerEmail: user.email,
      amount: Number(formData.amount),
      purpose: formData.purpose,
      duration: formData.duration,
      notes: formData.notes,
      status: 'pending'
    }));
    
    toast.success('Loan request submitted successfully!');
    navigate('/customer/loans');
  };

  return (
    <Container fluid>
      <h2 className="mb-4">Request Loan</h2>
      <Card className="shadow-sm" style={{ maxWidth: '600px' }}>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Amount (PKR)</Form.Label>
              <Form.Control type="number" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Purpose</Form.Label>
              <Form.Control type="text" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration (Months)</Form.Label>
              <Form.Control type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notes (Optional)</Form.Label>
              <Form.Control as="textarea" rows={3} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
            </Form.Group>
            <Button variant="primary" type="submit">Submit Request</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoanRequestForm;