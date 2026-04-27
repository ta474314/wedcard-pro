import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = ({ variant = 'default' }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirm = window.confirm('Are you sure you want to logout?');
    if (confirm) {
      await logout();
      navigate('/login');
    }
  };

  if (variant === 'icon') {
    return (
      <button onClick={handleLogout} className="logout-icon-btn" title="Logout">
        <FaSignOutAlt />
      </button>
    );
  }

  if (variant === 'text') {
    return (
      <button onClick={handleLogout} className="logout-text-btn">
        Logout
      </button>
    );
  }

  return (
    <button onClick={handleLogout} className="logout-default-btn">
      <FaSignOutAlt />
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;