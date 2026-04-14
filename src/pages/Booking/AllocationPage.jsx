import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Radar, Loader2, Navigation, CheckCircle2, X, MapPin } from 'lucide-react';
import { createBooking } from '../../lib/mockApi';
import { useBookingStore } from '../../store/BookingStore';
import AppShell from '../../components/ui/AppShell';

export default function AllocationPage() {
  const navigate = useNavigate();
  const { bookingDraft, setLatestBooking, resetDraft } = useBookingStore();
  const [status, setStatus] = useState('finding'); // finding, assigned, success

  useEffect(() => {
    if (!bookingDraft) {
      navigate('/services');
      return;
    }

    let alive = true;

    // Simulate real-time allocation
    const timer = setTimeout(async () => {
      if (!alive) return;
      setStatus('assigned');
      
      const booking = await createBooking(bookingDraft);
      
      setTimeout(() => {
        if (!alive) return;
        setStatus('success');
        setLatestBooking(booking);
        resetDraft();
        
        setTimeout(() => {
          if (!alive) return;
          navigate(`/tracking/${booking.id}`);
        }, 1500);
      }, 2000);
    }, 4000);

    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [bookingDraft, navigate, setLatestBooking, resetDraft]);

  return (
    <AppShell isFlush={true} className="bg-[#022c22] h-[100dvh] flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Background Particles Simulation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1, y: Math.random() * 800, x: Math.random() * 400 }}
            animate={{ 
              opacity: [0.1, 0.4, 0.1], 
              y: [null, Math.random() * -100],
            }}
            transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full blur-[1px]"
          />
        ))}
      </div>

      <div className="relative flex items-center justify-center mb-16">
        {/* Radar concentric circles */}
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 3, opacity: [0, 0.3, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeOut"
            }}
            className="absolute w-32 h-32 rounded-full border border-emerald-400/20"
          />
        ))}

        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="relative w-56 h-56 rounded-full border border-emerald-500/10 flex items-center justify-center"
        >
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-400 rounded-full blur-[3px] shadow-[0_0_15px_#10b981]" />
           <div className="w-full h-full rounded-full border border-emerald-500/5 rotate-45" />
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.9, 1.05, 0.9] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)] border-4 border-emerald-400/30"
            >
               {status === 'finding' && <Navigation size={36} className="text-white animate-bounce" />}
               {status === 'assigned' && <Loader2 size={36} className="text-white animate-spin" />}
               {status === 'success' && <CheckCircle2 size={36} className="text-white" />}
            </motion.div>
        </div>
      </div>

      <div className="text-center space-y-4 relative z-10">
        <motion.h2 
          key={status}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-black text-white tracking-tight"
        >
          {status === 'finding' && 'Finding your partner...'}
          {status === 'assigned' && 'Partner Found!'}
          {status === 'success' && 'Ready to Roll!'}
        </motion.h2>
        
        <p className="text-emerald-400/60 text-sm font-semibold max-w-[260px] leading-relaxed mx-auto">
          {status === 'finding' && 'Contacting nearest drivers within 2km of your pickup...'}
          {status === 'assigned' && 'Securing your vehicle for the selected route...'}
          {status === 'success' && 'Hold tight! We are taking you to your live tracking screen.'}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 w-full max-w-[300px] relative z-10">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                  <Radar size={24} className="text-emerald-400 animate-pulse" />
              </div>
              <div className="flex-1">
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none mb-1">Live Allocation</p>
                  <p className="text-sm font-bold text-white">4 Partners nearby</p>
              </div>
              <div className="pr-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
          </div>

          <div className="px-5 py-4 bg-white/5 rounded-3xl flex items-center justify-between border border-white/5">
             <div className="flex items-center gap-2">
                <MapPin size={14} className="text-emerald-400/60" />
                <span className="text-[11px] font-bold text-white/50 truncate max-w-[150px]">{bookingDraft?.drop}</span>
             </div>
             <span className="text-[10px] font-black text-white/30 uppercase tracking-tighter">INR {bookingDraft?.estimate?.total}</span>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => navigate('/home')}
            className="w-full py-4 mt-2 border border-white/10 bg-white/5 rounded-3xl flex items-center justify-center gap-2 group hover:bg-white/10 active:scale-95 transition-all"
          >
            <div className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center">
              <X size={10} className="text-rose-400" />
            </div>
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Cancel Booking</span>
          </motion.button>
      </div>
    </AppShell>
  );
}
