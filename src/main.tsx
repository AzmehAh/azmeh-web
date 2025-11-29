import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import './i18n/config';

// Custom scrollbar visibility handler
let scrollTimeout: number;
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }

  // Optional: Hide scrollbar after inactivity
  clearTimeout(scrollTimeout);
  scrollTimeout = window.setTimeout(() => {
    if (window.scrollY > 0) {
      // Keep it visible while scrolled
    }
  }, 1000);
}, { passive: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
