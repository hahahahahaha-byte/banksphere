import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Row, Col, Button, Table } from 'react-bootstrap';
import { fetchTransactions } from '../../features/transactions/transactionSlice';
import { fetchLoans } from '../../features/loans/loanSlice';
import StatusBadge from '../common/StatusBadge';
import LoadingSpinner from '../common/LoadingSpinner';
import { formatCurrency, formatDate } from '../../utils/helpers';

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customers } = useSelector(state => state.customers);
  const { transactions } = useSelector(state => state.transactions);
  const { loans } = useSelector(state => state.loans);

  const customer = customers.find(c => c.id === id);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchLoans());
  }, [dispatch]);

  if (!customer) return <LoadingSpinner />;

  const customerTransactions = transactions.filter(t => t.customerId === customer.userId);
  const customerLoans = loans.filter(l => l.customerId === customer.userId);

  return (
    <Container fluid>
      <Button variant="secondary" className="mb-3" onClick={() => navigate('/employee/customers')}>← Back</Button>
      <h2>{customer.name}</h2>
      
      <Row className="mb-4">
        <Col md={3}><Card><Card.Body><h6>Account #</h6><p>{customer.accountNumber}</p></Card.Body></Card></Col>
        <Col md={3}><Card><Card.Body><h6>Balance</h6><p>{formatCurrency(customer.balance)}</p></Card.Body></Card></Col>
        <Col md={3}><Card><Card.Body><h6>Status</h6><StatusBadge status={customer.status} /></Card.Body></Card></Col>
        <Col md={3}><Card><Card.Body><h6>Email</h6><p>{customer.email}</p></Card.Body></Card></Col>
      </Row>

      <h4>Transactions</h4>
      <Table striped bordered hover>
        <thead><tr><th>Date</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>
          {customerTransactions.map(t => (
            <tr key={t.id}><td>{formatDate(t.createdAt)}</td><td>{t.type}</td><td>{formatCurrency(t.amount)}</td><td><StatusBadge status={t.status} /></td></tr>
          ))}
        </tbody>
      </Table>

      <h4>Loans</h4>
      <Table striped bordered hover>
        <thead><tr><th>Amount</th><th>Purpose</th><th>Duration</th><th>Status</th></tr></thead>
        <tbody>
          {customerLoans.map(l => (
            <tr key={l.id}><td>{formatCurrency(l.amount)}</td><td>{l.purpose}</td><td>{l.duration}</td><td><StatusBadge status={l.status} /></td></tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CustomerDetails;