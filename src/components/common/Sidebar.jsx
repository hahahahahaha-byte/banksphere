import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FiHome,
  FiUsers,
  FiUserPlus,
  FiDollarSign,
  FiFileText,
  FiTrendingUp,
  FiSettings,
  FiActivity,
  FiBriefcase,
  FiEye,
} from 'react-icons/fi';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const customerLinks = [
    { to: '/customer/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { to: '/customer/transactions', icon: <FiActivity />, label: 'Transactions' },
    { to: '/customer/loans', icon: <FiDollarSign />, label: 'Loans' },
    { to: '/customer/deposit', icon: <FiTrendingUp />, label: 'Deposit' },
    { to: '/customer/withdraw', icon: <FiDollarSign />, label: 'Withdraw' },
    { to: '/customer/donation', icon: <FiFileText />, label: 'Donation/Zakat' },
    { to: '/customer/open-account', icon: <FiUserPlus />, label: 'Open Account' },
  ];

  const employeeLinks = [
    { to: '/employee/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { to: '/employee/customers', icon: <FiUsers />, label: 'Customers' },
    { to: '/employee/create-customer', icon: <FiUserPlus />, label: 'Create Customer' },
    { to: '/employee/loans', icon: <FiDollarSign />, label: 'Loan Requests' },
    { to: '/employee/transactions', icon: <FiActivity />, label: 'Transactions' },
  ];

  const managerLinks = [
    { to: '/manager/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { to: '/manager/customers', icon: <FiUsers />, label: 'All Customers' },
    { to: '/manager/employees', icon: <FiBriefcase />, label: 'Manage Employees' },
    { to: '/manager/loans', icon: <FiDollarSign />, label: 'High-Value Loans' },
    { to: '/manager/transactions', icon: <FiEye />, label: 'All Transactions' },
    { to: '/manager/bank-overview', icon: <FiSettings />, label: 'Bank Overview' },
  ];

  const links = role === 'customer' ? customerLinks : role === 'employee' ? employeeLinks : managerLinks;

  return (
    <div className="sidebar-container">
      <div className="sidebar-brand-section">
        <div className="sidebar-logo-wrapper">
          <img src="/banksphere.png" alt="BankSphere" className="sidebar-logo-img" />
        </div>
        <div className="sidebar-brand-name">BankSphere</div>
        <div className="sidebar-role-badge">{role} Portal</div>
      </div>
      <nav className="sidebar-nav">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `sidebar-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="sidebar-nav-icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">&copy; 2026 BankSphere</div>
    </div>
  );
};

export default Sidebar;