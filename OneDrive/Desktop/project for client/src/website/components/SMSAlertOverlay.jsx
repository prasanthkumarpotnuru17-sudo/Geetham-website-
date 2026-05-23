import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, ShieldCheck } from 'lucide-react';

export default function SMSAlertOverlay({ notification, onClose }) {
  useEffect(() => { if (notification) { const timer = setTimeout(() => onClose(), 6500); return () => clearTimeout(timer); } }, [notification, onClose]);
  if (!notification) return null;
  const { name, phone, id, date, timeSlot, guests, status } = notification;
  return (
    <AnimatePresence>
      <div className="fixed top-6 right-6 z-[60] w-full max-w-sm px-4 sm:px-0 select-none">
        <motion.div initial={{ opacity: 0, y: -40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ type: "spring", stiffness: 350, damping: 25 }} className="relative w-full rounded-2xl bg-black/85 backdrop-blur-md border border-brand-gold/30 shadow-2xl p-4.5 text-white overflow-hidden flex flex-col gap-2.5">
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-right from-brand-saffron via-brand-gold to-brand-saffron-light" />
          <div className="flex justify-between items-center border-b border-white/10 pb-2"><div className="flex items-center gap-2"><div className="p-1 rounded bg-brand-saffron text-white shadow-sm"><MessageSquare className="w-3.5 h-3.5" /></div><span className="text-[10px] font-bold tracking-widest text-brand-cream-ivory/80 uppercase">SMS ALERT SYSTEM</span></div><div className="flex items-center gap-2"><span className="text-[8px] font-bold text-brand-gold bg-brand-gold/15 border border-brand-gold/20 px-1.5 py-0.5 rounded">Delivered</span><button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors" aria-label="Close Notification"><X className="w-3.5 h-3.5 text-white/60" /></button></div></div>
          <div className="flex gap-3"><div className="flex flex-col gap-1.5 flex-grow"><div className="flex items-center gap-1.5"><span className="text-[11px] font-bold text-brand-gold">TO: +91 {phone}</span><span className="text-[10px] text-white/40">• Just now</span></div><div className="p-3 bg-white/5 rounded-xl border border-white/5 font-sans leading-relaxed text-xs text-brand-cream-ivory/95"><p className="font-semibold mb-1">💬 [Geetham Veg]</p>Namaste <span className="font-bold text-brand-gold">{name}</span>, your table reservation is <span className="font-bold text-brand-saffron-light">{status}</span>.<br /><span className="font-semibold">ID:</span> <span className="font-mono text-brand-gold">{id}</span> | <span className="font-semibold">Guests:</span> {guests}<br /><span className="mt-1.5 text-[10px] text-white/50 border-t border-white/5 pt-1.5 italic">Show this receipt at our Muttukadu, ECR entrance. See you soon!</span></div></div></div>
          <div className="flex items-center gap-1 text-[9px] text-white/40 font-semibold self-end mt-1"><ShieldCheck className="w-3 h-3 text-brand-gold" />Verified Gateway</div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
