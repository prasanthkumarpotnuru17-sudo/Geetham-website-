import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Users, ParkingCircle, Clock, ShieldCheck, Leaf } from 'lucide-react';

export default function WhyChooseUs() {
  const points = [ { title: "Authentic South Indian Taste", desc: "Recipes passed through generations, cooked the slow way every day.", icon: Utensils }, { title: "Spacious Family Dining", desc: "Comfortable seating designed for celebrations and Sunday brunches.", icon: Users }, { title: "Large Parking Area", desc: "Hassle-free parking on ECR — pull in, park easy, walk straight in.", icon: ParkingCircle }, { title: "Fast Service", desc: "Trained stewards, hot food, quick refills. No long waits.", icon: Clock }, { title: "Hygienic Kitchen", desc: "FSSAI standards with daily audits. Clean prep, clean plates.", icon: ShieldCheck }, { title: "Fresh Ingredients", desc: "Daily produce, ground masalas, cold-pressed oils.", icon: Leaf } ];
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-cream dark:bg-[#061d12] theme-transition select-none">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-16 max-w-2xl"><span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#D95A1E] uppercase mb-3 block">WHY GEETHAM</span><h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-normal tracking-tight text-brand-charcoal dark:text-brand-cream-ivory leading-[1.15]">Six reasons ECR families pick us, <br />again and again.</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{points.map((point, index) => { const Icon = point.icon; return (<motion.div key={point.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: index * 0.08 }} whileHover={{ y: -4 }} className="p-8 rounded-[24px] bg-brand-cream-surface dark:bg-[#0c2419] border border-brand-gold/5 dark:border-white/5 transition-all duration-300 group"><div className="text-brand-gold mb-6"><Icon className="w-6 h-6 stroke-[1.5]" /></div><h3 className="font-serif text-xl sm:text-2xl font-normal text-brand-charcoal dark:text-brand-cream-ivory group-hover:text-brand-saffron dark:group-hover:text-brand-gold transition-colors duration-300 mb-3">{point.title}</h3><p className="text-sm text-brand-charcoal/70 dark:text-brand-cream-ivory/70 leading-relaxed font-medium">{point.desc}</p></motion.div>); })}</div>
      </div>
    </section>
  );
}
