/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Edit3, Save, X, Lock, ShieldCheck, LogOut, ArrowLeft } from 'lucide-react';
import { db, auth, signIn, logOut, handleFirestoreError } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, onSnapshot, query, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { CreditCard, CreditScore, SpendingPreference } from '../types';

interface AdminPanelProps {
  onClose: () => void;
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<CreditCard>>({
    name: '',
    issuer: '',
    features: [],
    annualFee: 0,
    type: 'Travel',
    creditScore: 'Good',
    referralUrl: '',
    imageUrl: '',
    bonus: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Bootstrapped admin check in code as well
        const isBootstrapped = u.email === 'rajneeshku2008@gmail.com';
        // In a real app, we'd also check the 'admins' collection
        setIsAdmin(isBootstrapped); 
        
        // Load cards if admin
        if (isBootstrapped) {
          const q = query(collection(db, 'cards'));
          const unsubCards = onSnapshot(q, (snapshot) => {
            const cardList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CreditCard));
            setCards(cardList);
            setLoading(false);
          }, (err) => {
            console.error("Error fetching cards:", err);
            setLoading(false);
          });
          return () => unsubCards();
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!isAdmin) return;
    try {
      if (editingId) {
        const cardRef = doc(db, 'cards', editingId);
        await updateDoc(cardRef, formData);
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'cards'), {
          ...formData,
          createdAt: new Date().toISOString()
        });
        setIsAdding(false);
      }
      setFormData({
        name: '',
        issuer: '',
        features: [],
        annualFee: 0,
        type: 'Travel',
        creditScore: 'Good',
        referralUrl: '',
        imageUrl: '',
        bonus: ''
      });
    } catch (error) {
      handleFirestoreError(error, editingId ? 'update' : 'create', 'cards');
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin || !window.confirm('Delete this card?')) return;
    try {
      await deleteDoc(doc(db, 'cards', id));
    } catch (error) {
      handleFirestoreError(error, 'delete', `cards/${id}`);
    }
  };

  const startEdit = (card: CreditCard) => {
    setFormData(card);
    setEditingId(card.id);
    setIsAdding(true);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-3xl rounded-full" />
          <div className="w-20 h-20 bg-rose-50 rounded-[2rem] flex items-center justify-center text-brand-primary mx-auto mb-8 shadow-inner">
            <Lock size={32} />
          </div>
          <h2 className="text-4xl font-display font-black text-brand-dark mb-4">Admin Access</h2>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed">
            Unauthorized access restricted. Only verified platform administrators can access the card management engine.
          </p>
          
          {!user ? (
            <button onClick={signIn} className="btn-vibrant w-full !py-5">
              Verify Identity
            </button>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-rose-50 rounded-2xl text-rose-600 font-bold text-sm">
                Access Denied: {user.email} is not an admin.
              </div>
              <button onClick={logOut} className="text-slate-400 font-bold hover:text-brand-dark transition-colors flex items-center justify-center gap-2 w-full">
                <LogOut size={18} />
                Switch Account
              </button>
            </div>
          )}
          
          <button onClick={onClose} className="mt-8 text-slate-400 font-bold hover:text-brand-dark transition-colors flex items-center justify-center gap-2 w-full">
            <ArrowLeft size={18} />
            Return to Store
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#fafafa] overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6 md:p-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="flex items-center gap-6">
            <button onClick={onClose} className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-brand-dark transition-colors">
              <ArrowLeft size={24} />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <ShieldCheck size={20} className="text-emerald-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Guardian Environment</span>
              </div>
              <h1 className="text-5xl font-display font-black text-brand-dark tracking-tight">Card Management</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end mr-4">
              <span className="text-sm font-black text-brand-dark">{user.email}</span>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active Administrator</span>
            </div>
            <button onClick={() => setIsAdding(true)} className="btn-vibrant !py-3.5 !px-8">
              <Plus size={20} />
              Add New Card
            </button>
            <button onClick={logOut} className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-rose-500 transition-colors">
              <LogOut size={24} />
            </button>
          </div>
        </header>

        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-unique p-10 mb-16 bg-white shadow-2xl border-brand-primary/20"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-display font-black">{editingId ? 'Edit Card' : 'Configure New Card'}</h2>
              <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-slate-400 hover:text-brand-dark transition-colors">
                <X size={28} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Card Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-brand-primary outline-none font-bold"
                  placeholder="e.g. Sapphire Reserve"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Issuer</label>
                <input 
                  type="text" 
                  value={formData.issuer} 
                  onChange={e => setFormData({...formData, issuer: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-brand-primary outline-none font-bold"
                  placeholder="e.g. Chase"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rewards Category</label>
                <select 
                  value={formData.type} 
                  onChange={e => setFormData({...formData, type: e.target.value as SpendingPreference})}
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-brand-primary outline-none font-bold appearance-none"
                >
                  {['Travel', 'Cashback', 'Business', 'Student'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Annual Fee ($)</label>
                <input 
                  type="number" 
                  value={formData.annualFee} 
                  onChange={e => setFormData({...formData, annualFee: Number(e.target.value)})}
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-brand-primary outline-none font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Credit Score Tier</label>
                <select 
                  value={formData.creditScore} 
                  onChange={e => setFormData({...formData, creditScore: e.target.value as CreditScore})}
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-brand-primary outline-none font-bold appearance-none"
                >
                  {['Excellent', 'Good', 'Fair', 'Poor'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Signup Bonus</label>
                <input 
                  type="text" 
                  value={formData.bonus} 
                  onChange={e => setFormData({...formData, bonus: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-brand-primary outline-none font-bold"
                  placeholder="e.g. 60,000 Points"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Application URL</label>
                <input 
                  type="text" 
                  value={formData.referralUrl} 
                  onChange={e => setFormData({...formData, referralUrl: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-brand-primary outline-none font-bold"
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Image URL</label>
                <input 
                  type="text" 
                  value={formData.imageUrl} 
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-brand-primary outline-none font-bold"
                  placeholder="https://..."
                />
              </div>
            </div>
            
            <div className="mt-12 flex items-center gap-4">
              <button onClick={handleSave} className="btn-vibrant !px-12">
                <Save size={20} />
                {editingId ? 'Save Changes' : 'Initialize Card'}
              </button>
              <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="btn-outline-unique !px-12">
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-2xl font-display font-black text-brand-dark">Active Repository <span className="text-brand-primary ml-2">{cards.length}</span></h2>
          </div>
          
          {cards.map((card) => (
            <motion.div 
              key={card.id}
              layout
              className="bg-white border border-slate-100 p-8 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-8 h-full hover:shadow-xl transition-all group"
            >
              <div className="flex items-center gap-8">
                <div className="w-24 h-16 bg-slate-50 rounded-xl overflow-hidden shadow-inner flex items-center justify-center shrink-0">
                  {card.imageUrl ? (
                    <img src={card.imageUrl} alt={card.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="text-[10px] font-black text-slate-300 uppercase letter-spacing-widest">No Image</div>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">{card.issuer}</span>
                    <span className="px-3 py-1 bg-brand-primary/10 rounded-full text-[10px] font-black text-brand-primary uppercase tracking-widest">{card.type}</span>
                  </div>
                  <h3 className="text-2xl font-black text-brand-dark">{card.name}</h3>
                  <p className="text-sm font-bold text-slate-400">Fee: ${card.annualFee} • Credit: {card.creditScore}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => startEdit(card)}
                  className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-brand-primary hover:bg-slate-100 transition-colors"
                >
                  <Edit3 size={20} />
                </button>
                <button 
                  onClick={() => handleDelete(card.id)}
                  className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
          
          {cards.length === 0 && !isAdding && (
            <div className="py-32 flex flex-col items-center justify-center text-center opacity-50">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
                <Plus size={40} />
              </div>
              <h3 className="text-2xl font-display font-black text-brand-dark mb-2">Inventory Empty</h3>
              <p className="font-bold text-slate-400">Initialize your first card to begin populating the engine.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
