import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import CustomerHome from '../components/customer/CustomerDashboard';
import TransactionHistory from '../components/customer/TransactionHistory';
import LoanHistory from '../components/customer/LoanHistory';
import LoanRequestForm from '../components/customer/LoanRequestForm';
import DepositRequestForm from '../components/customer/DepositRequestForm';
import WithdrawRequestForm from '../components/customer/WithdrawRequestForm';
import DonationRequestForm from '../components/customer/DonationRequestForm';
import AccountRequestForm from '../components/customer/AccountRequestForm';
const CustomerDashboard = () => {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', flex: 1, width: 'calc(100% - 250px)' }}>
        <Navbar />
        <div className="p-4" style={{ backgroundColor: '#f5f5f5', minHeight: 'calc(100vh - 56px)' }}>
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<CustomerHome />} />
            <Route path="transactions" element={<TransactionHistory />} />
            <Route path="loans" element={<LoanHistory />} />
            <Route path="deposit" element={<DepositRequestForm />} />
            <Route path="withdraw" element={<WithdrawRequestForm />} />
            <Route path="donation" element={<DonationRequestForm />} />
            <Route path="request-loan" element={<LoanRequestForm />} />
            <Route path="open-account" element={<AccountRequestForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;