import React from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Research from '../sections/Research';
import Experience from '../sections/Experience';
import Certifications from '../sections/Certifications';
import Education from '../sections/Education';
import Contact from '../sections/Contact';

const Home = () => {
  return (
    <div className="relative">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Research />
      <Experience />
      <Certifications />
      <Education />
      <Contact />
    </div>
  );
};

export default Home;
