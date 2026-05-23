import React from 'react';
import { Home, Info, Sparkles, BookOpen, CalendarPlus } from 'lucide-react';

export default function MobileBottomNav({ onOpenBookModal }) {
  const navigateTo = (target) => {
    if (target === '#') window.scrollTo({ top: 0, behavior: 'smooth' });
    else {
      const element = document.getElementById(target.replace('#', ''));
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  const navItems = [ { label: 'Home', icon: Home, target: '#' }, { label: 'About', icon: Info, target: '#about' }, { label: 'Reserve', icon: CalendarPlus, isCenter: true }, { label: 'Dishes', icon: Sparkles, target: '#dishes' }, { label: 'Menu', icon: BookOpen, target: '#menu' } ];

  return (
    <div className="fixed bottom-4 inset-x-4 z-40 md:hidden select-none"><div className="glass-premium py-2 px-3 rounded-2xl flex items-center justify-between border border-brand-gold/15 shadow-2xl relative">{navItems.map((item, idx) => { const Icon = item.icon; if (item.isCenter) return (<button key={idx} onClick={onOpenBookModal} className="w-12 h-12 rounded-full bg-brand-saffron hover:bg-brand-saffron-dark text-white flex items-center justify-center shadow-lg shadow-brand-saffron/20 border border-brand-gold/20 -translate-y-4 relative z-50 cursor-pointer" aria-label="Book a table"><Icon className="w-5.5 h-5.5 stroke-[2]" /></button>); return (<button key={idx} onClick={() => navigateTo(item.target)} className="flex flex-col items-center justify-center py-1 px-3 text-brand-charcoal/70 dark:text-brand-cream-ivory/70 hover:text-brand-saffron dark:hover:text-brand-gold transition-colors duration-300 gap-0.5 cursor-pointer"><Icon className="w-4.5 h-4.5 stroke-[1.8]" /><span className="text-[9px] font-bold tracking-wider uppercase font-sans">{item.label}</span></button>); })}</div></div>
  );
}
