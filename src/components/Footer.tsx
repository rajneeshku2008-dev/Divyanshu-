/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CreditCard, Github, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-32 pb-12 px-8 overflow-hidden relative">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-brand-primary opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white">
                <CreditCard size={20} />
              </div>
              <span className="text-xl font-display font-black tracking-tight">Smart<span className="text-brand-primary">Card</span></span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed max-w-xs text-sm">
              The premium destination for US credit card analysis and personalized discovery. Empowering your financial future.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <Twitter size={20} className="hover:text-brand-primary transition-colors cursor-pointer" />
              <Github size={20} className="hover:text-brand-primary transition-colors cursor-pointer" />
              <Linkedin size={20} className="hover:text-brand-primary transition-colors cursor-pointer" />
              <Instagram size={20} className="hover:text-brand-primary transition-colors cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-8">Ecosystem</h4>
            <ul className="space-y-4 text-sm">
              {['Card Match', 'Rewards Guide', 'Credit scores', 'Security Center'].map(item => (
                <li key={item}>
                   <a href="#" className="text-slate-500 hover:text-brand-primary font-medium transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-8">Intelligence</h4>
            <ul className="space-y-4 text-sm">
              {['Methodology', 'AI Insights', 'Data Security', 'Affiliate disclosure'].map(item => (
                <li key={item}>
                   <a href="#" className="text-slate-500 hover:text-brand-primary font-medium transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-8">Newsletter</h4>
            <p className="text-slate-500 text-sm font-medium mb-6">Join 50,000+ others finding better rewards.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="you@email.com" 
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
              />
              <button className="bg-brand-dark text-white p-3 rounded-xl hover:bg-slate-800 transition-colors">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-400 text-sm font-medium">
            © 2026 SmartCard US. All financial identities protected.
          </p>
          <div className="flex items-center gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-brand-dark transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-dark transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-dark transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
