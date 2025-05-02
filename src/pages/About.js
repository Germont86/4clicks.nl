import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout.js';

const About = () => {
  return (
    <Layout>
      <h1>About Us</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
        <Link to="/about/objectives">
          <button style={{ padding: '0.5rem 1rem' }}>Objectives</button>
        </Link>
        <Link to="/about/team">
          <button style={{ padding: '0.5rem 1rem' }}>Management Team</button>
        </Link>
        <Link to="/about/vacancies">
          <button style={{ padding: '0.5rem 1rem' }}>Vacatures</button>
        </Link>
      </div>
    </Layout>
  );
};

export default About;