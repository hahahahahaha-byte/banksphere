import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchCustomers } from '../../features/customers/customerSlice';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import { formatCurrency } from '../../utils/helpers';

const CustomerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customers, loading } = useSelector(state => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Account #', accessor: 'accountNumber' },
    { header: 'Balance', render: (row) => formatCurrency(row.balance) },
    { header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { 
      header: 'Action', 
      render: (row) => <Button variant="primary" size="sm" onClick={() => navigate(`/employee/customer/${row.id}`)}>View Details</Button>
    }
  ];

  return (
    <Container fluid>
      <h2 className="mb-4">Customer List</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <DataTable columns={columns} data={customers} loading={loading} emptyMessage="No customers found" />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CustomerList;