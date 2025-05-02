import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GeneratePage from './pages/GeneratePage';
import Grafiek from './pages/Grafiek';
import MappingUI2 from './MappingUI2';
import ImportPage from './pages/ImportPage';
import About from './pages/About';
import Products from './pages/Products';
import Resources from './pages/Resources';
import Objectives from './pages/Objectives'; // Nieuwe import
import Team from './pages/Team'; // Nieuwe import
import Vacancies from './pages/Vacancies'; // Nieuwe import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/grafiek" element={<Grafiek />} />
        <Route path="/mapping" element={<MappingUI2 />} />
        <Route path="/import" element={<ImportPage />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/objectives" element={<Objectives />} /> {/* Nieuwe route */}
        <Route path="/team" element={<Team />} /> {/* Nieuwe route */}
        <Route path="/vacancies" element={<Vacancies />} /> {/* Nieuwe route */}
      </Routes>
    </Router>
  );
}

export default App;