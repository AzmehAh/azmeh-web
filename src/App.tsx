import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ColorInspiration from './components/ColorInspiration';
import FAQ from './components/FAQ';
import Brands from './components/Brands';
import SocialMedia from './components/SocialMedia';
import Footer from './components/Footer';
import SystemDetail from './components/SystemDetail';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Services />
            <ColorInspiration />
            <FAQ />
            <Brands />
            <SocialMedia />
          </>
        } />
        <Route path="/system/:systemId" element={<SystemDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;