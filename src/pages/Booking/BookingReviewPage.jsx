import { useNavigate } from 'react-router-dom';
import AppShell from '../../components/ui/AppShell';
import TopBar from '../../components/ui/TopBar';
import FarePanel from '../../components/ui/FarePanel';
import { createBooking } from '../../lib/mockApi';
import { useBookingStore } from '../../store/BookingStore';
import { MapPin, ArrowRight, Box, ShieldCheck, ChevronRight } from 'lucide-react';

export default function BookingReviewPage() {
  const navigate = useNavigate();
  const { bookingDraft, setLatestBooking, resetDraft } = useBookingStore();

  if (!bookingDraft) {
    return (
      <AppShell>
        <TopBar title="Booking Review" showBack subtitle="No draft found" />
        <div className="empty-card">
          Booking details are missing. Start a new booking.
          <button className="btn-primary mt-12" type="button" onClick={() => navigate('/services')}>
            Go to Services
          </button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell className="bg-slate-50">
      <TopBar title="Booking Review" subtitle="Final details before booking" showBack />

      <div className="px-5 py-6 space-y-6 pb-32">
        <section className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Box size={16} className="text-emerald-600" />
            </div>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Order Summary</h3>
          </div>
          
          <div className="space-y-6 relative">
            <div className="absolute left-[13px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-slate-100" />
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center shadow-sm">
                 <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Pickup Point</p>
                <h4 className="text-sm font-extrabold text-slate-800 leading-tight">{bookingDraft.pickup}</h4>
              </div>
            </div>

            <div className="flex items-start gap-4 relative z-10">
              <div className="w-7 h-7 rounded-full bg-white border-2 border-orange-400 flex items-center justify-center shadow-sm">
                 <div className="w-2 h-2 rounded-full bg-orange-400" />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Destination</p>
                <h4 className="text-sm font-extrabold text-slate-800 leading-tight">{bookingDraft.drop}</h4>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50 grid grid-cols-2 gap-y-4 gap-x-6">
             <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Service</p>
                <p className="text-xs font-black text-slate-700 mt-0.5 capitalize">{bookingDraft.serviceType}</p>
             </div>
             <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Vehicle</p>
                <p className="text-xs font-black text-slate-700 mt-0.5">{bookingDraft.vehicleLabel}</p>
             </div>
             <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Distance</p>
                <p className="text-xs font-black text-slate-700 mt-0.5">{bookingDraft.distanceKm} km</p>
             </div>
             <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Policy</p>
                <p className="text-xs font-black text-emerald-600 mt-0.5 flex items-center gap-1">
                  <ShieldCheck size={12} /> Insured
                </p>
             </div>
          </div>
        </section>

        <FarePanel estimate={bookingDraft.estimate} />

        <button
          className="w-full bg-slate-900 text-white h-16 rounded-3xl flex items-center justify-center gap-2 group shadow-xl shadow-slate-200 active:scale-[0.98] transition-all"
          type="button"
          onClick={() => {
            navigate('/booking/payment');
          }}
        >
          <span className="text-sm font-black tracking-tight">Select Payment</span>
          <ChevronRight size={18} className="text-white group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </AppShell>
  );
}
