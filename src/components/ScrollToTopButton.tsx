import React, { useState, useEffect } from 'react';


const ScrollToTopButton = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const calculateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    setScrollProgress(progress);
    setIsVisible(scrollTop > 300); 
  };

  useEffect(() => {
    window.addEventListener('scroll', calculateScrollProgress);
    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const strokeDashoffset = 283 - (283 * scrollProgress) / 100; // 283 هو محيط الدائرة (2πr)

  return (
    <button
      className={`scroll-progress-btn ${isVisible ? 'active' : ''}`}
      onClick={scrollToTop}
      aria-label="العودة إلى الأعلى"
    >
      <svg className="progress-circle" width="60" height="60">
        <circle className="bg" cx="30" cy="30" r="45%" />
        <circle
          className="progress"
          cx="30"
          cy="30"
          r="45%"
          style={{ strokeDashoffset }}
        />
      </svg>
      <span className="arrow">↑</span>
    </button>
  );
};

export default ScrollToTopButton;
