import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../features/auth/authSlice';
import { FiLogOut, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className="top-navbar">
      <div className="top-navbar-left">
        <button className="menu-toggle">
          <FiUser />
        </button>
        <span className="fw-semibold" style={{ color: 'var(--primary)' }}>
          {user?.role === 'customer'
            ? 'Customer Portal'
            : user?.role === 'employee'
            ? 'Employee Portal'
            : 'Manager Portal'}
        </span>
      </div>
      <div className="top-navbar-right">
        <div className="user-profile-trigger">
          <div className="user-avatar-circle">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="user-details">
            <div className="user-details-name">{user?.name || 'User'}</div>
            <div className="user-details-role">{user?.role}</div>
          </div>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <FiLogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;