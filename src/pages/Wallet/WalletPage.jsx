import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import AppShell from '../../components/ui/AppShell';
import TopBar from '../../components/ui/TopBar';

export default function WalletPage() {
  const navigate = useNavigate();

  const transactions = [
    { id: 1, type: 'spent', label: 'Ride to Airport', amount: 450, date: 'Today, 2:30 PM', status: 'Completed' },
    { id: 2, type: 'added', label: 'Added to Wallet', amount: 1000, date: 'Yesterday, 11:15 AM', status: 'Success' },
    { id: 3, type: 'spent', label: 'Parcel Delivery', amount: 120, date: '12 Apr, 9:00 AM', status: 'Completed' },
  ];

  const amounts = [100, 500, 1000, 2000];

  return (
    <AppShell className="bg-slate-50">
      <TopBar 
        title="My Wallet" 
        subtitle="Manage your balance & transactions" 
        showBack 
        onBack={() => navigate('/home')}
      />

      <div className="px-5 py-6 space-y-6">
        {/* Balance Card */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden bg-slate-900 rounded-[32px] p-8 text-white shadow-xl shadow-slate-200"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Wallet size={120} strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Available Balance</p>
            <h2 className="text-4xl font-black tracking-tight flex items-baseline gap-2">
              <span className="text-2xl font-bold opacity-60">₹</span>420
            </h2>
            <div className="mt-8 flex items-center gap-3">
               <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                  <ShieldCheck size={12} />
                  <span className="text-[10px] font-black uppercase tracking-wider">Secure Escrow</span>
               </div>
            </div>
          </div>
        </motion.section>

        {/* Quick Add Section */}
        <section className="bg-white rounded-[28px] p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
              <Plus size={18} />
            </div>
            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Add Money</h3>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-6">
            {amounts.map(amt => (
              <button 
                key={amt}
                className="py-2.5 rounded-xl border border-slate-100 text-xs font-black text-slate-600 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition-all"
              >
                ₹{amt}
              </button>
            ))}
          </div>

          <button className="w-full bg-emerald-600 text-white h-14 rounded-2xl font-black text-sm shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 active:scale-95 transition-all">
            Proceed to Recharge <ChevronRight size={18} />
          </button>
        </section>

        {/* Transactions Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                <Clock size={16} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">Recent Activity</h3>
            </div>
            <button className="text-[11px] font-black text-emerald-600 uppercase tracking-wider">See All</button>
          </div>

          <div className="space-y-3">
            {transactions.map(tx => (
              <div 
                key={tx.id}
                className="bg-white rounded-2xl p-4 flex items-center justify-between border border-slate-100 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'spent' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {tx.type === 'spent' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-800 leading-none">{tx.label}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-black ${tx.type === 'spent' ? 'text-slate-800' : 'text-emerald-600'}`}>
                    {tx.type === 'spent' ? '-' : '+'}₹{tx.amount}
                  </p>
                  <p className="text-[9px] font-black text-slate-300 uppercase mt-0.5 tracking-tighter">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
