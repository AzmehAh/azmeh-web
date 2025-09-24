import React from 'react';
import AboutSection from './AboutSection';
import Values from './Values';
import Goals from './Goals';
import Founder from './Founder';
import CTA from './CTA';
import AboutFounderSection from './AboutFounderSection';


const About = () => {
  return (
    <div className="about-page">
      <AboutFounderSection />
      <Values /> 
      <Goals />
      <Founder />
      <CTA />
    </div>
  );
};

export default About;