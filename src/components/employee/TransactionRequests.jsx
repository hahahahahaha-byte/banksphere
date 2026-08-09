import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Button, Table } from 'react-bootstrap';
import { fetchTransactions, updateTransactionStatus } from '../../features/transactions/transactionSlice';
import { fetchCustomers, updateCustomer } from '../../features/customers/customerSlice';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { toast } from 'react-toastify';

const TransactionRequests = () => {
  const dispatch = useDispatch();
  const { pendingTransactions } = useSelector(state => state.transactions);
  const { customers } = useSelector(state => state.customers);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleApprove = (transaction) => {
    const customer = customers.find(c => c.userId === transaction.customerId);
    if (!customer) return;

    let newBalance = customer.balance;
    if (transaction.type === 'deposit' || transaction.type === 'loan_disbursement') {
      newBalance += transaction.amount;
    } else if (transaction.type === 'withdraw') {
      if (customer.balance < transaction.amount) {
        toast.error('Insufficient balance');
        return;
      }
      newBalance -= transaction.amount;
    }

    dispatch(updateTransactionStatus({ id: transaction.id, status: 'approved', processedBy: user.uid }));
    dispatch(updateCustomer({ customerId: customer.id, updateData: { balance: newBalance } }));
    toast.success('Transaction approved!');
  };

  const handleReject = (transaction) => {
    dispatch(updateTransactionStatus({ id: transaction.id, status: 'rejected', processedBy: user.uid }));
    toast.info('Transaction rejected');
  };

  return (
    <Container fluid>
      <h2 className="mb-4">Pending Transaction Requests</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <Table striped bordered hover>
            <thead><tr><th>Customer</th><th>Type</th><th>Amount</th><th>Date</th><th>Action</th></tr></thead>
            <tbody>
              {pendingTransactions.map(t => (
                <tr key={t.id}>
                  <td>{t.customerName}</td>
                  <td className="text-capitalize">{t.type}</td>
                  <td>{formatCurrency(t.amount)}</td>
                  <td>{formatDate(t.createdAt)}</td>
                  <td>
                    <Button variant="success" size="sm" className="me-2" onClick={() => handleApprove(t)}>Approve</Button>
                    <Button variant="danger" size="sm" onClick={() => handleReject(t)}>Reject</Button>
                  </td>
                </tr>
              ))}
              {pendingTransactions.length === 0 && (
                <tr><td colSpan={5} className="text-center">No pending transactions</td></tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TransactionRequests;