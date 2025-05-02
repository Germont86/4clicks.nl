import React from 'react';
import Layout from './Layout';

const Vacancies = () => {
  return (
    <Layout>
      <h1>Vacatures</h1>
      <p>Op dit moment zijn er 3 vacatures:</p>
      <ul style={{ textAlign: 'center', listStylePosition: 'inside', margin: '1rem 0' }}>
        <li>Marketing Manager</li>
        <li>Sales Manager</li>
        <li>Account Manager</li>
      </ul>
      <p>
        Bel <a href="tel:+31641207682" style={{ color: '#FFA000', textDecoration: 'none' }}>06-41207682</a> voor meer
        informatie.
      </p>
    </Layout>
  );
};

export default Vacancies;