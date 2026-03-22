import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, onLogout }) => {
  return (
    <div className="layout">
      <Navbar onLogout={onLogout} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
