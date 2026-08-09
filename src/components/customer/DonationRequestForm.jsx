import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { createTransaction } from '../../features/transactions/transactionSlice';
import { toast } from 'react-toastify';

const DonationRequestForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({ amount: '', type: 'donation', purpose: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTransaction({
      customerId: user.uid,
      customerName: user.name,
      customerEmail: user.email,
      type: formData.type,
      amount: Number(formData.amount),
      purpose: formData.purpose,
      status: 'pending'
    }));
    
    toast.success(`${formData.type} request submitted!`);
    setFormData({ amount: '', type: 'donation', purpose: '' });
  };

  return (
    <Container fluid>
      <h2 className="mb-4">Donation / Zakat Request</h2>
      <Card className="shadow-sm" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="donation">Donation</option>
                <option value="zakat">Zakat</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount (PKR)</Form.Label>
              <Form.Control type="number" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Purpose</Form.Label>
              <Form.Control as="textarea" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} />
            </Form.Group>
            <Button variant="info" type="submit">Submit Request</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DonationRequestForm;