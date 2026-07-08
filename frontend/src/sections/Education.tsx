import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const educations = [
  {
    degree: 'Master of Computer Application',
    institution: 'Kongu Engineering College, Erode',
    duration: '2024 - 2026',
    grade: 'CGPA: 8.5'
  },
  {
    degree: 'Bachelor of Computer Science',
    institution: 'Vellalar College for Women (Autonomous), Erode',
    duration: '2021 - 2024',
    grade: 'CGPA: 7.7'
  },
  {
    degree: 'All India Senior School Certificate Examination',
    institution: 'Bharathi Vidhya Bhavan School (CBSE), Tiruppur',
    duration: '2020 - 2021',
    grade: '81.3%'
  },
  {
    degree: 'All India Secondary School Examination',
    institution: 'Bharathi Vidhya Bhavan School (CBSE), Tiruppur',
    duration: '2018 - 2019',
    grade: '73.6%'
  }
];

const Education = () => {
  return (
    <section id="education" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 font-sans">
        
        <div className="flex flex-col mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 font-sans font-semibold">07 / Academic</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans">Education</h2>
          <div className="h-[2px] w-12 bg-primary mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {educations.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              className="glass-panel glass-panel-hover p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col sm:flex-row gap-6 border-white/5"
            >
              <div className="w-14 h-14 shrink-0 flex items-center justify-center bg-white/5 border border-white/5 rounded-2xl text-accent">
                <GraduationCap size={24} />
              </div>
              <div className="flex-grow">
                <h4 className="text-lg md:text-xl font-bold text-white font-sans">{edu.degree}</h4>
                <p className="text-sm text-muted/80 mt-1 mb-4">{edu.institution}</p>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted bg-white/5 px-3 py-1 rounded-md border border-white/5">{edu.duration}</span>
                  {edu.grade && (
                    <span className="text-xs font-bold text-primary-light bg-primary/10 px-3 py-1 rounded-md border border-primary/20">{edu.grade}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;
