import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Wallet, Coins, ShieldCheck, ChevronRight, Check, Download, FileText, CheckCircle2 } from 'lucide-react';
import AppShell from '../../components/ui/AppShell';
import TopBar from '../../components/ui/TopBar';
import { useBookingStore } from '../../store/BookingStore';
import { getBookingById } from '../../lib/mockApi';

const methods = [
  { id: 'cod', label: 'Cash on Delivery', description: 'Pay to partner after delivery', icon: Coins, color: 'emerald' },
  { id: 'upi', label: 'UPI / PhonePe / GPay', description: 'Scan and pay instantly', icon: Smartphone, color: 'blue' },
  { id: 'card', label: 'Credit / Debit Card', description: 'Add your card for easy pay', icon: CreditCard, color: 'purple' },
  { id: 'wallet', label: 'Porter Wallet', description: 'Fastest way to pay', icon: Wallet, color: 'emerald' },
];

export default function PaymentPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { bookingDraft } = useBookingStore();
  const [selectedMethod, setSelectedMethod] = useState('cod');
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (bookingId) {
      getBookingById(bookingId).then(setBooking);
    }
  }, [bookingId]);

  if (bookingId && booking) {
    const isPaid = booking.payment.state === 'Completed' || booking.payment.state === 'Success' || booking.payment.state === 'PAID';
    
    return (
      <AppShell className="bg-slate-50">
        <TopBar title="Payment Status" subtitle={`Order #${booking.id}`} showBack />
        
        <div className="px-5 py-8 space-y-6">
          <div className="bg-white rounded-[32px] p-8 text-center shadow-sm border border-slate-100">
             <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-emerald-500" />
             </div>
             <h2 className="text-xl font-black text-slate-900">Payment {isPaid ? 'Confirmed' : 'Pending'}</h2>
             <p className="text-sm font-bold text-slate-400 mt-1">Transaction ID: #TXN{booking.id}992</p>
             
             <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                <div className="text-left">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount Paid</p>
                   <p className="text-lg font-black text-slate-900">₹{booking.amount}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Method</p>
                   <p className="text-sm font-bold text-slate-700">{booking.payment.method || 'Cash on Delivery'}</p>
                </div>
             </div>
          </div>

          <div className="bg-emerald-600 rounded-[28px] p-6 text-white shadow-lg shadow-emerald-100">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                   <FileText size={24} />
                </div>
                <div className="flex-1">
                   <h3 className="text-sm font-black">Digital Invoice</h3>
                   <p className="text-[10px] font-bold text-emerald-100 opacity-80 mt-0.5">Your receipt is ready to download</p>
                </div>
                <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm active:scale-90 transition-all">
                   <Download size={18} />
                </button>
             </div>
          </div>

          <button 
             onClick={() => navigate('/home')}
             className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest"
          >
             Back to Home
          </button>
        </div>
      </AppShell>
    );
  }

  if (!bookingDraft) {
    return null;
  }

  return (
    <AppShell className="bg-slate-50">
      <TopBar 
        title="Select Payment" 
        subtitle="Secure and fast checkout" 
        showBack 
        onBack={() => navigate('/booking/review')} 
      />

      <div className="px-5 py-6 space-y-8 pb-32">
        {/* Order Summary Summary */}
        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100 flex items-center justify-between">
           <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Payable</p>
              <h2 className="text-2xl font-black text-slate-900">₹{bookingDraft.estimate?.total}</h2>
           </div>
           <div className="px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
              <span className="text-[10px] font-black text-emerald-600 uppercase">Step 3 of 4</span>
           </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
           <div className="flex items-center gap-2 mb-2">
             <ShieldCheck size={16} className="text-emerald-600" />
             <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Safe Payment Methods</p>
           </div>

           <div className="space-y-3">
              {methods.map((method) => (
                <motion.div
                  key={method.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`relative p-4 rounded-[24px] border-2 transition-all cursor-pointer flex items-center justify-between ${
                    selectedMethod === method.id 
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-4 ring-emerald-500/5' 
                    : 'border-white bg-white shadow-sm hover:border-slate-100'
                  }`}
                >
                   <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        selectedMethod === method.id ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400'
                      }`}>
                         <method.icon size={22} />
                      </div>
                      <div>
                         <p className={`text-sm font-black ${selectedMethod === method.id ? 'text-emerald-900' : 'text-slate-800'}`}>
                           {method.label}
                         </p>
                         <p className="text-[10px] font-bold text-slate-400 mt-0.5">{method.description}</p>
                      </div>
                   </div>
                   
                   <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                     selectedMethod === method.id ? 'bg-emerald-500 border-emerald-500' : 'border-slate-100'
                   }`}>
                      {selectedMethod === method.id && <Check size={14} className="text-white" />}
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Trust Note */}
        <div className="bg-slate-900 rounded-[28px] p-6 text-white text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck size={40} />
           </div>
           <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Your payment is safe</p>
           <p className="text-xs font-semibold text-slate-300 leading-relaxed max-w-[200px] mx-auto">
             100% Secure Transaction. We do not store your card details.
           </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-slate-100 z-50">
        <button 
          onClick={() => navigate('/booking/allocation')}
          className="w-full h-16 bg-emerald-600 text-white rounded-[24px] font-black text-sm shadow-xl shadow-emerald-200 flex items-center justify-center gap-2 group active:scale-95 transition-all"
        >
          {selectedMethod === 'cod' ? 'Confirm and Book' : `Pay ₹${bookingDraft.estimate?.total}`}
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </AppShell>
  );
}
