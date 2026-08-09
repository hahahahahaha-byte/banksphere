import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import ManagerHome from '../components/manager/ManagerDashboard';
import CustomerManagement from '../components/manager/CustomerManagement';
import EmployeeManagement from '../components/manager/EmployeeManagement';
import AddEmployeeForm from '../components/manager/AddEmployeeForm';
import HighValueLoans from '../components/manager/HighValueLoans';
import TransactionOversight from '../components/manager/TransactionOversight';

const ManagerDashboard = () => (
  <div className="d-flex">
    <Sidebar />
    <div style={{ marginLeft: '250px', width: '100%' }}>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route index element={<ManagerHome />} />
          <Route path="dashboard" element={<ManagerHome />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="employees" element={<EmployeeManagement />} />
          <Route path="add-employee" element={<AddEmployeeForm />} />
          <Route path="loans" element={<HighValueLoans />} />
          <Route path="transactions" element={<TransactionOversight />} />
          <Route path="bank-overview" element={<ManagerHome />} />
        </Routes>
      </div>
    </div>
  </div>
);

export default ManagerDashboard;