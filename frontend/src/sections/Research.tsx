import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';

export const publications = [
  {
    title: 'Unmasking Hair Loss Through a Fusion of Human Lifestyle Data Using Machine Learning Algorithms',
    type: 'IEEE Conference Paper',
    journal: 'International Conference on Advance Computational Intelligence, 2025',
    abstract: "This study combines real-time lifestyle data with machine learning algorithms like Random Forest, Decision Tree, XGBoost, Extra Trees, and Ensemble approaches to determine main causes of hair loss. We leverage Generative Adversarial Networks (GANs) for data augmentation and SMOTE for balancing the dataset, facilitating early detection, increasing predictive accuracy, and permitting tailored therapy suggestions.",
    tech: ['Python', 'Machine Learning', 'XGBoost', 'GANs', 'SMOTE'],
    pdf: '/hairloss.pdf'
  },
  {
    title: 'Exploring Machine Learning Techniques for Stroke Prediction and Prevention',
    type: 'Journal Paper',
    journal: 'Computer Research and Development, Volume 24 Issue 11, 2024 (Scopus & UGC Approved Journal)',
    abstract: 'Investigates the effectiveness of various machine learning classifiers for stroke prediction and prevention using a Kaggle dataset. Classifiers including Random Forest and Decision Trees achieved accuracies of 99.63% and 100%, significantly outperforming regression-based approaches. Feature selection and data balancing strategies were applied to maximize model performance.',
    tech: ['Python', 'Random Forest', 'SVM', 'Gradient Boosting', 'Neural Networks'],
    pdf: '/stroke.pdf'
  },
  {
    title: 'IoT Based Agricultural Monitoring and Alert System',
    type: 'Conference Paper',
    journal: '4th International Conference on Sentiment Analysis and Deep Learning (ICSADL 2025)',
    abstract: 'Implements an IoT-based Agricultural Monitoring & Alert System (AMAS) integrating multiple sensors to continuously monitor soil moisture, soil temperature, water levels, irrigation pump status, and water quality. The system enables farmers to make well-informed decisions, maximize resources, and enhance crop output in real time through precision farming practices.',
    tech: ['IoT', 'Sensors', 'Python', 'Real-time Monitoring'],
    pdf: '/iot.pdf'
  }
];


const Research = () => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>('');

  const openPdf = (pdf: string, title: string) => {
    setSelectedPdf(pdf);
    setSelectedTitle(title);
  };

  return (
    <section id="research" className="relative py-24 px-6">
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 font-sans">

        <div className="flex flex-col mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 font-sans font-semibold">05 / Science</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans">Research Publications</h2>
          <div className="h-[2px] w-12 bg-primary mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {publications.map((pub, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden group glow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full text-accent shadow-sm">
                    {pub.type}
                  </span>
                  <button
                    onClick={() => pub.pdf && openPdf(pub.pdf, pub.title)}
                    title={pub.pdf ? 'View Paper' : 'Paper not available'}
                    className={`transition-colors p-1.5 bg-white/5 border border-white/5 rounded-lg ${pub.pdf ? 'text-muted hover:text-white cursor-pointer' : 'text-white/20 cursor-not-allowed'}`}
                  >
                    <ExternalLink size={14} />
                  </button>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-primary-light transition-colors duration-300 font-sans">
                  {pub.title}
                </h3>
                <p className="text-xs text-primary-light font-semibold mb-4 italic">{pub.journal}</p>

                <p className="text-xs md:text-sm text-muted leading-relaxed mb-6 font-normal">
                  {pub.abstract}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
                  {pub.tech.map((t, i) => (
                    <span key={i} className="text-[10px] font-medium px-2.5 py-1 bg-white/5 rounded border border-white/5 text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPdf(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-5xl h-[90vh] flex flex-col gap-3"
              onClick={e => e.stopPropagation()}
            >
              {/* Header bar */}
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 backdrop-blur-md">
                <p className="text-white/70 text-xs font-medium truncate pr-4">{selectedTitle}</p>
                <button
                  onClick={() => setSelectedPdf(null)}
                  className="text-white/60 hover:text-white transition-colors shrink-0"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* PDF iframe */}
              <iframe
                src={selectedPdf}
                title={selectedTitle}
                className="w-full flex-1 rounded-xl border border-white/10 bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Research;
