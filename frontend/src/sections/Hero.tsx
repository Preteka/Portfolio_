import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Mail, Download, Code2, Figma, Globe, Cpu } from 'lucide-react';
import { FaReact, FaNodeJs, FaJava } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiTailwindcss, SiPython } from 'react-icons/si';

const roles = ['Frontend Developer', 'UI/UX Designer', 'Full Stack Developer', 'ML Researcher'];

const floatingIcons = [
  { icon: <FaReact size={22} />, label: 'React', color: 'text-cyan-400', x: '8%', y: '22%', delay: 0 },
  { icon: <SiTypescript size={18} />, label: 'TypeScript', color: 'text-blue-400', x: '88%', y: '18%', delay: 1.2 },
  { icon: <FaNodeJs size={22} />, label: 'Node.js', color: 'text-emerald-400', x: '5%', y: '65%', delay: 0.8 },
  { icon: <SiPython size={20} />, label: 'Python', color: 'text-yellow-400', x: '90%', y: '62%', delay: 1.8 },
  { icon: <SiMongodb size={18} />, label: 'MongoDB', color: 'text-green-400', x: '12%', y: '80%', delay: 2.2 },
  { icon: <Figma size={18} />, label: 'Figma', color: 'text-pink-400', x: '85%', y: '80%', delay: 0.5 },
  { icon: <FaJava size={20} />, label: 'Java', color: 'text-orange-400', x: '80%', y: '35%', delay: 1.5 },
  { icon: <SiTailwindcss size={18} />, label: 'Tailwind', color: 'text-sky-400', x: '15%', y: '40%', delay: 2.8 },
];

const stats = [
  { label: 'Projects Built', value: '5+' },
  { label: 'Research Papers', value: '3' },
  { label: 'Certifications', value: '9+' },
];

const Hero = () => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIdx];
    if (!isDeleting) {
      if (charIdx < current.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        }, 60);
      } else {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), 1800);
      }
    } else {
      if (charIdx > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        }, 35);
      } else {
        setIsDeleting(false);
        setRoleIdx(r => (r + 1) % roles.length);
      }
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [charIdx, isDeleting, roleIdx]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 100 } }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-6">

      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[140px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[160px] animate-pulse pointer-events-none" />
      <div className="absolute top-[60%] left-[10%] w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Floating tech badges */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute hidden lg:flex flex-col items-center gap-1.5 pointer-events-none select-none`}
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: item.delay }}
        >
          <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm ${item.color} shadow-lg`}>
            {item.icon}
          </div>
          <span className="text-[9px] font-semibold text-white/30 tracking-wider uppercase">{item.label}</span>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative max-w-4xl mx-auto text-center z-10 w-full font-sans">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >

          {/* Status badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 text-xs text-accent font-semibold tracking-wide uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for Opportunities
          </motion.div>

          {/* Greeting */}
          <motion.p variants={itemVariants} className="text-muted text-sm md:text-base font-semibold tracking-widest uppercase mb-3">
            Hello, I'm
          </motion.p>

          {/* Name with gradient */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-9xl font-black tracking-tight mb-5 font-sans"
          >
            <span className="bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent">
              PRETEKA A T
            </span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div variants={itemVariants} className="h-10 mb-6 flex items-center justify-center">
            <h2 className="text-xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent">
              {displayed}
              <span className="animate-pulse text-primary ml-0.5">|</span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-muted text-sm md:text-base leading-relaxed mb-8 font-normal"
          >
            I craft responsive, pixel-perfect web applications with clean code, modern technologies,
            and thoughtful user experiences — blending design intuition with engineering precision.
          </motion.p>

          {/* Stats bar */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 md:gap-10 mb-10 py-4 px-8 rounded-2xl bg-white/3 border border-white/8 backdrop-blur-sm"
          >
            {stats.map((stat, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-xl md:text-2xl font-black text-white">{stat.value}</span>
                  <span className="text-[10px] text-muted uppercase tracking-wider font-medium">{stat.label}</span>
                </div>
                {i < stats.length - 1 && <div className="h-8 w-px bg-white/10" />}
              </React.Fragment>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo('projects')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full shadow-glow-primary hover:shadow-glow-accent hover:opacity-90 active:scale-95 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              View Projects <ArrowDown size={16} />
            </button>

            <a
              href="/resumee.pdf"
              download="Preteka_AT_Resume.pdf"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 active:scale-95 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              Download Resume <Download size={16} />
            </a>

            <button
              onClick={() => handleScrollTo('contact')}
              className="w-full sm:w-auto px-8 py-3.5 bg-card border border-white/5 text-muted hover:text-white rounded-full hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              Contact Me <Mail size={16} />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 cursor-pointer hover:opacity-70 transition-opacity"
        onClick={() => handleScrollTo('about')}
      >
        <span className="text-[10px] uppercase tracking-widest text-muted"></span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={14} className="text-white" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
