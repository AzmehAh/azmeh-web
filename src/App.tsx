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
import SystemInfo from './components/SystemInfo';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen">
          <Header /> 
          <Hero />
          <Services />
          <ColorInspiration />
          <FAQ />
          <Brands />
          <SocialMedia />
          <Footer />
        </div>
      } />
      <Route path="/system" element={<SystemInfo />} />
    </Routes>
  );
}

export default App;