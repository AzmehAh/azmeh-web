import React from 'react';
import AboutSection from './AboutSection';
import Values from './Values';
import Goals from './Goals';
import CTA from './CTA';
import AboutFounderSection from './AboutFounderSection';


const About = () => {
  return (
    <div className="about-page">
      <AboutFounderSection />
       <Goals />
      <Values /> 
   
    </div>
  ); 
};

export default About;