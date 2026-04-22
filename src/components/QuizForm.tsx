/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { QuizData, CreditScore, IncomeRange, SpendingPreference, AnnualFeePreference } from '../types';

interface QuizFormProps {
  onComplete: (data: QuizData) => void;
  onCancel: () => void;
}

export function QuizForm({ onComplete, onCancel }: QuizFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<QuizData>>({});

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(formData as QuizData);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onCancel();
  };

  const updateField = (field: keyof QuizData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTimeout(handleNext, 400); // Auto-advance after selection
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-mesh flex flex-col items-center justify-center">
      {/* Progress Header */}
      <div className="w-full max-w-2xl mb-16 px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Step {step} of 4</span>
            <span className="text-xl font-display font-bold text-brand-dark">Match Analysis</span>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-brand-primary">{Math.round(progress)}% Complete</span>
          </div>
        </div>
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            className="h-full bg-gradient-to-r from-brand-primary to-rose-400 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.3)]"
          />
        </div>
      </div>

      <div className="w-full max-w-2xl relative">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              <div className="text-center space-y-4">
                <h2 className="text-5xl font-display font-black text-brand-dark tracking-tight leading-tight">What is your current <br /><span className="text-gradient">credit standing?</span></h2>
                <p className="text-slate-500 font-medium text-lg">We use this to filter cards you are most likely to be approved for.</p>
              </div>
              <div className="grid gap-5">
                {(['Excellent (750+)', 'Good (700-749)', 'Fair (650-699)', 'Poor (<650)'] as const).map((opt, i) => {
                  const val = opt.split(' ')[0] as CreditScore;
                  return (
                    <motion.button
                      key={opt}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => updateField('creditScore', val)}
                      className={`quiz-option-vibrant ${formData.creditScore === val ? 'selected' : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${formData.creditScore === val ? 'bg-brand-primary text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50'}`}>
                           <Check size={20} className={formData.creditScore === val ? 'opacity-100' : 'opacity-0'} strokeWidth={3} />
                        </div>
                        <span className="font-bold text-xl text-slate-800">{opt}</span>
                      </div>
                      <ChevronRight size={20} className="text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              <div className="text-center space-y-4">
                <h2 className="text-5xl font-display font-black text-brand-dark tracking-tight leading-tight">Monthly <span className="text-gradient">Income Range</span></h2>
                <p className="text-slate-500 font-medium text-lg">Gross monthly income helps determine your potential credit limit.</p>
              </div>
              <div className="grid gap-5">
                {(['<$30K', '$30K-$60K', '$60K-$100K', '$100K+'] as const).map((val, i) => (
                  <motion.button
                    key={val}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => updateField('income', val)}
                    className={`quiz-option-vibrant ${formData.income === val ? 'selected' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${formData.income === val ? 'bg-brand-primary text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50'}`}>
                         <Check size={20} className={formData.income === val ? 'opacity-100' : 'opacity-0'} strokeWidth={3} />
                      </div>
                      <span className="font-bold text-xl text-slate-800">{val}</span>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              <div className="text-center space-y-4">
                <h2 className="text-5xl font-display font-black text-brand-dark tracking-tight leading-tight">Primary <span className="text-gradient">Rewards Goal</span></h2>
                <p className="text-slate-500 font-medium text-lg">Where do you want your card to work hardest for you?</p>
              </div>
              <div className="grid gap-5">
                {(['Travel', 'Cashback', 'Business', 'Student'] as const).map((val, i) => (
                  <motion.button
                    key={val}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => updateField('spending', val)}
                    className={`quiz-option-vibrant ${formData.spending === val ? 'selected' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${formData.spending === val ? 'bg-brand-primary text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50'}`}>
                         <Check size={20} className={formData.spending === val ? 'opacity-100' : 'opacity-0'} strokeWidth={3} />
                      </div>
                      <span className="font-bold text-xl text-slate-800">{val}</span>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              <div className="text-center space-y-4">
                <h2 className="text-5xl font-display font-black text-brand-dark tracking-tight leading-tight">Annual Fee <span className="text-gradient">Tolerance</span></h2>
                <p className="text-slate-500 font-medium text-lg">Premium cards offer elite perks but carry yearly costs.</p>
              </div>
              <div className="grid gap-5">
                {(['No fee', 'Low fee', 'Any'] as const).map((val, i) => (
                  <motion.button
                    key={val}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => updateField('annualFee', val)}
                    className={`quiz-option-vibrant ${formData.annualFee === val ? 'selected' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${formData.annualFee === val ? 'bg-brand-primary text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50'}`}>
                         <Check size={20} className={formData.annualFee === val ? 'opacity-100' : 'opacity-0'} strokeWidth={3} />
                      </div>
                      <span className="font-bold text-xl text-slate-800">{val}</span>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-16 flex justify-between px-2 items-center">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-400 font-bold hover:text-brand-dark transition-colors text-sm uppercase tracking-widest"
          >
            <ChevronLeft size={18} />
            Previous Step
          </button>
          
          <button 
            onClick={onCancel}
            className="text-xs font-bold text-slate-300 hover:text-red-400 transition-colors uppercase tracking-[0.2em]"
          >
            Exit Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
