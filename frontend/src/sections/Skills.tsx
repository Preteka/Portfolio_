import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Database, Code, Sliders, Star } from 'lucide-react';

const skillCategories = [
  {
    title: 'Languages',
    icon: <Code className="text-purple-400" size={20} />,
    skills: ['JavaScript', 'Java', 'SQL']
  },
  {
    title: 'Frontend Development',
    icon: <Globe className="text-primary" size={20} />,
    skills: ['ReactJS', 'HTML5', 'CSS3', 'Responsive Web Design', 'UI/UX Prototyping', 'Wireframing', 'Mobile & Web Designing']
  },
  {
    title: 'Backend Systems',
    icon: <Server className="text-accent" size={20} />,
    skills: ['Express.js', 'REST APIs', 'System Design']
  },
  {
    title: 'Database & Storage',
    icon: <Database className="text-emerald-400" size={20} />,
    skills: ['Firebase', 'MySQL']
  },
  {
    title: 'Tools & Platforms',
    icon: <Sliders className="text-orange-400" size={20} />,
    skills: ['Git', 'Figma', 'VS Code', 'Framer Motion', 'Other AI Tools']
  },
  {
    title: 'Strengths',
    icon: <Star className="text-yellow-400" size={20} />,
    skills: ['Leadership', 'Adaptability', 'Team Collaboration', 'Analytical Problem-Solving', 'Communication', 'Time Management']
  }
];

const Skills = () => {
  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 font-sans">

        <div className="flex flex-col mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2">02 / Competencies</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans">Core Skills</h2>
          <div className="h-[2px] w-12 bg-primary mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden group glow-card"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl group-hover:scale-115 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-white font-sans">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-muted hover:text-white hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
