import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Pencil, 
  ClipboardList, 
  LayoutGrid, 
  MapPin, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  Settings,
  Bell
} from 'lucide-react';
import { motion } from 'framer-motion';
import AppShell from '../../components/ui/AppShell';
import TopBar from '../../components/ui/TopBar';
import { getOrders } from '../../lib/mockApi';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  const stats = useMemo(() => {
    const completed = orders.filter((item) => item.status === 'completed').length;
    const spending = orders.reduce((sum, item) => sum + item.amount, 0);
    return {
      total: orders.length,
      completed,
      spending,
    };
  }, [orders]);

  return (
    <AppShell className="profile-page-shell bg-slate-50 min-h-screen">
      <div className="profile-header-bg" />
      
      <TopBar 
        title="Profile" 
        showBack 
        light 
        style={{ position: 'relative', zIndex: 10, background: 'transparent', border: 'none' }} 
      />

      <section className="profile-user-info relative z-10 flex flex-col items-center text-center">
        <div className="profile-avatar-wrap relative mb-3">
          <div className="profile-avatar-large shadow-lg">I</div>
          <button className="profile-avatar-edit absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90">
            <Pencil size={14} />
          </button>
        </div>
        <h2 className="profile-user-name text-2xl font-extrabold tracking-tight">Ishaa Ali</h2>
        <p className="profile-user-meta text-xs font-semibold opacity-70">ishaa@example.com . +91 98765 43210</p>
      </section>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="profile-menu-card relative z-20 bg-white mx-4 rounded-[32px] shadow-sm p-6 -mt-6 mb-6"
      >
        <div className="profile-stats-mini flex justify-around mb-6 pb-6 border-b border-slate-100">
           <div className="stat-item flex flex-col items-center">
             <span className="stat-value text-lg font-extrabold">{stats.total}</span>
             <span className="stat-label text-[10px] font-bold uppercase tracking-wider text-slate-500">Total</span>
           </div>
           <div className="stat-item flex flex-col items-center">
             <span className="stat-value text-lg font-extrabold">{stats.completed}</span>
             <span className="stat-label text-[10px] font-bold uppercase tracking-wider text-slate-500">Done</span>
           </div>
           <div className="stat-item flex flex-col items-center">
             <span className="stat-value text-lg font-extrabold">Gold</span>
             <span className="stat-label text-[10px] font-bold uppercase tracking-wider text-slate-500">Tier</span>
           </div>
        </div>

        <div className="profile-menu-list flex flex-col gap-4">
          <button className="menu-item flex items-center justify-between py-2 active:opacity-60 transition-opacity" onClick={() => navigate('/orders')}>
            <div className="menu-item-left flex items-center gap-4 text-slate-700">
              <ClipboardList size={20} className="text-slate-400" />
              <span className="font-bold text-[15px]">My Orders</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </button>

          <button className="menu-item flex items-center justify-between py-2 active:opacity-60 transition-opacity" onClick={() => navigate('/services')}>
            <div className="menu-item-left flex items-center gap-4 text-slate-700">
              <LayoutGrid size={20} className="text-slate-400" />
              <span className="font-bold text-[15px]">Explore Services</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </button>

          <button className="menu-item flex items-center justify-between py-2 active:opacity-60 transition-opacity" onClick={() => navigate('/home')}>
            <div className="menu-item-left flex items-center gap-4 text-slate-700">
              <MapPin size={20} className="text-slate-400" />
              <span className="font-bold text-[15px]">Saved Addresses</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </button>

          <button className="menu-item flex items-center justify-between py-2 active:opacity-60 transition-opacity">
            <div className="menu-item-left flex items-center gap-4 text-slate-700">
              <ShieldCheck size={20} className="text-slate-400" />
              <span className="font-bold text-[15px]">Security</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </button>

          <button className="menu-item flex items-center justify-between py-2 active:opacity-60 transition-opacity">
            <div className="menu-item-left flex items-center gap-4 text-slate-700">
              <Bell size={20} className="text-slate-400" />
              <span className="font-bold text-[15px]">Notifications</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </button>

          <button className="menu-item flex items-center justify-between py-2 active:opacity-60 transition-opacity">
            <div className="menu-item-left flex items-center gap-4 text-slate-700">
              <Settings size={20} className="text-slate-400" />
              <span className="font-bold text-[15px]">Settings</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </button>

          <button className="menu-item flex items-center justify-between py-2 active:opacity-60 transition-opacity text-red-500" onClick={() => navigate('/login')}>
            <div className="menu-item-left flex items-center gap-4">
              <LogOut size={20} />
              <span className="font-bold text-[15px]">Logout</span>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </button>
        </div>
      </motion.div>
    </AppShell>
  );
}
