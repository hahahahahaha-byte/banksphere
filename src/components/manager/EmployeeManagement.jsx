import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees, deleteEmployee } from '../../features/employees/employeeSlice';
import DataTable from '../common/DataTable';
import { formatCurrency } from '../../utils/helpers';
import { toast } from 'react-toastify';

const EmployeeManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees, loading } = useSelector(state => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Delete this employee?')) {
      dispatch(deleteEmployee(id));
      toast.success('Employee deleted');
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Salary', render: (row) => formatCurrency(row.salary) },
    { header: 'Status', accessor: 'status' },
    { 
      header: 'Action', 
      render: (row) => (
        <>
          <Button variant="danger" size="sm" onClick={() => handleDelete(row.id)}>Delete</Button>
        </>
      )
    }
  ];

  return (
    <Container fluid>
      <div className="d-flex justify-content-between mb-3">
        <h2>Employee Management</h2>
        <Button variant="success" onClick={() => navigate('/manager/add-employee')}>Add Employee</Button>
      </div>
      <Card className="shadow-sm">
        <Card.Body>
          <DataTable columns={columns} data={employees} loading={loading} emptyMessage="No employees" />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmployeeManagement;