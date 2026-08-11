import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createCustomer } from '../../features/customers/customerSlice';
import { createUser } from '../../features/auth/authSlice';
import { generateAccountNumber, generatePassword } from '../../utils/helpers';
import { toast } from 'react-toastify';

const CreateCustomerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cnic: '',
    incomeProof: '',
    address: '',
    initialDeposit: '',
  });
  const [error, setError] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setGeneratedPassword('');

    if (!formData.name || !formData.email || !formData.cnic || !formData.incomeProof || !formData.address || !formData.initialDeposit) {
      setError('All fields are required.');
      return;
    }

    const password = generatePassword();
    const accountNumber = generateAccountNumber();
    const initialBalance = Number(formData.initialDeposit);

    try {
      await dispatch(createUser({
        email: formData.email,
        password,
        role: 'customer',
        additionalData: { name: formData.name },
      })).unwrap();

      dispatch(createCustomer({
        name: formData.name,
        email: formData.email,
        cnic: formData.cnic,
        incomeProof: formData.incomeProof,
        address: formData.address,
        accountNumber,
        initialBalance,
        balance: initialBalance,
        status: 'active',
      }));

      setGeneratedPassword(password);
      toast.success('Customer created successfully!');
    } catch (err) {
      setError(err.message || 'Failed to create customer');
    }
  };

  return (
    <Container fluid>
      <h2 className="mb-4">Create Customer Account</h2>
      <Card className="shadow-sm" style={{ maxWidth: '700px' }}>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          {generatedPassword && (
            <Alert variant="success">
              <strong>Customer created!</strong><br />
              <span>Password: <code>{generatedPassword}</code></span><br />
              <small className="text-muted">Please save this password – it will disappear when you create a new customer or leave this page.</small>
            </Alert>
          )}

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
                  <Form.Label>Email *</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>CNIC (Identity Proof) *</Form.Label>
                  <Form.Control type="text" name="cnic" placeholder="e.g., 12345-1234567-1" value={formData.cnic} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Income Proof *</Form.Label>
                  <Form.Control type="text" name="incomeProof" placeholder="Salary slip / Business declaration" value={formData.incomeProof} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Proof of Address *</Form.Label>
              <Form.Control type="text" name="address" placeholder="e.g., House #12, Street 5, Karachi" value={formData.address} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Initial Deposit (PKR) *</Form.Label>
              <Form.Control type="number" name="initialDeposit" value={formData.initialDeposit} onChange={handleChange} required />
            </Form.Group>

            <Button variant="success" type="submit">Create Customer</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateCustomerForm;
