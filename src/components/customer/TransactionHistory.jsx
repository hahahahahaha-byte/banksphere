import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card } from 'react-bootstrap';
import { fetchTransactions } from '../../features/transactions/transactionSlice';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import { formatCurrency, formatDate } from '../../utils/helpers';

const TransactionHistory = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { transactions, loading } = useSelector(state => state.transactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const myTransactions = transactions.filter(t => t.customerId === user?.uid);

  const columns = [
    { header: 'Date', render: (row) => formatDate(row.createdAt) },
    { header: 'Type', render: (row) => <span className="text-capitalize">{row.type}</span> },
    { header: 'Amount', render: (row) => formatCurrency(row.amount) },
    { header: 'Status', render: (row) => <StatusBadge status={row.status} /> }
  ];

  return (
    <Container fluid>
      <h2 className="mb-4">Transaction History</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <DataTable columns={columns} data={myTransactions} loading={loading} emptyMessage="No transactions found" />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TransactionHistory;