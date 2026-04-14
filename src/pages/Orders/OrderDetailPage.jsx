import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Box, ShieldCheck, ChevronRight, Navigation, FileText, CreditCard } from 'lucide-react';
import AppShell from '../../components/ui/AppShell';
import TopBar from '../../components/ui/TopBar';
import StatusChip from '../../components/ui/StatusChip';
import Timeline from '../../components/ui/Timeline';
import { getBookingById } from '../../lib/mockApi';

export default function OrderDetailPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    getBookingById(bookingId).then(setBooking);
  }, [bookingId]);

  if (!booking) {
    return (
      <AppShell>
        <TopBar title="Order Detail" showBack subtitle="Loading booking" />
        <div className="skeleton tracking-skeleton" />
      </AppShell>
    );
  }

  return (
    <AppShell className="bg-slate-50">
      <TopBar title="Order Detail" subtitle={`Booking #${booking.id}`} showBack />

      <div className="px-5 py-6 space-y-6 pb-32">
        <section className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Box size={16} />
              </div>
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Order Info</h3>
            </div>
            <StatusChip status={booking.status} />
          </div>

          <div className="space-y-4 relative mb-8">
            <div className="absolute left-[7px] top-4 bottom-4 w-0.5 border-l-2 border-dashed border-slate-100" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm" />
              <p className="text-sm font-bold text-slate-700 truncate">{booking.pickup}</p>
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-4 h-4 rounded-full bg-orange-400 border-4 border-white shadow-sm" />
              <p className="text-sm font-bold text-slate-700 truncate">{booking.drop}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Driver</p>
              <p className="text-xs font-black text-slate-700 mt-0.5">{booking.driver.name}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Amount</p>
              <p className="text-xs font-black text-slate-700 mt-0.5">INR {booking.amount}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Mode</p>
              <p className="text-xs font-black text-emerald-600 mt-0.5 capitalize">{booking.payment.method || 'Cash on Delivery'}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
              <p className="text-xs font-black text-slate-700 mt-0.5">{booking.payment.state}</p>
            </div>
          </div>
        </section>

        <Timeline items={booking.timeline} />

        <div className="grid grid-cols-2 gap-3">
          <button 
            className="h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center gap-2 text-xs font-black text-slate-600 shadow-sm active:scale-95 transition-all" 
            type="button" 
            onClick={() => navigate(`/tracking/${booking.id}`)}
          >
            <Navigation size={16} /> Tracking
          </button>
          <button 
            className="h-14 bg-emerald-600 rounded-2xl flex items-center justify-center gap-2 text-xs font-black text-white shadow-lg shadow-emerald-100 active:scale-95 transition-all" 
            type="button" 
            onClick={() => navigate(`/payments/${booking.id}`)}
          >
            <CreditCard size={16} /> Open Payment
          </button>
        </div>
      </div>
    </AppShell>
  );
}
