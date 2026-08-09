import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card } from 'react-bootstrap';
import { fetchTransactions } from '../../features/transactions/transactionSlice';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import { formatCurrency, formatDate } from '../../utils/helpers';

const TransactionOversight = () => {
  const dispatch = useDispatch();
  const { transactions, loading } = useSelector(state => state.transactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const columns = [
    { header: 'Date', render: (row) => formatDate(row.createdAt) },
    { header: 'Customer', accessor: 'customerName' },
    { header: 'Type', render: (row) => <span className="text-capitalize">{row.type}</span> },
    { header: 'Amount', render: (row) => formatCurrency(row.amount) },
    { header: 'Status', render: (row) => <StatusBadge status={row.status} /> }
  ];

  return (
    <Container fluid>
      <h2 className="mb-4">All Transactions Overview</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <DataTable columns={columns} data={transactions} loading={loading} emptyMessage="No transactions" />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TransactionOversight;