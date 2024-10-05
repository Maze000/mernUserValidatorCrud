import React from 'react'; 
import { Navigate } from 'react-router-dom';
import useToken from './AuthenticateToken';

const PrivateRoute = ({ children }) => {
  const { token } = useToken();
  const isAuthenticated = !!token;  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
