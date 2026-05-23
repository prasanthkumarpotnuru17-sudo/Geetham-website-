import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../../assets/logo.png';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.0, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        document.body.style.overflow = 'unset';
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-green-deep select-none"
    >
      <div className="relative flex flex-col items-center">
        <div className="absolute w-72 h-72 rounded-full bg-brand-gold/10 blur-[80px]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 text-brand-gold drop-shadow-[0_0_15px_rgba(207,168,81,0.4)]"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="1.5">
            <circle cx="50" cy="50" r="46" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="40" />
            <circle cx="50" cy="50" r="32" strokeWidth="1" />
            {[...Array(8)].map((_, i) => (
              <path key={i} d={`M 50 50 L 50 15 A 8 8 0 0 1 58 23 Z`} transform={`rotate(${i * 45} 50 50)`} className="fill-brand-gold/10" />
            ))}
            {[...Array(12)].map((_, i) => (
              <circle key={i} cx="50" cy="25" r="2" transform={`rotate(${i * 30} 50 50)`} className="fill-brand-gold" />
            ))}
            <circle cx="50" cy="50" r="10" className="fill-brand-saffron/20 stroke-brand-saffron" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="4" className="fill-brand-gold" />
          </svg>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.7, type: "spring", stiffness: 120 }} className="absolute top-[26px] flex items-center justify-center pointer-events-none select-none">
          <img src={logoImg} alt="Geetham Logo" className="w-11 h-11 object-contain drop-shadow-[0_0_8px_rgba(217,90,30,0.55)]" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="mt-8 text-center">
          <h1 className="font-serif text-3xl font-bold tracking-widest text-brand-cream-ivory">GEETHAM</h1>
          <p className="mt-1 font-sans text-xs tracking-[0.3em] text-brand-gold uppercase">VEG RESTAURANT • MUTTUKADU</p>
          <div className="flex justify-center gap-1.5 mt-4">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-saffron animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2.5 h-2.5 rounded-full bg-brand-saffron animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
