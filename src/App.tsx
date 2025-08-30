import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ColorInspiration from './components/ColorInspiration';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import FAQ from './components/FAQ';
import Brands from './components/Brands';
import SocialMedia from './components/SocialMedia';
import Footer from './components/Footer';

const HomePage = () => (
  <>
    <Hero />
    <Services />
    <ColorInspiration />
    <FAQ />
    <Brands />
    <SocialMedia />
  </>
);

function App() {
  return (
    <div className="min-h-screen">
      <Header /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/faq/:category" element={<FAQ />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;