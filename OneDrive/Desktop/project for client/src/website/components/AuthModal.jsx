import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Phone, User, KeyRound, CheckCircle2, UserPlus, LogIn } from 'lucide-react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({ name: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); setError(''); };
  const handleTabChange = (tab) => { setActiveTab(tab); setError(''); setSuccessMsg(''); setFormData({ name: '', phone: '', password: '', confirmPassword: '' }); };
  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, phone, password, confirmPassword } = formData;
    if (!name.trim() || !phone.trim() || !password.trim()) { setError('Please fill in all fields.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (password.length < 4) { setError('Password must be at least 4 characters.'); return; }
    const cleanPhone = phone.replace(/\s+/g, '');
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('phone', '==', cleanPhone));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) { setError('An account with this phone number already exists.'); return; }
      
      const newUser = { name, phone: cleanPhone, password, createdAt: new Date().toISOString() };
      await setDoc(doc(db, 'users', cleanPhone), newUser);
      
      const existingUsers = JSON.parse(localStorage.getItem('geetham_users') || '[]');
      existingUsers.push(newUser);
      localStorage.setItem('geetham_users', JSON.stringify(existingUsers));
      
      setSuccessMsg('Account registered successfully! Please log in.');
      setTimeout(() => { handleTabChange('login'); setFormData(prev => ({ ...prev, phone: cleanPhone })); }, 1500);
    } catch (err) { console.error(err); setError('Registration failed. Please try again.'); }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { phone, password } = formData;
    if (!phone.trim() || !password.trim()) { setError('Please fill in all fields.'); return; }
    const cleanPhone = phone.replace(/\s+/g, '');
    try {
      const userDoc = await getDocs(query(collection(db, 'users'), where('phone', '==', cleanPhone), where('password', '==', password)));
      let foundUser = null;
      if (!userDoc.empty) {
        foundUser = userDoc.docs[0].data();
      } else {
        const existingUsers = JSON.parse(localStorage.getItem('geetham_users') || '[]');
        foundUser = existingUsers.find(u => u.phone === cleanPhone && u.password === password);
      }
      if (!foundUser) { setError('Invalid phone number or password.'); return; }
      const activeUser = { name: foundUser.name, phone: foundUser.phone };
      localStorage.setItem('geetham_active_user', JSON.stringify(activeUser));
      setSuccessMsg(`Welcome back, ${foundUser.name}!`);
      setTimeout(() => { onLoginSuccess(activeUser); handleClose(); }, 1200);
    } catch (err) { console.error(err); setError('Login failed. Please try again.'); }
  };
  const handleClose = () => { setError(''); setSuccessMsg(''); setFormData({ name: '', phone: '', password: '', confirmPassword: '' }); onClose(); };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={handleClose} />
          <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }} transition={{ type: "spring", duration: 0.45 }} className="relative w-full max-w-[420px] bg-brand-cream dark:bg-brand-green-deep border border-brand-gold/25 rounded-[24px] overflow-hidden shadow-2xl z-10 flex flex-col theme-transition">
            <div className="flex justify-between items-center px-6 py-4.5 border-b border-brand-gold/15 bg-brand-cream-surface dark:bg-[#051a10] theme-transition">
              <h2 className="font-serif text-xl font-bold text-brand-charcoal dark:text-brand-cream-ivory tracking-wide flex items-center gap-2"><KeyRound className="w-5 h-5 text-brand-saffron" />Diner Account</h2>
              <button onClick={handleClose} className="p-1.5 rounded-full hover:bg-brand-saffron/15 text-brand-charcoal/70 dark:text-brand-cream-ivory/70 hover:text-brand-saffron transition-colors" aria-label="Close"><X className="w-4.5 h-4.5" /></button>
            </div>
            <div className="flex border-b border-brand-gold/10 p-1 bg-brand-cream-surface/50 dark:bg-[#092015] theme-transition">
              <button type="button" onClick={() => handleTabChange('login')} className={`flex-1 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-xl flex items-center justify-center gap-2 ${activeTab === 'login' ? 'bg-brand-saffron text-white shadow-md' : 'text-brand-charcoal/75 dark:text-brand-cream-ivory/60 hover:text-brand-saffron'}`}><LogIn className="w-3.5 h-3.5" />Sign In</button>
              <button type="button" onClick={() => handleTabChange('register')} className={`flex-1 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-xl flex items-center justify-center gap-2 ${activeTab === 'register' ? 'bg-brand-saffron text-white shadow-md' : 'text-brand-charcoal/75 dark:text-brand-cream-ivory/60 hover:text-brand-saffron'}`}><UserPlus className="w-3.5 h-3.5" />Create Account</button>
            </div>
            <div className="p-6">
              {error && (<motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-3.5 rounded-xl border border-red-500/20 bg-red-500/10 text-red-600 text-xs font-semibold text-center leading-relaxed">{error}</motion.div>)}
              {successMsg && (<motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-3.5 rounded-xl border border-green-500/20 bg-green-500/10 text-green-600 text-xs font-semibold flex items-center justify-center gap-2 leading-relaxed"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />{successMsg}</motion.div>)}
              <form onSubmit={activeTab === 'login' ? handleLogin : handleRegister} className="flex flex-col gap-4">
                {activeTab === 'register' && (<div className="flex flex-col gap-1.5"><label className="text-[10px] font-bold tracking-widest text-brand-charcoal/70 dark:text-brand-cream-ivory/70 uppercase flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-brand-gold" />Full Name</label><input type="text" name="name" required placeholder="e.g. Anand Kumar" value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-brand-gold/20 dark:border-brand-gold/10 bg-brand-cream-surface dark:bg-[#0a2016] text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-saffron focus:ring-1 focus:ring-brand-saffron transition-colors text-sm" /></div>)}
                <div className="flex flex-col gap-1.5"><label className="text-[10px] font-bold tracking-widest text-brand-charcoal/70 dark:text-brand-cream-ivory/70 uppercase flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-brand-gold" />Phone Number</label><input type="tel" name="phone" required placeholder="Enter 10-digit number" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-brand-gold/20 dark:border-brand-gold/10 bg-brand-cream-surface dark:bg-[#0a2016] text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-saffron focus:ring-1 focus:ring-brand-saffron transition-colors text-sm" /></div>
                <div className="flex flex-col gap-1.5"><label className="text-[10px] font-bold tracking-widest text-brand-charcoal/70 dark:text-brand-cream-ivory/70 uppercase flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-brand-gold" />Password</label><input type="password" name="password" required placeholder="••••••••" value={formData.password} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-brand-gold/20 dark:border-brand-gold/10 bg-brand-cream-surface dark:bg-[#0a2016] text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-saffron focus:ring-1 focus:ring-brand-saffron transition-colors text-sm" /></div>
                {activeTab === 'register' && (<div className="flex flex-col gap-1.5"><label className="text-[10px] font-bold tracking-widest text-brand-charcoal/70 dark:text-brand-cream-ivory/70 uppercase flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-brand-gold" />Confirm Password</label><input type="password" name="confirmPassword" required placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-brand-gold/20 dark:border-brand-gold/10 bg-brand-cream-surface dark:bg-[#0a2016] text-brand-charcoal dark:text-white focus:outline-none focus:border-brand-saffron focus:ring-1 focus:ring-brand-saffron transition-colors text-sm" /></div>)}
                <button type="submit" className="w-full py-3.5 rounded-xl bg-brand-saffron hover:bg-brand-saffron-dark text-white font-bold tracking-wide shadow-saffron-glow transition-all duration-300 hover:scale-[1.01] mt-3">{activeTab === 'login' ? 'Authenticate & Enter' : 'Register Account'}</button>
              </form>
              <p className="text-[10px] text-center text-brand-charcoal/40 dark:text-brand-cream-ivory/30 mt-4 leading-relaxed">By logging in, you agree to our premium dining terms of service and table booking guidelines.</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
