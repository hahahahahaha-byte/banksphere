import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import EmployeeHome from '../components/employee/EmployeeDashboard';
import CustomerList from '../components/employee/CustomerList';
import CustomerDetails from '../components/employee/CustomerDetails';
import CreateCustomerForm from '../components/employee/CreateCustomerForm';
import LoanRequests from '../components/employee/LoanRequests';
import TransactionRequests from '../components/employee/TransactionRequests';

const EmployeeDashboard = () => {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', flex: 1, width: 'calc(100% - 250px)' }}>
        <Navbar />
        <div className="p-4" style={{ backgroundColor: '#f5f5f5', minHeight: 'calc(100vh - 56px)' }}>
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<EmployeeHome />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="customer/:id" element={<CustomerDetails />} />
            <Route path="create-customer" element={<CreateCustomerForm />} />
            <Route path="loans" element={<LoanRequests />} />
            <Route path="transactions" element={<TransactionRequests />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;