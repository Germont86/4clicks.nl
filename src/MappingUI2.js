import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Layout from './pages/Layout';

const MappingUI2 = () => {
  const navigate = useNavigate();

  const [eigenRekeningen, setEigenRekeningen] = useState(() => {
    const savedRekeningen = localStorage.getItem('eigenRekeningen');
    return savedRekeningen ? JSON.parse(savedRekeningen) : [];
  });

  const [rgsCodes, setRgsCodes] = useState([
    { id: "B", omschrijving: "BALANS", niveau: 1 },
    { id: "BIva", omschrijving: "Immateriële vaste activa", niveau: 2, parent: "B" },
    { id: "BIvaKou", omschrijving: "Kosten van oprichting en van uitgifte van aandelen", niveau: 3, parent: "BIva" },
    { id: "BIvaKouVvp", omschrijving: "Verkrijgings- of vervaardigingsprijs kosten van oprichting en van uitgifte van aandelen", niveau: 4, parent: "BIvaKou" },
    { id: "BIvaKouAkp", omschrijving: "Actuele kostprijs kosten van oprichting en van uitgifte van aandelen", niveau: 4, parent: "BIvaKou" },
    { id: "BIvaKouCae", omschrijving: "Cumulatieve afschrijvingen en waardeverminderingen kosten van oprichting en van uitgifte van aandelen", niveau: 4, parent: "BIvaKou" },
    { id: "BIvaKouCuh", omschrijving: "Cumulatieve herwaarderingen kosten van oprichting en van uitgifte van aandelen", niveau: 4, parent: "BIvaKou" },
    { id: "BIvaKoo", omschrijving: "Kosten van ontwikkeling", niveau: 3, parent: "BIva" },
    { id: "BIvaKooVvp", omschrijving: "Verkrijgings- of vervaardigingsprijs kosten van ontwikkeling", niveau: 4, parent: "BIvaKoo" },
    { id: "BIvaKooAkp", omschrijving: "Actuele kostprijs kosten van ontwikkeling", niveau: 4, parent: "BIvaKoo" },
    { id: "BIvaKooCae", omschrijving: "Cumulatieve afschrijvingen en waardeverminderingen kosten van ontwikkeling", niveau: 4, parent: "BIvaKoo" },
    { id: "BIvaKooCuh", omschrijving: "Cumulatieve herwaarderingen kosten van ontwikkeling", niveau: 4, parent: "BIvaKoo" },
    { id: "BIvaCev", omschrijving: "Concessies, vergunningen en intellectuele eigendom", niveau: 3, parent: "BIva" },
    { id: "BIvaCevVvp", omschrijving: "Verkrijgings- of vervaardigingsprijs concessies, vergunningen en intellectuele eigendom", niveau: 4, parent: "BIvaCev" },
    { id: "BIvaCevAkp", omschrijving: "Actuele kostprijs concessies, vergunningen en intellectuele eigendom", niveau: 4, parent: "BIvaCev" },
    { id: "BIvaCevCae", omschrijving: "Cumulatieve afschrijvingen en waardeverminderingen concessies, vergunningen en intellectuele eigendom", niveau: 4, parent: "BIvaCev" },
    { id: "BIvaCevCuh", omschrijving: "Cumulatieve herwaarderingen concessies, vergunningen en intellectuele eigendom", niveau: 4, parent: "BIvaCev" },
    { id: "BIvaGoo", omschrijving: "Goodwill", niveau: 3, parent: "BIva" },
    { id: "BIvaGooVvp", omschrijving: "Verkrijgings--of vervaardigingsprijs goodwill", niveau: 4, parent: "BIvaGoo" },
    { id: "BIvaGooAkp", omschrijving: "Actuele kostprijs goodwill", niveau: 4, parent: "BIvaGoo" },
    { id: "BIvaGooCae", omschrijving: "Cumulatieve afschrijvingen en waardeverminderingen goodwill", niveau: 4, parent: "BIvaGoo" },
    { id: "BIvaGooCuh", omschrijving: "Cumulatieve herwaarderingen goodwill", niveau: 4, parent: "BIvaGoo" },
    { id: "BIvaVoi", omschrijving: "Vooruitbetalingen op immateriële vaste activa", niveau: 3, parent: "BIva" },
    { id: "BIvaVoiVvp", omschrijving: "Verkrijgings- of vervaardigingsprijs vooruitbetalingen op immateriële vaste activa", niveau: 4, parent: "BIvaVoi" },
    { id: "BIvaVoiAkp", omschrijving: "Actuele kostprijs vooruitbetalingen op immateriële vaste activa", niveau: 4, parent: "BIvaVoi" },
    { id: "BIvaVoiCae", omschrijving: "Cumulatieve afschrijvingen en waardeverminderingen vooruitbetalingen op immateriële vaste activa", niveau: 4, parent: "BIvaVoi" },
    { id: "BIvaVoiCuh", omschrijving: "Cumulatieve herwaarderingen vooruitbetalingen op immateriële vaste activa", niveau: 4, parent: "BIvaVoi" },
    { id: "BTva", omschrijving: "Materiële vaste activa", niveau: 2, parent: "B" },
    { id: "BTvaBbt", omschrijving: "Bedrijfsgebouwen en -terreinen", niveau: 3, parent: "BTva" },
    { id: "BTvaBbtVvp", omschrijving: "Verkrijgings- of vervaardigingsprijs bedrijfsgebouwen en -terreinen", niveau: 4, parent: "BTvaBbt" },
  ]);

  const [koppelingen, setKoppelingen] = useState(() => {
    const savedKoppelingen = localStorage.getItem('koppelingen');
    return savedKoppelingen ? JSON.parse(savedKoppelingen) : {};
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem('koppelingen', JSON.stringify(koppelingen));
    localStorage.setItem('eigenRekeningen', JSON.stringify(eigenRekeningen));
    localStorage.setItem('rgsCodes', JSON.stringify(rgsCodes));
  }, [koppelingen, eigenRekeningen, rgsCodes]);

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError('Selecteer een Excel-bestand!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const accounts = jsonData.map((row, index) => ({
          id: index + 1,
          naam: `${row.code || row.Code || ''} - ${row.description || row.Description || ''}`,
        }));
        setEigenRekeningen(accounts);
        setError(null);
      } catch (err) {
        setError('Fout bij het lezen van het Excel-bestand: ' + err.message);
      }
    };
    reader.onerror = () => {
      setError('Fout bij het lezen van het bestand.');
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (rekeningId, rgsOmschrijving) => {
    setKoppelingen((prev) => ({ ...prev, [rekeningId]: rgsOmschrijving }));
  };

  const handleClearAll = () => {
    setKoppelingen({});
    setEigenRekeningen([]);
    localStorage.removeItem('eigenRekeningen');
    localStorage.removeItem('koppelingen');
  };

  const handleExportTemplate = () => {
    const template = JSON.stringify(koppelingen, null, 2);
    const blob = new Blob([template], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mapping-template.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredRgsCodes = rgsCodes.filter(
    (rgs) =>
      rgs.omschrijving.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rgs.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRekeningen = eigenRekeningen.length;
  const gekoppeldeRekeningen = Object.keys(koppelingen).length;
  const mappingPercentage =
    totalRekeningen > 0 ? (gekoppeldeRekeningen / totalRekeningen) * 100 : 0;

  return (
    <Layout>
      <h1>Rekeningen Koppelen</h1>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '8px', margin: '20px' }}>
        <h3>Upload je rekeningschema (Excel)</h3>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleExcelUpload}
          style={{ marginBottom: '20px' }}
        />
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      </div>

      {eigenRekeningen.length > 0 && (
        <>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '8px', margin: '20px' }}>
            <h3>Mapping Voortgang: {mappingPercentage.toFixed(0)}%</h3>
            <div
              style={{
                width: '100%',
                backgroundColor: '#ddd',
                borderRadius: '4px',
                height: '20px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  width: `${mappingPercentage}%`,
                  backgroundColor: mappingPercentage === 100 ? '#28a745' : '#007bff',
                  height: '100%',
                  borderRadius: '4px',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', padding: '20px' }}>
            <div
              style={{
                flex: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '20px',
                borderRadius: '8px',
                marginRight: '20px',
                color: '#333',
              }}
            >
              <h3>Eigen rekeningen</h3>
              <button
                onClick={handleClearAll}
                style={{
                  marginBottom: '10px',
                  padding: '10px 20px',
                  backgroundColor: '#ff4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Disconnect All
              </button>
              <button
                onClick={handleExportTemplate}
                style={{
                  marginBottom: '10px',
                  marginLeft: '10px',
                  padding: '10px 20px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Export Template
              </button>
              {eigenRekeningen.map((rekening) => (
                <div
                  key={rekening.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('rekeningId', rekening.id)}
                  style={{
                    border: '1px solid gray',
                    padding: '10px',
                    marginBottom: '10px',
                    backgroundColor: '#f0f0f0',
                  }}
                >
                  {rekening.naam}
                  {koppelingen[rekening.id] && (
                    <div style={{ fontSize: '12px', color: 'green' }}>
                      Gekoppeld aan: {koppelingen[rekening.id]}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '20px',
                borderRadius: '8px',
                color: '#333',
              }}
            >
              <h3>RGS-codes</h3>
              <input
                type="text"
                placeholder="Zoek RGS-code of omschrijving..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '20px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
              {filteredRgsCodes.map((rgs) => (
                <div
                  key={rgs.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    const rekeningId = e.dataTransfer.getData('rekeningId');
                    handleDrop(rekeningId, rgs.omschrijving);
                  }}
                  style={{
                    border: '1px dashed black',
                    padding: '10px',
                    marginBottom: '10px',
                    marginLeft:
                      rgs.niveau === 2 ? '10px' : rgs.niveau === 3 ? '20px' : rgs.niveau === 4 ? '30px' : '0px',
                    backgroundColor: rgs.niveau === 1 ? '#e0e0e0' : '#ffffff',
                    fontWeight: rgs.niveau === 1 ? 'bold' : 'normal',
                  }}
                >
                  {rgs.id} - {rgs.omschrijving}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default MappingUI2;