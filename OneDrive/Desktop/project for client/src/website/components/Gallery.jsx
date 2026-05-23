import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryItems = [
    { title: "Dosa, made to order", desc: "Our skilled chefs making golden ghee roast dosa on a sizzling iron griddle.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800", aspect: "aspect-[3/4]" },
    { title: "Inside Geetham", desc: "Spacious premium dining area decorated with elegant brass lamps and warm wood.", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800", aspect: "aspect-[3/2]" },
    { title: "Filter coffee ritual", desc: "The traditional art of pouring rich frothy coffee from heights to perfection.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800", aspect: "aspect-[3/2]" },
    { title: "Family table", desc: "Warm memories created over delicious shared meals in Muttukadu ECR.", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800", aspect: "aspect-[3/2]" },
    { title: "The Geetham thali", desc: "Authentic lunch delicacies freshly served on clean, lush organic banana leaves.", image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=800", aspect: "aspect-[3/4]" },
    { title: "Royal falooda", desc: "Sweet, cooling desserts and kulfi faloodas to conclude a grand vegetarian feast.", image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=800", aspect: "aspect-[4/3]" }
  ];
  const getCard = (item, index) => (
    <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: index * 0.1 }} onClick={() => setSelectedImage(item)} className={`relative ${item.aspect} rounded-[24px] overflow-hidden group cursor-pointer border border-brand-gold/10 shadow-md`}>
      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent flex flex-col justify-end p-6 select-none"><h3 className="font-serif text-lg sm:text-xl font-normal text-white tracking-wide">{item.title}</h3></div>
      <div className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"><ZoomIn className="w-4 h-4 text-brand-gold" /></div>
      <div className="absolute inset-0 border border-brand-gold/5 group-hover:border-brand-gold/20 rounded-[24px] pointer-events-none transition-colors" />
    </motion.div>
  );

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-cream dark:bg-[#061d12] theme-transition select-none">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-16 max-w-2xl"><span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#D95A1E] uppercase mb-3 block">GALLERY</span><h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-normal tracking-tight text-brand-charcoal dark:text-brand-cream-ivory">A walkthrough Geetham.</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><div className="flex flex-col gap-6">{getCard(galleryItems[0], 0)}{getCard(galleryItems[5], 5)}</div><div className="flex flex-col gap-6">{getCard(galleryItems[1], 1)}{getCard(galleryItems[3], 3)}</div><div className="flex flex-col gap-6">{getCard(galleryItems[2], 2)}{getCard(galleryItems[4], 4)}</div></div>
      </div>
      <AnimatePresence>{selectedImage && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"><div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedImage(null)} /><motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} transition={{ type: "spring", duration: 0.5 }} className="relative max-w-4xl w-full bg-[#061d12] border border-brand-gold/20 rounded-[28px] overflow-hidden shadow-2xl z-10 flex flex-col"><button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-[#D95A1E] text-white transition-colors duration-300" aria-label="Close Lightbox"><X className="w-5 h-5" /></button><div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden"><img src={selectedImage.image} alt={selectedImage.title} className="w-full h-full object-cover" /></div><div className="p-6 bg-[#051a10] border-t border-brand-gold/10"><h3 className="font-serif text-2xl font-bold text-white tracking-wide mb-2">{selectedImage.title}</h3><p className="text-sm text-brand-cream-ivory/80 leading-relaxed">{selectedImage.desc}</p></div></motion.div></motion.div>)}</AnimatePresence>
    </section>
  );
}
