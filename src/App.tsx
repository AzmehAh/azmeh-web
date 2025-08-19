import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';

import InspirationGallery from './components/InspirationGallery';
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
   
      <InspirationGallery />
      <FAQ />
      <Brands />
      <SocialMedia />
      <Footer />
    </div>
  );
}

export default App;