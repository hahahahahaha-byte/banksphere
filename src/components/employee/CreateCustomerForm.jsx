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
    photographs: null,   // file input
    initialDeposit: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photographs') {
      setFormData({ ...formData, photographs: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.cnic || !formData.incomeProof || !formData.address || !formData.initialDeposit) {
      setError('All fields are required.');
      return;
    }

    const password = generatePassword();
    const accountNumber = generateAccountNumber();
    const initialBalance = Number(formData.initialDeposit);

    try {
      // 1. Create Firebase Auth user (customer role)
      await dispatch(createUser({
        email: formData.email,
        password,
        role: 'customer',
        additionalData: { name: formData.name }
      })).unwrap();

      // 2. Create customer document in Firestore
      dispatch(createCustomer({
        name: formData.name,
        email: formData.email,
        cnic: formData.cnic,
        incomeProof: formData.incomeProof,
        address: formData.address,
        photographs: formData.photographs ? formData.photographs.name : 'no-photo.jpg',  // dummy file name
        accountNumber,
        initialBalance,
        balance: initialBalance,
        status: 'active'
      }));

      toast.success(`Customer created! Password: ${password}`);
      navigate('/employee/customers');
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
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>CNIC (Identity Proof) *</Form.Label>
                  <Form.Control
                    type="text"
                    name="cnic"
                    placeholder="e.g., 12345-1234567-1"
                    value={formData.cnic}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">Dummy CNIC is acceptable for testing.</Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Income Proof *</Form.Label>
                  <Form.Control
                    type="text"
                    name="incomeProof"
                    placeholder="Salary slip / Business declaration"
                    value={formData.incomeProof}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">Type a dummy description.</Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Proof of Address *</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="e.g., House #12, Street 5, Karachi"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-muted">Dummy address is fine.</Form.Text>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Photographs (Passport size) *</Form.Label>
                  <Form.Control
                    type="file"
                    name="photographs"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">Upload a dummy image (jpg/png).</Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Initial Deposit (PKR) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="initialDeposit"
                    value={formData.initialDeposit}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="success" type="submit">
              Create Customer
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateCustomerForm;