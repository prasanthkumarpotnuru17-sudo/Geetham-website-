import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Ticket, Calendar, Users, Clock, AlignLeft,
  RefreshCw, MessageSquareDashed, Ban, Phone, CheckCircle2,
  AlertCircle, Info
} from 'lucide-react';

function StatusBadge({ status }) {
  const styles = {
    Confirmed: 'bg-green-600/10 border border-green-600 text-green-600',
    Cancelled: 'bg-red-600/10 border border-red-600 text-red-600',
    Pending:   'bg-amber-600/10 border border-amber-600 text-amber-600',
  };
  return (
    <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-bold tracking-wide uppercase ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
}

function BookingCard({ b, onCancel, onSMS }) {
  return (
    <motion.div
      key={b.id}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="p-6 rounded-2xl bg-brand-cream-surface dark:bg-[#0c2419] border border-brand-gold/15 shadow-md flex flex-col justify-between relative group hover:border-brand-saffron/40 transition-all duration-300"
    >
      {/* Top Row: ID + Status */}
      <div className="flex justify-between items-center mb-4">
        <span className="font-mono text-xs font-bold text-brand-saffron bg-brand-saffron/5 px-2.5 py-0.5 rounded border border-brand-saffron/15">
          {b.id}
        </span>
        <StatusBadge status={b.status} />
      </div>

      {/* Diner Name */}
      <h4 className="font-serif font-bold text-brand-charcoal dark:text-white text-base mb-4 leading-snug">
        {b.name}
      </h4>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs text-brand-charcoal/70 dark:text-brand-cream-ivory/60 border border-brand-gold/10 rounded-xl p-4 bg-brand-cream/50 dark:bg-brand-green-deep/50 mb-4">
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-brand-gold/60 shrink-0" />
          <span className="font-semibold text-brand-charcoal dark:text-white">{b.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-brand-gold/60 shrink-0" />
          <span className="font-semibold text-brand-charcoal dark:text-white">{b.guests} {Number(b.guests) === 1 ? 'Guest' : 'Guests'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-brand-gold/60 shrink-0" />
          <span className="font-semibold text-brand-charcoal dark:text-white">{b.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-brand-gold/60 shrink-0" />
          <span className="font-semibold text-brand-charcoal dark:text-white">{b.timeSlot}</span>
        </div>
      </div>

      {/* Special Requests */}
      {b.requests && (
        <div className="flex gap-2 p-3 rounded-xl bg-brand-gold/5 border border-brand-gold/15 mb-4 text-xs text-brand-charcoal/80 dark:text-brand-cream-ivory/80 leading-relaxed">
          <AlignLeft className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
          <p><span className="font-semibold text-brand-gold">Requests: </span>{b.requests}</p>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-brand-gold/10 pt-3 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-brand-charcoal/40 dark:text-brand-cream-ivory/30">
            Booked: {new Date(b.createdAt).toLocaleDateString('en-IN')}
          </span>
          <button
            onClick={() => onSMS(b)}
            className="text-brand-saffron hover:underline font-semibold text-[10px] flex items-center gap-1 cursor-pointer border-none bg-transparent"
          >
            <MessageSquareDashed className="w-3 h-3" /> Resend SMS
          </button>
        </div>

        {(b.status === 'Pending' || b.status === 'Confirmed') && (
          <button
            onClick={() => onCancel(b.id)}
            className="w-full py-2.5 rounded-xl border border-red-500/25 bg-red-500/5 hover:bg-red-600 text-red-500 hover:text-white text-[10px] font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Ban className="w-3 h-3" /> Cancel Table Slot
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function MyOrders({ activeUser, onTriggerSMS }) {
  const [phoneSearch, setPhoneSearch] = useState('');
  const [searchedBookings, setSearchedBookings] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadActiveUserBookings = () => {
    if (!activeUser) { setMyBookings([]); return; }
    const allBookings = JSON.parse(localStorage.getItem('geetham_bookings') || '[]');
    const filtered = allBookings
      .filter(b => b.phone.replace(/\s+/g, '') === activeUser.phone.replace(/\s+/g, '') && b.status !== 'Cancelled')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setMyBookings(filtered);
  };

  useEffect(() => {
    loadActiveUserBookings();
    setPhoneSearch('');
    setSearchedBookings([]);
    setHasSearched(false);
  }, [activeUser]);

  useEffect(() => {
    const handleSync = () => {
      loadActiveUserBookings();
      if (hasSearched && phoneSearch) {
        const allBookings = JSON.parse(localStorage.getItem('geetham_bookings') || '[]');
        const cleanPhone = phoneSearch.replace(/\s+/g, '');
        const filtered = allBookings
          .filter(b => b.phone.replace(/\s+/g, '') === cleanPhone && b.status !== 'Cancelled')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setSearchedBookings(filtered);
      }
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('bookings_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('bookings_updated', handleSync);
    };
  }, [hasSearched, phoneSearch, activeUser]);

  const handleLookup = (e) => {
    e.preventDefault();
    if (!phoneSearch.trim()) return;
    setLoading(true);
    setHasSearched(true);
    setTimeout(() => {
      const allBookings = JSON.parse(localStorage.getItem('geetham_bookings') || '[]');
      const cleanPhone = phoneSearch.replace(/\s+/g, '');
      const filtered = allBookings
        .filter(b => b.phone.replace(/\s+/g, '') === cleanPhone && b.status !== 'Cancelled')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setSearchedBookings(filtered);
      setLoading(false);
      if (filtered.length > 0) {
        onTriggerSMS({
          name: filtered[0].name, phone: filtered[0].phone,
          id: filtered[0].id, date: filtered[0].date,
          timeSlot: filtered[0].timeSlot, guests: filtered[0].guests,
          status: filtered[0].status
        });
      }
    }, 800);
  };

  const handleCancelBooking = (id) => {
    if (!window.confirm('Are you sure you want to cancel this reservation slot?')) return;
    const allBookings = JSON.parse(localStorage.getItem('geetham_bookings') || '[]');
    let targetBooking = null;
    const updated = allBookings.map(b => {
      if (b.id === id) { targetBooking = { ...b, status: 'Cancelled' }; return targetBooking; }
      return b;
    });
    localStorage.setItem('geetham_bookings', JSON.stringify(updated));
    window.dispatchEvent(new Event('bookings_updated'));
    if (targetBooking) onTriggerSMS(targetBooking);
  };

  return (
    <section id="orders" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-cream dark:bg-brand-green-deep border-t border-brand-gold/10 relative overflow-hidden select-none theme-transition">
      <div className="absolute w-[300px] h-[300px] bg-brand-saffron/5 rounded-full blur-[120px] top-10 right-10 pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] bg-brand-gold/5 rounded-full blur-[120px] bottom-10 left-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-brand-saffron uppercase mb-3 block">
            RESERVATION DASHBOARD
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-brand-charcoal dark:text-white leading-tight">
            Track Your Table Reservation
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </div>

        {activeUser ? (
          /* ── Authenticated View ── */
          <div className="flex flex-col gap-8">

            {/* Welcome Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-brand-cream-surface dark:bg-brand-green-card border border-brand-gold/15 p-6 rounded-2xl">
              <div>
                <span className="text-xs font-semibold text-brand-saffron tracking-wider uppercase">AUTHENTICATED SESSION</span>
                <h3 className="font-serif text-2xl font-bold text-brand-charcoal dark:text-white mt-1">
                  Namaste, {activeUser.name} 🙏
                </h3>
                <p className="text-xs text-brand-charcoal/70 dark:text-brand-cream-ivory/70 mt-1">
                  Linked phone: <span className="font-semibold text-brand-charcoal dark:text-white">{activeUser.phone}</span> • Your active dining slots are shown below.
                </p>
              </div>
              <button
                onClick={loadActiveUserBookings}
                className="px-4 py-2 text-xs font-bold bg-brand-saffron/10 border border-brand-saffron hover:bg-brand-saffron hover:text-white text-brand-saffron rounded-lg flex items-center gap-2 transition-colors cursor-pointer shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Refresh Log
              </button>
            </div>

            {/* Booking Cards */}
            {myBookings.length === 0 ? (
              <div className="text-center py-16 px-6 border border-dashed border-brand-gold/20 rounded-2xl bg-brand-cream-surface/30 dark:bg-brand-green-card/30">
                <Ticket className="w-12 h-12 text-brand-gold/40 mx-auto mb-4 stroke-[1.2]" />
                <h4 className="font-serif text-lg font-bold text-brand-charcoal/80 dark:text-white/80">No Active Table Reservations</h4>
                <p className="text-xs text-brand-charcoal/60 dark:text-brand-cream-ivory/50 mt-1 max-w-sm mx-auto">
                  Ready to experience our signature ECR coastline vegetarian fine dining? Book a table slot now!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {myBookings.map(b => (
                    <BookingCard
                      key={b.id}
                      b={b}
                      onCancel={handleCancelBooking}
                      onSMS={onTriggerSMS}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

          </div>
        ) : (
          /* ── Guest Lookup View ── */
          <div className="max-w-2xl mx-auto">
            <div className="bg-brand-cream-surface dark:bg-brand-green-card border border-brand-gold/20 p-8 rounded-3xl shadow-xl flex flex-col items-center text-center">

              <Ticket className="w-12 h-12 text-brand-gold mb-4 stroke-[1.2]" />
              <h3 className="font-serif text-2xl font-bold text-brand-charcoal dark:text-white mb-2">
                Guest Table Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-brand-charcoal/70 dark:text-brand-cream-ivory/70 max-w-md mb-6 leading-relaxed">
                Enter your registered mobile number below to retrieve your reservation tickets and receive instant SMS details.
              </p>

              {/* Search Form */}
              <form onSubmit={handleLookup} className="w-full flex flex-col sm:flex-row gap-3 max-w-lg mb-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/40 dark:text-brand-cream-ivory/40" />
                  <input
                    type="tel"
                    required
                    placeholder="Enter phone (e.g. 9876543210)"
                    value={phoneSearch}
                    onChange={e => { setPhoneSearch(e.target.value); if (hasSearched) setHasSearched(false); }}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-brand-gold/20 dark:border-brand-gold/10 bg-brand-cream dark:bg-[#061d12] text-brand-charcoal dark:text-white text-sm focus:outline-none focus:border-brand-saffron"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-brand-saffron hover:bg-brand-saffron-dark text-white rounded-xl text-sm font-bold tracking-wide shadow-md hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Retrieve Ticket'}
                </button>
              </form>

              {/* Search Results */}
              <AnimatePresence mode="wait">
                {hasSearched && !loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="w-full max-w-lg mt-4"
                  >
                    {searchedBookings.length === 0 ? (
                      <div className="p-5 border border-dashed border-red-500/20 bg-red-500/5 rounded-xl flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                        <p className="text-xs font-semibold text-red-600 text-left">
                          No active bookings found for this number. Try a different number or create an account for live logs.
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4 text-left">
                        <div className="p-3 border border-green-500/20 bg-green-500/5 text-green-600 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          {searchedBookings.length} Active Reservation(s) Found! SMS details sent.
                        </div>
                        {searchedBookings.map(b => (
                          <BookingCard
                            key={b.id}
                            b={b}
                            onCancel={handleCancelBooking}
                            onSMS={onTriggerSMS}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hint to sign in */}
              <div className="mt-6 flex items-start gap-2 text-[11px] text-brand-charcoal/40 dark:text-brand-cream-ivory/30 max-w-xs text-center">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>Sign in to your Diner Account for instant booking history without manual phone lookups.</span>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
