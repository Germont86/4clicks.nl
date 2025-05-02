import React from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom'; // Voor de knop-link

const Objectives = () => {
  return (
    <Layout>
      <h1>Onze Doelstellingen</h1>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '8px' }}>
        <h2>✅ Missie</h2>
        <p>
          "Administratiekantoren empoweren om sneller, slimmer en efficiënter jaarrekeningen en fiscale aangiftes te leveren
          met een intuïtieve, AI-gedreven tool die tijd bespaart en advies versterkt."
        </p>

        <h2>✅ Visie</h2>
        <p>
          "De standaard worden voor jaarrekeningen in Nederland door AI, fiscale precisie en gebruiksgemak te combineren in
          één platform dat kantoren en hun klanten dichter bij elkaar brengt."
        </p>

        <p>
          Met deze missie en visie richt je je op administratiekantoren die behoefte hebben aan automatisering, efficiëntie
          en betrouwbare rapportages. Jouw platform stelt hen in staat om met AI-ondersteunde tools sneller en accurater
          jaarrekeningen te verwerken, met een gebruiksvriendelijke interface en nauwkeurige fiscale berekeningen.
        </p>

        <h2>✅ Doelen voor het project</h2>
        <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li>Ontvangen van cijfers die gekoppeld zijn aan grootboekrekeningen (zoals uit Exact Online of andere boekhoudsoftware).</li>
          <li>Koppelen van deze rekeningen aan het standaard RGS-rekeningschema in je programma.</li>
          <li>Importeren van gegevens vanuit een auditfile, zoals rekeningen en cijfers, en deze matchen met het RGS-rekeningschema.</li>
          <li>Weergeven van de cijfers in een overzichtelijk dashboard.</li>
          <li>Genereren van rapporten in PDF-formaat.</li>
          <li>Het platform moet AI-gebaseerd zijn voor bijvoorbeeld automatische balanscontrole en fiscale berekeningen.</li>
          <li>Automatisering van administratieve processen om administratiekantoren sneller en efficiënter te maken en hen te ondersteunen bij rapportages.</li>
        </ul>

        <h2>✅ Fase 1</h2>
        <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li>Opzetten van de Flask-app met een werkende database.</li>
          <li>Upload-functionaliteit voor het importeren van bestanden (zoals auditfiles).</li>
          <li>Het RGS-rekeningschema in je app integreren en koppelen met de klantgegevens.</li>
        </ul>

        <h2>✅ Fase 2</h2>
        <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li>AI-checks toevoegen (bijv. balanscontrole, fiscale berekeningen).</li>
          <li>Dashboards ontwikkelen om de cijfers overzichtelijk te tonen.</li>
          <li>PDF-rapportages genereren van de gegevens en analyses.</li>
        </ul>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link
            to="/products"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
            }}
          >
            Voor meer informatie klik hier
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Objectives;