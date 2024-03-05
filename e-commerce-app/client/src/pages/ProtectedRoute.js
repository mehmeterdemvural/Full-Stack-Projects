import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ element }) {
  const { loggedIn } = useAuth();
  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoute;
