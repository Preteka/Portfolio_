import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

export const projectsData = [
  {
    id: 'interior-sourcing',
    name: 'A Unified Platform for Interior Material Sourcing',
    brief: 'A full-stack e-commerce web application for a plywood store with a real-time cost-estimation module for interior material pricing. Includes product catalog, cart, and checkout flow.',
    category: 'Full Stack',
    stack: ['React.js', 'Node.js', 'Express.js', 'Firebase', 'HTML', 'CSS', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/Preteka/FINAL-SEM-PROJECT',
    live: 'https://final-sem-project-ut7u.vercel.app'
  },
  {
    id: 'agro-center',
    name: 'Digital Platform for Agro Center',
    brief: 'A full-stack marketplace web application connecting farmers directly with agricultural product and equipment vendors, removing intermediaries from the procurement process.',
    category: 'Full Stack',
    stack: ['React.js', 'Node.js', 'Firebase', 'HTML', 'CSS', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/Preteka/Digital_Platform_Agro_center',
    live: ''
  },
  {
    id: 'collaborative-cart',
    name: 'Collaborative Shopping Cart',
    brief: 'A real-time collaborative shopping cart application enabling multiple users to add, update, and manage products in a shared cart with live synchronization.',
    category: 'Frontend',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/Preteka/Collaborative-Shopping-Cart',
    live: ''
  },
  {
    id: 'donorhub',
    name: 'DonorHub – Blood Donation Management App',
    brief: 'A mobile application helping connect blood donors with people in need during emergencies. Users can register as donors, search by blood group, and submit blood requests.',
    category: 'Mobile App',
    stack: ['Flutter', 'Dart', 'Firebase'],
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/Preteka/Donar_Hub',
    live: ''
  },
  {
    id: 'inventory-app',
    name: 'Inventory Management Mobile App',
    brief: 'A mobile app built for a local rice shop to digitize inventory operations. Enables product tracking, real-time stock updates, and replaces manual record-keeping with a centralized digital solution.',
    category: 'Mobile App',
    stack: ['Flutter', 'Dart', 'Firebase', 'Cloud Firestore', 'Figma'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/Preteka/FLUTTER-INVENTORY-MANAGMENT-APP',
    live: ''
  },
  {
    id: 'uiux-projects',
    name: 'UI/UX Design Projects Collection',
    brief: 'A collection of UI/UX design projects including a food delivery app, real-time chat app, food donation platform, email templates, login interfaces, and interactive hover animations.',
    category: 'UI/UX',
    stack: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Wireframing'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
    github: 'https://github.com/Preteka/UI-UX-Project',
    live: ''
  }
];

const categories = ['All', 'Full Stack', 'Frontend', 'Mobile App', 'UI/UX'];


const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 font-sans">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 font-sans">03 / Works</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans">Featured Projects</h2>
            <div className="h-[2px] w-12 bg-primary mt-4" />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-primary text-white border-primary shadow-glow-primary'
                    : 'bg-card border-white/5 text-muted hover:text-white hover:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="glass-panel group rounded-3xl overflow-hidden relative glow-card flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden bg-zinc-950">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/45 to-transparent" />
                  <span className="absolute top-4 right-4 text-[10px] font-bold tracking-widest uppercase bg-primary px-3 py-1 rounded-full text-white shadow-md">
                    {project.category}
                  </span>
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-light transition-colors duration-300">{project.name}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-6 flex-grow">{project.brief}</p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.stack.map((st, i) => (
                      <span key={i} className="text-[10px] font-medium px-2.5 py-1 bg-white/5 rounded border border-white/5 text-muted">
                        {st}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                    <div className="flex items-center gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
                      >
                        <Github size={16} /> Code
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="text-muted hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
                        >
                          <ExternalLink size={16} /> Live
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => navigate(`/project/${project.id}`)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-accent transition-colors cursor-pointer group/btn"
                    >
                      Case Study <ArrowRight size={14} className="transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
