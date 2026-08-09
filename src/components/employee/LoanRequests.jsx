import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Button, Table, Badge } from 'react-bootstrap';
import { fetchLoans, approveLoan, rejectLoan } from '../../features/loans/loanSlice';
import { fetchCustomers } from '../../features/customers/customerSlice';
import { updateCustomer } from '../../features/customers/customerSlice';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { LOAN_APPROVAL_LIMIT } from '../../constants/roles';
import { toast } from 'react-toastify';

const LoanRequests = () => {
  const dispatch = useDispatch();
  const { pendingLoans } = useSelector(state => state.loans);
  const { customers } = useSelector(state => state.customers);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchLoans());
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleApprove = (loan) => {
    if (loan.amount > LOAN_APPROVAL_LIMIT) {
      toast.warning('This loan requires Manager approval');
      return;
    }

    const customer = customers.find(c => c.userId === loan.customerId);
    if (customer) {
      dispatch(approveLoan({ id: loan.id, approvedBy: 'employee', approvedById: user.uid }));
      dispatch(updateCustomer({ 
        customerId: customer.id, 
        updateData: { balance: customer.balance + loan.amount } 
      }));
      toast.success('Loan approved!');
    }
  };

  const handleReject = (loan) => {
    dispatch(rejectLoan({ id: loan.id, reason: 'Rejected by employee' }));
    toast.info('Loan rejected');
  };

  return (
    <Container fluid>
      <h2 className="mb-4">Pending Loan Requests</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <Table striped bordered hover>
            <thead><tr><th>Customer</th><th>Amount</th><th>Purpose</th><th>Date</th><th>Action</th></tr></thead>
            <tbody>
              {pendingLoans.map(loan => (
                <tr key={loan.id}>
                  <td>{loan.customerName}</td>
                  <td>{formatCurrency(loan.amount)}</td>
                  <td>{loan.purpose}</td>
                  <td>{formatDate(loan.createdAt)}</td>
                  <td>
                    {loan.amount <= LOAN_APPROVAL_LIMIT ? (
                      <>
                        <Button variant="success" size="sm" className="me-2" onClick={() => handleApprove(loan)}>Approve</Button>
                        <Button variant="danger" size="sm" onClick={() => handleReject(loan)}>Reject</Button>
                      </>
                    ) : (
                      <Badge bg="warning">Needs Manager Approval</Badge>
                    )}
                  </td>
                </tr>
              ))}
              {pendingLoans.length === 0 && (
                <tr><td colSpan={5} className="text-center">No pending loans</td></tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoanRequests;