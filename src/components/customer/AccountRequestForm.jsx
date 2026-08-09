import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { toast } from 'react-toastify';

const AccountRequestForm = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    cnic: '',
    incomeProof: '',
    address: '',
    initialDeposit: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { name, cnic, incomeProof, address, initialDeposit } = formData;
    if (!name || !cnic || !incomeProof || !address || !initialDeposit) {
      setError('All fields are required.');
      return;
    }
    try {
      await addDoc(collection(db, 'accountRequests'), {
        ...formData,
        initialDeposit: Number(initialDeposit),
        customerId: user.uid,
        customerEmail: user.email,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      toast.success('Account request submitted!');
      navigate('/customer/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container fluid>
      <h2 className="mb-4">Open New Account</h2>
      <Card className="shadow-sm" style={{ maxWidth: '700px' }}>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>CNIC *</Form.Label>
                  <Form.Control type="text" name="cnic" placeholder="12345-1234567-1" value={formData.cnic} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Income Proof *</Form.Label>
              <Form.Control type="text" name="incomeProof" placeholder="Salary slip / Business declaration" value={formData.incomeProof} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Proof of Address *</Form.Label>
              <Form.Control type="text" name="address" placeholder="House #, Street, City" value={formData.address} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Initial Deposit (PKR) *</Form.Label>
              <Form.Control type="number" name="initialDeposit" value={formData.initialDeposit} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Submit Request</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AccountRequestForm;