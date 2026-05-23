import React from 'react';
import { Star, Wallet, Utensils, Clock, Phone } from 'lucide-react';

export default function TopInfoBar({ collapsed }) {
  return (
    <div className={`w-full bg-[#05180f] text-brand-cream-ivory text-xs border-b border-brand-gold/10 relative z-40 select-none transition-all duration-300 ease-in-out ${
      collapsed 
        ? 'max-h-0 py-0 opacity-0 border-b-0 overflow-hidden' 
        : 'max-h-[80px] py-2.5 px-4 opacity-100 overflow-visible'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-1.5 hover:text-brand-gold transition-colors duration-300">
            <Star className="w-3.5 h-3.5 fill-brand-gold stroke-brand-gold" />
            <span className="font-semibold text-brand-gold">3.9</span>
            <span className="opacity-75">(11,962 reviews)</span>
          </div>
          <div className="hidden sm:block w-px h-3 bg-brand-gold/20" />
          <div className="flex items-center gap-1.5 hover:text-brand-gold transition-colors duration-300">
            <Wallet className="w-3.5 h-3.5 text-brand-gold opacity-90" />
            <span>₹200–400 per person</span>
          </div>
          <div className="hidden md:block w-px h-3 bg-brand-gold/20" />
          <div className="flex items-center gap-1.5 hover:text-brand-gold transition-colors duration-300">
            <Utensils className="w-3.5 h-3.5 text-brand-gold opacity-90" />
            <span>Dine-in • Takeaway • No-contact Delivery</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-1.5 hover:text-brand-gold transition-colors duration-300">
            <Clock className="w-3.5 h-3.5 text-brand-gold opacity-90" />
            <span>Open until 12 AM</span>
          </div>
          <div className="w-px h-3 bg-brand-gold/20" />
          <a href="tel:07904058228" className="flex items-center gap-1.5 hover:text-brand-saffron text-brand-cream-ivory transition-colors duration-300 group">
            <Phone className="w-3.5 h-3.5 text-brand-gold group-hover:text-brand-saffron transition-colors" />
            <span className="font-medium">079040 58228</span>
          </a>
        </div>
      </div>
    </div>
  );
}
