import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/background.png';

const Layout = ({ children }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Header zonder blauwe achtergrond */}
      <header style={{ padding: '10px', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
        <Link to="/" style={{ position: 'absolute', top: '10px', left: '10px' }}>
          <button
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)', // Licht transparante witte achtergrond voor leesbaarheid
              color: '#007bff',
              border: 'none',
              borderRadius: '4px',
              padding: '5px 10px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            🏠 Terug naar Home
          </button>
        </Link>
      </header>

      {/* Main content */}
      <main style={{ marginTop: '60px', padding: '20px' }}>
        {children}
      </main>

      {/* Footer zonder blauwe achtergrond */}
      <footer style={{ padding: '10px', position: 'fixed', bottom: 0, width: '100%', textAlign: 'center' }}>
        <p style={{ color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'inline-block', padding: '5px 10px', borderRadius: '4px' }}>
          © 2025 RGS Frontend
        </p>
      </footer>
    </div>
  );
};

export default Layout;