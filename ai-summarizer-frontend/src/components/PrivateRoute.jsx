import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return user ? children : <Navigate to="/login" replace />;
}
