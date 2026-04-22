/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowLeft, RefreshCcw, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { CREDIT_CARDS } from '../constants';
import { QuizData, CreditCard } from '../types';
import { getRecommendedCards } from '../services/recommendationEngine';
import { CardItem } from './CardItem';

interface CardResultsProps {
  quizData: QuizData;
  onRestart: () => void;
}

export function CardResults({ quizData, onRestart }: CardResultsProps) {
  const [availableCards, setAvailableCards] = useState<CreditCard[]>(CREDIT_CARDS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'cards'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const firestoreCards = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        } as CreditCard));
        setAvailableCards(firestoreCards);
      } else {
        // Fallback to static seeds if DB is empty
        setAvailableCards(CREDIT_CARDS);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firestore sync error:", error);
      setAvailableCards(CREDIT_CARDS);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const recommendations = getRecommendedCards(quizData, availableCards);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-6">
          <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
          <p className="font-display font-black text-brand-dark tracking-tight">Analyzing Financial Markets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 bg-slate-50 flex flex-col lg:flex-row">
      {/* Profile Rail */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-full lg:w-96 lg:fixed lg:h-[calc(100vh-128px)] p-8 lg:overflow-y-auto"
      >
        <div className="card-unique p-8 space-y-10 bg-brand-dark text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 blur-[60px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
          
          <div className="space-y-4 relative">
            <h3 className="text-xs font-black text-brand-primary uppercase tracking-[0.3em]">Identity Hub</h3>
            <h2 className="text-4xl font-display font-black leading-tight tracking-tight">Your Profile <br />Overview.</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 relative">
            {[
              { label: 'Credit Tier', value: quizData.creditScore, icon: '🛡️', color: 'bg-emerald-500/10 text-emerald-400', border: 'border-emerald-500/20' },
              { label: 'Spending Focus', value: quizData.spending, icon: '🎯', color: 'bg-rose-500/10 text-rose-400', border: 'border-rose-500/20' },
              { label: 'Annual Income', value: quizData.income, icon: '💰', color: 'bg-amber-500/10 text-amber-400', border: 'border-amber-500/20' },
            ].map((stat, i) => (
              <div key={i} className={`flex items-center gap-5 bg-white/5 p-6 rounded-[2rem] border ${stat.border} hover:bg-white/10 transition-all duration-300 shadow-lg shadow-black/20`}>
                <div className={`w-16 h-16 rounded-[1.5rem] ${stat.color} flex items-center justify-center text-3xl shrink-0 shadow-inner`}>
                  {stat.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase font-black text-slate-400 tracking-[0.2em] mb-1.5">{stat.label}</span>
                  <span className="text-2xl font-display font-black text-white leading-none tracking-tight">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={onRestart}
            className="w-full py-5 rounded-2xl bg-white text-brand-dark hover:bg-slate-100 font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl"
          >
            <RefreshCcw size={16} strokeWidth={3} />
            Modify Preferences
          </button>
        </div>

        <div className="mt-10 p-10 bg-rose-600 rounded-[2.5rem] text-white shadow-xl shadow-rose-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 blur-[50px] -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
          <h4 className="text-[10px] font-black text-rose-200 uppercase tracking-[0.3em] mb-4 relative z-10">AI Optimization Engine</h4>
          <p className="text-sm font-semibold leading-relaxed relative z-10">
            Your profile aligns with the <span className="text-white font-black underline decoration-rose-300 underline-offset-4">Top 5%</span> of high-yield earners in {quizData.spending}. 
          </p>
          <div className="mt-6 flex items-center gap-2 text-[10px] font-black text-rose-200 uppercase tracking-widest relative z-10">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Live Strategy Analysis
          </div>
        </div>
      </motion.aside>

      {/* Recommendations Feed */}
      <main className="flex-1 lg:ml-96 p-8 lg:p-12 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-10">
          <div className="space-y-2">
            <h1 className="text-5xl font-display font-black text-brand-dark tracking-tight">Recommended For You</h1>
            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-2xl">
              We've analyzed the market and found these cards offer the best ROI for your specific profile.
            </p>
          </div>
          <div className="badge-unique !bg-emerald-50 !text-emerald-600 border border-emerald-100">
            {recommendations.length} Elite Matches Found
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {recommendations.length > 0 ? (
            recommendations.map((card, i) => (
              <CardItem 
                key={card.id} 
                card={card} 
                quizData={quizData} 
                isBest={i === 0} 
                index={i} 
              />
            ))
          ) : (
            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-8">
                <RefreshCcw size={48} />
              </div>
              <h3 className="text-3xl font-display font-black text-brand-dark mb-4">No Perfect Matches Found</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-10 font-medium">Try broadening your annual fee tolerance or credit score range for more options.</p>
              <button onClick={onRestart} className="btn-vibrant">
                Restart Quiz
              </button>
            </div>
          )}
        </div>

        <footer className="pt-20 border-t border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] text-center max-w-3xl mx-auto italic leading-relaxed">
          Disclaimer: Information is provided for educational purposes. We may earn a commission from our banking partners for applications submitted through our platform.
        </footer>
      </main>
    </div>
  );
}
