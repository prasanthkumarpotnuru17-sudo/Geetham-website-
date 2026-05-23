import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Calendar, 
  UtensilsCrossed, 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  Ban, 
  RefreshCw, 
  X, 
  TrendingUp, 
  LogOut, 
  CircleDot,
  Store,
  Clock,
  Download,
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Database,
  Smartphone,
  ChefHat,
  Star,
  Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, Legend,
  PieChart, Pie, Cell 
} from 'recharts';

export default function AdminDashboard({ isOpen, onClose }) {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showPasswordMap, setShowPasswordMap] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [activeUser, setActiveUser] = useState(null);

  // Settings state
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('geetham_admin_settings');
      return saved ? JSON.parse(saved) : {
        restaurantOpen: true,
        tableCapacity: 80,
        reservationWindow: 30,
        smsAlertsEnabled: true,
        requireApproval: true,
        showWaitTime: true,
        autoConfirmAfter: 24,
        maxGuestsPerTable: 10
      };
    } catch { return { restaurantOpen: true, tableCapacity: 80, reservationWindow: 30, smsAlertsEnabled: true, requireApproval: true, showWaitTime: true, autoConfirmAfter: 24, maxGuestsPerTable: 10 }; }
  });
  
  // Menu items list state
  const [menuItems, setMenuItems] = useState(() => {
    try {
      const saved = localStorage.getItem('geetham_admin_menu');
      return saved ? JSON.parse(saved) : [
        { id: 1, name: "Steamed Idli (2 Pcs)", category: "Breakfast", price: "₹90", status: "Available", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=400" },
        { id: 2, name: "Ghee Podi Masala Dosa", category: "Breakfast", price: "₹190", status: "Available", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=400", tag: "Signature" },
        { id: 3, name: "Geetham Special Thali", category: "South Indian Meals", price: "₹260", status: "Available", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=400", tag: "Signature Feast" },
        { id: 4, name: "Filter Coffee", category: "Beverages", price: "₹70", status: "Available", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=400", tag: "Legendary" },
        { id: 5, name: "Elaneer Payasam", category: "Desserts", price: "₹130", status: "Sold Out", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400", tag: "Must Try" }
      ];
    } catch {
      return [];
    }
  });

  // Modal State for Adding/Editing Menu Items
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [menuForm, setMenuForm] = useState({
    name: '',
    category: 'Breakfast',
    price: '',
    status: 'Available',
    image: '',
    tag: ''
  });

  // Load bookings from localStorage
  const loadBookings = () => {
    const data = JSON.parse(localStorage.getItem('geetham_bookings') || '[]');
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setBookings(data);
  };

  const loadCustomers = () => {
    const users = JSON.parse(localStorage.getItem('geetham_users') || '[]');
    setCustomers(users);
  };

  const loadActiveUser = () => {
    try {
      const active = JSON.parse(localStorage.getItem('geetham_active_user') || 'null');
      setActiveUser(active);
    } catch {
      setActiveUser(null);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadBookings();
      loadCustomers();
      loadActiveUser();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleSync = (e) => {
      // Only sync if it's our internal event OR it's a storage event related to our data
      if (e && e.key && !['geetham_bookings', 'geetham_users', 'geetham_active_user'].includes(e.key)) {
        return;
      }
      loadBookings();
      loadCustomers();
      loadActiveUser();
    };
    window.addEventListener('bookings_updated', handleSync);
    window.addEventListener('storage', handleSync);
    
    return () => {
      window.removeEventListener('bookings_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Sync menu state to localStorage
  useEffect(() => {
    localStorage.setItem('geetham_admin_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  // Mock analytics charts data
  const revenueData = [
    { name: 'May 1', revenue: 42000, orders: 350 },
    { name: 'May 5', revenue: 58000, orders: 480 },
    { name: 'May 10', revenue: 84000, orders: 720 },
    { name: 'May 15', revenue: 71000, orders: 600 },
    { name: 'May 20', revenue: 99000, orders: 850 },
    { name: 'May 25', revenue: 125000, orders: 1100 },
    { name: 'May 30', revenue: 148250, orders: 1280 },
  ];

  const bookingsData = [
    { name: 'Mon', Bookings: 12, WalkIns: 18 },
    { name: 'Tue', Bookings: 19, WalkIns: 14 },
    { name: 'Wed', Bookings: 15, WalkIns: 22 },
    { name: 'Thu', Bookings: 24, WalkIns: 20 },
    { name: 'Fri', Bookings: 32, WalkIns: 28 },
    { name: 'Sat', Bookings: 45, WalkIns: 35 },
    { name: 'Sun', Bookings: 50, WalkIns: 42 },
  ];

  const categoryData = [
    { name: 'Breakfast', value: 45 },
    { name: 'Meals', value: 30 },
    { name: 'Beverages', value: 15 },
    { name: 'Desserts', value: 10 },
  ];

  const PIE_COLORS = ['#D95A1E', '#CFA851', '#2D5A42', '#1A4230'];

  const recentActivity = [
    { id: 1, type: 'Order', message: 'New delivery checklist exported to Swiggy', time: '5 mins ago', user: 'Guest Terminal' },
    { id: 2, type: 'Reservation', message: 'Table reservation slot confirmed for Anand', time: '15 mins ago', user: 'Admin' },
    { id: 3, type: 'Menu', message: 'Elaneer Payasam updated to Sold Out', time: '1 hour ago', user: 'Chef Suresh' },
    { id: 4, type: 'Payment', message: 'Prepayment of ₹1,420 received via QR Code', time: '2 hours ago', user: 'ECR Register 1' }
  ];

  // Load Mock Bookings helper
  const loadMockData = () => {
    const mockBookings = [
      {
        id: "GTM-8724",
        name: "Vijay Sethupathi",
        phone: "9840122880",
        guests: "6",
        date: "2026-05-23",
        timeSlot: "8:30 PM",
        requests: "Prefers the window table with the beach view, baby chair needed.",
        status: "Pending",
        tableNumber: "T-04",
        createdAt: new Date(Date.now() - 5000000).toISOString()
      },
      {
        id: "GTM-3109",
        name: "Abhishek Ramanathan",
        phone: "7829041103",
        guests: "2",
        date: "2026-05-22",
        timeSlot: "9:00 PM",
        requests: "Anniversary dinner, please arrange a small sweet payasam garnish.",
        status: "Confirmed",
        tableNumber: "T-12",
        createdAt: new Date(Date.now() - 10000000).toISOString()
      },
      {
        id: "GTM-6541",
        name: "Ananya Iyer",
        phone: "9444085201",
        guests: "4",
        date: "2026-05-24",
        timeSlot: "7:30 AM",
        requests: "Breakfast after cycling on ECR. Needs high speed quick service.",
        status: "Confirmed",
        tableNumber: "T-01",
        createdAt: new Date(Date.now() - 25000000).toISOString()
      },
      {
        id: "GTM-1902",
        name: "Rajesh Sharma",
        phone: "9003155822",
        guests: "8",
        date: "2026-05-23",
        timeSlot: "1:30 PM",
        requests: "Spacious parking spot guide needed for their traveller coach.",
        status: "Cancelled",
        tableNumber: "N/A",
        createdAt: new Date(Date.now() - 40000000).toISOString()
      }
    ];
    localStorage.setItem('geetham_bookings', JSON.stringify(mockBookings));
    
    // Also hydrate matching mock users so they show up in the Customers section
    const mockUsers = [
      { name: "Vijay Sethupathi", phone: "9840122880", password: "user123" },
      { name: "Abhishek Ramanathan", phone: "7829041103", password: "user456" },
      { name: "Ananya Iyer", phone: "9444085201", password: "user789" },
      { name: "Rajesh Sharma", phone: "9003155822", password: "userabc" }
    ];
    localStorage.setItem('geetham_users', JSON.stringify(mockUsers));
    
    loadBookings();
    loadCustomers();
  };

  // Delete Customer Account helper
  const handleDeleteCustomer = (phone) => {
    if (!window.confirm("Are you sure you want to permanently delete this customer account?")) return;
    const filtered = customers.filter(u => u.phone !== phone);
    localStorage.setItem('geetham_users', JSON.stringify(filtered));
    setCustomers(filtered);
    
    // Also clear active user session if this user was logged in
    const active = JSON.parse(localStorage.getItem('geetham_active_user') || 'null');
    if (active && active.phone === phone) {
      localStorage.removeItem('geetham_active_user');
      window.dispatchEvent(new Event('bookings_updated'));
    }
  };

  // Update Status helper
  const handleUpdateStatus = (id, newStatus) => {
    const updated = bookings.map(b => {
      if (b.id === id) {
        const tableNum = newStatus === 'Confirmed' ? `T-0${Math.floor(Math.random() * 9) + 1}` : b.tableNumber || 'N/A';
        return { ...b, status: newStatus, tableNumber: tableNum };
      }
      return b;
    });
    localStorage.setItem('geetham_bookings', JSON.stringify(updated));
    setBookings(updated);
    window.dispatchEvent(new Event('bookings_updated'));
  };

  // Delete Booking helper
  const handleDeleteBooking = (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this reservation?")) return;
    const filtered = bookings.filter(b => b.id !== id);
    localStorage.setItem('geetham_bookings', JSON.stringify(filtered));
    setBookings(filtered);
    window.dispatchEvent(new Event('bookings_updated'));
  };

  // Clear Database helper
  const handleClearAll = () => {
    if (!window.confirm("WARNING: Are you sure you want to clear the entire reservation database?")) return;
    localStorage.removeItem('geetham_bookings');
    setBookings([]);
    window.dispatchEvent(new Event('bookings_updated'));
  };

  // Interactive Menu Management Handlers
  const handleToggleMenuStatus = (id) => {
    setMenuItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === 'Available' ? 'Sold Out' : 'Available' };
      }
      return item;
    }));
  };

  const handleDeleteMenuItem = (id) => {
    if (!window.confirm("Delete this dish from the active menu listing?")) return;
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const handleOpenMenuModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setMenuForm({
        name: item.name,
        category: item.category,
        price: item.price.replace('₹', ''),
        status: item.status,
        image: item.image,
        tag: item.tag || ''
      });
    } else {
      setEditingItem(null);
      setMenuForm({
        name: '',
        category: 'Breakfast',
        price: '',
        status: 'Available',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400',
        tag: ''
      });
    }
    setIsMenuModalOpen(true);
  };

  const handleSaveMenuForm = (e) => {
    e.preventDefault();
    if (!menuForm.name || !menuForm.price) return;

    const formattedPrice = `₹${menuForm.price}`;

    if (editingItem) {
      setMenuItems(prev => prev.map(item => {
        if (item.id === editingItem.id) {
          return {
            ...item,
            name: menuForm.name,
            category: menuForm.category,
            price: formattedPrice,
            status: menuForm.status,
            image: menuForm.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400',
            tag: menuForm.tag
          };
        }
        return item;
      }));
    } else {
      const newItem = {
        id: Date.now(),
        name: menuForm.name,
        category: menuForm.category,
        price: formattedPrice,
        status: menuForm.status,
        image: menuForm.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400',
        tag: menuForm.tag
      };
      setMenuItems(prev => [...prev, newItem]);
    }

    setIsMenuModalOpen(false);
  };

  // Filter reservations
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'All') return matchesSearch;
    return b.status === filterStatus && matchesSearch;
  });

  // Calculate Reservation Stats
  const totalCount = bookings.length;
  const pendingCount = bookings.filter(b => b.status === 'Pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
  const cancelledCount = bookings.filter(b => b.status === 'Cancelled').length;

  // Sidebar item list
  const sidebarItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'Orders', label: 'Orders', icon: ShoppingBag },
    { id: 'Reservations', label: 'Reservations', icon: Calendar },
    { id: 'Menu Management', label: 'Menu Management', icon: UtensilsCrossed },
    { id: 'Customers', label: 'Customers', icon: Users },
    { id: 'Analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'Settings', label: 'Settings', icon: Settings },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-[#061D12] text-brand-cream-ivory overflow-hidden select-none font-sans">
      
      {/* Sidebar Navigation Column */}
      <div className={`h-full bg-brand-green-card border-r border-brand-gold/15 flex flex-col justify-between transition-all duration-300 relative ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}>
        {/* Brand Banner Header */}
        <div className="p-6 border-b border-brand-gold/10 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-brand-gold flex items-center justify-center text-brand-green-deep font-serif font-bold text-lg shadow-md shrink-0">
              G
            </div>
            {sidebarOpen && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-serif text-lg font-bold text-white tracking-wide truncate"
              >
                Geetham Hub
              </motion.span>
            )}
          </div>
        </div>

        {/* Navigation items list */}
        <nav className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto no-scrollbar">
          {sidebarItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer relative ${
                  isActive 
                    ? 'text-white bg-brand-green-deep border border-brand-gold/25 shadow-lg shadow-brand-gold/5' 
                    : 'text-brand-cream-ivory/60 hover:text-white hover:bg-white/5'
                }`}
                title={item.label}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebarActivePill" 
                    className="absolute left-0 w-1.5 h-6 bg-brand-gold rounded-r-md" 
                  />
                )}
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-brand-gold' : 'text-brand-cream-ivory/40'}`} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Back to Client Web portal */}
        <div className="p-4 border-t border-brand-gold/10 flex flex-col gap-2 bg-brand-green-emerald/50">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-saffron hover:bg-brand-saffron-dark text-white text-xs font-bold tracking-wider uppercase transition-all hover:scale-[1.01] cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span>Exit Dashboard</span>}
          </button>
        </div>
      </div>

      {/* Main Dashboard Workspace area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Sticky top navbar */}
        <header className="h-20 bg-brand-green-card/90 border-b border-brand-gold/10 flex items-center justify-between px-6 sm:px-8 shrink-0 backdrop-blur-md z-25 relative">
          <div className="flex items-center gap-4">
            {/* Sidebar mobile toggler */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg border border-brand-gold/15 bg-brand-green-deep hover:bg-brand-gold/10 text-brand-gold transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide truncate">
              {activeSection}
            </h1>
          </div>

          <div className="flex items-center gap-5">
            {/* Live Restaurant Status Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/25 bg-green-500/5 text-green-500 text-[10px] font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Restaurant Open
            </div>

            {/* Notification Bell */}
            <button className="w-10 h-10 rounded-full border border-brand-gold/15 bg-brand-green-deep hover:bg-brand-gold/10 text-brand-cream-ivory/80 flex items-center justify-center transition-colors cursor-pointer relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-saffron shadow" />
            </button>

            {/* Profile Avatar capsule */}
            <div className="flex items-center gap-2 px-1.5 py-1 rounded-full border border-brand-gold/20 bg-brand-green-deep">
              <div className="w-7 h-7 rounded-full bg-brand-gold/20 border border-brand-gold text-brand-gold font-serif font-semibold text-xs flex items-center justify-center">
                A
              </div>
              <span className="hidden md:inline text-xs font-bold text-white pr-2">Admin Terminal</span>
            </div>
          </div>
        </header>

        {/* Scrollable Area Workspace Sections content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 no-scrollbar bg-[#05180f] relative">
          
          {/* Saffron and Gold lighting gradients */}
          <div className="absolute w-[400px] h-[400px] bg-brand-saffron/3 rounded-full blur-[150px] top-10 right-10 pointer-events-none" />
          <div className="absolute w-[400px] h-[400px] bg-brand-gold/3 rounded-full blur-[150px] bottom-10 left-10 pointer-events-none" />

          {activeSection === 'Dashboard' && (
            <div className="flex flex-col gap-8 relative z-10">
              
              {/* Metrics Cards Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Metrics 1 - Revenue */}
                <div className="p-6 rounded-2xl bg-brand-green-card border border-brand-gold/15 shadow-xl flex flex-col justify-between group hover:border-brand-saffron/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold tracking-widest text-brand-cream-ivory/50 uppercase">TOTAL REVENUE</span>
                    <span className="text-[10px] px-2 py-0.5 bg-green-500/10 border border-green-500 text-green-500 rounded-full font-bold flex items-center gap-1">
                      <TrendingUp className="w-2.5 h-2.5" /> +12.4%
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-white mb-2">₹1,48,250</h3>
                  <div className="w-full bg-brand-green-deep h-1 rounded-full overflow-hidden mt-4">
                    <div className="bg-brand-saffron h-full rounded-full w-[74%]" />
                  </div>
                  <span className="text-[9px] text-brand-cream-ivory/30 mt-2 font-medium">Goal progress: 74% of target ₹2L</span>
                </div>

                {/* Metrics 2 - Orders */}
                <div className="p-6 rounded-2xl bg-brand-green-card border border-brand-gold/15 shadow-xl flex flex-col justify-between group hover:border-brand-saffron/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold tracking-widest text-brand-cream-ivory/50 uppercase">TOTAL ORDERS</span>
                    <span className="text-[10px] px-2 py-0.5 bg-green-500/10 border border-green-500 text-green-500 rounded-full font-bold flex items-center gap-1">
                      <TrendingUp className="w-2.5 h-2.5" /> +8.2%
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-white mb-2">1,280</h3>
                  <div className="w-full bg-brand-green-deep h-1 rounded-full overflow-hidden mt-4">
                    <div className="bg-brand-gold h-full rounded-full w-[64%]" />
                  </div>
                  <span className="text-[9px] text-brand-cream-ivory/30 mt-2 font-medium">Dine-in: 420 • Swiggy Redirections: 860</span>
                </div>

                {/* Metrics 3 - Active Diners */}
                <div className="p-6 rounded-2xl bg-brand-green-card border border-brand-gold/15 shadow-xl flex flex-col justify-between group hover:border-brand-saffron/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold tracking-widest text-brand-cream-ivory/50 uppercase">ACTIVE DINERS</span>
                    <span className="text-[10px] px-2 py-0.5 bg-green-500/10 border border-green-500 text-green-500 rounded-full font-bold flex items-center gap-1 animate-pulse">
                      <CircleDot className="w-2.5 h-2.5 fill-current" /> Live
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-white mb-2">42 Diners</h3>
                  <div className="w-full bg-brand-green-deep h-1 rounded-full overflow-hidden mt-4">
                    <div className="bg-brand-gold h-full rounded-full w-[42%] animate-pulse" />
                  </div>
                  <span className="text-[9px] text-brand-cream-ivory/30 mt-2 font-medium">Active table seats: 12 tables occupied</span>
                </div>

                {/* Metrics 4 - Reservations */}
                <div className="p-6 rounded-2xl bg-brand-green-card border border-brand-gold/15 shadow-xl flex flex-col justify-between group hover:border-brand-saffron/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold tracking-widest text-brand-cream-ivory/50 uppercase">RESERVATIONS</span>
                    <span className="text-[10px] px-2 py-0.5 bg-brand-gold/15 border border-brand-gold text-brand-gold rounded-full font-bold">
                      {totalCount} Total
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-white mb-2">{confirmedCount} Active</h3>
                  <div className="w-full bg-brand-green-deep h-1 rounded-full overflow-hidden mt-4">
                    <div className="bg-brand-saffron h-full rounded-full w-[85%]" />
                  </div>
                  <span className="text-[9px] text-brand-cream-ivory/30 mt-2 font-medium">Pending: {pendingCount} • Cancelled: {cancelledCount}</span>
                </div>

              </div>

              {/* Analytics Recharts Visual Plots */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Area Chart: Revenue growth */}
                <div className="p-6 rounded-2xl bg-brand-green-card border border-brand-gold/15 shadow-xl lg:col-span-2 flex flex-col justify-between">
                  <div className="mb-4">
                    <h3 className="font-serif text-lg font-bold text-white">Revenue & Orders Growth</h3>
                    <p className="text-[10px] text-brand-cream-ivory/50 uppercase font-semibold">Live 30-day analytics tracking</p>
                  </div>
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#CFA851" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#CFA851" stopOpacity={0.0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(207,168,81,0.08)" />
                        <XAxis dataKey="name" stroke="rgba(247,244,235,0.4)" fontSize={10} />
                        <YAxis stroke="rgba(247,244,235,0.4)" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: '#0D2A1C', border: '1px solid rgba(207,168,81,0.25)', color: '#F7F4EB', fontSize: 11 }} />
                        <Area type="monotone" dataKey="revenue" stroke="#CFA851" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue (₹)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Pie Chart: Categories selling */}
                <div className="p-6 rounded-2xl bg-brand-green-card border border-brand-gold/15 shadow-xl flex flex-col justify-between">
                  <div className="mb-4">
                    <h3 className="font-serif text-lg font-bold text-white">Top Categories</h3>
                    <p className="text-[10px] text-brand-cream-ivory/50 uppercase font-semibold">Sales distribution percent</p>
                  </div>
                  <div className="w-full h-[220px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={85}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0D2A1C', border: '1px solid rgba(207,168,81,0.25)', color: '#F7F4EB', fontSize: 11 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4 border-t border-brand-gold/10 pt-4 text-xs font-semibold">
                    {categoryData.map((cat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[idx] }} />
                        <span className="text-brand-cream-ivory/70 truncate">{cat.name} ({cat.value}%)</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bar Chart, Recent Bookings, and Activity Timeline Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Bookings vs Walk-ins Bar Chart */}
                <div className="p-6 rounded-2xl bg-brand-green-card border border-brand-gold/15 shadow-xl lg:col-span-2">
                  <div className="mb-4">
                    <h3 className="font-serif text-lg font-bold text-white">Table Reservations vs Walk-ins</h3>
                    <p className="text-[10px] text-brand-cream-ivory/50 uppercase font-semibold">Weekly comparison logs</p>
                  </div>
                  <div className="w-full h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bookingsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(207,168,81,0.08)" />
                        <XAxis dataKey="name" stroke="rgba(247,244,235,0.4)" fontSize={10} />
                        <YAxis stroke="rgba(247,244,235,0.4)" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: '#0D2A1C', border: '1px solid rgba(207,168,81,0.25)', color: '#F7F4EB', fontSize: 11 }} />
                        <Legend wrapperStyle={{ fontSize: 10, paddingTop: 10 }} />
                        <Bar dataKey="Bookings" fill="#CFA851" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="WalkIns" fill="#D95A1E" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Activity Feed timeline widget */}
                <div className="p-6 rounded-2xl bg-brand-green-card border border-brand-gold/15 shadow-xl flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white mb-1">Recent Activity</h3>
                    <p className="text-[10px] text-brand-cream-ivory/50 uppercase font-semibold mb-6">Real-time system events</p>
                    
                    <div className="flex flex-col gap-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex gap-3 items-start text-xs border-l border-brand-gold/20 pl-4 relative ml-2 py-0.5">
                          <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-brand-gold border-2 border-brand-green-card" />
                          <div className="flex-1">
                            <span className="font-bold text-white block">{activity.message}</span>
                            <span className="text-[10px] text-brand-cream-ivory/50 mt-1 block">
                              {activity.time} • via {activity.user}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-brand-gold/10 pt-4 mt-6">
                    <button 
                      onClick={() => setActiveSection('Reservations')}
                      className="w-full text-center text-xs font-bold text-brand-gold hover:text-white transition-colors cursor-pointer"
                    >
                      Manage Table Bookings &rarr;
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {activeSection === 'Reservations' && (
            /* Synced Reservations Database console block */
            <div className="flex flex-col gap-6 relative z-10">
              
              {/* High Level Filter row */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-brand-green-card border border-brand-gold/15 p-6 rounded-2xl">
                {/* Search */}
                <div className="relative w-full md:max-w-xs">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cream-ivory/40" />
                  <input
                    type="text"
                    placeholder="Search name, phone, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-brand-gold/15 bg-brand-green-deep text-brand-cream-ivory focus:outline-none focus:border-brand-saffron"
                  />
                </div>

                {/* Filter Pills Tabs */}
                <div className="flex bg-brand-green-deep p-1 rounded-xl border border-brand-gold/10 overflow-x-auto no-scrollbar shrink-0">
                  {['All', 'Pending', 'Confirmed', 'Cancelled'].map(status => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        filterStatus === status
                          ? 'bg-brand-saffron text-white shadow-md'
                          : 'text-brand-cream-ivory/60 hover:text-brand-saffron'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                {/* DB Actions */}
                <div className="flex gap-2 w-full md:w-auto justify-end">
                  {totalCount === 0 && (
                    <button
                      onClick={loadMockData}
                      className="px-4 py-2.5 rounded-xl bg-brand-saffron/10 border border-brand-saffron hover:bg-brand-saffron hover:text-white text-brand-saffron text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Hydrate Bookings
                    </button>
                  )}
                  
                  {totalCount > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="px-4 py-2.5 rounded-xl bg-red-600/10 border border-red-600 hover:bg-red-600 hover:text-white text-red-600 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear Database
                    </button>
                  )}
                </div>
              </div>

              {/* Data Table */}
              <div className="border border-brand-gold/15 rounded-2xl overflow-hidden bg-brand-green-card shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-brand-green-deep border-b border-brand-gold/15 text-brand-gold uppercase tracking-wider text-[9px] font-bold">
                        <th className="p-4">Ticket ID</th>
                        <th className="p-4">Guest Name</th>
                        <th className="p-4">Time Slot</th>
                        <th className="p-4">Guests Count</th>
                        <th className="p-4">Table Number</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-gold/10 font-medium">
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-16 text-center text-brand-cream-ivory/40 bg-brand-green-card">
                            <Calendar className="w-12 h-12 stroke-[1.2] mx-auto mb-3 text-brand-gold" />
                            <p className="font-serif text-base font-semibold">No Table Reservations Found</p>
                            <p className="text-[10px] mt-1">Book some tables or click "Hydrate Bookings" to see entries.</p>
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map((b) => (
                          <tr key={b.id} className="hover:bg-brand-green-emerald/20 transition-colors">
                            <td className="p-4 font-mono font-bold text-brand-saffron">{b.id}</td>
                            <td className="p-4">
                              <span className="font-bold text-white block">{b.name}</span>
                              <span className="text-[10px] text-brand-cream-ivory/50">{b.phone}</span>
                            </td>
                            <td className="p-4">
                              <span className="block text-white font-semibold">{b.date}</span>
                              <span className="text-[10px] text-brand-cream-ivory/50">{b.timeSlot}</span>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold rounded-full font-bold">
                                {b.guests} Diners
                              </span>
                            </td>
                            <td className="p-4">
                              <span className="font-mono font-bold text-white bg-brand-green-deep border border-brand-gold/5 px-2 py-0.5 rounded">
                                {b.tableNumber || 'N/A'}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className={`px-2.5 py-0.5 rounded-full font-bold tracking-wide uppercase text-[9px] ${
                                b.status === 'Confirmed' 
                                  ? 'bg-green-600/10 border border-green-600 text-green-600 shadow-[0_0_10px_rgba(22,163,74,0.1)]'
                                  : b.status === 'Cancelled'
                                  ? 'bg-red-600/10 border border-red-600 text-red-600 shadow-[0_0_10px_rgba(220,38,38,0.1)]'
                                  : 'bg-amber-600/10 border border-amber-600 text-amber-600 shadow-[0_0_10px_rgba(217,119,6,0.1)]'
                              }`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {b.status === 'Pending' && (
                                  <>
                                    <button
                                      onClick={() => handleUpdateStatus(b.id, 'Confirmed')}
                                      className="p-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors cursor-pointer"
                                      title="Confirm Reservation"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleUpdateStatus(b.id, 'Cancelled')}
                                      className="p-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors cursor-pointer"
                                      title="Cancel Reservation"
                                    >
                                      <Ban className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}

                                {b.status !== 'Pending' && (
                                  <button
                                    onClick={() => handleUpdateStatus(b.id, 'Pending')}
                                    className="px-2.5 py-1 border border-brand-gold/25 text-brand-gold hover:bg-brand-gold/10 font-bold rounded-lg transition-colors cursor-pointer"
                                  >
                                    Re-open
                                  </button>
                                )}

                                <button
                                  onClick={() => handleDeleteBooking(b.id)}
                                  className="p-1.5 bg-red-600/10 hover:bg-red-600 hover:text-white text-red-600 border border-red-600/20 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {activeSection === 'Menu Management' && (
            /* Interactive Menu Management Dashboard block */
            <div className="flex flex-col gap-6 relative z-10">
              
              {/* Menu Operations Row */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-brand-green-card border border-brand-gold/15 p-6 rounded-2xl">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">ECR Muttukadu Dishes</h3>
                  <p className="text-[10px] text-brand-cream-ivory/50 uppercase font-semibold">Toggling items updates consumer menus dynamically</p>
                </div>
                
                <button
                  onClick={() => handleOpenMenuModal()}
                  className="px-4 py-2.5 rounded-xl bg-brand-saffron hover:bg-brand-saffron-dark text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Add New Delicacy
                </button>
              </div>

              {/* Menu Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="rounded-2xl border border-brand-gold/15 bg-brand-green-card overflow-hidden shadow-lg flex flex-col justify-between group hover:border-brand-saffron/30 transition-all duration-300"
                  >
                    {/* Header Image */}
                    <div className="relative h-40 bg-brand-green-deep overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      {item.tag && (
                        <span className="absolute top-3 left-3 text-[8px] font-bold tracking-widest uppercase bg-brand-saffron px-2 py-0.5 rounded text-white border border-brand-saffron-light/20">
                          {item.tag}
                        </span>
                      )}
                      
                      <span className={`absolute top-3 right-3 text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                        item.status === 'Available' 
                          ? 'bg-green-600/90 text-white' 
                          : 'bg-red-600/90 text-white'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    {/* Body content info */}
                    <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h4 className="font-serif text-base font-bold text-white truncate">
                            {item.name}
                          </h4>
                          <span className="font-serif text-base font-bold text-brand-gold shrink-0">
                            {item.price}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-brand-cream-ivory/40 uppercase tracking-widest">
                          Category: {item.category}
                        </span>
                      </div>

                      {/* Switch and controls */}
                      <div className="flex items-center justify-between border-t border-brand-gold/10 pt-4 mt-1 flex-wrap gap-3 text-xs">
                        
                        {/* Custom status slider switch toggle */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleMenuStatus(item.id)}
                            className={`w-10 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer ${
                              item.status === 'Available' ? 'bg-green-600' : 'bg-brand-green-deep border border-brand-gold/20'
                            }`}
                          >
                            <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                              item.status === 'Available' ? 'translate-x-4.5' : 'translate-x-0'
                            }`} />
                          </button>
                          <span className="font-bold text-brand-cream-ivory/70">
                            {item.status === 'Available' ? 'Available' : 'Sold Out'}
                          </span>
                        </div>

                        {/* Edit and delete icons */}
                        <div className="flex items-center gap-1.5 ml-auto">
                          <button
                            onClick={() => handleOpenMenuModal(item)}
                            className="p-2 bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-brand-green-deep rounded-lg border border-brand-gold/15 transition-all cursor-pointer"
                            title="Edit delicacy Details"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMenuItem(item.id)}
                            className="p-2 bg-red-600/10 hover:bg-red-600 hover:text-white text-red-600 rounded-lg border border-red-600/20 transition-all cursor-pointer"
                            title="Delete item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    </div>

                  </motion.div>
                ))}
              </div>

            </div>
          )}

          {activeSection === 'Orders' && (
            <div className="flex flex-col gap-6 relative z-10">

              {/* Header + search row */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-brand-green-card border border-brand-gold/15 p-6 rounded-2xl">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Live Reservation Order Log</h3>
                  <p className="text-[10px] text-brand-cream-ivory/50 uppercase font-semibold">All diner table bookings — real-time from database</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto items-center justify-end">
                  <div className="relative w-full md:max-w-xs">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cream-ivory/40" />
                    <input
                      type="text"
                      placeholder="Search name, phone, or ID..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-brand-gold/15 bg-brand-green-deep text-brand-cream-ivory focus:outline-none focus:border-brand-saffron"
                    />
                  </div>
                  <button onClick={loadBookings} className="p-2.5 rounded-xl border border-brand-gold/15 bg-brand-green-deep hover:bg-brand-gold/10 text-brand-gold transition-colors cursor-pointer shrink-0" title="Refresh">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Orders', value: totalCount, color: 'text-white' },
                  { label: 'Pending', value: pendingCount, color: 'text-amber-500' },
                  { label: 'Confirmed', value: confirmedCount, color: 'text-green-500' },
                  { label: 'Cancelled', value: cancelledCount, color: 'text-red-400' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="p-5 rounded-2xl bg-brand-green-card border border-brand-gold/15 flex flex-col gap-1">
                    <span className="text-[9px] font-bold tracking-widest text-brand-cream-ivory/50 uppercase">{label}</span>
                    <span className={`font-serif text-3xl font-bold ${color}`}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Filter tabs */}
              <div className="flex gap-1 bg-brand-green-card border border-brand-gold/10 p-1 rounded-xl w-fit">
                {['All','Pending','Confirmed','Cancelled'].map(s => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${filterStatus === s ? 'bg-brand-saffron text-white shadow-md' : 'text-brand-cream-ivory/60 hover:text-brand-saffron'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Orders Table */}
              <div className="border border-brand-gold/15 rounded-2xl overflow-hidden bg-brand-green-card shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-brand-green-deep border-b border-brand-gold/15 text-brand-gold uppercase tracking-wider text-[9px] font-bold">
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Guest</th>
                        <th className="p-4">Date & Time</th>
                        <th className="p-4">Guests</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Requests</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-gold/10 font-medium">
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-16 text-center text-brand-cream-ivory/40">
                            <ShoppingBag className="w-10 h-10 stroke-[1.2] mx-auto mb-3 text-brand-gold" />
                            <p className="font-serif text-base font-semibold">No Orders Found</p>
                            <p className="text-[10px] mt-1">Try adjusting your search or add mock data from the Reservations tab.</p>
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map(b => (
                          <tr key={b.id} className="hover:bg-brand-green-emerald/20 transition-colors">
                            <td className="p-4 font-mono font-bold text-brand-saffron">{b.id}</td>
                            <td className="p-4">
                              <span className="font-bold text-white block">{b.name}</span>
                              <span className="text-[10px] text-brand-cream-ivory/50">{b.phone}</span>
                            </td>
                            <td className="p-4">
                              <span className="font-semibold text-white block">{b.date}</span>
                              <span className="text-[10px] text-brand-cream-ivory/50">{b.timeSlot}</span>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-0.5 bg-brand-gold/10 border border-brand-gold/20 text-brand-gold rounded-full font-bold text-[10px]">
                                {b.guests} Diners
                              </span>
                            </td>
                            <td className="p-4">
                              <span className={`px-2.5 py-0.5 rounded-full font-bold tracking-wide uppercase text-[9px] ${
                                b.status === 'Confirmed' ? 'bg-green-600/10 border border-green-600 text-green-600' :
                                b.status === 'Cancelled' ? 'bg-red-600/10 border border-red-600 text-red-600' :
                                'bg-amber-600/10 border border-amber-600 text-amber-600'
                              }`}>{b.status}</span>
                            </td>
                            <td className="p-4 max-w-[200px]">
                              <span className="text-brand-cream-ivory/60 truncate block text-[10px]">
                                {b.requests || '—'}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {b.status === 'Pending' && (
                                  <>
                                    <button onClick={() => handleUpdateStatus(b.id, 'Confirmed')} className="p-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors cursor-pointer" title="Confirm">
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={() => handleUpdateStatus(b.id, 'Cancelled')} className="p-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors cursor-pointer" title="Cancel Slot">
                                      <Ban className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}
                                {b.status !== 'Pending' && (
                                  <button onClick={() => handleUpdateStatus(b.id, 'Pending')} className="px-2.5 py-1 border border-brand-gold/25 text-brand-gold hover:bg-brand-gold/10 font-bold rounded-lg transition-colors cursor-pointer text-[9px]">
                                    Re-open
                                  </button>
                                )}
                                <button onClick={() => handleDeleteBooking(b.id)} className="p-1.5 bg-red-600/10 hover:bg-red-600 hover:text-white text-red-600 border border-red-600/20 rounded-lg transition-colors cursor-pointer" title="Delete">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {activeSection === 'Customers' && (
            <div className="flex flex-col gap-6 relative z-10 text-left">
              
              {/* High Level Header and Filter row */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-brand-green-card border border-brand-gold/15 p-6 rounded-2xl">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Diner Profile Registry</h3>
                  <p className="text-[10px] text-brand-cream-ivory/50 uppercase font-semibold">Registered users and booking history logs</p>
                </div>

                <div className="flex gap-4 items-center w-full md:w-auto justify-end">
                  {/* Search customer */}
                  <div className="relative w-full md:max-w-xs">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cream-ivory/40" />
                    <input
                      type="text"
                      placeholder="Search diner by name or phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-brand-gold/15 bg-brand-green-deep text-brand-cream-ivory focus:outline-none focus:border-brand-saffron"
                    />
                  </div>

                  {customers.length === 0 && (
                    <button
                      onClick={loadMockData}
                      className="px-4 py-2.5 rounded-xl bg-brand-saffron/10 border border-brand-saffron hover:bg-brand-saffron hover:text-white text-brand-saffron text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Hydrate Users
                    </button>
                  )}
                </div>
              </div>

              {/* Customers visual statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-5 rounded-xl bg-brand-green-card border border-brand-gold/10 flex flex-col justify-between relative overflow-hidden group hover:border-brand-saffron/30 transition-all duration-300">
                  <span className="text-[9px] font-bold tracking-widest text-brand-cream-ivory/50 uppercase">TOTAL REGISTERED</span>
                  <h4 className="font-serif text-2xl font-bold text-white mt-2">{customers.length} Diners</h4>
                </div>
                <div className="p-5 rounded-xl bg-brand-green-card border border-brand-gold/10 flex flex-col justify-between relative overflow-hidden group hover:border-brand-saffron/30 transition-all duration-300">
                  <span className="text-[9px] font-bold tracking-widest text-brand-cream-ivory/50 uppercase">ACTIVE BOOKERS</span>
                  <h4 className="font-serif text-2xl font-bold text-white mt-2">
                    {customers.filter(c => bookings.some(b => b.phone.replace(/\s+/g, '') === c.phone)).length} Diners
                  </h4>
                </div>
                <div className="p-5 rounded-xl bg-brand-green-card border border-brand-gold/10 flex flex-col justify-between relative overflow-hidden group hover:border-brand-saffron/30 transition-all duration-300">
                  <span className="text-[9px] font-bold tracking-widest text-brand-cream-ivory/50 uppercase">LOYAL MEMBERS (2+)</span>
                  <h4 className="font-serif text-2xl font-bold text-white mt-2">
                    {customers.filter(c => bookings.filter(b => b.phone.replace(/\s+/g, '') === c.phone).length >= 2).length} Diners
                  </h4>
                </div>
                <div className="p-5 rounded-xl bg-brand-green-card border border-brand-gold/10 flex flex-col justify-between relative overflow-hidden group hover:border-brand-saffron/30 transition-all duration-300">
                  <span className="text-[9px] font-bold tracking-widest text-brand-cream-ivory/50 uppercase">ONLINE SESSION</span>
                  {activeUser ? (
                    <div className="mt-2 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 font-serif font-bold text-xs flex items-center justify-center shrink-0 animate-pulse">
                        {activeUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <span className="font-serif text-xs font-bold text-white block truncate leading-tight">{activeUser.name}</span>
                        <span className="text-[9px] text-green-400 font-semibold flex items-center gap-1 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                          {activeUser.phone}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <h4 className="font-serif text-xs font-semibold text-brand-cream-ivory/40 mt-2">
                      No Active Session
                    </h4>
                  )}
                </div>
              </div>

              {/* Data Table */}
              <div className="border border-brand-gold/15 rounded-2xl overflow-hidden bg-brand-green-card shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-brand-green-deep border-b border-brand-gold/15 text-brand-gold uppercase tracking-wider text-[9px] font-bold font-sans">
                        <th className="p-4">Diner</th>
                        <th className="p-4">Phone Number</th>
                        <th className="p-4">Security Password</th>
                        <th className="p-4">Table Bookings</th>
                        <th className="p-4">Loyalty Tier</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-gold/10 font-medium font-sans">
                      {customers.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-16 text-center text-brand-cream-ivory/40 bg-brand-green-card">
                            <Users className="w-12 h-12 stroke-[1.2] mx-auto mb-3 text-brand-gold" />
                            <p className="font-serif text-base font-semibold">No Registered Diners Found</p>
                            <p className="text-[10px] mt-1">Diners registered via the website auth modal will appear here.</p>
                            <button
                              onClick={loadMockData}
                              className="mt-4 px-4 py-2 bg-brand-gold text-brand-green-deep font-bold rounded-lg text-[10px] uppercase tracking-wider hover:bg-brand-gold-dark transition-all cursor-pointer"
                            >
                              Hydrate Sample Diners
                            </button>
                          </td>
                        </tr>
                      ) : (
                        customers
                          .filter(c => {
                            const nameMatch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
                            const phoneMatch = c.phone.includes(searchTerm);
                            return nameMatch || phoneMatch;
                          })
                          .map((c) => {
                            const userBookings = bookings.filter(b => b.phone.replace(/\s+/g, '') === c.phone);
                            const activeCount = userBookings.filter(b => b.status !== 'Cancelled').length;
                            
                            // Determine tier
                            let tier = "New Member";
                            let tierColor = "bg-brand-green-deep border border-brand-gold/15 text-brand-cream-ivory/70";
                            if (userBookings.length >= 3) {
                              tier = "Royal Patron";
                              tierColor = "bg-brand-gold/15 border border-brand-gold text-brand-gold shadow-[0_0_10px_rgba(207,168,81,0.1)] font-bold";
                            } else if (userBookings.length >= 1) {
                              tier = "Gourmet Diner";
                              tierColor = "bg-brand-saffron/15 border border-brand-saffron text-brand-saffron font-bold";
                            }

                            const showPassword = showPasswordMap[c.phone] || false;

                            return (
                              <tr key={c.phone} className="hover:bg-brand-green-emerald/20 transition-colors">
                                <td className="p-4">
                                  <div className="flex items-center gap-3">
                                    <div className="relative shrink-0">
                                      <div className="w-8 h-8 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold font-serif font-bold text-xs flex items-center justify-center">
                                        {c.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                                      </div>
                                      {activeUser && activeUser.phone === c.phone && (
                                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0D2A1C] animate-pulse shadow-[0_0_8px_#22c55e]" />
                                      )}
                                    </div>
                                    <div className="flex flex-col">
                                      <div className="flex items-center gap-2">
                                        <span className="font-bold text-white">{c.name}</span>
                                        {activeUser && activeUser.phone === c.phone && (
                                          <span className="px-1.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/25 text-green-500 text-[8px] font-sans font-bold uppercase tracking-wider animate-pulse flex items-center gap-1 shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                            Active Session
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 font-mono font-semibold text-brand-cream-ivory/80">{c.phone}</td>
                                <td className="p-4">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-brand-cream-ivory/60 select-all">
                                      {showPassword ? c.password : '••••••••'}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => setShowPasswordMap(prev => ({ ...prev, [c.phone]: !showPassword }))}
                                      className="text-[9px] uppercase tracking-widest text-brand-gold hover:text-white transition-colors cursor-pointer border border-brand-gold/20 px-1.5 py-0.5 rounded bg-brand-green-deep"
                                    >
                                      {showPassword ? 'Hide' : 'Reveal'}
                                    </button>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <div className="flex items-center gap-1.5">
                                    <span className="px-2 py-0.5 bg-brand-green-deep border border-brand-gold/10 rounded font-bold text-white">
                                      {userBookings.length} Booked
                                    </span>
                                    {activeCount > 0 && (
                                      <span className="px-1.5 py-0.5 bg-green-500/10 border border-green-500/20 text-green-500 rounded text-[9px] font-bold">
                                        {activeCount} Active
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="p-4">
                                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider ${tierColor}`}>
                                    {tier}
                                  </span>
                                </td>
                                <td className="p-4 text-right">
                                  <button
                                    onClick={() => handleDeleteCustomer(c.phone)}
                                    className="p-1.5 bg-red-600/10 hover:bg-red-600 hover:text-white text-red-600 border border-red-600/20 rounded-lg transition-colors cursor-pointer"
                                    title="Delete Customer Account"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {activeSection === 'Analytics' && (
            <div className="flex flex-col gap-8 relative z-10">

              {/* KPI Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: 'Avg Order Value', value: '₹1,158', change: '+9.4%', up: true, sub: 'Per diner this month' },
                  { label: 'Total Reservations', value: totalCount.toString(), change: '+5.2%', up: true, sub: `Pending: ${pendingCount}` },
                  { label: 'Cancellation Rate', value: totalCount > 0 ? `${Math.round((cancelledCount / totalCount) * 100)}%` : '0%', change: '-2.1%', up: false, sub: `${cancelledCount} cancelled` },
                  { label: 'Registered Diners', value: customers.length.toString(), change: '+12.8%', up: true, sub: 'Unique accounts' },
                ].map((kpi, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-brand-green-card border border-brand-gold/15 shadow-xl group hover:border-brand-saffron/30 transition-all duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[9px] font-bold tracking-widest text-brand-cream-ivory/50 uppercase">{kpi.label}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border flex items-center gap-1 ${
                        kpi.up ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-red-500/10 border-red-500/30 text-red-400'
                      }`}>
                        {kpi.change}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white mb-1">{kpi.value}</h3>
                    <span className="text-[9px] text-brand-cream-ivory/40 font-medium">{kpi.sub}</span>
                  </div>
                ))}
              </div>

              {/* Revenue Trend + Booking Funnel */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Revenue Area Chart */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-brand-green-card border border-brand-gold/15 shadow-xl">
                  <div className="mb-5">
                    <h3 className="font-serif text-lg font-bold text-white">Revenue Trend (30 Days)</h3>
                    <p className="text-[10px] text-brand-cream-ivory/50 uppercase font-semibold tracking-wider mt-0.5">Monthly revenue growth trajectory</p>
                  </div>
                  <div className="w-full h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="analyticsRevGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#CFA851" stopOpacity={0.35}/>
                            <stop offset="95%" stopColor="#CFA851" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="analyticsOrderGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D95A1E" stopOpacity={0.35}/>
                            <stop offset="95%" stopColor="#D95A1E" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(207,168,81,0.07)" />
                        <XAxis dataKey="name" stroke="rgba(247,244,235,0.35)" fontSize={10} />
                        <YAxis stroke="rgba(247,244,235,0.35)" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: '#0D2A1C', border: '1px solid rgba(207,168,81,0.25)', color: '#F7F4EB', fontSize: 11, borderRadius: 10 }} />
                        <Legend wrapperStyle={{ fontSize: 10, paddingTop: 10 }} />
                        <Area type="monotone" dataKey="revenue" stroke="#CFA851" strokeWidth={2.5} fillOpacity={1} fill="url(#analyticsRevGrad)" name="Revenue (₹)" />
                        <Area type="monotone" dataKey="orders" stroke="#D95A1E" strokeWidth={2} fillOpacity={1} fill="url(#analyticsOrderGrad)" name="Orders" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Booking Status Donut */}
                <div className="p-6 rounded-2xl bg-brand-green-card border border-brand-gold/15 shadow-xl flex flex-col">
                  <div className="mb-5">
                    <h3 className="font-serif text-lg font-bold text-white">Reservation Status</h3>
                    <p className="text-[10px] text-brand-cream-ivory/50 uppercase font-semibold tracking-wider mt-0.5">Current split breakdown</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Confirmed', value: confirmedCount || 1 },
                            { name: 'Pending', value: pendingCount || 0 },
                            { name: 'Cancelled', value: cancelledCount || 0 },
                          ]}
                          cx="50%" cy="50%"
                          innerRadius={55} outerRadius={80}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          <Cell fill="#22c55e" />
                          <Cell fill="#f59e0b" />
                          <Cell fill="#ef4444" />
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0D2A1C', border: '1px solid rgba(207,168,81,0.25)', color: '#F7F4EB', fontSize: 11, borderRadius: 10 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2 border-t border-brand-gold/10 pt-4 text-[10px] font-bold">
                    {[['Confirmed', '#22c55e', confirmedCount], ['Pending', '#f59e0b', pendingCount], ['Cancelled', '#ef4444', cancelledCount]].map(([label, color, count]) => (
                      <div key={label} className="flex flex-col items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-brand-cream-ivory/60 text-center leading-tight">{label}</span>
                        <span className="text-white font-serif text-sm">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Weekly bookings bar + Top Menu performers */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Weekly Bar Chart */}
                <div className="p-6 rounded-2xl bg-brand-green-card border border-brand-gold/15 shadow-xl">
                  <div className="mb-5">
                    <h3 className="font-serif text-lg font-bold text-white">Weekly Booking Patterns</h3>
                    <p className="text-[10px] text-brand-cream-ivory/50 uppercase font-semibold tracking-wider mt-0.5">Reservations vs walk-ins per day</p>
                  </div>
                  <div className="w-full h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bookingsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(207,168,81,0.07)" />
                        <XAxis dataKey="name" stroke="rgba(247,244,235,0.35)" fontSize={10} />
                        <YAxis stroke="rgba(247,244,235,0.35)" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: '#0D2A1C', border: '1px solid rgba(207,168,81,0.25)', color: '#F7F4EB', fontSize: 11, borderRadius: 10 }} />
                        <Legend wrapperStyle={{ fontSize: 10, paddingTop: 10 }} />
                        <Bar dataKey="Bookings" fill="#CFA851" radius={[4,4,0,0]} />
                        <Bar dataKey="WalkIns" fill="#D95A1E" radius={[4,4,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Top Dishes Performance List */}
                <div className="p-6 rounded-2xl bg-brand-green-card border border-brand-gold/15 shadow-xl">
                  <div className="mb-5">
                    <h3 className="font-serif text-lg font-bold text-white">Top Performing Dishes</h3>
                    <p className="text-[10px] text-brand-cream-ivory/50 uppercase font-semibold tracking-wider mt-0.5">Revenue contribution by category</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    {[
                      { dish: 'Geetham Special Thali', cat: 'South Indian Meals', pct: 92, rev: '₹68,200', color: '#CFA851' },
                      { dish: 'Ghee Podi Masala Dosa', cat: 'Breakfast', pct: 78, rev: '₹31,500', color: '#D95A1E' },
                      { dish: 'Filter Coffee', cat: 'Beverages', pct: 65, rev: '₹22,400', color: '#2D5A42' },
                      { dish: 'Elaneer Payasam', cat: 'Desserts', pct: 44, rev: '₹14,100', color: '#1A4230' },
                      { dish: 'Steamed Idli (2 Pcs)', cat: 'Breakfast', pct: 35, rev: '₹12,050', color: '#A68235' },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <div>
                            <span className="font-semibold text-white">{item.dish}</span>
                            <span className="text-brand-cream-ivory/40 ml-2 text-[10px]">{item.cat}</span>
                          </div>
                          <span className="font-bold text-brand-gold font-mono shrink-0">{item.rev}</span>
                        </div>
                        <div className="w-full h-1.5 bg-brand-green-deep rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Diner Growth Summary Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  { icon: Activity, label: 'Peak Dining Hour', value: '8:00 PM – 9:30 PM', sub: 'Most table slots reserved' },
                  { icon: Star, label: 'Avg Rating', value: '4.8 / 5.0', sub: 'Based on 420 diner reviews' },
                  { icon: ChefHat, label: 'Most Popular Category', value: 'South Indian Meals', sub: '45% of all orders this month' },
                ].map(({ icon: Icon, label, value, sub }, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-brand-green-card border border-brand-gold/15 shadow-xl flex items-start gap-4 group hover:border-brand-gold/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold tracking-widest text-brand-cream-ivory/50 uppercase block mb-1">{label}</span>
                      <h4 className="font-serif text-sm font-bold text-white leading-snug">{value}</h4>
                      <span className="text-[9px] text-brand-cream-ivory/40 mt-0.5 block">{sub}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {activeSection === 'Settings' && (
            <div className="flex flex-col gap-6 relative z-10">

              {/* Restaurant Operations Block */}
              <div className="p-6 rounded-2xl bg-brand-green-card border border-brand-gold/15 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white">Restaurant Operations</h3>
                    <p className="text-[10px] text-brand-cream-ivory/50 uppercase font-semibold tracking-wider">Core restaurant controls</p>
                  </div>
                </div>

                <div className="flex flex-col gap-5">

                  {/* Toggle: Restaurant Open/Closed */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-brand-green-deep border border-brand-gold/10">
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${settings.restaurantOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                      <div>
                        <span className="text-sm font-bold text-white">Restaurant Status</span>
                        <span className="text-[10px] text-brand-cream-ivory/50 block">
                          {settings.restaurantOpen ? 'Currently accepting reservations & walk-ins' : 'Restaurant is closed to new bookings'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const updated = { ...settings, restaurantOpen: !settings.restaurantOpen };
                        setSettings(updated);
                        localStorage.setItem('geetham_admin_settings', JSON.stringify(updated));
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all duration-300 cursor-pointer border ${
                        settings.restaurantOpen
                          ? 'bg-green-600/15 border-green-600/30 text-green-500 hover:bg-red-600/15 hover:border-red-600/30 hover:text-red-400'
                          : 'bg-red-600/15 border-red-600/30 text-red-400 hover:bg-green-600/15 hover:border-green-600/30 hover:text-green-500'
                      }`}
                    >
                      {settings.restaurantOpen ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                      {settings.restaurantOpen ? 'Open' : 'Closed'}
                    </button>
                  </div>

                  {/* Table Capacity */}
                  <div className="p-4 rounded-xl bg-brand-green-deep border border-brand-gold/10">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="text-sm font-bold text-white">Table Capacity</span>
                        <span className="text-[10px] text-brand-cream-ivory/50 block">Total number of dining seats</span>
                      </div>
                      <span className="font-serif text-2xl font-bold text-brand-gold">{settings.tableCapacity}</span>
                    </div>
                    <input
                      type="range" min="20" max="200" step="5"
                      value={settings.tableCapacity}
                      onChange={(e) => {
                        const updated = { ...settings, tableCapacity: Number(e.target.value) };
                        setSettings(updated);
                        localStorage.setItem('geetham_admin_settings', JSON.stringify(updated));
                      }}
                      className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                      style={{ accentColor: '#CFA851' }}
                    />
                    <div className="flex justify-between text-[9px] text-brand-cream-ivory/40 mt-1 font-semibold">
                      <span>20 seats</span><span>200 seats</span>
                    </div>
                  </div>

                  {/* Max Guests Per Table */}
                  <div className="p-4 rounded-xl bg-brand-green-deep border border-brand-gold/10">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="text-sm font-bold text-white">Max Guests Per Table</span>
                        <span className="text-[10px] text-brand-cream-ivory/50 block">Maximum party size for a single booking</span>
                      </div>
                      <span className="font-serif text-2xl font-bold text-brand-gold">{settings.maxGuestsPerTable}</span>
                    </div>
                    <input
                      type="range" min="2" max="20" step="1"
                      value={settings.maxGuestsPerTable}
                      onChange={(e) => {
                        const updated = { ...settings, maxGuestsPerTable: Number(e.target.value) };
                        setSettings(updated);
                        localStorage.setItem('geetham_admin_settings', JSON.stringify(updated));
                      }}
                      className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                      style={{ accentColor: '#CFA851' }}
                    />
                    <div className="flex justify-between text-[9px] text-brand-cream-ivory/40 mt-1 font-semibold">
                      <span>2 guests</span><span>20 guests</span>
                    </div>
                  </div>

                  {/* Reservation Window */}
                  <div className="p-4 rounded-xl bg-brand-green-deep border border-brand-gold/10">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="text-sm font-bold text-white">Advance Reservation Window</span>
                        <span className="text-[10px] text-brand-cream-ivory/50 block">How many days ahead guests can book</span>
                      </div>
                      <span className="font-serif text-2xl font-bold text-brand-gold">{settings.reservationWindow}d</span>
                    </div>
                    <input
                      type="range" min="7" max="90" step="1"
                      value={settings.reservationWindow}
                      onChange={(e) => {
                        const updated = { ...settings, reservationWindow: Number(e.target.value) };
                        setSettings(updated);
                        localStorage.setItem('geetham_admin_settings', JSON.stringify(updated));
                      }}
                      className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                      style={{ accentColor: '#CFA851' }}
                    />
                    <div className="flex justify-between text-[9px] text-brand-cream-ivory/40 mt-1 font-semibold">
                      <span>7 days</span><span>90 days</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Notifications & Automation */}
              <div className="p-6 rounded-2xl bg-brand-green-card border border-brand-gold/15 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white">Notifications & Automation</h3>
                    <p className="text-[10px] text-brand-cream-ivory/50 uppercase font-semibold tracking-wider">SMS alerts and approval behavior</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {[
                    { key: 'smsAlertsEnabled', label: 'SMS Booking Alerts', sub: 'Send SMS notification overlay on every new booking' },
                    { key: 'requireApproval', label: 'Require Manual Approval', sub: 'All reservations start as Pending until admin confirms' },
                    { key: 'showWaitTime', label: 'Show Estimated Wait Time', sub: 'Display wait time estimates on the guest My Orders page' },
                  ].map(({ key, label, sub }) => (
                    <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-brand-green-deep border border-brand-gold/10">
                      <div>
                        <span className="text-sm font-bold text-white">{label}</span>
                        <span className="text-[10px] text-brand-cream-ivory/50 block">{sub}</span>
                      </div>
                      <button
                        onClick={() => {
                          const updated = { ...settings, [key]: !settings[key] };
                          setSettings(updated);
                          localStorage.setItem('geetham_admin_settings', JSON.stringify(updated));
                        }}
                        className={`w-12 h-6 rounded-full p-0.5 transition-all duration-300 cursor-pointer relative shrink-0 ${
                          settings[key] ? 'bg-brand-gold' : 'bg-brand-green-deep border border-brand-gold/20'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                          settings[key] ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  ))}

                  {/* Auto-confirm after hours */}
                  <div className="p-4 rounded-xl bg-brand-green-deep border border-brand-gold/10">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="text-sm font-bold text-white">Auto-Confirm After</span>
                        <span className="text-[10px] text-brand-cream-ivory/50 block">Pending bookings auto-confirm after this many hours</span>
                      </div>
                      <span className="font-serif text-2xl font-bold text-brand-gold">{settings.autoConfirmAfter}h</span>
                    </div>
                    <input
                      type="range" min="1" max="72" step="1"
                      value={settings.autoConfirmAfter}
                      onChange={(e) => {
                        const updated = { ...settings, autoConfirmAfter: Number(e.target.value) };
                        setSettings(updated);
                        localStorage.setItem('geetham_admin_settings', JSON.stringify(updated));
                      }}
                      className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                      style={{ accentColor: '#CFA851' }}
                    />
                    <div className="flex justify-between text-[9px] text-brand-cream-ivory/40 mt-1 font-semibold">
                      <span>1 hour</span><span>72 hours</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Database Management */}
              <div className="p-6 rounded-2xl bg-brand-green-card border border-brand-gold/15 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-red-600/10 border border-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white">Database Management</h3>
                    <p className="text-[10px] text-brand-cream-ivory/50 uppercase font-semibold tracking-wider">LocalStorage operations — use with caution</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                  {/* Export Backup */}
                  <button
                    onClick={() => {
                      const data = {
                        bookings: JSON.parse(localStorage.getItem('geetham_bookings') || '[]'),
                        users: JSON.parse(localStorage.getItem('geetham_users') || '[]'),
                        menu: JSON.parse(localStorage.getItem('geetham_admin_menu') || '[]'),
                        settings: JSON.parse(localStorage.getItem('geetham_admin_settings') || '{}'),
                        exportedAt: new Date().toISOString()
                      };
                      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `geetham_backup_${new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="p-4 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold hover:bg-brand-gold/20 hover:border-brand-gold/40 transition-all duration-300 cursor-pointer flex items-start gap-3 text-left group"
                  >
                    <Download className="w-5 h-5 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-sm font-bold block">Export Backup</span>
                      <span className="text-[10px] text-brand-gold/60 leading-relaxed">Download full JSON backup of all bookings, users, and menu data</span>
                    </div>
                  </button>

                  {/* Clear Bookings */}
                  <button
                    onClick={() => {
                      if (window.confirm('Clear all reservations from the database?')) {
                        localStorage.removeItem('geetham_bookings');
                        loadBookings();
                        window.dispatchEvent(new Event('bookings_updated'));
                      }
                    }}
                    className="p-4 rounded-xl bg-amber-600/10 border border-amber-600/20 text-amber-500 hover:bg-amber-600/20 hover:border-amber-600/40 transition-all duration-300 cursor-pointer flex items-start gap-3 text-left group"
                  >
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-sm font-bold block">Clear All Bookings</span>
                      <span className="text-[10px] text-amber-500/60 leading-relaxed">Permanently wipe all reservation records from local storage</span>
                    </div>
                  </button>

                  {/* Clear All Data */}
                  <button
                    onClick={() => {
                      if (window.confirm('⚠️ WARNING: This will delete ALL data including users, bookings, and menu customizations. Are you absolutely sure?')) {
                        ['geetham_bookings','geetham_users','geetham_cart','geetham_active_user','geetham_admin_menu','geetham_admin_settings'].forEach(k => localStorage.removeItem(k));
                        loadBookings();
                        loadCustomers();
                        loadActiveUser();
                        window.dispatchEvent(new Event('bookings_updated'));
                      }
                    }}
                    className="p-4 rounded-xl bg-red-600/10 border border-red-600/20 text-red-500 hover:bg-red-600/20 hover:border-red-600/40 transition-all duration-300 cursor-pointer flex items-start gap-3 text-left group"
                  >
                    <Trash2 className="w-5 h-5 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-sm font-bold block">Factory Reset</span>
                      <span className="text-[10px] text-red-500/60 leading-relaxed">Delete all users, bookings, cart data and restore defaults</span>
                    </div>
                  </button>

                </div>
              </div>

              {/* About / System Info */}
              <div className="p-6 rounded-2xl bg-brand-green-card border border-brand-gold/15 shadow-xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-white">System Information</h3>
                    <p className="text-[10px] text-brand-cream-ivory/50 uppercase font-semibold tracking-wider">Platform & version details</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    ['Platform', 'Geetham ECR Restaurant SaaS Hub'],
                    ['Dashboard Version', 'v2.0.0 — Premium Build'],
                    ['Database', 'Browser LocalStorage (JSON)'],
                    ['Framework', 'React 19 + Vite 8 + Tailwind CSS 4'],
                    ['Charts Library', 'Recharts 2.x'],
                    ['Total Bookings', `${bookings.length} records`],
                    ['Registered Diners', `${customers.length} accounts`],
                    ['Active Session', activeUser ? activeUser.name : 'No active user'],
                  ].map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-brand-green-deep border border-brand-gold/10">
                      <span className="text-brand-cream-ivory/50 font-semibold">{key}</span>
                      <span className="text-white font-bold text-right ml-4 truncate">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* --- ADD / EDIT MENU ITEM MODAL DIALOG --- */}
      <AnimatePresence>
        {isMenuModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuModalOpen(false)}
              className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal window container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-[#0D2A1C] border border-brand-gold/25 rounded-3xl shadow-2xl overflow-hidden relative z-10 select-none text-xs"
            >
              {/* Header */}
              <div className="p-6 border-b border-brand-gold/10 bg-brand-green-deep flex justify-between items-center">
                <h3 className="font-serif text-base font-bold text-white">
                  {editingItem ? 'Edit Gourmet Dish' : 'Add New Delicacy'}
                </h3>
                <button
                  onClick={() => setIsMenuModalOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-brand-gold/15 text-brand-cream-ivory/70 hover:text-brand-gold flex items-center justify-center transition-colors cursor-pointer border border-brand-gold/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form content */}
              <form onSubmit={handleSaveMenuForm} className="p-6 flex flex-col gap-4">
                
                {/* Food Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">
                    Item Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Steamed Idli (2 Pcs)"
                    value={menuForm.name}
                    onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-brand-gold/15 bg-brand-green-deep text-brand-cream-ivory focus:outline-none focus:border-brand-saffron"
                  />
                </div>

                {/* Price and category row */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Price */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 190"
                      value={menuForm.price}
                      onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-brand-gold/15 bg-brand-green-deep text-brand-cream-ivory focus:outline-none focus:border-brand-saffron"
                    />
                  </div>

                  {/* Category select */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">
                      Category
                    </label>
                    <select
                      value={menuForm.category}
                      onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-brand-gold/15 bg-brand-green-deep text-brand-cream-ivory focus:outline-none focus:border-brand-saffron"
                    >
                      <option value="Breakfast">Breakfast</option>
                      <option value="South Indian Meals">Meals</option>
                      <option value="Beverages">Beverages</option>
                      <option value="Desserts">Desserts</option>
                    </select>
                  </div>

                </div>

                {/* Image Unsplash URL */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">
                    Unsplash Food Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="Paste food image web address..."
                    value={menuForm.image}
                    onChange={(e) => setMenuForm({ ...menuForm, image: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-brand-gold/15 bg-brand-green-deep text-brand-cream-ivory focus:outline-none focus:border-brand-saffron"
                  />
                </div>

                {/* Tag Badge */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">
                    Delicacy Badge Tag (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Signature, Popular, Must Try"
                    value={menuForm.tag}
                    onChange={(e) => setMenuForm({ ...menuForm, tag: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-brand-gold/15 bg-brand-green-deep text-brand-cream-ivory focus:outline-none focus:border-brand-saffron"
                  />
                </div>

                {/* Status Toggle */}
                <div className="flex items-center justify-between border-t border-brand-gold/10 pt-4 mt-2">
                  <span className="font-bold text-brand-cream-ivory/80">Available in Restaurant</span>
                  <button
                    type="button"
                    onClick={() => setMenuForm({ ...menuForm, status: menuForm.status === 'Available' ? 'Sold Out' : 'Available' })}
                    className={`w-10 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer ${
                      menuForm.status === 'Available' ? 'bg-green-600' : 'bg-brand-green-deep border border-brand-gold/20'
                    }`}
                  >
                    <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                      menuForm.status === 'Available' ? 'translate-x-4.5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Submit buttons */}
                <div className="flex gap-3 border-t border-brand-gold/10 pt-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsMenuModalOpen(false)}
                    className="flex-1 py-3 border.5 border-brand-cream-ivory/20 hover:bg-white/5 text-brand-cream-ivory/80 rounded-xl font-bold tracking-wider uppercase transition-colors cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-brand-saffron hover:bg-brand-saffron-dark text-white rounded-xl font-bold tracking-wider uppercase shadow-md transition-all hover:scale-[1.01] cursor-pointer text-center"
                  >
                    {editingItem ? 'Save Changes' : 'Create Dish'}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
