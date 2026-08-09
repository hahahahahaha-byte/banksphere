import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchLoans } from '../../features/loans/loanSlice';
import DataTable from '../common/DataTable';
import StatusBadge from '../common/StatusBadge';
import { formatCurrency, formatDate } from '../../utils/helpers';

const LoanHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { loans, loading } = useSelector(state => state.loans);

  useEffect(() => {
    dispatch(fetchLoans());
  }, [dispatch]);

  const myLoans = loans.filter(l => l.customerId === user?.uid);

  const columns = [
    { header: 'Date', render: (row) => formatDate(row.createdAt) },
    { header: 'Amount', render: (row) => formatCurrency(row.amount) },
    { header: 'Purpose', accessor: 'purpose' },
    { header: 'Duration', accessor: 'duration' },
    { header: 'Status', render: (row) => <StatusBadge status={row.status} /> }
  ];

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Loan History</h2>
        <Button variant="primary" onClick={() => navigate('/customer/request-loan')}>Request New Loan</Button>
      </div>
      <Card className="shadow-sm">
        <Card.Body>
          <DataTable columns={columns} data={myLoans} loading={loading} emptyMessage="No loans found" />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoanHistory;