import React from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Calendar, ShoppingBag, ChevronRight } from 'lucide-react';
import heroBg from '../../assets/hero-bg.jpg';

export default function Hero({ onOpenBookModal }) {
  return (
    <div className="relative min-h-screen flex items-center bg-black overflow-hidden select-none">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 ease-linear scale-105" style={{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8) 15%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.7) 100%), linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.8) 100%), url(${heroBg})` }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_30%,rgba(0,0,0,0.85)_90%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex items-center gap-2 mb-4.5">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-brand-gold/90 uppercase font-sans">MUTTUKADU · ECR · EST. WITH LOVE</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="font-serif text-5xl sm:text-7xl lg:text-[5.5rem] font-normal text-white tracking-tight leading-[1.08] mb-6">Authentic South Indian <br />Flavours <br /><span className="cursive-text font-serif italic font-normal block mt-2 lowercase text-brand-gold">on ECR.</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl mb-10 font-sans">Experience delicious vegetarian cuisine, filter coffee, crispy dosas, and family dining in the heart of Muttukadu.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-wrap items-center gap-3.5 sm:gap-5">
            <a href="#menu" className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-brand-saffron hover:bg-brand-saffron-dark text-white font-semibold text-xs sm:text-[13px] tracking-wide shadow-saffron-glow transition-all duration-300 flex items-center gap-2 group hover:scale-[1.03]"><UtensilsCrossed className="w-4 h-4 text-white/90" /><span>View Menu</span></a>
            <button onClick={onOpenBookModal} className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-transparent hover:bg-white/5 text-white font-semibold text-xs sm:text-[13px] tracking-wide border border-white/20 hover:border-brand-gold transition-all duration-300 flex items-center gap-2 hover:scale-[1.03]"><Calendar className="w-4 h-4 text-brand-gold" /><span>Book a Table</span></button>
            <a href="#order-online" className="px-3 py-2 text-white hover:text-brand-saffron font-semibold text-xs sm:text-[13px] tracking-wide flex items-center gap-2 group transition-colors duration-300"><ShoppingBag className="w-4 h-4 text-white/90" /><span>Order Online</span><ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" /></a>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="mt-14 sm:mt-18 lg:mt-22 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 max-w-4xl">
            <div className="flex flex-col gap-1 pr-4 border-r md:border-r border-white/10"><div className="flex items-center gap-1 text-xl sm:text-2xl font-serif text-brand-gold font-normal"><span className="text-brand-gold text-lg sm:text-xl">★</span><span>3.9</span></div><span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-white/50 uppercase font-sans">11,962 reviews</span></div>
            <div className="flex flex-col gap-1 pl-4 md:pl-6 pr-4 md:border-r border-white/10"><div className="text-xl sm:text-2xl font-serif text-brand-gold font-normal">₹200–400</div><span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-white/50 uppercase font-sans">per person</span></div>
            <div className="flex flex-col gap-1 pr-4 border-r md:border-r border-white/10 md:pl-6"><div className="text-xl sm:text-2xl font-serif text-brand-gold font-normal">Dine-in</div><span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-white/50 uppercase font-sans font-medium">takeaway · delivery</span></div>
            <div className="flex flex-col gap-1 pl-4 md:pl-6"><div className="text-xl sm:text-2xl font-serif text-brand-gold font-normal">Open until</div><span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-white/50 uppercase font-sans">12 AM</span></div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-px pointer-events-none select-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] fill-brand-cream dark:fill-brand-green-deep theme-transition"><path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,90.3,25.87,178.6,45.89,252.12,62,321.39,56.44Z" /></svg>
      </div>
    </div>
  );
}
