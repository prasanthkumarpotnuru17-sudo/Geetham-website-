import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-cream dark:bg-brand-green-deep theme-transition overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="lg:col-span-7 flex flex-col justify-center">
            <motion.span variants={itemVariants} className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-saffron uppercase mb-3">OUR STORY</motion.span>
            <motion.h2 variants={itemVariants} className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-bold tracking-tight text-brand-charcoal dark:text-brand-cream-ivory leading-[1.2] mb-6">A South Indian table that feels <span className="cursive-text font-serif italic text-brand-saffron block sm:inline">like home,</span> with the polish of a fine restaurant.</motion.h2>
            <motion.p variants={itemVariants} className="text-base text-brand-charcoal/80 dark:text-brand-cream-ivory/80 leading-relaxed mb-8 max-w-2xl">Geetham Veg Restaurant is one of the most loved vegetarian restaurants on ECR. We are known for authentic South Indian flavours, spacious ambience, excellent parking, family-friendly dining and quick, warm service. From sunrise idlis to late-night ghee dosas, every plate is rooted in tradition and made fresh in our kitchen.</motion.p>
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 sm:gap-8 border-t border-brand-gold/15 pt-8">
              <div><h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-saffron mb-1">12+</h3><p className="text-[10px] sm:text-xs font-bold tracking-widest text-brand-charcoal/60 dark:text-brand-cream-ivory/50 uppercase">YRS ON ECR</p></div>
              <div className="border-l border-brand-gold/10 pl-6 sm:pl-8"><h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-gold mb-1">100%</h3><p className="text-[10px] sm:text-xs font-bold tracking-widest text-brand-charcoal/60 dark:text-brand-cream-ivory/50 uppercase">PURE VEG</p></div>
              <div className="border-l border-brand-gold/10 pl-6 sm:pl-8"><h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-saffron mb-1">Daily</h3><p className="text-[10px] sm:text-xs font-bold tracking-widest text-brand-charcoal/60 dark:text-brand-cream-ivory/50 uppercase">FRESH PREP</p></div>
            </motion.div>
          </motion.div>
          <div className="lg:col-span-5 relative flex justify-center py-8">
            <div className="absolute w-[80%] h-[80%] rounded-[40px] bg-brand-gold/5 blur-[50px] top-6 left-6" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.0, ease: 'easeOut' }} viewport={{ once: true, margin: "-100px" }} className="relative w-full max-w-[420px] aspect-[4/5] sm:aspect-[4/5] rounded-[32px] overflow-visible">
              <div className="w-full h-full rounded-[32px] overflow-hidden bg-brand-green-card border border-brand-gold/10 shadow-xl"><img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800" alt="Geetham Muttukadu Restaurant Ambience" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[6000ms] ease-out" /></div>
              <motion.div initial={{ opacity: 0, y: 30, x: -30 }} whileInView={{ opacity: 1, y: 0, x: 0 }} transition={{ duration: 1.0, delay: 0.4, ease: 'easeOut' }} viewport={{ once: true }} className="absolute -bottom-8 -left-6 sm:-left-12 w-[160px] sm:w-[220px] aspect-square rounded-[24px] overflow-hidden border-4 border-brand-cream dark:border-brand-green-deep shadow-2xl z-10"><img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600" alt="Steaming Filter Coffee Pour" className="w-full h-full object-cover hover:scale-110 transition-transform duration-3000 ease-out" /></motion.div>
              <div className="absolute -top-4 -right-4 w-full h-full rounded-[32px] border border-brand-gold/20 -z-10 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
