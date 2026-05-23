import React from 'react';
import { ShoppingBag, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderSection() {
  return (
    <section id="order-online" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-green-deep relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12] pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1200')" }} />
      <div className="absolute w-[450px] h-[450px] bg-brand-saffron/5 rounded-full blur-[140px] -top-24 -left-24 pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] bg-brand-gold/5 rounded-full blur-[140px] -bottom-24 -right-24 pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10"><span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-gold uppercase mb-3 block">DELIVERY & TAKEAWAY</span><h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-6">Savour the authentic taste in the comfort of your home.</h2><p className="text-base text-brand-cream-ivory/80 max-w-xl mx-auto leading-relaxed mb-12">Can't make it to Muttukadu on ECR? No worries. We deliver hot, aromatic curries, dosas, and filter coffee straight to your doorstep.</p><div className="flex flex-col sm:flex-row justify-center items-center gap-6"><motion.a href="https://www.swiggy.com" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }} className="w-full sm:w-auto px-10 py-4.5 rounded-full bg-[#FC8019] hover:bg-[#e66c05] text-white font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 relative pulse-ring"><ShoppingBag className="w-5 h-5 text-white" /><span>Order on Swiggy</span></motion.a><motion.a href="#" whileHover={{ scale: 1.03 }} className="w-full sm:w-auto px-10 py-4.5 rounded-full bg-transparent hover:bg-white/5 border border-brand-gold hover:border-brand-gold-light text-brand-gold hover:text-brand-gold-light font-bold flex items-center justify-center gap-3 transition-all duration-300 group"><Globe className="w-5 h-5" /><span>Visit Official Website</span><ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" /></motion.a></div><div className="mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-brand-cream-ivory/70"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />Average delivery time: 30–45 mins along ECR corridor.</div></div>
    </section>
  );
}
