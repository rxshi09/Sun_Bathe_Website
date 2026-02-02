import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Calendar, Users, IndianRupee, Clock, 
  Trash2, Filter, ChevronRight, CheckCircle2, 
  AlertCircle, LayoutDashboard, Settings, LogOut
} from 'lucide-react';

const VoiceOfTarotAdmin = () => {
  // --- States ---
  const [activeTab, setActiveTab] = useState('slots'); // 'dashboard', 'slots', 'bookings'
  const [services] = useState([
    { id: "tarot_1on1", title: "1:1 Tarot Guidance" },
    { id: "sound_group", title: "Group Sound Healing" },
    { id: "sound_1on1", title: "1:1 Personal Sound" }
  ]);
  
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // New Slot Form State
  const [newSlot, setNewSlot] = useState({
    serviceId: 'tarot_1on1',
    date: '',
    time: '',
    duration: 60
  });

  const BACKEND_URL = window.location.hostname === 'localhost' ? 'http://localhost:5001' : window.location.origin;

  // --- Actions ---
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // In production, these would be your real API endpoints
      const slotRes = await fetch(`${BACKEND_URL}/api/admin/all-slots`);
      const slotData = await slotRes.json();
      setSlots(Array.isArray(slotData) ? slotData : []);

      const bookingRes = await fetch(`${BACKEND_URL}/api/admin/bookings`);
      const bookingData = await bookingRes.json();
      setBookings(Array.isArray(bookingData) ? bookingData : []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSlot = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const startTime = new Date(`${newSlot.date}T${newSlot.time}`);
      const res = await fetch(`${BACKEND_URL}/api/admin/create-slot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newSlot, startTime })
      });
      if (res.ok) {
        setNewSlot({ ...newSlot, date: '', time: '' });
        fetchData();
      }
    } catch (err) {
      alert("Error creating slot");
    } finally {
      setLoading(false);
    }
  };

  const deleteSlot = async (id) => {
    if (!window.confirm("Delete this slot?")) return;
    await fetch(`${BACKEND_URL}/api/admin/slots/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-stone-900 font-sans">
      {/* --- Sidebar --- */}
      <aside className="fixed flex flex-col w-64 h-full p-6 text-white bg-stone-950">
        <div className="px-2 mb-12">
          <h2 className="font-serif text-xl italic">Voice of Tarot</h2>
          <p className="text-[9px] uppercase tracking-[0.3em] text-stone-500 mt-1">Management Portal</p>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18}/> },
            { id: 'slots', label: 'Availability', icon: <Calendar size={18}/> },
            { id: 'bookings', label: 'Bookings', icon: <Users size={18}/> },
            { id: 'settings', label: 'Settings', icon: <Settings size={18}/> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${activeTab === item.id ? 'bg-white/10 text-white' : 'text-stone-500 hover:text-white'}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-3 px-4 py-3 mt-auto text-sm text-red-400 transition-all rounded-lg hover:bg-red-500/10">
          <LogOut size={18}/> Sign Out
        </button>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 p-10 ml-64">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-serif text-2xl italic capitalize">{activeTab}</h1>
            <p className="mt-1 text-xs text-stone-400">Manage your sacred sessions and clients</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-full border border-stone-200 text-[10px] font-bold tracking-widest uppercase">
              Admin Mode
            </div>
          </div>
        </header>

        {/* --- Dashboard View --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { label: 'Total Revenue', value: '₹42,500', icon: <IndianRupee/>, color: 'bg-green-500' },
                { label: 'Active Sessions', value: '12', icon: <Calendar/>, color: 'bg-blue-500' },
                { label: 'Total Clients', value: '84', icon: <Users/>, color: 'bg-purple-500' },
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-white border shadow-sm rounded-xl border-stone-100">
                  <div className={`w-10 h-10 ${stat.color} text-white rounded-lg flex items-center justify-center mb-4`}>
                    {stat.icon}
                  </div>
                  <p className="text-xs font-bold tracking-widest uppercase text-stone-400">{stat.label}</p>
                  <p className="mt-1 text-3xl font-light">{stat.value}</p>
                </div>
              ))}
            </div>
            
            <div className="p-8 bg-white border shadow-sm rounded-xl border-stone-100">
              <h3 className="mb-6 font-serif text-xl">Upcoming Schedule</h3>
              <div className="py-12 text-sm italic text-center text-stone-400">
                No sessions scheduled for the next 24 hours.
              </div>
            </div>
          </div>
        )}

        {/* --- Availability View --- */}
        {activeTab === 'slots' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Slot Creator Form */}
            <div className="p-8 bg-white border shadow-sm lg:col-span-1 rounded-xl border-stone-100 h-fit">
              <h3 className="mb-6 font-serif text-xl italic">Add New Slot</h3>
              <form onSubmit={handleCreateSlot} className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-400 block mb-2">Service</label>
                  <select 
                    value={newSlot.serviceId}
                    onChange={(e) => setNewSlot({...newSlot, serviceId: e.target.value})}
                    className="w-full p-3 text-sm border-none rounded-lg outline-none bg-stone-50 focus:ring-2 focus:ring-stone-900"
                  >
                    {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-stone-400 block mb-2">Date</label>
                    <input 
                      type="date" 
                      required
                      value={newSlot.date}
                      onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
                      className="w-full p-3 text-sm border-none rounded-lg outline-none bg-stone-50 focus:ring-2 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-stone-400 block mb-2">Start Time</label>
                    <input 
                      type="time" 
                      required
                      value={newSlot.time}
                      onChange={(e) => setNewSlot({...newSlot, time: e.target.value})}
                      className="w-full p-3 text-sm border-none rounded-lg outline-none bg-stone-50 focus:ring-2 focus:ring-stone-900"
                    />
                  </div>
                </div>
                <button 
                  disabled={loading}
                  className="w-full bg-stone-950 text-white py-4 rounded-lg text-[10px] uppercase font-bold tracking-widest hover:bg-stone-800 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Processing...' : <><Plus size={14}/> Create Slot</>}
                </button>
              </form>
            </div>

            {/* Existing Slots Table */}
            <div className="overflow-hidden bg-white border shadow-sm lg:col-span-2 rounded-xl border-stone-100">
              <div className="flex items-center justify-between p-6 border-b border-stone-50">
                <h3 className="font-serif text-xl italic">Active Time Slots</h3>
                <Filter size={16} className="cursor-pointer text-stone-300"/>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 text-[10px] uppercase tracking-widest text-stone-400">
                    <tr>
                      <th className="px-6 py-4 font-bold">Service</th>
                      <th className="px-6 py-4 font-bold">Time</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {slots.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-12 text-sm italic text-center text-stone-400">No active slots found. Create one to begin.</td>
                      </tr>
                    ) : slots.map((slot) => (
                      <tr key={slot._id} className="transition-colors hover:bg-stone-50/50">
                        <td className="px-6 py-4">
                          <p className="text-xs font-medium">{services.find(s => s.id === slot.serviceId)?.title}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs">{new Date(slot.startTime).toLocaleDateString([], {day:'numeric', month:'short'})}</p>
                          <p className="text-[10px] text-stone-400">{new Date(slot.startTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${slot.isLocked ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                            {slot.isLocked ? 'Reserved' : 'Available'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => deleteSlot(slot._id)} className="transition-colors text-stone-300 hover:text-red-500">
                            <Trash2 size={16}/>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- Bookings View --- */}
        {activeTab === 'bookings' && (
          <div className="overflow-hidden bg-white border shadow-sm rounded-xl border-stone-100">
            <div className="p-8 border-b border-stone-50">
               <h3 className="font-serif text-xl italic">Recent Bookings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-stone-50 text-[10px] uppercase tracking-widest text-stone-400">
                  <tr>
                    <th className="px-8 py-4 font-bold">Client</th>
                    <th className="px-8 py-4 font-bold">Session</th>
                    <th className="px-8 py-4 font-bold">Amount</th>
                    <th className="px-8 py-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-stone-50">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-stone-50/50">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-bold text-[10px]">
                            {booking.userDetails.name[0]}
                          </div>
                          <div>
                            <p className="font-medium">{booking.userDetails.name}</p>
                            <p className="text-[10px] text-stone-400">{booking.userDetails.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-xs">{booking.serviceName}</p>
                        <p className="text-[10px] text-stone-400 italic">{booking.option || 'Private Session'}</p>
                      </td>
                      <td className="px-8 py-6 font-medium">₹{booking.amount}</td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-1 text-green-600 font-bold text-[10px] uppercase">
                          <CheckCircle2 size={12}/> Paid
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VoiceOfTarotAdmin;