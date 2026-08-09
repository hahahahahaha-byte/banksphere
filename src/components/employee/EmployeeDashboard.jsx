import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { FiUsers, FiDollarSign, FiActivity } from 'react-icons/fi';
import { fetchCustomers } from '../../features/customers/customerSlice';
import { fetchLoans } from '../../features/loans/loanSlice';
import { fetchTransactions } from '../../features/transactions/transactionSlice';
import StatCard from '../common/StatCard';

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector(state => state.customers);
  const { pendingLoans } = useSelector(state => state.loans);
  const { pendingTransactions } = useSelector(state => state.transactions);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchLoans());
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <Container fluid>
      <h2 className="mb-4">Employee Dashboard</h2>
      <Row className="mb-4">
        <Col md={4}>
          <StatCard title="Total Customers" value={customers.length} icon={<FiUsers />} color="primary" />
        </Col>
        <Col md={4}>
          <StatCard title="Pending Loans" value={pendingLoans.length} icon={<FiDollarSign />} color="warning" />
        </Col>
        <Col md={4}>
          <StatCard title="Pending Transactions" value={pendingTransactions.length} icon={<FiActivity />} color="info" />
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeDashboard;