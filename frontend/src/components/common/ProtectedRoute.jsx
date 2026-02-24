import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Protects routes that require authentication and specific roles
const ProtectedRoute = ({ children, roles = [] }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to appropriate dashboard if role not authorized
  if (roles.length > 0 && !roles.includes(user?.role)) {
    const dashboardMap = {
      admin: '/admin',
      doctor: '/doctor',
      patient: '/patient',
    };
    return <Navigate to={dashboardMap[user?.role] || '/'} replace />;
  }

  return children;
};

export default ProtectedRoute;
