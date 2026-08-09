import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../../features/employees/employeeSlice';
import { createUser } from '../../features/auth/authSlice';
import { generatePassword } from '../../utils/helpers';
import { toast } from 'react-toastify';

const AddEmployeeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', salary: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = generatePassword();

    try {
      await dispatch(createUser({ 
        email: formData.email, 
        password, 
        role: 'employee',
        additionalData: { name: formData.name }
      })).unwrap();

      dispatch(createEmployee({
        name: formData.name,
        email: formData.email,
        salary: Number(formData.salary),
        status: 'active'
      }));

      toast.success(`Employee created! Password: ${password}`);
      navigate('/manager/employees');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Container fluid>
      <h2 className="mb-4">Add New Employee</h2>
      <Card className="shadow-sm" style={{ maxWidth: '500px' }}>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Salary (PKR)</Form.Label>
              <Form.Control type="number" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} required />
            </Form.Group>
            <Button variant="success" type="submit">Create Employee</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddEmployeeForm;