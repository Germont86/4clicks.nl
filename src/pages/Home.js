import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/4clickslogo1.png';
import Layout from './Layout.js';

const Home = () => {
  return (
    <Layout>
      <div style={{ position: 'relative', width: '100%', textAlign: 'center' }}>
        <Link to="/">
          <img src={logo} alt="4Clicks logo" style={{ width: '150px', marginBottom: '20px', cursor: 'pointer' }} />
        </Link>
        <div
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Link
            to="/products"
            style={{
              color: 'grey',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.2rem',
            }}
          >
            Products
          </Link>
          <Link
            to="/resources"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.2rem',
            }}
          >
            Resources
          </Link>
          <Link
            to="/objectives"
            style={{
              color: 'grey',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.2rem',
            }}
          >
            Objectives
          </Link>
          <Link
            to="/team"
            style={{
              color: 'grey',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.2rem',
            }}
          >
            Management Team
          </Link>
          <Link
            to="/vacancies"
            style={{
              color: 'grey',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.2rem',
            }}
          >
            Vacatures
          </Link>
          <Link
            to="/about-us"
            style={{
              color: 'grey',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.2rem',
            }}
          >
            About Us
          </Link>
          <Link
            to="/mapping-accounts"
            style={{
              color: 'grey',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1.2rem',
            }}
          >
            Match Rekeningschema
          </Link>
        </div>
      </div>

      <h1 style={{ fontFamily: 'Verdana', fontSize: '2rem' }}>Welkom bij 4Clicks</h1>
      <p style={{ fontSize: '1.2rem' }}>
        upload ➝ verify ➝ adjust ➝ generate = <strong>4Clicks</strong>
      </p>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
        <Link to="/mapping">
          <img src={logo} alt="Mapping" style={{ width: '100px' }} />
          <p style={{ color: '#fff' }}>Mapping UI</p>
        </Link>
        <Link to="/grafiek">
          <img src={logo} alt="Grafiek" style={{ width: '100px' }} />
          <p style={{ color: '#fff' }}>Grafiek</p>
        </Link>
        <Link to="/generate">
          <img src={logo} alt="Generate" style={{ width: '100px' }} />
          <p style={{ color: '#fff' }}>Generate</p>
        </Link>
        <Link to="/import-administrations">
          <img src={logo} alt="Importeren Administraties" style={{ width: '100px' }} />
          <p style={{ color: '#fff' }}>Importeren Administraties</p>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;