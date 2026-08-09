import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { FiUsers, FiBriefcase, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import { fetchCustomers } from '../../features/customers/customerSlice';
import { fetchEmployees } from '../../features/employees/employeeSlice';
import { fetchLoans } from '../../features/loans/loanSlice';
import { fetchTransactions } from '../../features/transactions/transactionSlice';
import StatCard from '../common/StatCard';
import { formatCurrency } from '../../utils/helpers';

const ManagerDashboard = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector(state => state.customers);
  const { employees } = useSelector(state => state.employees);
  const { loans } = useSelector(state => state.loans);
  const { transactions } = useSelector(state => state.transactions);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchEmployees());
    dispatch(fetchLoans());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const totalBalance = customers.reduce((sum, c) => sum + (c.balance || 0), 0);
  const totalLoans = loans.filter(l => l.status === 'approved').reduce((sum, l) => sum + l.amount, 0);

  return (
    <Container fluid>
      <h2 className="mb-4">Manager Dashboard - Bank Overview</h2>
      <Row>
        <Col md={3}><StatCard title="Total Bank Balance" value={formatCurrency(totalBalance)} icon={<FiTrendingUp />} color="success" /></Col>
        <Col md={3}><StatCard title="Total Loans Issued" value={formatCurrency(totalLoans)} icon={<FiDollarSign />} color="warning" /></Col>
        <Col md={3}><StatCard title="Active Customers" value={customers.length} icon={<FiUsers />} color="primary" /></Col>
        <Col md={3}><StatCard title="Employees" value={employees.length} icon={<FiBriefcase />} color="info" /></Col>
      </Row>
    </Container>
  );
};

export default ManagerDashboard;