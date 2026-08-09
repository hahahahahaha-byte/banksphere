import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Button, Table } from 'react-bootstrap';
import { fetchLoans, approveLoan, rejectLoan } from '../../features/loans/loanSlice';
import { fetchCustomers, updateCustomer } from '../../features/customers/customerSlice';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { LOAN_APPROVAL_LIMIT } from '../../constants/roles';
import { toast } from 'react-toastify';

const HighValueLoans = () => {
  const dispatch = useDispatch();
  const { pendingLoans } = useSelector(state => state.loans);
  const { customers } = useSelector(state => state.customers);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchLoans());
    dispatch(fetchCustomers());
  }, [dispatch]);

  const highValueLoans = pendingLoans.filter(l => l.amount > LOAN_APPROVAL_LIMIT);

  const handleApprove = (loan) => {
    const customer = customers.find(c => c.userId === loan.customerId);
    if (customer) {
      dispatch(approveLoan({ id: loan.id, approvedBy: 'manager', approvedById: user.uid }));
      dispatch(updateCustomer({ 
        customerId: customer.id, 
        updateData: { balance: customer.balance + loan.amount } 
      }));
      toast.success('High-value loan approved!');
    }
  };

  const handleReject = (loan) => {
    dispatch(rejectLoan({ id: loan.id, reason: 'Rejected by manager' }));
    toast.info('Loan rejected');
  };

  return (
    <Container fluid>
      <h2 className="mb-4">High-Value Loan Requests (Above 1,000,000)</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <Table striped bordered hover>
            <thead><tr><th>Customer</th><th>Amount</th><th>Purpose</th><th>Date</th><th>Action</th></tr></thead>
            <tbody>
              {highValueLoans.map(loan => (
                <tr key={loan.id}>
                  <td>{loan.customerName}</td>
                  <td>{formatCurrency(loan.amount)}</td>
                  <td>{loan.purpose}</td>
                  <td>{formatDate(loan.createdAt)}</td>
                  <td>
                    <Button variant="success" size="sm" className="me-2" onClick={() => handleApprove(loan)}>Approve</Button>
                    <Button variant="danger" size="sm" onClick={() => handleReject(loan)}>Reject</Button>
                  </td>
                </tr>
              ))}
              {highValueLoans.length === 0 && (
                <tr><td colSpan={5} className="text-center">No high-value pending loans</td></tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HighValueLoans;