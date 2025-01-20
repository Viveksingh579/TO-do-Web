import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the import path if necessary

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/" />;
  }

  if (adminOnly && user.role !== 'admin') {
    // Redirect to tasks if the user is not an admin
    return <Navigate to="/tasks" />;
  }

  // Render the children if all checks pass
  return children;
};

export default ProtectedRoute;

