import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card } from 'react-bootstrap';
import { fetchCustomers } from '../../features/customers/customerSlice';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import { formatCurrency } from '../../utils/helpers';

const CustomerManagement = () => {
  const dispatch = useDispatch();
  const { customers, loading } = useSelector(state => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Account #', accessor: 'accountNumber' },
    { header: 'Balance', render: (row) => formatCurrency(row.balance) },
    { header: 'Status', render: (row) => <StatusBadge status={row.status} /> }
  ];

  return (
    <Container fluid>
      <h2 className="mb-4">All Customers</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <DataTable columns={columns} data={customers} loading={loading} emptyMessage="No customers" />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CustomerManagement;