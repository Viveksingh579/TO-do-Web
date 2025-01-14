import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as necessary

const AuthRoute = ({ element: Component, adminOnly = false, ...rest }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/tasks" />;
  }

  return <Route {...rest} element={Component} />;
};

export default AuthRoute;
