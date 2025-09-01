import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const NavButton = ({ label, path, onClick, isLogout = false }) => (
    <button
      onClick={onClick ? onClick : () => navigate(path)}
      className={`nav-button ${isActive(path) ? 'nav-button-active' : ''} ${isLogout ? 'logout-btn' : ''}`}
      style={{
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        border: isLogout ? '1px solid var(--gray-light)' : 'none',
        background: isActive(path) ? 'var(--gradient-red)' : isLogout ? 'var(--white-pure)' : 'transparent',
        color: isActive(path) ? 'var(--white-pure)' : isLogout ? 'var(--red-primary)' : 'var(--gray-medium)',
        fontWeight: '500',
        fontSize: '0.9rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {label}
      {isActive(path) && (
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: '2px',
          background: 'var(--white-pure)'
        }} />
      )}
    </button>
  );

  return (
    <nav className="navbar-cstech">
      <div className="navbar-content">
        <div 
          onClick={() => navigate('/dashboard')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <Logo size="md" showText={true} />
        </div>
        
        {/* Desktop Navigation */}
        <div className="nav-links" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <NavButton
            label="Dashboard"
            path="/dashboard"
          />
          
          <NavButton
            label="Agents"
            path="/agents"
          />
          
          <NavButton
            label="Upload"
            path="/upload"
          />
          
          <NavButton
            label="Distribution"
            path="/distributed"
          />
          
          <NavButton
            label="Logout"
            onClick={handleLogout}
            isLogout={true}
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
          className="mobile-menu-btn"
        >
          <span style={{
            width: '24px',
            height: '2px',
            background: 'var(--gray-dark)',
            transition: 'all 0.3s ease'
          }} />
          <span style={{
            width: '24px',
            height: '2px',
            background: 'var(--gray-dark)',
            transition: 'all 0.3s ease'
          }} />
          <span style={{
            width: '24px',
            height: '2px',
            background: 'var(--gray-dark)',
            transition: 'all 0.3s ease'
          }} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="mobile-menu" style={{
        display: isMenuOpen ? 'flex' : 'none',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '1rem',
        background: 'var(--white-pure)',
        borderTop: '1px solid var(--gray-light)',
        boxShadow: 'var(--shadow-medium)'
      }}>
        <NavButton
          label="Dashboard"
          path="/dashboard"
          onClick={() => {
            navigate('/dashboard');
            setIsMenuOpen(false);
          }}
        />
        
        <NavButton
          label="Agents"
          path="/agents"
          onClick={() => {
            navigate('/agents');
            setIsMenuOpen(false);
          }}
        />
        
        <NavButton
          label="Upload"
          path="/upload"
          onClick={() => {
            navigate('/upload');
            setIsMenuOpen(false);
          }}
        />
        
        <NavButton
          label="Distribution"
          path="/distributed"
          onClick={() => {
            navigate('/distributed');
            setIsMenuOpen(false);
          }}
        />
        
        <NavButton
          label="Logout"
          onClick={() => {
            handleLogout();
            setIsMenuOpen(false);
          }}
          isLogout={true}
        />
      </div>

      <style jsx>{`
        .nav-button:hover {
          background: ${isActive => isActive ? 'var(--gradient-red)' : 'var(--red-light)'} !important;
          color: ${isActive => isActive ? 'var(--white-pure)' : 'var(--red-primary)'} !important;
          transform: translateY(-1px);
          box-shadow: var(--shadow-light);
        }
        
        .logout-btn:hover {
          background: var(--red-light) !important;
          border-color: var(--red-primary) !important;
        }
        
        .nav-button-active:hover {
          background: var(--gradient-red) !important;
          color: var(--white-pure) !important;
        }
        
        @media (max-width: 768px) {
          .nav-links {
            display: none !important;
          }
          
          .mobile-menu-btn {
            display: flex !important;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;