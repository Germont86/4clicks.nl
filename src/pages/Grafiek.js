import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie, Line, Doughnut, Radar } from 'react-chartjs-2';
import Layout from './Layout.js';

// Registreer de benodigde onderdelen
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

// Gegevens voor de grafieken
const saldoData = {
  labels: ['Bankrekening', 'Debiteuren', 'Omzet'],
  datasets: [
    {
      label: 'Saldo (€)',
      data: [34000, 22000, 58000],
      backgroundColor: '#4CAF50',
    },
  ],
};

const inkomstenVerdelingData = {
  labels: ['Diensten', 'Producten', 'Overig'],
  datasets: [
    {
      label: 'Inkomsten (€)',
      data: [45000, 30000, 15000],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverOffset: 4,
    },
  ],
};

const last12MonthsData = {
  labels: [
    'Apr 2024', 'May 2024', 'Jun 2024', 'Jul 2024', 'Aug 2024', 'Sep 2024',
    'Oct 2024', 'Nov 2024', 'Dec 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025',
  ],
  datasets: [
    {
      label: 'Omzet (€)',
      data: [20000, 25000, 30000, 28000, 32000, 35000, 40000, 38000, 42000, 45000, 43000, 47000],
      borderColor: '#36A2EB',
      fill: false,
    },
  ],
};

// Gegevens voor de tabel (dezelfde als lijndiagram)
const tableData = last12MonthsData.labels.map((label, index) => ({
  month: label,
  omzet: last12MonthsData.datasets[0].data[index],
}));

const kostenVerdelingData = {
  labels: ['Personeel', 'Huur', 'Marketing', 'Overig'],
  datasets: [
    {
      label: 'Kosten (€)',
      data: [25000, 15000, 10000, 5000],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      hoverOffset: 4,
    },
  ],
};

const inkomstenVsUitgavenData = {
  labels: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'],
  datasets: [
    {
      label: 'Inkomsten (€)',
      data: [120000, 130000, 140000, 150000],
      backgroundColor: '#36A2EB',
    },
    {
      label: 'Uitgaven (€)',
      data: [90000, 95000, 100000, 110000],
      backgroundColor: '#FF6384',
    },
  ],
};

// Nieuwe grafieken
const prestatiesPerRegioData = {
  labels: ['Noord', 'Zuid', 'Oost', 'West', 'Centraal'],
  datasets: [
    {
      label: 'Omzet (€)',
      data: [30000, 25000, 40000, 35000, 32000],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: '#36A2EB',
      borderWidth: 1,
    },
  ],
};

const omzetPerProductData = {
  labels: ['2023', '2024', '2025'],
  datasets: [
    {
      label: 'Diensten',
      data: [50000, 55000, 60000],
      backgroundColor: '#FF6384',
    },
    {
      label: 'Producten',
      data: [30000, 35000, 40000],
      backgroundColor: '#36A2EB',
    },
    {
      label: 'Overig',
      data: [10000, 12000, 15000],
      backgroundColor: '#FFCE56',
    },
  ],
};

const uitgavenVerdelingData = {
  labels: ['Operationeel', 'Investeringen', 'Personeel'],
  datasets: [
    {
      label: 'Uitgaven (€)',
      data: [20000, 15000, 30000],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverOffset: 4,
    },
  ],
};

// Opties voor de grafieken
const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '📊 Saldo per Rekening',
    },
  },
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '🥧 Verdeling Inkomstenbronnen',
    },
  },
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '📈 Omzet Afgelopen 12 Maanden',
    },
  },
};

const donutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '🍩 Kostenverdeling per Categorie',
    },
  },
};

const comparisonOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '📊 Inkomsten vs Uitgaven per Kwartaal',
    },
  },
};

const radarOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '🕸️ Prestaties per Regio',
    },
  },
};

const stackedBarOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '📊 Omzet per Productcategorie',
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const extraPieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '🥧 Verdeling Uitgaven per Type',
    },
  },
};

const Grafiek = () => {
  return (
    <Layout>
      <h1>Financieel Overzicht</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', // 3 kolommen
          gap: '2rem',
          padding: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Rij 1 */}
        <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px' }}>
          <Bar data={saldoData} options={barOptions} />
        </div>
        <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px' }}>
          <Pie data={inkomstenVerdelingData} options={pieOptions} />
        </div>
        <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px' }}>
          <Line data={last12MonthsData} options={lineOptions} />
        </div>

        {/* Rij 2 */}
        <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px' }}>
          <Doughnut data={kostenVerdelingData} options={donutOptions} />
        </div>
        <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px' }}>
          <Bar data={inkomstenVsUitgavenData} options={comparisonOptions} />
        </div>
        <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px' }}>
          <Radar data={prestatiesPerRegioData} options={radarOptions} />
        </div>

        {/* Rij 3 */}
        <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px' }}>
          <Bar data={omzetPerProductData} options={stackedBarOptions} />
        </div>
        <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px' }}>
          <Pie data={uitgavenVerdelingData} options={extraPieOptions} />
        </div>
        <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px' }}>
          <h3>📋 Omzet Afgelopen 12 Maanden</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Maand</th>
                <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Omzet (€)</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{row.month}</td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{row.omzet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Grafiek;