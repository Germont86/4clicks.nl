import React from 'react';
import { jsPDF } from 'jspdf';
import Layout from './Layout.js';

const GeneratePage = () => {
  const downloadPdf = () => {
    // Maak een nieuwe PDF met jsPDF
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Gekoppelde Rekeningen Rapport - 4Clicks', 10, 10);

    // Voorbeeldgegevens (vervang dit later door echte gegevens)
    const data = [
      { rekening: '1001', beschrijving: 'Kas', bedrag: 5000 },
      { rekening: '1002', beschrijving: 'Bank', bedrag: 12000 },
      { rekening: '2001', beschrijving: 'Crediteuren', bedrag: -3000 },
    ];

    // Voeg gegevens toe aan de PDF
    doc.setFontSize(12);
    data.forEach((item, index) => {
      const yPosition = 30 + index * 10;
      doc.text(
        `Rekening: ${item.rekening}, Beschrijving: ${item.beschrijving}, Bedrag: €${item.bedrag}`,
        10,
        yPosition
      );
    });

    // Download de PDF
    doc.save('gekoppelde_rekeningen.pdf');
  };

  return (
    <Layout>
      <h2>Generate PDF</h2>
      <button
        onClick={downloadPdf}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        📄 Download PDF
      </button>
    </Layout>
  );
};

export default GeneratePage;