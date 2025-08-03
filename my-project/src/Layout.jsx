// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './pages/Navbar';
import AuthRedirect from './AuthChecker';

const Layout = () => {
  return (
    <AuthRedirect>
      <div className="app-container">
        <Navbar />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </AuthRedirect>
  );
};

export default Layout;