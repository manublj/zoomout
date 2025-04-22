import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header style={{ 
      backgroundColor: '#ff6600',
      padding: '4px'
    }}>
      <nav style={{ 
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '4px 8px',
        gap: '8px',
        fontSize: '14px',
        fontFamily: 'Verdana, Geneva, sans-serif'
      }}>
        <Link to="/timelines" style={{ color: '#000000', textDecoration: 'none' }}>
          Timelines
        </Link>
        <span style={{ color: '#000000' }}>|</span>
        <Link to="/wiki" style={{ color: '#000000', textDecoration: 'none' }}>
          Wiki
        </Link>
        <span style={{ color: '#000000' }}>|</span>
        <Link to="/structures" style={{ color: '#000000', textDecoration: 'none' }}>
          Structures
        </Link>
        <span style={{ color: '#000000' }}>|</span>
        <Link to="/contradictions" style={{ color: '#000000', textDecoration: 'none' }}>
          Contradictions
        </Link>
        <span style={{ color: '#000000' }}>|</span>
        <Link to="/struggles" style={{ color: '#000000', textDecoration: 'none' }}>
          Struggles
        </Link>
        <span style={{ color: '#000000' }}>|</span>
        <Link to="/reporting" style={{ color: '#000000', textDecoration: 'none' }}>
          wayback-Machine
        </Link>
        <span style={{ color: '#000000' }}>|</span>
        <Link to="/theory" style={{ color: '#000000', textDecoration: 'none' }}>
          Theory
        </Link>
        <span style={{ color: '#000000' }}>|</span>
        <Link to="/forms" style={{ color: '#000000', textDecoration: 'none' }}>
          Forms
        </Link>
      </nav>
    </header>
  );
};

export default Header;