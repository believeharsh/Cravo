import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-content">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}

export default Layout;