import React from 'react';
import { motion } from 'framer-motion';
import heroBg from '../assets/hero-bg.jpg';

export default function SubPageHeader({ title, subtitle, breadcrumb }) {
  return (
    <div className="relative w-full h-[40vh] sm:h-[45vh] flex items-center justify-center overflow-hidden pt-28 pb-12 select-none">
      
      {/* Background Image with Cinematic Deep Forest Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Dynamic Theme-aware Backing Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#061d12]/90 via-[#061d12]/85 to-[#061d12] dark:from-[#061d12]/90 dark:via-[#061d12]/85 dark:to-[#061d12]" />
      
      {/* Ambient Saffron Glow Filter */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[400px] h-[150px] sm:h-[200px] rounded-full bg-brand-saffron/10 blur-[80px] sm:blur-[120px] pointer-events-none" />

      {/* Cinematic Golden Accent Borders */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
        
        {/* Animated breadcrumb links */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-3 text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-brand-gold"
        >
          <a href="#/" className="hover:text-brand-saffron transition-colors">Home</a>
          <span className="text-brand-gold/40">/</span>
          <span className="text-brand-saffron-light">{breadcrumb}</span>
        </motion.div>

        {/* Elegant Gold Divider line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-16 h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent mb-5"
        />

        {/* Antique Serif Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-cream-ivory leading-tight mb-3"
        >
          {title}
        </motion.h1>

        {/* Cohesive Tagline */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs sm:text-sm md:text-base text-brand-cream-ivory/70 max-w-xl font-medium tracking-wide"
        >
          {subtitle}
        </motion.p>
        
      </div>
      
    </div>
  );
}
