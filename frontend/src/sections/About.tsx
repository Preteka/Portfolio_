import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, BookOpen, Layers } from 'lucide-react';
import { projectsData } from './Projects';
import { publications } from './Research';
import { certs } from './Certifications';

const About = () => {
  const stats = [
    {
      label: 'Projects Built',
      value: `${projectsData.length}`,
      icon: <Layers size={20} className="text-primary" />
    },
    {
      label: 'Research Papers',
      value: `${publications.length}`,
      icon: <BookOpen size={20} className="text-purple-400" />
    },
    {
      label: 'Certifications',
      value: `${certs.length}`,
      icon: <Award size={20} className="text-accent" />
    },
    {
      label: 'Technologies Used',
      value: '15+',
      icon: <User size={20} className="text-sky-300" />
    }
  ];

  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2">01 / Profile</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans">About Me</h2>
          <div className="h-[2px] w-12 bg-primary mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start font-sans">
          <div className="lg:col-span-7 space-y-6 text-muted text-base md:text-lg leading-relaxed">
            <p>
              I am <strong className="text-white font-semibold">Preteka A T</strong>, a fresher and MCA graduate with a CGPA of <strong className="text-white font-semibold">8.5</strong> from Kongu Engineering College, Perundurai. I am a passionate <strong className="text-white font-semibold">Full-Stack Developer</strong> with hands-on experience building and deploying production-style web applications.
            </p>
            <p>
              I specialize in <strong className="text-white font-semibold">ReactJS, Node.js, Express.js</strong>, and <strong className="text-white font-semibold">Firebase</strong>, combining strong frontend development skills with a UI/UX design background. I have a keen eye for creating responsive, pixel-perfect interfaces that balance both aesthetics and functionality.
            </p>
            <p>
              Beyond development, I have published <strong className="text-white font-semibold">three research papers</strong> in the domain of machine learning and IoT, demonstrating my commitment to bridging engineering with research. I am currently seeking a <strong className="text-white font-semibold">Frontend or Full-Stack Developer</strong> role to build impactful, user-centered web applications in a growth-oriented engineering team.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col items-start relative overflow-hidden group"
              >
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition-all duration-300" />
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-black text-white group-hover:text-primary-light transition-colors duration-300">{stat.value}</h3>
                <p className="text-sm text-muted mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
