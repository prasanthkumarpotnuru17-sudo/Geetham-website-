import React, { useState } from 'react';
import { Menu, X, Sun, Moon, CalendarPlus, User, ChevronDown, LogOut, Ticket } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export default function Navbar({ scrolled, darkMode, setDarkMode, onOpenBookModal, onOpenAdmin, activeUser, onOpenAuthModal, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Dishes', href: '#dishes' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Location', href: '#location' },
  ];

  const handleDropdownToggle = () => setUserDropdownOpen(prev => !prev);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`relative w-full z-40 theme-transition ${scrolled ? 'py-2 shadow-lg glass-nav backdrop-blur-md' : 'py-3.5 bg-transparent border-b border-white/5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group select-none">
            <img src={logoImg} alt="Geetham Logo" className="w-7.5 h-7.5 object-contain drop-shadow-[0_0_4px_rgba(217,90,30,0.3)] group-hover:scale-105 transition-transform duration-300" />
            <span className={`font-serif text-xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? 'text-brand-charcoal dark:text-brand-cream-ivory group-hover:text-brand-saffron dark:group-hover:text-brand-saffron' : 'text-brand-cream-ivory group-hover:text-brand-saffron'}`}>Geetham<span className="text-brand-saffron font-serif font-normal">.</span></span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={`font-medium text-[15px] transition-colors duration-300 py-1 border-b border-transparent hover:border-brand-saffron ${scrolled ? 'text-brand-charcoal/85 dark:text-brand-cream-ivory/85 hover:text-brand-saffron dark:hover:text-brand-saffron' : 'text-brand-cream-ivory/85 hover:text-brand-saffron'}`}>{link.name}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3.5">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${scrolled ? 'border-brand-gold/20 text-brand-charcoal dark:text-brand-cream-ivory hover:bg-brand-gold/10 hover:text-brand-gold dark:hover:text-brand-gold' : 'border-white/20 text-brand-cream-ivory hover:bg-white/10 hover:text-brand-gold'}`} aria-label="Toggle Theme">{darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</button>
            {activeUser ? (
              <div className="relative">
                <button onClick={handleDropdownToggle} className={`px-4 py-2 rounded-full border transition-all duration-300 flex items-center gap-2 cursor-pointer ${scrolled ? 'border-brand-gold/30 bg-brand-gold/5 text-brand-charcoal dark:text-brand-cream-ivory hover:bg-brand-gold/10' : 'border-white/20 bg-white/5 text-brand-cream-ivory hover:bg-white/15'}`}>
                  <User className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="font-serif font-bold text-xs">Namaste, {activeUser.name}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {userDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2.5 w-48 rounded-xl bg-brand-cream dark:bg-[#0c2419] border border-brand-gold/25 shadow-2xl p-2 z-20 flex flex-col gap-1 theme-transition">
                      <a href="#orders" onClick={(e) => { setUserDropdownOpen(false); handleNavClick(e, '#orders'); }} className="px-3.5 py-2.5 text-xs font-bold text-brand-charcoal dark:text-brand-cream-ivory hover:bg-brand-saffron/10 hover:text-brand-saffron rounded-lg flex items-center gap-2 transition-all"><Ticket className="w-3.5 h-3.5 text-brand-gold" />My Bookings</a>
                      <button onClick={() => { setUserDropdownOpen(false); onLogout(); }} className="w-full text-left px-3.5 py-2.5 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-lg flex items-center gap-2 transition-all cursor-pointer border-none"><LogOut className="w-3.5 h-3.5" />Sign Out</button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button onClick={onOpenAuthModal} className={`px-4.5 py-2 rounded-full font-bold text-[13px] border transition-all duration-300 cursor-pointer ${scrolled ? 'border-brand-gold/30 hover:border-brand-saffron text-brand-charcoal dark:text-brand-cream-ivory hover:bg-brand-saffron/5 hover:text-brand-saffron' : 'border-white/20 hover:border-white text-brand-cream-ivory hover:bg-white/10'}`}>Sign In</button>
            )}
            <button onClick={onOpenBookModal} className="px-5 py-2 rounded-full bg-brand-saffron hover:bg-brand-saffron-dark text-white font-medium text-[14px] shadow-saffron-glow hover:scale-[1.03] transition-all duration-300 flex items-center gap-2 cursor-pointer"><CalendarPlus className="w-3.5 h-3.5" />Book a Table</button>
          </div>
          <div className="flex md:hidden items-center gap-2.5">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-1.5 rounded-full border transition-all duration-300 cursor-pointer ${scrolled ? 'border-brand-gold/25 text-brand-charcoal dark:text-brand-cream-ivory hover:bg-brand-gold/10' : 'border-white/20 text-brand-cream-ivory hover:bg-white/10'}`}>{darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</button>
            {activeUser ? (<a href="#orders" onClick={(e) => handleNavClick(e, '#orders')} className="p-1.5 rounded-full bg-brand-gold/10 border border-brand-gold text-brand-gold shadow-sm" title="My Bookings"><User className="w-4 h-4" /></a>) : (<button onClick={onOpenAuthModal} className="p-1.5 rounded-full border border-brand-gold/20 text-brand-charcoal dark:text-brand-cream-ivory cursor-pointer"><User className="w-4 h-4" /></button>)}
            <button onClick={onOpenBookModal} className="p-1.5 rounded-full bg-brand-saffron text-white shadow-md cursor-pointer" aria-label="Book Table"><CalendarPlus className="w-4 h-4" /></button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`p-1.5 rounded-lg transition-colors cursor-pointer ${scrolled ? 'text-brand-charcoal dark:text-brand-cream-ivory hover:bg-brand-gold/10' : 'text-brand-cream-ivory hover:bg-white/10'}`}>{mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}</button>
          </div>
        </div>
      </nav>
      <div className={`fixed inset-0 z-30 transition-all duration-500 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        <div className={`absolute top-0 right-0 w-[280px] h-full bg-brand-cream dark:bg-brand-green-deep p-6 pt-24 shadow-2xl flex flex-col justify-between transition-transform duration-500 ease-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col gap-6">
            {activeUser && (<div className="p-3 border border-brand-gold/20 bg-brand-gold/5 rounded-xl text-center mb-2"><span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block">SESSION</span><span className="font-serif font-bold text-brand-charcoal dark:text-brand-cream-ivory text-sm">Namaste, {activeUser.name}</span></div>)}
            {navLinks.map((link, idx) => (<a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="font-serif text-xl text-brand-charcoal dark:text-brand-cream-ivory hover:text-brand-saffron transition-colors py-2 border-b border-brand-gold/5" style={{ transitionDelay: `${idx * 50}ms` }}>{link.name}</a>))}
          </div>
          <div className="flex flex-col gap-4 border-t border-brand-gold/10 pt-6">
            {activeUser ? (<div className="flex flex-col gap-2"><a href="#orders" onClick={(e) => handleNavClick(e, '#orders')} className="w-full py-2.5 rounded-xl border border-brand-gold text-brand-gold font-bold text-center text-xs tracking-wider uppercase bg-brand-gold/5">My Reservations</a><button onClick={() => { setMobileMenuOpen(false); onLogout(); }} className="w-full py-2.5 rounded-xl bg-red-600/10 border border-red-600 hover:bg-red-600 text-red-500 hover:text-white font-bold text-center text-xs tracking-wider uppercase cursor-pointer">Sign Out</button></div>) : (<button onClick={() => { setMobileMenuOpen(false); onOpenAuthModal(); }} className="w-full py-2.5 rounded-xl border border-brand-gold text-brand-gold font-bold text-center text-xs tracking-wider uppercase cursor-pointer">Sign In / Register</button>)}
            <button onClick={() => { setMobileMenuOpen(false); onOpenBookModal(); }} className="w-full py-3 rounded-full bg-brand-saffron hover:bg-brand-saffron-dark text-white font-semibold text-center shadow-lg flex items-center justify-center gap-2 cursor-pointer"><CalendarPlus className="w-4 h-4" />Book a Table</button>
            <button onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }} className="text-xs text-center text-brand-gold hover:underline mt-2 font-medium tracking-widest uppercase cursor-pointer">Reservation Dashboard</button>
            <p className="text-[10px] text-center text-brand-charcoal/50 dark:text-brand-cream-ivory/40">Muttukadu, ECR, Chennai.</p>
          </div>
        </div>
      </div>
    </>
  );
}
