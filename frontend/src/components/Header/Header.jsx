import './Header.css';
import React from "react";
import logo from '../../assets/logo.webp';
import logogrooming from '../../assets/logogrooming.jpeg';
import homepagelogo from '../../assets/homepagelogo.png';
import logohandyman from '../../assets/logohandyman.jpeg';
import { useNavigate, useLocation } from 'react-router-dom';

function Header({ isLoggedIn, onLogout, blueHeader, className = "" }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to services section on home page
  const handleServicesClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      // Wait for navigation, then scroll
      setTimeout(() => {
        const el = document.getElementById('services-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById('services-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Use grooming logo only for GroomingAppointment (header-pink)
  const isGroomingHeader = className.includes('header-pink');
  const isHomeRepairPage = location.pathname === "/dashboard/repairs";
  const headerClass = `header${blueHeader ? ' header-blue' : ''}${className ? ' ' + className : ''}${isHomeRepairPage ? ' header-green' : ''}${isHomeRepairPage ? '' : (className.includes('header-violet') ? ' header-violet' : '')}`;

  return (
    <header className={headerClass}>
      <div className="logo-section">
        <img src={location.pathname === '/' ? homepagelogo : ((location.pathname === '/contact' || location.pathname === '/about') ? homepagelogo : (isGroomingHeader ? logogrooming : (isHomeRepairPage ? logohandyman : logo)))} alt="Logo" className="logogrooming" style={{width: '50px', height: '50px'}} />
        <span className="brand">SyncUniServe</span>
      </div>
      <nav className="navbar">
        <a href="/">Home</a>
        <a href="#services-section" onClick={handleServicesClick} style={{ cursor: 'pointer' }}>Services</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        {isLoggedIn && (
          <a href="/appointments" className="create-account-btn" style={{ marginRight: '0.5rem' }}>My Appointments</a>
        )}
        {!isLoggedIn ? (
          <a href="/create-account" className="create-account-btn">Create Account</a>
        ) : (
          <button className="create-account-btn" onClick={onLogout}>Logout</button>
        )}
      </nav>
    </header>
  );
}

export default Header; 