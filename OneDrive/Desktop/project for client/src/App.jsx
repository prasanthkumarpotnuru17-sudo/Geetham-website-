import React, { useState, useEffect, Suspense, lazy } from 'react';
import LoadingScreen from './website/components/LoadingScreen';
import TopInfoBar from './website/components/TopInfoBar';
import Navbar from './website/components/Navbar';
import Hero from './website/components/Hero';
import About from './website/components/About';
import FeaturedDishes from './website/components/FeaturedDishes';
import MenuPreview from './website/components/MenuPreview';
import WhyChooseUs from './website/components/WhyChooseUs';
import Reviews from './website/components/Reviews';
import Gallery from './website/components/Gallery';
import Location from './website/components/Location';
import MyOrders from './website/components/MyOrders';
import OrderSection from './website/components/OrderSection';
import Footer from './website/components/Footer';
import BookingModal from './website/components/BookingModal';

const AdminDashboard = lazy(() => import('./admin/AdminDashboardV2'));
const PremiumAdminDashboard = lazy(() => import('./admin/AdminDashboard'));
import AuthModal from './website/components/AuthModal';
import SMSAlertOverlay from './website/components/SMSAlertOverlay';
import WhatsAppButton from './website/components/WhatsAppButton';
import MobileBottomNav from './website/components/MobileBottomNav';
import CartDrawer from './website/components/CartDrawer';
import SwiggyExportModal from './website/components/SwiggyExportModal';
import { ShoppingBag } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true); // Default to gorgeous dark mode
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPremiumAdminOpen, setIsPremiumAdminOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Trigger premium admin screen if query matches
  useEffect(() => {
    if (window.location.search.includes('admin=true')) {
      setIsPremiumAdminOpen(true);
    }
  }, []);

  // User State Setup
  const [activeUser, setActiveUser] = useState(() => {
    try {
      const saved = localStorage.getItem('geetham_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Simulated SMS State Setup
  const [smsNotification, setSmsNotification] = useState(null);

  // Gourmet Cart State System
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('geetham_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSwiggyModalOpen, setIsSwiggyModalOpen] = useState(false);

  // Sync cart items count to local storage
  useEffect(() => {
    try {
      localStorage.setItem('geetham_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true); // Open drawer on addition
  };

  const handleUpdateQuantity = (name, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(name);
      return;
    }
    setCartItems(prev => prev.map(i => i.name === name ? { ...i, quantity } : i));
  };

  const handleRemoveItem = (name) => {
    setCartItems(prev => prev.filter(i => i.name !== name));
  };

  // Initial loading timer
  useEffect(() => {
    // Disable scrolling during load
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, 2800); // Luxury loader duration
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  // Coordinated scroll monitor
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme manager
  useEffect(() => {
    const bodyClass = document.body.classList;
    if (darkMode) {
      bodyClass.add('dark');
      bodyClass.add('bg-[#061d12]');
      bodyClass.remove('bg-brand-cream');
    } else {
      bodyClass.remove('dark');
      bodyClass.remove('bg-[#061d12]');
      bodyClass.add('bg-brand-cream');
    }
  }, [darkMode]);

  const handleLoginSuccess = (user) => {
    setActiveUser(user);
    // Dispatch bookings update event to sync child dashboard views instantly
    window.dispatchEvent(new Event('bookings_updated'));
  };

  const handleLogout = () => {
    localStorage.removeItem('geetham_active_user');
    setActiveUser(null);
    window.dispatchEvent(new Event('bookings_updated'));
  };

  const triggerSMSAlert = (bookingDetails) => {
    setSmsNotification(bookingDetails);
  };

  return (
    <>
      {/* 1. Loading Entrance Screen */}
      {loading && <LoadingScreen />}

      {/* Main Container */}
      <div className="min-h-screen flex flex-col relative select-none overflow-x-hidden w-full">
        
        {/* Coordinated Sticky Header Group */}
        <header className="fixed top-0 left-0 w-full z-40 flex flex-col pointer-events-none">
          <div className="pointer-events-auto w-full">
            {/* 2. Top Info Metrics Bar */}
            <TopInfoBar collapsed={scrolled} />

            {/* 3. Sticky Frosted Header Navbar */}
            <Navbar 
              scrolled={scrolled}
              darkMode={darkMode} 
              setDarkMode={setDarkMode} 
              onOpenBookModal={() => setIsBookModalOpen(true)}
              onOpenAdmin={() => setIsAdminOpen(true)}
              activeUser={activeUser}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              onLogout={handleLogout}
            />
          </div>
        </header>


        {/* 4. Cinematic Hero Banner */}
        <Hero onOpenBookModal={() => setIsBookModalOpen(true)} />

        {/* 5. About Story Section */}
        <About />

        {/* 6. Featured Signature Dishes */}
        <FeaturedDishes />

        {/* 7. Categorized Menu Preview */}
        <MenuPreview onAddToCart={handleAddToCart} />

        {/* 8. Why Diners Choose Us */}
        <WhyChooseUs />

        {/* 9. Guest Testimonials Grid */}
        <Reviews />

        {/* 10. Masonry Zoom Gallery */}
        <Gallery />

        {/* 11. Google Maps & Contact Locations */}
        <Location onOpenBookModal={() => setIsBookModalOpen(true)} />

        {/* 11.5. Table Reservation Status inquiry tracker ("Orders Block") */}
        <MyOrders activeUser={activeUser} onTriggerSMS={triggerSMSAlert} />

        {/* 12. Delivery Channels Order Banner */}
        <OrderSection />

        {/* 13. Comprehensive Footing */}
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

        {/* 14. Floating WhatsApp Chat widget */}
        <WhatsAppButton />

        {/* 15. Mobile Tab Dock Docking navigation */}
        <MobileBottomNav onOpenBookModal={() => setIsBookModalOpen(true)} />

        {/* --- DYNAMIC INTERACTIVE SYSTEMS --- */}
        
        {/* Reservation Booking Form Modal Dialog */}
        <BookingModal 
          isOpen={isBookModalOpen} 
          onClose={() => setIsBookModalOpen(false)} 
          activeUser={activeUser}
          onBookingSuccess={triggerSMSAlert}
        />

        {/* Reservation POS Console Database Panel */}
        <Suspense fallback={null}>
          <AdminDashboard 
            isOpen={isAdminOpen} 
            onClose={() => setIsAdminOpen(false)} 
          />
        </Suspense>

        {/* Premium Standing Restaurant SaaS Admin Dashboard */}
        <Suspense fallback={null}>
          <PremiumAdminDashboard 
            isOpen={isPremiumAdminOpen} 
            onClose={() => {
              setIsPremiumAdminOpen(false);
              if (window.history.pushState) {
                const cleanUrl = window.location.origin + window.location.pathname;
                window.history.pushState({ path: cleanUrl }, '', cleanUrl);
              }
            }} 
          />
        </Suspense>

        {/* User Account Login/Register Glass Modal */}
        <AuthModal 
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />

        {/* Phone Message SMS Simulator alert Overlay */}
        <SMSAlertOverlay 
          notification={smsNotification}
          onClose={() => setSmsNotification(null)}
        />

        {/* Floating Shopping Cart Bubble */}
        <AnimatePresence>
          {cartItems.length > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 20 }}
              className="fixed bottom-24 right-6 z-40 select-none"
            >
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 p-3.5 bg-brand-gold hover:bg-brand-gold-dark text-[#061d12] font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group relative cursor-pointer border border-brand-gold-light/20"
                title="View Gourmet Cart"
              >
                {/* Pulsing ring inside button */}
                <span className="absolute inset-0 rounded-full border border-brand-gold group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping" />
                
                <ShoppingBag className="w-5.5 h-5.5 shrink-0" />
                
                {/* Badge showing items count */}
                <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#D95A1E] text-white text-[10px] font-sans font-bold flex items-center justify-center border-2 border-brand-cream dark:border-brand-green-deep shadow-md">
                  {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
                </span>
                
                {/* Text showing current subtotal that reveals on hover */}
                <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-500 ease-out whitespace-nowrap text-xs font-serif font-semibold pr-1">
                  ₹{cartItems.reduce((sum, item) => {
                    const priceNum = typeof item.price === 'string' 
                      ? parseInt(item.price.replace(/[^\d]/g, ''), 10) 
                      : item.price;
                    return sum + (priceNum * item.quantity);
                  }, 0)}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gourmet Shopping Cart sliding drawer */}
        <CartDrawer 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsSwiggyModalOpen(true);
          }}
        />

        {/* Swiggy Export Transition Modal */}
        <SwiggyExportModal 
          isOpen={isSwiggyModalOpen}
          onClose={() => setIsSwiggyModalOpen(false)}
          cartItems={cartItems}
        />

      </div>
    </>
  );
}
