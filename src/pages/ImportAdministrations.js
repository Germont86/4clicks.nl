import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseStringPromise } from 'xml2js';
import Layout from './Layout';

const ImportAdministrations = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [saldi, setSaldi] = useState([]);
  const [rgsSaldi, setRgsSaldi] = useState([]);
  const [error, setError] = useState(null);
  const [isMappingComplete, setIsMappingComplete] = useState(false);
  const [importedYears, setImportedYears] = useState([]);
  const [currentFiscalYear, setCurrentFiscalYear] = useState(null);
  const [importSuccess, setImportSuccess] = useState(false);

  // Controleer of de mapping 100% is afgerond en laad geïmporteerde boekjaren
  useEffect(() => {
    const koppelingen = JSON.parse(localStorage.getItem('koppelingen')) || {};
    const eigenRekeningen = JSON.parse(localStorage.getItem('eigenRekeningen')) || [];
    const totalRekeningen = eigenRekeningen.length;
    const gekoppeldeRekeningen = Object.keys(koppelingen).length;
    const mappingComplete = totalRekeningen > 0 && gekoppeldeRekeningen === totalRekeningen;
    setIsMappingComplete(mappingComplete);

    const savedImportedYears = JSON.parse(localStorage.getItem('importedYears')) || [];
    setImportedYears(savedImportedYears);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
    setImportSuccess(false);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Selecteer een auditfile!');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;

        try {
          // Parse de XML
          const result = await parseStringPromise(text, { explicitArray: false });
          const glAccounts = result?.auditfile?.company?.glAccounts?.glAccount || [];
          const fiscalYear = result?.auditfile?.company?.fiscalYear || 'Onbekend';

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

          setSaldi(parsedSaldi);
          setCurrentFiscalYear(fiscalYear);

          // Laad mappings en eigen rekeningen
          const koppelingen = JSON.parse(localStorage.getItem('koppelingen')) || {};
          const eigenRekeningen = JSON.parse(localStorage.getItem('eigenRekeningen')) || [];
          const rgsCodes = JSON.parse(localStorage.getItem('rgsCodes')) || [];

          // Koppel de saldi aan de RGS-rekeningen
          const updatedRgsSaldi = rgsCodes.map((rgs) => {
            const matchedRekening = Object.keys(koppelingen).find(
              (key) => koppelingen[key] === rgs.omschrijving
            );
            if (matchedRekening) {
              const rekening = eigenRekeningen.find((r) => r.id.toString() === matchedRekening);
              if (rekening) {
                const code = rekening.naam.split(' - ')[0];
                const matchingSaldo = parsed...

Er is iets misgegaan. Vernieuw om opnieuw verbinding te maken of probeer het opnieuw.