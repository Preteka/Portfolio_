import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col px-6 text-center font-sans">
      <h1 className="text-8xl font-black text-primary/40 tracking-widest font-sans">404</h1>
      <h2 className="text-2xl font-bold text-white mt-4 mb-2 font-sans">Page Not Found</h2>
      <p className="text-muted text-sm max-w-sm mb-8 leading-relaxed font-normal">
        The route you are trying to access does not exist or has been relocated out of development parameters.
      </p>
      
      <Link
        to="/"
        className="px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full text-xs shadow-glow-primary hover:shadow-glow-accent active:scale-95 transition-all flex items-center gap-2"
      >
        <ArrowLeft size={14} /> Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
