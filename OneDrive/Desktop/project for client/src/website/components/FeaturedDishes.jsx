import React from 'react';
import { motion } from 'framer-motion';

export default function FeaturedDishes() {
  const dishes = [
    { title: "Ghee Dosa", price: "₹160", description: "Lacy, crisp dosa cooked in pure cow ghee — the Geetham classic.", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=600" },
    { title: "Ghee Podi Masala Dosa", price: "₹190", description: "Spiced gunpowder, soft potato masala, golden ghee crust.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600" },
    { title: "Filter Coffee", price: "₹70", description: "Decoction brewed slow. Served frothy in a steel tumbler.", image: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=600" },
    { title: "Thali Meals", price: "₹260", description: "Sambar, rasam, kootu, poriyal, curd, pickle, rice & sweet.", image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=600" },
    { title: "Idli", price: "₹90", description: "Steamed pillow-soft idlis with sambar & three chutneys.", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600" },
    { title: "Royal Falooda", price: "₹180", description: "Rose syrup, vermicelli, basil seeds & a scoop of kulfi.", image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=600" }
  ];

  return (
    <section id="dishes" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-cream dark:bg-[#061d12] theme-transition select-none">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16">
          <div className="lg:col-span-8"><span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-saffron uppercase mb-3 block">FEATURED DISHES</span><h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-bold tracking-tight text-brand-charcoal dark:text-brand-cream-ivory">The plates that keep ECR <br className="hidden sm:block" /> coming back.</h2></div>
          <div className="lg:col-span-4"><p className="text-base text-brand-charcoal/70 dark:text-brand-cream-ivory/70 leading-relaxed lg:border-l lg:border-brand-gold/25 lg:pl-6">Crisp ghee dosas, hand-pressed filter coffee, complete thali meals — chosen by our guests, perfected by our chefs.</p></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <motion.div key={dish.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }} whileHover={{ y: -8 }} className="group rounded-[28px] overflow-hidden bg-brand-cream-surface dark:bg-[#0c2419] border border-brand-gold/15 dark:border-brand-gold/10 hover:border-brand-gold/30 shadow-lg hover:shadow-2xl hover:shadow-brand-gold/5 transition-all duration-500 flex flex-col h-full">
              <div className="relative aspect-[4/3] overflow-hidden"><img src={dish.image} alt={dish.title} className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out group-hover:scale-110" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-brand-cream-surface dark:from-[#0c2419] to-transparent opacity-60 pointer-events-none transition-colors duration-500" /><span className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-brand-saffron text-white text-xs font-bold tracking-wider shadow-md">{dish.price}</span></div>
              <div className="p-6 flex flex-col justify-between flex-grow"><div><h3 className="font-serif text-2xl font-semibold text-brand-charcoal dark:text-white tracking-wide mb-2 group-hover:text-brand-saffron dark:group-hover:text-brand-gold transition-colors duration-300">{dish.title}</h3><p className="text-sm text-brand-charcoal/70 dark:text-brand-cream-ivory/70 leading-relaxed font-medium transition-colors duration-300">{dish.description}</p></div><div className="w-12 h-0.5 bg-brand-gold/35 mt-6 group-hover:w-20 transition-all duration-500 rounded-full" /></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
