/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'pt-2 md:pt-4' : 'pt-4 md:pt-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`glass-surface transition-all duration-300 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between ${
          scrolled ? 'rounded-[1.5rem] md:rounded-[2rem] shadow-xl md:shadow-2xl' : 'rounded-[2rem] md:rounded-[3rem]'
        }`}>
          <div className="flex items-center gap-2 md:gap-4 group cursor-pointer">
            <div className={`bg-brand-primary rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-200 group-hover:rotate-12 transition-all duration-500 ${
              scrolled ? 'w-10 h-10 md:w-11 md:h-11' : 'w-12 h-12'
            }`}>
              <CreditCard size={scrolled ? 20 : 24} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-display font-black leading-none tracking-tight">
                Smart<span className="text-brand-primary">Card</span>
              </span>
              <span className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                US Edition
              </span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            {['Discover', 'How it Works', 'Resources', 'Support'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-sm font-bold text-slate-500 hover:text-brand-primary transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="hidden sm:block text-sm font-bold text-slate-700 hover:text-brand-primary transition-colors">
              Log In
            </button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-dark text-white px-5 md:px-7 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold hover:bg-slate-800 transition-colors shadow-xl shadow-slate-200"
            >
              Get Started
            </motion.button>
            <button 
              className="lg:hidden p-2 text-slate-900 hover:bg-slate-50 rounded-xl transition-colors" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="lg:hidden absolute top-20 left-4 right-4 z-40 overflow-hidden"
          >
            <div className="glass-surface p-8 rounded-[2rem] shadow-2xl space-y-8">
              <div className="flex flex-col gap-6">
                {['Discover', 'How it Works', 'Resources', 'Support'].map((item) => (
                  <a key={item} href="#" className="text-xl font-bold text-slate-800" onClick={() => setIsOpen(false)}>
                    {item}
                  </a>
                ))}
              </div>
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <button className="w-full py-4 rounded-2xl bg-slate-100 text-brand-dark font-bold">
                  Log In
                </button>
                <button className="w-full py-4 rounded-2xl bg-brand-primary text-white font-bold shadow-lg shadow-indigo-100">
                  Join Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
