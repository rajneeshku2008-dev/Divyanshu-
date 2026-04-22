/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChevronRight, Sparkles, TrendingUp, Shield } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  return (
    <section className="relative pt-48 md:pt-64 pb-32 px-6 overflow-hidden bg-mesh">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-primary opacity-10 blur-[120px] -translate-x-1/2" />
      <div className="absolute top-3/4 right-0 w-96 h-96 bg-brand-secondary opacity-10 blur-[120px] translate-x-1/2" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="badge-unique mb-8 flex items-center gap-2"
        >
          <Sparkles size={14} className="text-brand-primary" />
          AI-Powered Discovery Engine
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-[8rem] font-display font-black leading-[0.85] tracking-tight mb-10 text-brand-dark"
        >
          Your Money, <br />
          <span className="text-gradient">Elevated.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-slate-500 max-w-3xl leading-relaxed font-medium mb-12"
        >
          Discover elite credit cards tailored to your US financial goals. <br className="hidden md:block" /> 
          Backed by intelligent analysis, designed for your lifestyle.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <button onClick={onStart} className="btn-vibrant !text-lg !px-12 group">
            Find My Card
            <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="btn-outline-unique !text-lg !px-12">
            View Elite List
          </button>
        </motion.div>

        {/* Feature Grid Under Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full"
        >
          {[
            { icon: <TrendingUp />, title: "Rewards Yield", desc: "Maximize your cashback and points with precision analysis." },
            { icon: <Shield />, title: "Trust Verified", desc: "Only highly-rated US issuers with verified terms." },
            { icon: <Sparkles />, title: "AI Matched", desc: "Our engine learns your habits to find the 1% of cards you need." },
          ].map((feature, i) => (
            <div key={i} className="card-unique p-10 text-left hover:scale-[1.02] transition-all duration-500 cursor-default group">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-primary mb-6 shadow-sm border border-slate-100 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
