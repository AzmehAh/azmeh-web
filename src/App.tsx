import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ColorInspiration from './components/ColorInspiration';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Systems from './components/Systems';
import BulletinDetail from './components/BulletinDetail';
import FAQ from './components/FAQ';
import Troubleshooting from './components/Troubleshooting';
import Brands from './components/Brands';
import AboutSection from './components/AboutSection';
import BlogSection from './components/BlogSection';
import SocialMedia from './components/SocialMedia';
import Footer from './components/Footer';
import About from './ComponentAbout/About.tsx'; // تم إصلاح هذا السطر
import Blog from './components/Blog';

const HomePage = () => ( 
  <>
    <Hero />
    <Services />
    <AboutSection />
    <ColorInspiration />
    <BlogSection />
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
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/systems" element={<Systems />} />
        <Route path="/bulletin/:id" element={<BulletinDetail />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/faq/:category" element={<FAQ />} />
        <Route path="/troubleshooting" element={<Troubleshooting />} />
        <Route path="/troubleshooting/:category" element={<Troubleshooting />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Blog />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;