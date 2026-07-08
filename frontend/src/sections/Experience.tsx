import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase } from 'lucide-react';

const experiences = [
  {
    role: 'UI/UX Designer Intern',
    company: 'Zenthink Technologies',
    duration: '4 Months',
    points: [
      'Conducted user research and translated findings into wireframes and interactive prototypes for client interface designs.',
      'Designed intuitive, user-centered interfaces, applying usability principles to improve navigation and readability.',
      'Collaborated with the design team to iterate on mockups based on stakeholder and usability feedback.'
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 font-sans">
        
        <div className="flex flex-col mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 font-sans font-semibold">05 / Journey</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans">Experience</h2>
          <div className="h-[2px] w-12 bg-primary mt-4" />
        </div>

        <div className="max-w-4xl space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-12"
            >
              <div className="absolute left-0 top-1 p-2 bg-card border border-white/10 rounded-full text-primary shadow-md">
                <Briefcase size={12} />
              </div>

              <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white font-sans">{exp.role}</h3>
                    <p className="text-xs text-accent font-semibold">{exp.company}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-muted/80 bg-white/5 px-2.5 py-1 rounded-full border border-white/5 self-start">
                    <Calendar size={10} /> {exp.duration}
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx} className="text-xs md:text-sm text-muted leading-relaxed list-disc list-inside">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
