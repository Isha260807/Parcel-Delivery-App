import { motion } from 'framer-motion';
import { Bike, Truck, CircleGauge, Info, Clock, Weight } from 'lucide-react';

const iconMap = {
  bike: Bike,
  'mini-truck': Truck,
  'tempo-3w': CircleGauge,
  'pickup-8ft': Truck,
  'parcel-bike': Bike,
  'parcel-mini': CircleGauge,
  'parcel-van': Truck,
};

export default function VehicleCard({ vehicle, active, onClick, fare }) {
  const Icon = iconMap[vehicle.id] || Truck;

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative flex items-center justify-between p-4 rounded-3xl border-2 transition-all text-left ${
        active 
          ? 'bg-emerald-50/40 border-emerald-500 shadow-md shadow-emerald-100' 
          : 'bg-white border-slate-100 border-transparent shadow-sm'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
          active ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400'
        }`}>
          <Icon size={28} strokeWidth={2.5} />
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className={`font-extrabold text-base tracking-tight ${active ? 'text-emerald-900' : 'text-slate-800'}`}>
              {vehicle.label}
            </p>
            {active && (
              <div className="bg-emerald-500 w-1.5 h-1.5 rounded-full animate-pulse" />
            )}
          </div>
          
          <div className="flex items-center gap-3 mt-1 text-slate-500 font-semibold">
             <div className="flex items-center gap-1">
                <Weight size={11} className="text-slate-300" />
                <span className="text-[10px] uppercase tracking-wider">{vehicle.capacity}</span>
             </div>
             <div className="flex items-center gap-1">
                <Clock size={11} className="text-slate-300" />
                <span className="text-[10px] uppercase tracking-wider">{vehicle.eta}</span>
             </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className={`text-lg font-black tracking-tight ${active ? 'text-emerald-600' : 'text-slate-900'}`}>
          ₹{fare}
        </p>
        <p className="text-[10px] font-bold text-slate-400">upfront</p>
      </div>
    </motion.button>
  );
}
