import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X } from 'lucide-react';

export const certs = [
  { name: 'Data Fundamentals', issuer: 'IBM SkillBuild', date: '2025', image: '/ibm.png' },
  { name: 'AWS Educate Introduction to Cloud 101', issuer: 'AWS', date: '2025', image: '/aws.png' },
  { name: 'MySQL Implementation Certificated Associate', issuer: 'Oracle', date: '2025', image: '/oracle.png' },
  { name: 'Data Science for Engineers', issuer: 'NPTEL', date: '2025', image: '/nptel.png' },
  { name: 'GitHub Foundations', issuer: 'GitHub', date: '2025' },
  { name: 'Databricks Accredited Generarative AI Fundamentals', issuer: 'Databricks Academy', date: '2025', image: '/genai.png' },
  { name: 'Start the UX Design Process: Empathize, Define and Ideate', issuer: 'Coursera', date: '2025', image: '/uxdesign.png' },
  { name: 'Fundamentals of User Experience(UX) Design', issuer: 'Coursera', date: '2025', image: '/foundation.png' },
  { name: 'Digital Skills: User Experience', issuer: 'Accenture', date: '2025', image: '/accenture.png' }
];

const Certifications = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="certifications" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 font-sans">

        <div className="flex flex-col mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 font-sans font-semibold">06 / Accreditations</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans">Certifications</h2>
          <div className="h-[2px] w-12 bg-primary mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 font-sans">
          {certs.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => cert.image && setSelectedImage(cert.image)}
              className={`glass-panel p-6 rounded-2xl flex flex-col gap-4 group hover:border-primary/30 transition-all border border-white/5 ${cert.image ? 'cursor-pointer' : ''}`}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/5 rounded-xl text-purple-400 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                <Award size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-2 leading-snug">{cert.name}</h4>
                <p className="text-[11px] text-muted font-medium mb-1">{cert.issuer}</p>
                {cert.date && <p className="text-[10px] text-muted/60">{cert.date}</p>}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
                aria-label="Close modal"
              >
                <X size={32} />
              </button>
              <img
                src={selectedImage}
                alt="Certificate"
                className="rounded-lg max-h-[85vh] w-auto object-contain border border-white/10 shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
