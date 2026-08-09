import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FiDollarSign, FiActivity, FiFileText } from 'react-icons/fi';
import { fetchTransactions } from '../../features/transactions/transactionSlice';
import { fetchLoans } from '../../features/loans/loanSlice';
import StatCard from '../common/StatCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { formatCurrency } from '../../utils/helpers';


const CustomerDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { transactions } = useSelector(state => state.transactions);
  const { loans } = useSelector(state => state.loans);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchLoans());
  }, [dispatch]);

  if (!user) return <LoadingSpinner />;

  const myTransactions = transactions.filter(t => t.customerId === user.uid);
  const myLoans = loans.filter(l => l.customerId === user.uid);
  const approvedLoans = myLoans.filter(l => l.status === 'approved');
  const pendingRequests = myTransactions.filter(t => t.status === 'pending');

  return (
    <Container fluid>
      <h2 className="mb-4">Welcome, {user.name || 'Customer'}</h2>
      
      <Row className="mb-4">
        <Col md={4}>
          <StatCard title="Current Balance" value={formatCurrency(user.balance || 0)} icon={<FiDollarSign />} color="success" />
        </Col>
        <Col md={4}>
          <StatCard title="Total Transactions" value={myTransactions.length} icon={<FiActivity />} color="primary" />
        </Col>
        <Col md={4}>
          <StatCard title="Active Loans" value={approvedLoans.length} icon={<FiFileText />} color="warning" />
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5>Account Status</h5>
              <p><strong>Status:</strong> <span className="text-success">Active</span></p>
              <p><strong>Account Number:</strong> {user.accountNumber || 'N/A'}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5>Pending Requests</h5>
              <h2>{pendingRequests.length}</h2>
              <p className="text-muted">Awaiting approval</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerDashboard;