import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, MapPin, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ type: 'success', text: 'Message successfully sent! Confirmation email sent.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
        confetti({
          particleCount: 80,
          spread: 50,
          origin: { y: 0.8 }
        });
      } else {
        setStatus({ type: 'error', text: data.message || 'Transmission failed. Please review values.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', text: 'Server connection error. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 font-sans">
        
        <div className="flex flex-col mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 font-sans font-semibold">08 / Message</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans">Get In Touch</h2>
          <div className="h-[2px] w-12 bg-primary mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">Let's discuss an opportunity.</h3>
            <p className="text-muted text-sm md:text-base leading-relaxed font-normal">
              I am currently actively seeking full-time roles or internships as a Software Engineer and React Developer. If you're looking for a passionate and dedicated developer to join your team, I would love to hear from you.
            </p>

            <div className="space-y-4 pt-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-white/5">
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-primary">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] text-muted uppercase tracking-wider font-semibold">Email</h4>
                  <a href="mailto:pretekaa@gmail.com" className="text-sm text-white hover:text-primary transition-colors font-medium">pretekaa@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-white/5">
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-accent">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] text-muted uppercase tracking-wider font-semibold">Location</h4>
                  <span className="text-sm text-white font-medium">Tiruppur, Tamil Nadu</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-panel p-6 md:p-8 rounded-3xl glow-card">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-card border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Annu"
                    />
                    {errors.name && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-card border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="annu@company.com"
                    />
                    {errors.email && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-card border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Job Discussion / Interview Invitation"
                  />
                  {errors.subject && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-card border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    placeholder="Hello Preteka, we are looking to hire a Software Engineer and would love to..."
                  />
                  {errors.message && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{errors.message}</p>}
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="flex-grow">
                    <AnimatePresence mode="wait">
                      {status && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold ${
                            status.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                          }`}
                        >
                          {status.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                          <span>{status.text}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-glow-primary hover:shadow-glow-accent hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all cursor-pointer whitespace-nowrap self-end"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={16} /> Sending...
                      </>
                    ) : (
                      <>
                        Send <Send size={16} />
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
