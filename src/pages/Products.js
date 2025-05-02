import React, { useState } from 'react';
import Layout from './Layout';

const Products = () => {
  const [showLink, setShowLink] = useState(false);

  const handleButtonClick = (product) => {
    if (product === '4Clicks') {
      setShowLink(true);
    } else {
      alert(`Je hebt op ${product} geklikt!`);
    }
  };

  return (
    <Layout>
      <h1>Producten</h1>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '8px' }}>
        <p>Kies een product om meer te zien:</p>
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px', justifyContent: 'center' }}>
          <button
            onClick={() => handleButtonClick('4Clicks')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            4Clicks
          </button>
          <button
            onClick={() => handleButtonClick('3Clicks')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            3Clicks
          </button>
          <button
            onClick={() => handleButtonClick('2Clicks')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            2Clicks
          </button>
        </div>

        {showLink && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <h2>4Clicks Pitch Deck</h2>
            <a
              href="/canva pitchdeck 4clicks.pdf"
              download="4Clicks_Pitch_Deck.pdf"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '4px',
              }}
            >
              Download Pitch Deck (PDF)
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;