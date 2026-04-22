/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuizForm } from './components/QuizForm';
import { CardResults } from './components/CardResults';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { QuizData } from './types';

type ViewState = 'home' | 'quiz' | 'results';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [quizResults, setQuizResults] = useState<QuizData | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    // Hidden URL trigger for Admin Panel
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdminOpen(true);
      // Clean up URL
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  const startQuiz = () => setView('quiz');
  
  const handleQuizComplete = (data: QuizData) => {
    setQuizResults(data);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setView('home');
    setQuizResults(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      
      <AnimatePresence>
        {isAdminOpen && (
          <AdminPanel onClose={() => setIsAdminOpen(false)} />
        )}
      </AnimatePresence>

      <main className="relative">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onStart={startQuiz} />
              
              {/* Added Trust/Benefits sections from PRD */}
              <section className="bg-slate-50 py-32 px-8 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-24 space-y-4">
                    <h2 className="text-5xl md:text-7xl font-display font-black text-brand-dark tracking-tight leading-[1.1]">The Intelligence <br /><span className="text-gradient">Advantage.</span></h2>
                    <p className="text-slate-500 max-w-xl mx-auto font-medium text-lg">Independently analyzed. Human-centric. Driven by data clarity.</p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-10">
                    {[
                      { title: "Financial Clarity", desc: "No jargon. No fine print hidden. Just the facts you need to make elite choices.", badge: "Strategy" },
                      { title: "Real Yield", desc: "Our users identify cards that earn an average of $850 more in yearly point values.", badge: "Performance" },
                      { title: "Instant Match", desc: "Seconds to scan thousands of data points. Seconds to find your financial destiny.", badge: "Velocity" },
                    ].map((item, idx) => (
                      <div key={idx} className="card-unique p-12 text-left group cursor-default">
                        <div className="badge-unique mb-8 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-500">
                          {item.badge}
                        </div>
                        <h3 className="text-3xl font-display font-black mb-4 text-brand-dark">{item.title}</h3>
                        <p className="text-slate-500 leading-relaxed font-semibold">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="py-32 px-8 bg-white relative">
                <div className="max-w-7xl mx-auto bg-brand-dark rounded-[3.5rem] p-12 md:p-32 text-white relative overflow-hidden group shadow-[0_40px_100px_rgba(15,23,42,0.3)]">
                  {/* Background Accents */}
                  <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-primary opacity-20 blur-[120px] group-hover:scale-150 transition-transform duration-1000" />
                  <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-secondary opacity-10 blur-[120px]" />
                  
                  <div className="relative z-10 flex flex-col xl:flex-row gap-20 items-center">
                    <div className="space-y-10 flex-1">
                      <h2 className="text-6xl md:text-8xl font-display font-black leading-[0.85] tracking-tight">Stop Browser <br /><span className="text-brand-primary">Fatigue.</span></h2>
                      <p className="text-slate-400 text-xl font-medium max-w-lg leading-relaxed">Our proprietary engine works strictly for the user — maximizing rewards while eliminating the unknown.</p>
                      <button onClick={startQuiz} className="btn-vibrant !text-2xl !px-16 !py-6 group ring-offset-slate-900 border-none">
                        Get Your Free Analysis
                        <ChevronRight size={28} className="group-hover:translate-x-2 transition-transform" />
                      </button>
                    </div>
                    <div className="flex-1 w-full max-w-lg">
                      <div className="space-y-6">
                        {[
                          "Secure Identity Handshake",
                          "Market Precision Sync",
                          "AI Reason Architecture",
                          "Direct Issuer Onboarding"
                        ].map((step, i) => (
                          <motion.div 
                            key={i} 
                            whileHover={{ x: 10 }}
                            className="flex items-center gap-6 bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-all cursor-default"
                          >
                            <span className="text-brand-primary font-display font-black text-3xl">0{i + 1}</span>
                            <span className="text-xl font-bold text-slate-200 tracking-tight">{step}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {view === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuizForm onComplete={handleQuizComplete} onCancel={() => setView('home')} />
            </motion.div>
          )}

          {view === 'results' && quizResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CardResults quizData={quizResults} onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
