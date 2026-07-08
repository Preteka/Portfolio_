import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navItems = [
  { name: 'Home', href: 'home' },
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Research', href: 'research' },
  { name: 'Experience', href: 'experience' },
  { name: 'Certifications', href: 'certifications' },
  { name: 'Education', href: 'education' },
  { name: 'Contact', href: 'contact' }
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (location.pathname !== '/') return;

      const scrollPosition = window.scrollY + 200;

      for (const item of navItems) {
        const el = document.getElementById(item.href);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: href } });
    } else {
      const el = document.getElementById(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (location.pathname === '/' && location.state && (location.state as any).scrollTo) {
      const target = (location.state as any).scrollTo;
      window.history.replaceState({}, document.title);
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold font-sans tracking-wider flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-sm font-extrabold text-white transform group-hover:rotate-12 transition-transform duration-300">P</span>
          <span className="bg-gradient-to-r from-white to-muted bg-clip-text text-transparent group-hover:text-white transition-colors duration-300 font-extrabold">PRETEKA A T</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={`#${item.href}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-sm font-medium transition-colors relative py-1 ${location.pathname === '/' && activeSection === item.href
                      ? 'text-white'
                      : 'text-muted hover:text-white'
                    }`}
                >
                  {item.name}
                  {location.pathname === '/' && activeSection === item.href && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="/resume.pdf"
            download="Preteka_AT_Resume.pdf"
            className="flex items-center gap-1 text-xs font-semibold px-4 py-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 active:scale-95 transition-all text-white rounded-full shadow-glow-primary hover:shadow-glow-accent cursor-pointer"
          >
            Resume <ArrowUpRight size={14} />
          </a>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-muted hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full bg-background border-b border-white/5 backdrop-blur-lg"
          >
            <ul className="flex flex-col px-6 pb-6 pt-2 gap-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={`#${item.href}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block py-1 text-base font-medium transition-colors ${location.pathname === '/' && activeSection === item.href
                        ? 'text-primary'
                        : 'text-muted hover:text-white'
                      }`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="/resume.pdf"
                  download="Preteka_AT_Resume.pdf"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full text-sm w-full justify-center shadow-glow-primary"
                >
                  Download Resume <ArrowUpRight size={16} />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
