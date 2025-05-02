import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseStringPromise } from 'xml2js'; // Gebruik de promise-versie van xml2js
import Layout from './Layout';

const ImportPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [saldi, setSaldi] = useState([]);
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null); // Nieuwe state voor foutmeldingen

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null); // Reset foutmelding bij het kiezen van een nieuw bestand
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Selecteer een auditfile!');
      return;
    }

    try {
      // Lees het bestand als tekst
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;

        try {
          // Parse de XML met xml2js
          const result = await parseStringPromise(text, { explicitArray: false });

          // Extraheer de grootboekrekeningen (glAccounts)
          const glAccounts = result?.auditfile?.company?.glAccounts?.glAccount || [];

          // Zet de grootboekrekeningen om in een array van objecten
          const parsedSaldi = Array.isArray(glAccounts)
            ? glAccounts.map((account) => ({
                code: account.code || '',
                description: account.description || '',
                balance: parseFloat(account.balance) || 0,
              }))
            : [
                {
                  code: glAccounts.code || '',
                  description: glAccounts.description || '',
                  balance: parseFloat(glAccounts.balance) || 0,
                },
              ];

          // Sla de geparste saldi op in de state
          setSaldi(parsedSaldi);
          setStep(2);
          setError(null); // Reset foutmelding bij succes
        } catch (parseError) {
          setError('Fout bij het parsen van de auditfile: ' + parseError.message);
        }
      };
      reader.onerror = () => {
        setError('Fout bij het lezen van het bestand.');
      };
      reader.readAsText(file);
    } catch (err) {
      setError('Er is een onverwachte fout opgetreden: ' + err.message);
    }
  };

  const handleConfirm = () => {
    localStorage.setItem('saldi', JSON.stringify(saldi));
    setStep(3);
  };

  return (
    <Layout>
      <h1>Auditfile Importeren</h1>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '8px' }}>
        {step === 1 && (
          <div>
            <h3>Stap 1: Upload de auditfile</h3>
            <input
              type="file"
              accept=".xml"
              onChange={handleFileChange}
              style={{ marginBottom: '20px' }}
            />
            {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
            <button
              onClick={handleUpload}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Uploaden
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3>Stap 2: Controleer de geïmporteerde saldi</h3>
            {saldi.length > 0 ? (
              <>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginBottom: '20px',
                    marginTop: '20px',
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          border: '1px solid #ccc',
                          padding: '10px',
                          backgroundColor: '#f2f2f2',
                        }}
                      >
                        Code
                      </th>
                      <th
                        style={{
                          border: '1px solid #ccc',
                          padding: '10px',
                          backgroundColor: '#f2f2f2',
                        }}
                      >
                        Omschrijving
                      </th>
                      <th
                        style={{
                          border: '1px solid #ccc',
                          padding: '10px',
                          backgroundColor: '#f2f2f2',
                        }}
                      >
                        Saldo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {saldi.map((saldo, index) => (
                      <tr key={index}>
                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{saldo.code}</td>
                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                          {saldo.description}
                        </td>
                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                          {saldo.balance.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={handleConfirm}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Bevestigen
                </button>
              </>
            ) : (
              <p>Geen saldi gevonden in de auditfile.</p>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <h3>Stap 3: Saldi succesvol geïmporteerd</h3>
            <p>De saldi zijn geïmporteerd. Je kunt nu de grafieken bekijken of een PDF genereren.</p>
            <button
              onClick={() => navigate('/grafiek')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px',
              }}
            >
              Naar Grafieken
            </button>
            <button
              onClick={() => navigate('/generate')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Naar PDF
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ImportPage;