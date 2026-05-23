import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Search, Check, Ban, Trash2, ShieldAlert, Sparkles, 
  RefreshCw, Users, Calendar, Clock, Phone, MessageSquare, AlertCircle
} from 'lucide-react';

export default function AdminDashboardV2({ isOpen, onClose }) {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const loadBookings = () => {
    const data = JSON.parse(localStorage.getItem('geetham_bookings') || '[]');
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setBookings(data);
  };

  useEffect(() => {
    if (isOpen) loadBookings();
  }, [isOpen]);

  const syncBookings = (updatedData) => {
    localStorage.setItem('geetham_bookings', JSON.stringify(updatedData));
    setBookings(updatedData);
    window.dispatchEvent(new Event('bookings_updated'));
  };

  const loadMockData = () => {
    const mockBookings = [];
    syncBookings(mockBookings);
  };

  const handleUpdateStatus = (id, newStatus) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    syncBookings(updated);
  };

  const handleDeleteBooking = (id) => {
    if (confirm("Are you sure you want to permanently delete this reservation record?")) {
      const updated = bookings.filter(b => b.id !== id);
      syncBookings(updated);
    }
  };

  const counts = useMemo(() => ({
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    confirmed: bookings.filter(b => b.status === 'Confirmed').length,
    cancelled: bookings.filter(b => b.status === 'Cancelled').length,
  }), [bookings]);

  const filteredBookings = useMemo(() => bookings.filter(b => {
    const matchesSearch = 
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  }), [bookings, searchTerm, filterStatus]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div className="relative bg-[#05180f] border border-brand-gold/20 max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[85vh] md:h-[80vh] text-brand-cream-ivory z-10">
            <div className="h-1.5 w-full bg-gradient-to-r from-brand-gold via-brand-saffron to-brand-gold" />
            <div className="p-6 border-b border-brand-gold/10 bg-[#061d12] flex justify-between items-start gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Host Management Console</span>
                  <span className="text-xs bg-brand-gold/10 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded font-sans uppercase font-bold tracking-wider">POS Hub</span>
                </h3>
                <p className="text-xs text-brand-cream-ivory/70 mt-1">Manage digital tables, approve diner slots, and monitor restaurant loading on ECR.</p>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/5 border border-white/10 hover:border-brand-gold/45 text-brand-cream-ivory hover:text-brand-gold transition-all duration-300 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-4 border-b border-brand-gold/10 bg-[#0d2a1c]/20 text-center text-xs divide-x divide-brand-gold/10">
              <div className="py-4.5"><span className="text-brand-cream-ivory/60 block text-[10px] uppercase font-bold tracking-wider">Total Slots</span><span className="text-lg font-bold text-white mt-0.5 block">{counts.total}</span></div>
              <div className="py-4.5"><span className="text-amber-500 block text-[10px] uppercase font-bold tracking-wider">Pending</span><span className="text-lg font-bold text-amber-500 mt-0.5 block">{counts.pending}</span></div>
              <div className="py-4.5"><span className="text-emerald-500 block text-[10px] uppercase font-bold tracking-wider">Confirmed</span><span className="text-lg font-bold text-emerald-500 mt-0.5 block">{counts.confirmed}</span></div>
              <div className="py-4.5"><span className="text-red-400 block text-[10px] uppercase font-bold tracking-wider">Cancelled</span><span className="text-lg font-bold text-red-400 mt-0.5 block">{counts.cancelled}</span></div>
            </div>
            <div className="p-5 border-b border-brand-gold/10 bg-[#05180f] flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="relative w-full sm:max-w-xs">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-brand-cream-ivory/55"><Search className="w-4 h-4" /></span>
                <input type="text" placeholder="Search name, phone, or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9.5 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm placeholder-brand-cream-ivory/40 text-white focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all" />
              </div>
              <div className="flex items-center gap-2.5 w-full sm:w-auto overflow-x-auto justify-end">
                <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                  {['All', 'Pending', 'Confirmed', 'Cancelled'].map(status => (
                    <button key={status} onClick={() => setFilterStatus(status)} className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${filterStatus === status ? 'bg-brand-gold text-[#05180f]' : 'text-brand-cream-ivory/70 hover:text-white'}`}>{status}</button>
                  ))}
                </div>
                <button onClick={loadBookings} className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-gold/30 text-brand-cream-ivory transition-colors cursor-pointer" title="Force Refresh Data"><RefreshCw className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5 bg-[#061d12]/30 space-y-4">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center gap-4">
                  <AlertCircle className="w-10 h-10 text-brand-gold/60" />
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white">No Reservations Found</h4>
                    <p className="text-xs text-brand-cream-ivory/60 max-w-sm mx-auto mt-1">{searchTerm || filterStatus !== 'All' ? "No listings match your search keywords or active status filter criteria." : "There are currently no diner bookings saved. Hydrate the local database with rich test records below."}</p>
                  </div>
                  {bookings.length === 0 && <button onClick={loadMockData} className="px-4.5 py-2 bg-gradient-to-r from-brand-gold to-brand-saffron hover:from-brand-gold hover:to-brand-gold-dark text-[#05180f] font-bold text-xs rounded-lg transition-all shadow-md flex items-center gap-1.5 cursor-pointer mt-2"><Sparkles className="w-3.5 h-3.5" /><span>Load Mock Reservations</span></button>}
                </div>
              ) : (
                filteredBookings.map(b => (
                  <div key={b.id} className="p-5 rounded-xl bg-white/[0.03] border border-brand-gold/10 hover:border-brand-gold/25 transition-all duration-300 relative flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div className="space-y-3.5 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono text-xs font-bold text-brand-gold tracking-wide">{b.id}</span>
                        <span className="text-[10px] text-brand-cream-ivory/40">• {new Date(b.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${b.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' : b.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>{b.status}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2">
                        <div className="flex items-center gap-2 text-sm"><Users className="w-4 h-4 text-brand-gold/60 shrink-0" /><span className="font-semibold text-white truncate">{b.name}</span><span className="text-xs text-brand-cream-ivory/60 shrink-0">({b.guests} guests)</span></div>
                        <div className="flex items-center gap-2 text-xs text-brand-cream-ivory/80"><Phone className="w-3.5 h-3.5 text-brand-gold/50 shrink-0" /><a href={`tel:${b.phone}`} className="hover:text-brand-saffron transition-colors">{b.phone}</a></div>
                        <div className="flex items-center gap-2 text-xs text-brand-cream-ivory/80"><Calendar className="w-3.5 h-3.5 text-brand-gold/50 shrink-0" /><span>{b.date}</span></div>
                        <div className="flex items-center gap-2 text-xs text-brand-cream-ivory/80"><Clock className="w-3.5 h-3.5 text-brand-gold/50 shrink-0" /><span className="font-semibold text-white">{b.timeSlot}</span></div>
                      </div>
                      {b.requests && <div className="flex gap-2 p-2.5 rounded bg-brand-gold/5 border border-brand-gold/15 text-xs text-brand-cream-ivory/90 leading-relaxed max-w-2xl"><MessageSquare className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" /><p><span className="font-semibold text-brand-gold mr-1">Requests:</span>{b.requests}</p></div>}
                    </div>
                    <div className="flex items-center gap-2 self-end md:self-center border-t md:border-t-0 border-white/5 pt-3 md:pt-0 w-full md:w-auto justify-end">
                      {b.status === 'Pending' ? (
                        <>
                          <button onClick={() => handleUpdateStatus(b.id, 'Confirmed')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer" title="Confirm Booking Slot"><Check className="w-3.5 h-3.5" /><span>Confirm</span></button>
                          <button onClick={() => handleUpdateStatus(b.id, 'Cancelled')} className="px-3 py-1.5 bg-amber-600/10 hover:bg-amber-600 hover:text-white text-amber-500 rounded-lg border border-amber-600/20 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer" title="Cancel Table Slot"><Ban className="w-3.5 h-3.5" /><span>Cancel Slot</span></button>
                        </>
                      ) : (
                        <button onClick={() => handleUpdateStatus(b.id, 'Pending')} className="px-3 py-1.5 border border-brand-gold/25 text-brand-gold hover:bg-brand-gold/10 text-xs font-bold rounded-lg transition-all cursor-pointer">Re-open</button>
                      )}
                      <button onClick={() => handleDeleteBooking(b.id)} className="p-1.5 bg-red-600/10 hover:bg-red-600 hover:text-white text-red-500 hover:border-red-600 rounded-lg border border-red-500/20 transition-all cursor-pointer" title="Delete Record"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 bg-[#05180f] border-t border-brand-gold/10 text-[10px] text-brand-cream-ivory/50 flex justify-between items-center"><span>Geetham ECR Host Portal v1.2</span><span>Local Storage Database Linked</span></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
