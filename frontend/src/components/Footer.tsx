import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/stats`)
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          setVisitorCount(data.count);
        }
      })
      .catch(err => console.error('Error fetching view metrics:', err));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socials = [
    { icon: <Github size={18} />, url: 'https://github.com/Preteka', label: 'GitHub' },
    { icon: <Linkedin size={18} />, url: 'https://linkedin.com/in/preteka-a-t', label: 'LinkedIn' },
    { icon: <Mail size={18} />, url: 'mailto:pretekaa@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative bg-background border-t border-white/5 py-12 px-6 md:px-8 mt-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold bg-gradient-to-r from-white via-muted to-muted bg-clip-text text-transparent">
            Designed & Developed by Preteka
          </p>
          <p className="text-xs text-muted/60 mt-1">
            © {new Date().getFullYear()} All rights reserved. Built with Vite, React, TS, Tailwind and Express.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target={social.url.startsWith('mailto') ? '_self' : '_blank'}
                rel={social.url.startsWith('mailto') ? '' : 'noopener noreferrer'}
                aria-label={social.label}
                className="p-2.5 rounded-full bg-card border border-white/5 hover:border-primary/50 text-muted hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {visitorCount !== null && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-accent font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Visitor #{visitorCount}
            </div>
          )}
        </div>

        <button
          onClick={scrollToTop}
          className="p-3 bg-card border border-white/5 hover:border-primary hover:bg-primary/5 hover:text-white rounded-full text-muted transition-all duration-300 group shadow-md"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} className="transform group-hover:-translate-y-1 transition-transform duration-300" />
        </button>

      </div>
    </footer>
  );
};

export default Footer;
