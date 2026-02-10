import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Calendar as CalendarIcon,
  Users,
  DollarSign,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Search,
  ArrowUpRight,
  LogOut,
  RefreshCw,
  XCircle,
  CheckCircle2,
  Lock,
  Clock,
  X,
  AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- HELPERS ---
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatTime = (isoString) =>
  new Date(isoString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

const currency = (amt) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amt);

// --- 🍞 CUSTOM TOASTER COMPONENT ---
const Toast = ({ id, message, type, onClose }) => {
  const isError = type === "error";
  const isSuccess = type === "success";
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`
        pointer-events-auto flex w-full max-w-sm items-start gap-4 rounded-xl p-4 shadow-2xl backdrop-blur-md border
        ${isError ? "bg-red-50/90 border-red-200 text-red-900" : 
          isSuccess ? "bg-emerald-50/90 border-emerald-200 text-emerald-900" : 
          "bg-[#1C1917]/90 border-[#44403C] text-white"}
      `}
    >
      <div className={`mt-0.5 rounded-full p-1 ${
        isError ? "bg-red-100 text-red-600" : 
        isSuccess ? "bg-emerald-100 text-emerald-600" : 
        "bg-white/10 text-amber-400"
      }`}>
        {isError ? <XCircle size={18} /> : isSuccess ? <CheckCircle2 size={18} /> : <Sparkles size={18} />}
      </div>
      
      <div className="flex-1">
        <h4 className="text-sm font-semibold">
          {isError ? "Error" : isSuccess ? "Success" : "Notification"}
        </h4>
        <p className={`text-xs mt-1 ${isError || isSuccess ? "text-gray-600" : "text-gray-300"}`}>
          {message}
        </p>
      </div>

      <button 
        onClick={() => onClose(id)} 
        className={`rounded-lg p-1 transition-colors ${
          isError || isSuccess ? "hover:bg-black/5 text-black/40" : "hover:bg-white/10 text-white/40"
        }`}
      >
        <X size={14} />
      </button>
    </motion.div>
  );
};

const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
    <AnimatePresence mode="popLayout">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </AnimatePresence>
  </div>
);

// --- REUSABLE MODAL ---
const Modal = ({ children, onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }} 
    onClick={onClose} 
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/60 backdrop-blur-sm"
  >
    <motion.div 
      initial={{ scale: 0.95, opacity: 0, y: 10 }} 
      animate={{ scale: 1, opacity: 1, y: 0 }} 
      exit={{ scale: 0.95, opacity: 0, y: 10 }} 
      onClick={e => e.stopPropagation()} 
      className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full border border-[#E7E5E4]"
    >
        {children}
    </motion.div>
  </motion.div>
);

// --- CONFIRMATION DIALOG CONTENT ---
const ConfirmContent = ({ title, message, onConfirm, onCancel, isDestructive }) => (
  <div className="text-center">
    <div className={`flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full ${isDestructive ? 'bg-red-50' : 'bg-amber-50'}`}>
      <AlertTriangle size={24} className={isDestructive ? 'text-red-600' : 'text-amber-600'} />
    </div>
    <h3 className="mb-2 font-serif text-xl italic">{title}</h3>
    <p className="text-sm text-[#78716C] mb-8">{message}</p>
    <div className="flex gap-3">
      <button onClick={onCancel} className="flex-1 btn-secondary">Cancel</button>
      <button 
        onClick={onConfirm} 
        className={`flex-1 btn-primary ${isDestructive ? 'bg-red-600 hover:bg-red-700 border-red-600' : ''}`}
      >
        Confirm
      </button>
    </div>
  </div>
);

// --- MAIN ADMIN COMPONENT ---
const VoiceOfTarotAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Custom Toaster State
  const [toasts, setToasts] = useState([]);
  
  // Global Confirmation State
  const [confirmation, setConfirmation] = useState({ 
    isOpen: false, 
    type: null, 
    id: null 
  });

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const BACKEND_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5001"
      : window.location.origin;

  // --- AUTH CHECK ---
  useEffect(() => {
    const token = localStorage.getItem("tarot_admin_token");
    if (token === "authenticated_session_active") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (password) => {
    if (password === "admin123") {
      localStorage.setItem("tarot_admin_token", "authenticated_session_active");
      setIsAuthenticated(true);
      addToast("Welcome back to the Sanctuary.", "success");
      return true;
    }
    addToast("Incorrect access key.", "error");
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem("tarot_admin_token");
    setIsAuthenticated(false);
    navigate("/");
    setConfirmation({ isOpen: false, type: null, id: null });
  };

  if (!isAuthenticated) {
    return (
      <>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        <LoginScreen onLogin={handleLogin} />
      </>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAF9] font-sans text-[#1C1917]">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* SIDEBAR */}
      <aside className="w-20 lg:w-64 bg-[#1C1917] text-white flex flex-col shadow-xl transition-all duration-300">
        <div className="p-4 lg:p-6 border-b border-[#292524] flex items-center justify-center lg:justify-start gap-3">
          <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
            <Sparkles size={20} className="text-white" />
          </div>
          <div className="hidden lg:block">
            <h1 className="font-serif text-lg italic">Voice of Tarot</h1>
            <p className="text-[10px] text-[#78716C] uppercase tracking-widest">Admin Portal</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem icon={LayoutGrid} label="Overview" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
          <SidebarItem icon={CalendarIcon} label="Calendar" active={activeTab === "calendar"} onClick={() => setActiveTab("calendar")} />
          <SidebarItem icon={Users} label="Bookings" active={activeTab === "bookings"} onClick={() => setActiveTab("bookings")} />
        </nav>

        <div className="p-4 border-t border-[#292524]">
          <button 
            onClick={() => setConfirmation({ isOpen: true, type: 'logout' })}
            className="flex items-center justify-center lg:justify-start gap-2 px-4 py-2 text-sm text-[#78716C] hover:text-white transition-colors w-full"
          >
            <LogOut size={18} />
            <span className="hidden lg:inline">Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="relative flex-1 h-screen overflow-y-auto">
        <header className="bg-white/80 backdrop-blur-md border-b border-[#E7E5E4] px-8 py-6 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl italic capitalize text-[#1C1917]">{activeTab}</h2>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              System Active
            </div>
          </div>
        </header>

        <div className="p-6 mx-auto lg:p-10 max-w-7xl">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <OverviewTab key="overview" backendUrl={BACKEND_URL} addToast={addToast} onNavigate={setActiveTab} />
            )}
            {activeTab === "calendar" && (
              <CalendarTab key="calendar" backendUrl={BACKEND_URL} addToast={addToast} />
            )}
            {activeTab === "bookings" && (
              <BookingsTab key="bookings" backendUrl={BACKEND_URL} addToast={addToast} />
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* GLOBAL LOGOUT CONFIRMATION */}
      <AnimatePresence>
        {confirmation.isOpen && confirmation.type === 'logout' && (
          <Modal onClose={() => setConfirmation({ isOpen: false })}>
            <ConfirmContent 
              title="End Session?" 
              message="You will need to login again to access the portal."
              isDestructive={true}
              onConfirm={handleLogout}
              onCancel={() => setConfirmation({ isOpen: false })}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 1. OVERVIEW TAB ---
const OverviewTab = ({ backendUrl, addToast, onNavigate }) => {
  const [stats, setStats] = useState({ totalBookings: 0, totalRevenue: 0, openSlots: { tarot: 0, sound: 0, group: 0 } });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/admin/stats`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard title="Total Bookings" value={stats.totalBookings} icon={Users} trend="+12%" loading={loading} />
        <StatCard title="Total Revenue" value={currency(stats.totalRevenue)} icon={DollarSign} trend="+8%" loading={loading} />
        <StatCard 
          title="Open Availability" 
          value={loading ? "..." : (stats.openSlots.tarot + stats.openSlots.sound + (stats.openSlots.group || 0))} 
          icon={CalendarIcon} 
          sub={!loading && `Tarot: ${stats.openSlots.tarot} • Sound: ${stats.openSlots.sound}`}
          loading={loading} 
        />
      </div>

      <div className="relative overflow-hidden bg-[#1C1917] text-white p-8 rounded-2xl shadow-xl">
        <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h3 className="mb-2 font-serif text-2xl italic">Manage your schedule</h3>
            <p className="text-[#A8A29E] max-w-lg">Quickly add new availability slots for the upcoming weeks.</p>
          </div>
          <button onClick={() => onNavigate("calendar")} className="px-6 py-3 bg-white text-[#1C1917] rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
            Go to Calendar <ArrowUpRight size={18} />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 -mt-10 -mr-10 rounded-full bg-white/5 blur-3xl" />
      </div>
    </motion.div>
  );
};

// --- 2. CALENDAR TAB ---
const CalendarTab = ({ backendUrl, addToast }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [selectedService, setSelectedService] = useState("tarot_1on1");
  const [loading, setLoading] = useState(false);
  
  // Local Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, slotId: null });
  
  const [selectedDateForAdd, setSelectedDateForAdd] = useState(null);
  const [newSlotTime, setNewSlotTime] = useState("10:00");

  const fetchSlots = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/admin/slots/${selectedService}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setSlots(Array.isArray(data) ? data : []);
    } catch (e) {
      addToast("Failed to sync calendar.", "error");
    } finally {
      setLoading(false);
    }
  }, [backendUrl, selectedService, addToast]);

  useEffect(() => { fetchSlots(); }, [fetchSlots]);

  const requestDelete = (slotId) => {
    setDeleteConfirm({ isOpen: true, slotId });
  };

  const confirmDeleteSlot = async () => {
    const slotId = deleteConfirm.slotId;
    try {
      const res = await fetch(`${backendUrl}/api/admin/slots/${slotId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setSlots(prev => prev.filter(s => s._id !== slotId));
      addToast("Slot removed successfully.", "success");
    } catch (e) {
      addToast("Could not delete slot.", "error");
    } finally {
      setDeleteConfirm({ isOpen: false, slotId: null });
    }
  };

  const handleAddSlot = async () => {
    if (!selectedDateForAdd || !newSlotTime) return;
    try {
      const dateStr = selectedDateForAdd.toLocaleDateString('en-CA');
      const isoString = new Date(`${dateStr}T${newSlotTime}:00`).toISOString();
      
      const res = await fetch(`${backendUrl}/api/admin/create-slots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId: selectedService, dates: [isoString] }),
      });
      
      if (!res.ok) throw new Error("Failed");
      
      addToast("Availability added successfully.", "success");
      setIsAddModalOpen(false);
      fetchSlots();
    } catch (e) {
      addToast("Failed to create slot. Check server.", "error");
    }
  };

  // Calendar Grid Logic
  const getDaysArray = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const gridDays = getDaysArray();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-[#E7E5E4]">
        <div className="flex p-1 bg-[#F5F5F4] rounded-lg">
          {[
            { id: "tarot_1on1", label: "Tarot" },
            { id: "sound_group", label: "Group Sound" },
            { id: "sound_1on1", label: "1:1 Sound" }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedService(s.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                selectedService === s.id ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeft size={20} /></button>
          <span className="w-32 font-serif text-lg italic text-center">
            {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
          </span>
          <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100"><ChevronRight size={20} /></button>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E7E5E4] overflow-hidden">
        <div className="grid grid-cols-7 border-b border-[#E7E5E4] bg-[#FAFAF9]">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
            <div key={d} className="py-3 text-center text-xs font-bold text-[#78716C] uppercase tracking-wider">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 auto-rows-fr">
          {gridDays.map((day, idx) => {
            if (!day) return <div key={`empty-${idx}`} className="bg-[#FAFAF9]/30 border-b border-r border-[#E7E5E4] min-h-[120px]" />;
            
            const daySlots = slots.filter(s => {
              const sd = new Date(s.startTime);
              return sd.getDate() === day.getDate() && sd.getMonth() === day.getMonth() && sd.getFullYear() === day.getFullYear();
            }).sort((a,b) => new Date(a.startTime) - new Date(b.startTime));

            const isToday = day.toDateString() === new Date().toDateString();

            return (
              <div 
                key={day.toISOString()} 
                className={`min-h-[120px] border-b border-r border-[#E7E5E4] p-2 relative group hover:bg-[#FAFAF9] transition-colors ${isToday ? "bg-blue-50/30" : ""}`}
                onClick={() => { setSelectedDateForAdd(day); setIsAddModalOpen(true); }}
              >
                <div className={`text-sm font-medium mb-2 w-7 h-7 flex items-center justify-center rounded-full ${isToday ? "bg-[#1C1917] text-white" : "text-gray-500"}`}>
                  {day.getDate()}
                </div>
                
                <div className="space-y-1">
                  {daySlots.map(slot => (
                    <div 
                      key={slot._id}
                      onClick={(e) => e.stopPropagation()} // Prevent clicking slot from opening add modal
                      className={`text-[10px] pl-2 pr-1 py-1 rounded border flex justify-between items-center group/slot transition-all ${
                        slot.isBooked 
                          ? "bg-amber-50 border-amber-200 text-amber-800" 
                          : "bg-white border-gray-200 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      <span className="font-medium">{formatTime(slot.startTime)}</span>
                      {slot.isBooked ? (
                        <Lock size={10} className="mr-1 text-amber-500" />
                      ) : (
                        <button 
                          onClick={(e) => { e.stopPropagation(); requestDelete(slot._id); }}
                          className="p-1 transition-colors rounded-md hover:bg-red-50 hover:text-red-600"
                          title="Delete Slot"
                        >
                          <Trash2 size={12} />
                        </button>
                      )} 
                    </div>
                  ))}
                </div>

                <div className="absolute transition-opacity opacity-0 pointer-events-none top-2 right-2 group-hover:opacity-100">
                  <div className="p-1 bg-[#1C1917] text-white rounded shadow-sm">
                    <Plus size={12} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Slot Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <Modal onClose={() => setIsAddModalOpen(false)}>
            <div className="text-left">
              <h3 className="mb-1 font-serif text-xl italic">Add Availability</h3>
              <p className="mb-6 text-sm text-gray-500">
                {selectedDateForAdd?.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric'})}
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold tracking-wider text-gray-500 uppercase">Time</label>
                  <div className="relative mt-1">
                    <Clock className="absolute text-gray-400 left-3 top-3" size={16} />
                    <input 
                      type="time" 
                      value={newSlotTime} 
                      onChange={e => setNewSlotTime(e.target.value)}
                      className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
                
                <button onClick={handleAddSlot} className="w-full mt-4 btn-primary">
                  Confirm Slot
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Delete Slot Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm.isOpen && (
           <Modal onClose={() => setDeleteConfirm({ isOpen: false, slotId: null })}>
              <ConfirmContent 
                title="Delete Slot?" 
                message="Are you sure you want to remove this time slot? This action cannot be undone."
                isDestructive={true}
                onConfirm={confirmDeleteSlot}
                onCancel={() => setDeleteConfirm({ isOpen: false, slotId: null })}
              />
           </Modal>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- 3. BOOKINGS TAB (SHOWCASE ONLY - NO ACTIONS) ---
const BookingsTab = ({ backendUrl, addToast }) => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/admin/bookings`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (e) {
      addToast("Failed to load bookings.", "error");
    } finally {
      setLoading(false);
    }
  }, [backendUrl, addToast]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const filtered = bookings.filter(b => 
    b.userName.toLowerCase().includes(search.toLowerCase()) || 
    b.userEmail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input 
            placeholder="Search by name or email..." 
            className="w-64 py-2 pl-10 pr-4 transition-colors border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            value={search} 
            onChange={e => setSearch(e.target.value)} 
          />
        </div>
        <button onClick={fetchBookings} className="p-2 text-gray-500 transition-colors rounded-lg hover:text-black hover:bg-gray-100">
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="bg-white border border-[#E7E5E4] rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#FAFAF9] text-gray-500 font-medium border-b border-[#E7E5E4]">
            <tr>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4">Status</th>
              {/* Removed Actions Column */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
               <tr><td colSpan="4" className="p-8 text-center text-gray-400">Loading records...</td></tr>
            ) : filtered.length === 0 ? (
               <tr><td colSpan="4" className="p-8 text-center text-gray-400">No bookings found.</td></tr>
            ) : (
              filtered.map(b => (
                <tr key={b._id} className="hover:bg-[#FAFAF9] transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#1C1917]">{b.userName}</p>
                    <p className="text-xs text-gray-500">{b.userEmail}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-700 capitalize">{b.serviceName.replace('_', ' ')}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {b.slotId ? (
                        <>
                            <div>{formatDate(b.slotId.startTime)}</div>
                            <div className="text-xs text-gray-500">{formatTime(b.slotId.startTime)}</div>
                        </>
                    ) : <span className="italic text-red-500">Slot Deleted</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        <CheckCircle2 size={12} /> Confirmed
                    </span>
                  </td>
                  {/* Removed Actions Cell */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

// --- SHARED UI COMPONENTS ---

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center lg:justify-start gap-3 px-3 lg:px-4 py-3 rounded-lg w-full transition-all ${
      active
        ? "bg-white/10 text-white shadow-lg backdrop-blur-sm"
        : "text-[#78716C] hover:bg-white/5 hover:text-white"
    }`}
  >
    <Icon size={20} />
    <span className="hidden text-sm font-medium lg:block">{label}</span>
  </button>
);

const StatCard = ({ title, value, icon: Icon, trend, sub, loading }) => (
  <div className="bg-white p-6 rounded-xl border border-[#E7E5E4] shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 bg-[#FAFAF9] rounded-lg text-[#44403C]">
        <Icon size={24} />
      </div>
      {trend && (
        <span className="text-[10px] px-2 py-1 bg-green-50 text-green-700 rounded-full font-bold border border-green-100">
          {trend}
        </span>
      )}
    </div>
    <p className="text-[11px] uppercase tracking-widest text-[#78716C] mb-1 font-bold">{title}</p>
    {loading ? (
      <div className="w-24 h-8 bg-gray-100 rounded animate-pulse" />
    ) : (
      <p className="mb-1 text-3xl font-light text-[#1C1917]">{value}</p>
    )}
    {sub && <p className="text-xs text-[#A8A29E] mt-2">{sub}</p>}
  </div>
);

const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) setError(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-[#E7E5E4] text-center">
          <div className="inline-flex p-4 rounded-full bg-[#1C1917] text-white mb-6 shadow-lg">
            <Lock size={28} />
          </div>
          <h2 className="mb-2 font-serif text-3xl italic text-[#1C1917]">Sanctum Admin</h2>
          <p className="text-[#78716C] text-sm mb-8">Secure entry point.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  placeholder="Enter Key"
                  className={`w-full px-4 py-3 rounded-xl border text-center tracking-widest ${
                    error ? "border-red-500 bg-red-50 text-red-900 placeholder:text-red-300" : "border-[#E7E5E4] bg-[#FAFAF9]"
                  } focus:outline-none focus:border-[#1C1917] transition-all`}
                />
            </div>
            {error && <p className="text-xs text-red-500">Invalid key.</p>}
            <button type="submit" className="w-full bg-[#1C1917] text-white py-3 rounded-xl font-medium hover:bg-[#292524] transition-all shadow-lg">
              Unlock
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// --- CSS UTILITIES (INJECTED) ---
const style = document.createElement('style');
style.textContent = `
  .btn-primary {
    background-color: #1C1917;
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.2s;
  }
  .btn-primary:hover {
    background-color: #292524;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  .btn-secondary {
    background-color: white;
    color: #1C1917;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #E7E5E4;
    font-weight: 500;
    transition: all 0.2s;
  }
  .btn-secondary:hover {
    background-color: #FAFAF9;
    border-color: #D6D3D1;
  }
`;
document.head.appendChild(style);

export default VoiceOfTarotAdmin;