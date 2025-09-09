import React from 'react';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import ProductsManager from './components/admin/ProductsManager';
import ContactMessages from './components/admin/ContactMessages';
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
import Contact from './components/Contact';
import JobApplication from './components/JobApplication';
import About from './ComponentAbout/About.tsx'; // تم إصلاح هذا السطر

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
  const location = useLocation();

  // Auto-scroll to top when navigating between pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Header /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/job-application" element={<JobApplication />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/systems" element={<Systems />} />
        <Route path="/bulletin/:id" element={<BulletinDetail />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/faq/:category" element={<FAQ />} />
        <Route path="/troubleshooting" element={<Troubleshooting />} />
        <Route path="/troubleshooting/:category" element={<Troubleshooting />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsManager />} />
          <Route path="messages" element={<ContactMessages />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;