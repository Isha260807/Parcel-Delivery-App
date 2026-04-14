import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  MessageCircle, 
  Star, 
  Shield, 
  ChevronDown, 
  RotateCcw, 
  Navigation,
  Map as MapIcon,
  Clock,
  PackageCheck
} from 'lucide-react';
import AppShell from '../../components/ui/AppShell';
import TopBar from '../../components/ui/TopBar';
import Timeline from '../../components/ui/Timeline';
import StatusChip from '../../components/ui/StatusChip';
import { BOOKING_STATUS, getBookingById, subscribeTracking } from '../../lib/mockApi';

export default function TrackingPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [state, setState] = useState({ 
    status: BOOKING_STATUS.driver_assigned, 
    progress: 0.1, 
    etaMinutes: 22 
  });
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    let unsubscribe = null;
    getBookingById(bookingId).then((data) => {
      if (!data) return;
      setBooking(data);
      unsubscribe = subscribeTracking(bookingId, setState);
    });
    return () => unsubscribe && unsubscribe();
  }, [bookingId]);

  const timeline = useMemo(() => {
    if (!booking) return [];
    const activeMap = {
      [BOOKING_STATUS.driver_assigned]: 1,
      [BOOKING_STATUS.arriving]: 2,
      [BOOKING_STATUS.picked_up]: 3,
      [BOOKING_STATUS.in_transit]: 4,
      [BOOKING_STATUS.completed]: 5,
    };
    const current = activeMap[state.status] || 1;
    return booking.timeline.map((item, idx) => ({
      ...item,
      done: idx <= current,
    }));
  }, [booking, state.status]);

  if (!booking) return (
    <AppShell className="bg-slate-50">
      <TopBar title="Tracking" showBack />
      <div className="p-8 flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    </AppShell>
  );

  const isCompleted = state.status === BOOKING_STATUS.completed;

  return (
    <AppShell className="bg-slate-50 relative">
      <TopBar 
        title={`Live Tracking`} 
        subtitle={state.status.replace('_', ' ').toUpperCase()}
        showBack 
        className="topbar--dark-header"
      />

      <div className="relative h-[340px] w-full bg-slate-200 overflow-hidden">
        {/* Animated Map Background */}
        <div className="absolute inset-0 opacity-40 grayscale" 
             style={{ 
               backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
               backgroundSize: '40px 40px' 
             }} 
        />
        
        <div className="absolute inset-0 p-12">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <motion.path 
               d="M10,80 Q30,60 50,70 T90,20" 
               fill="none" 
               stroke="#e2e8f0" 
               strokeWidth="6" 
               strokeLinecap="round" 
             />
             <motion.path 
               d="M10,80 Q30,60 50,70 T90,20" 
               fill="none" 
               stroke="#10b981" 
               strokeWidth="4" 
               strokeDasharray="100"
               initial={{ strokeDashoffset: 100 }}
               animate={{ strokeDashoffset: 100 - (state.progress * 100) }}
               strokeLinecap="round" 
             />
           </svg>
           
           {/* Pickup Pin */}
           <div className="absolute left-[10%] bottom-[20%] w-6 h-6 -ml-3 -mb-3 flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-white border-4 border-emerald-500 z-10" />
           </div>
           
           {/* Drop Pin */}
           <div className="absolute right-[10%] top-[20%] w-6 h-6 -mr-3 -mt-3 flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-white border-4 border-orange-500 z-10" />
           </div>

           {/* Driver Marker */}
           <motion.div 
             className="absolute w-12 h-12 bg-white rounded-2xl shadow-xl border border-emerald-100 flex items-center justify-center -ml-6 -mt-6 z-20"
             animate={{ 
               left: `${10 + state.progress * 80}%`, 
               top: `${80 - state.progress * 60}%` 
             }}
           >
              <Navigation size={20} className="text-emerald-600 rotate-45" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
           </motion.div>
        </div>

        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2">
           <Clock size={16} className="text-emerald-600" />
           <p className="text-sm font-black text-slate-800 tracking-tight">
             {isCompleted ? 'Delivered' : `ETA ${state.etaMinutes} MIN`}
           </p>
        </div>
      </div>

      <div className="relative z-30 -mt-10 px-4 space-y-4 mb-24">
        {/* Driver Card */}
        <motion.div 
          className="bg-white rounded-[32px] p-5 shadow-lg border border-slate-100"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 p-0.5 border border-slate-100">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.driver.name}`} 
                  alt="Driver" 
                  className="rounded-2xl"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-900 tracking-tight">{booking.driver.name}</h3>
                  <div className="flex items-center gap-0.5 bg-yellow-50 px-1.5 py-0.5 rounded-lg border border-yellow-100">
                    <Star size={10} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-[10px] font-bold text-yellow-700">{booking.driver.rating}</span>
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-wider">{booking.driver.vehicleNo}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="w-11 h-11 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-slate-100 border border-slate-100 transition-colors">
                <MessageCircle size={20} />
              </button>
              <button className="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-100 active:scale-95 transition-all">
                <Phone size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 py-3 px-4 bg-slate-50 rounded-2xl border border-slate-100">
             <Shield size={16} className="text-emerald-600" />
             <p className="text-xs font-bold text-slate-600">OTP protection active. Share with driver only at drop-off.</p>
          </div>
        </motion.div>

        {/* Status & Address Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
           <button 
             onClick={() => setShowTimeline(!showTimeline)}
             className="w-full flex items-center justify-between mb-4 border-b border-slate-50 pb-4"
           >
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Status</p>
                <p className="text-base font-black text-emerald-600 tracking-tight mt-1">{state.status.replace('_', ' ').toUpperCase()}</p>
              </div>
              <ChevronDown className={`text-slate-400 transition-transform ${showTimeline ? 'rotate-180' : ''}`} size={20} />
           </button>

           <AnimatePresence>
             {showTimeline && (
               <motion.div
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: 'auto', opacity: 1 }}
                 exit={{ height: 0, opacity: 0 }}
                 className="overflow-hidden"
               >
                 <Timeline items={timeline} />
               </motion.div>
             )}
           </AnimatePresence>

           <div className="space-y-4 mt-2">
              <div className="flex items-start gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pickup</p>
                    <p className="text-sm font-bold text-slate-700 leading-snug">{booking.pickup}</p>
                 </div>
              </div>
              <div className="flex items-start gap-3">
                 <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5" />
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Destination</p>
                    <p className="text-sm font-bold text-slate-700 leading-snug">{booking.drop}</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-slate-100 z-50">
          <button
            onClick={() => isCompleted ? navigate(`/ratings/${booking.id}`) : navigate(`/payments/${booking.id}`)}
            className={`w-full h-14 rounded-2xl font-extrabold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] ${
              isCompleted 
                ? 'bg-emerald-600 text-white shadow-emerald-100' 
                : 'bg-white border-2 border-emerald-600 text-emerald-600 shadow-slate-100'
            }`}
          >
            {isCompleted ? <PackageCheck size={20} /> : <RotateCcw size={20} />}
            {isCompleted ? 'Rate Experience' : 'View Payment Details'}
          </button>
      </div>
    </AppShell>
  );
}

