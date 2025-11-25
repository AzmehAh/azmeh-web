import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';


import ProtectedRoute from './components/admin/ProtectedRoute';
import FAQManager from './components/admin/FAQManager';
import TroubleshootingManager from './components/admin/TroubleshootingManager';
import JobApplicationsManager from './components/admin/JobApplicationsManager';
import Dashboard from './components/admin/Dashboard';
import ProductsManager from './components/admin/ProductsManager';
import ProductCategoriesManager from './components/admin/ProductCategoriesManager';
import BulletinsManager from './components/admin/BulletinsManager';
import BulletinForm from './components/admin/BulletinForm';
import ProductForm from './components/admin/ProductForm';
;
import ProductFiltersManager from './components/admin/ProductFiltersManager';
import SystemCategoriesManager from './components/admin/SystemCategoriesManager';
import ContactMessages from './components/admin/ContactMessages';
import Services from './components/Services';
import ColorInspiration from './components/ColorInspiration';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Blog from './components/Blog';
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
import About from './ComponentAbout/About.tsx';
import  Layout from './Components/Layout.tsx';
import { auth } from './lib/auth';
import ScrollToTopButton from './components/ScrollToTopButton';
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
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await auth.isAuthenticated();
      setIsAdminAuthenticated(authenticated);
      setAuthChecked(true);
    };
    
    checkAuth();

    // Listen to auth state changes
    const { data: { subscription } } = auth.onAuthStateChange((user) => {
      setIsAdminAuthenticated(!!user);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  // Auto-scroll to top when navigating between pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Don't render anything until auth check is complete
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C5DB6]"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      {!location.pathname.startsWith('/admin') && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/job-application" element={<JobApplication />} />
      <Route path="/products" element={
    <Layout>
      <Products />
    </Layout>
  } />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/bulletin/:id" element={<BulletinDetail />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/faq/:category" element={<FAQ />} />
        <Route path="/troubleshooting" element={<Troubleshooting />} />
        <Route path="/troubleshooting/:category" element={<Troubleshooting />} />
        
        {/* Admin Routes */}
        <Route 
          path="/admin/login" 
          element={
            isAdminAuthenticated ? 
              <Navigate to="/admin" replace /> : 
              <AdminLogin onLogin={handleAdminLogin} />
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout onLogout={handleAdminLogout} />
            </ProtectedRoute>
          }
        > <Route path="bulletins/new" element={
    <ProtectedRoute>
      <BulletinForm />
    </ProtectedRoute>
  } />
  <Route path="bulletins/:id" element={
    <ProtectedRoute>
      <BulletinForm />
    </ProtectedRoute>
  } />
  <Route path="bulletins/:id/edit" element={
    <ProtectedRoute>
      <BulletinForm />
    </ProtectedRoute>
  } />

          
          <Route index element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="products" element={
            <ProtectedRoute>
              <ProductsManager />
              
            </ProtectedRoute>
            
          } />
           
          <Route path="categories" element={
            <ProtectedRoute>
              <ProductCategoriesManager />
            </ProtectedRoute>
          } />
          <Route path="product-filters" element={
            <ProtectedRoute>
              <ProductFiltersManager />
            </ProtectedRoute>
          } />
          <Route path="system-categories" element={
            <ProtectedRoute>
              <SystemCategoriesManager />
            </ProtectedRoute>
          } />
          <Route path="bulletins" element={
            <ProtectedRoute>
              <BulletinsManager />
            </ProtectedRoute>
          } />
       
        <Route 
          path="bulletins/new" 
          element={
            <ProtectedRoute>
              <BulletinForm />
            </ProtectedRoute>
          } 
        />
       
          <Route path="messages" element={
            <ProtectedRoute>
              <ContactMessages />
            </ProtectedRoute>
          } />
          <Route path="faq" element={
            <ProtectedRoute>
              <FAQManager />
            </ProtectedRoute>
          } />
          <Route path="troubleshooting" element={
            <ProtectedRoute>
              <TroubleshootingManager />
            </ProtectedRoute>
          } />
          <Route path="applications" element={
            <ProtectedRoute>
              <JobApplicationsManager />
            </ProtectedRoute>
          } />
          <Route path="products/new" element={
            <ProtectedRoute>
              <ProductForm />
            </ProtectedRoute>
          } />
          <Route path="products/:id" element={
            <ProtectedRoute>
              <ProductForm />
            </ProtectedRoute>
          } />
        </Route>
      </Routes> 
           {!location.pathname.startsWith('/admin') && <Footer />}

      {/* زر الرجوع إلى الأعلى يظهر فقط خارج لوحة التحكم */}
      {!location.pathname.startsWith('/admin') && <ScrollToTopButton />}
    </div>
  );
}


export default App;