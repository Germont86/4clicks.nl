import React, { useState, useEffect } from 'react';

function MappingUI() {
  const [rekeningen, setRekeningen] = useState([]);
  const [rgsCodes, setRgsCodes] = useState([]);

  // Testdata voor rekeningen
  useEffect(() => {
    const testRekeningen = [
      { id: 1, code: '1000', naam: 'Bankrekening' },
      { id: 2, code: '1300', naam: 'Debiteuren' },
      { id: 3, code: '2000', naam: 'Omzet Producten' },
    ];
    setRekeningen(testRekeningen);
  }, []);

  // Testdata voor RGS-codes
  useEffect(() => {
    const testRgs = [
      { id: 1, code: 'B-AT-01', omschrijving: 'Liquide Middelen' },
      { id: 2, code: 'B-AV-02', omschrijving: 'Vaste Activa' },
      { id: 3, code: 'W-OM-03', omschrijving: 'Omzet Producten' },
    ];
    setRgsCodes(testRgs);
  }, []);

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      {/* Linker kolom: rekeningen */}
      <div style={{ flex: 1, padding: '10px', backgroundColor: '#f1f1f1' }}>
        <h3>Gebruiker rekeningen</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {rekeningen.map((rek) => (
            <li key={rek.id} style={{
              marginBottom: '8px',
              padding: '10px',
              backgroundColor: 'white',
              borderRadius: '6px',
              boxShadow: '0 0 4px rgba(0,0,0,0.1)'
            }}>
              {rek.code} - {rek.naam}
            </li>
          ))}
        </ul>
      </div>

      {/* Rechter kolom: RGS-codes */}
      <div style={{ flex: 1, padding: '10px', backgroundColor: '#e8f0ff' }}>
        <h3>Standaard RGS-codes</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {rgsCodes.map((rgs) => (
            <li key={rgs.id} style={{
              marginBottom: '8px',
              padding: '10px',
              backgroundColor: 'white',
              borderRadius: '6px',
              boxShadow: '0 0 4px rgba(0,0,0,0.1)'
            }}>
              {rgs.code} - {rgs.omschrijving}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MappingUI;
