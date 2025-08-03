// AuthRedirect.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthRedirect = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const protectedRoutes = ['/dashboard', '/admin'];
    
    if (protectedRoutes.includes(location.pathname) && !user) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [location, navigate]);

  return children;
};

export default AuthRedirect;