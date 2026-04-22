/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactElement, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Star, Sparkles, ExternalLink, ShieldCheck, CheckCircle2, CreditCard as CardIcon } from 'lucide-react';
import { CreditCard, QuizData } from '../types';
import { generateMatchReason } from '../services/geminiService';

interface CardItemProps {
  key?: string | number;
  card: CreditCard;
  quizData: QuizData;
  isBest: boolean;
  index: number;
}

export function CardItem({ card, quizData, isBest, index }: CardItemProps): ReactElement {
  const [reason, setReason] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReason() {
      const res = await generateMatchReason(card, quizData);
      setReason(res);
      setLoading(false);
    }
    fetchReason();
  }, [card, quizData]);

  const matchPercentage = isBest ? 98 : Math.floor(Math.random() * 10) + 80;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`card-unique flex flex-col h-full relative group ${isBest ? 'ring-2 ring-brand-primary ring-offset-4 ring-offset-[#fafafa]' : ''}`}
    >
      {/* Card Header/Image Area */}
      <div className="relative h-64 bg-slate-900 overflow-hidden flex items-center justify-center p-8">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        
        {/* Floating Credit Card Mockup */}
        <motion.div 
          whileHover={{ rotateY: 15, rotateX: -10, scale: 1.05 }}
          className="relative w-72 h-44 rounded-2xl shadow-2xl transition-transform duration-500 preserve-3d"
        >
          <div className={`absolute inset-0 rounded-2xl p-6 flex flex-col justify-between text-white ${
            card.issuer === 'Chase' ? 'bg-gradient-to-br from-blue-700 to-indigo-900' :
            card.issuer === 'Amex' ? 'bg-gradient-to-br from-yellow-600 to-amber-900' :
            'bg-gradient-to-br from-slate-700 to-slate-900'
          }`}>
            <div className="flex justify-between items-start">
              <div className="w-10 h-8 bg-amber-400/80 rounded-md shadow-inner" />
              <CardIcon size={24} className="opacity-50" />
            </div>
            <div className="space-y-4">
              <div className="font-mono text-sm tracking-[0.2em] opacity-80">**** **** **** 8829</div>
              <div className="flex justify-between items-end">
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Elite Member</div>
                <div className="text-sm font-display font-black italic tracking-tighter uppercase">{card.issuer}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {isBest && (
          <div className="absolute top-6 right-6 badge-unique !bg-brand-primary !text-white !p-2 !rounded-xl animate-bounce">
            <Star size={16} fill="currentColor" />
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-10 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-1">
            <h3 className="text-3xl font-display font-black text-brand-dark leading-tight">{card.name}</h3>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{card.issuer} Partnership</p>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Match Score</div>
             <div className="text-3xl font-display font-black text-brand-primary leading-none">{matchPercentage}%</div>
          </div>
        </div>

        <div className="flex-1 space-y-8 mb-10">
          <ul className="space-y-4">
            {card.features.slice(0, 3).map((benefit, i) => (
              <li key={i} className="flex items-start gap-4 text-slate-600 font-medium leading-relaxed">
                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <CheckCircle2 size={12} strokeWidth={3} />
                </div>
                {benefit}
              </li>
            ))}
          </ul>

          <div className="p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100 relative group/insight overflow-hidden">
             <div className="absolute top-0 right-0 p-2 text-indigo-100 group-hover/insight:text-brand-primary transition-colors">
                <Sparkles size={32} />
             </div>
             <p className="text-[9px] font-black text-brand-primary uppercase tracking-[0.2em] mb-3">AI Deep Analysis</p>
             {loading ? (
                <div className="space-y-2">
                  <div className="h-2 w-full bg-slate-200 animate-pulse rounded" />
                  <div className="h-2 w-2/3 bg-slate-200 animate-pulse rounded" />
                </div>
             ) : (
                <p className="text-[13px] font-bold text-slate-700 italic leading-relaxed">
                  "{reason}"
                </p>
             )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 border-t border-slate-100 pt-8 mb-10">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Annual Fee</span>
            <div className="text-xl font-display font-black text-brand-dark">{card.annualFee === 0 ? 'No Fee' : `$${card.annualFee}`}</div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Bonus Value</span>
            <div className="text-xl font-display font-black text-brand-secondary">{card.bonus || 'Elite Status'}</div>
          </div>
        </div>

        <button className="btn-vibrant w-full !rounded-2xl group/btn">
          Secure Application
          <ExternalLink size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
