import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ColorInspiration from './components/ColorInspiration';

import FAQ from './components/FAQ';
import Brands from './components/Brands';
import SocialMedia from './components/SocialMedia';
import Footer from './components/Footer';

function App() {
  return (
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
  );
}

export default App;