import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Badge from '../common/Badge';

export default function OrderCard({ order, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="bg-white rounded-[22px] p-4 shadow-[0_5px_16px_rgba(15,23,42,0.06)] border border-gray-100 cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-xs font-black text-[var(--primary)] flex-shrink-0">#{order.id}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
          <span className="text-xs text-[var(--text-light)] flex-shrink-0">{order.date}</span>
        </div>
        <div className="flex-shrink-0 ml-2">
          <Badge status={order.status} />
        </div>
      </div>

      <div className="flex items-start gap-3 mb-3">
        <div className="flex flex-col items-center gap-1 pt-[3px] flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] ring-2 ring-[var(--primary-light)]" />
          <div className="w-[1.5px] h-5 bg-gray-200 rounded-full" />
          <div className="w-2.5 h-2.5 rounded-full bg-red-400 ring-2 ring-red-100" />
        </div>
        <div className="flex flex-col gap-[10px] flex-1 min-w-0">
          <p className="text-[12px] font-semibold text-[var(--text)] truncate leading-tight">{order.pickup}</p>
          <p className="text-[12px] font-semibold text-[var(--text)] truncate leading-tight">{order.drop}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-medium text-[var(--text-light)] bg-gray-50 px-2 py-0.5 rounded-full">{order.type}</span>
          <span className="text-[11px] font-medium text-[var(--text-light)] bg-gray-50 px-2 py-0.5 rounded-full">{order.weight}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm font-black text-[var(--secondary)]">{`\u20B9${order.price}`}</span>
          <ChevronRight size={14} className="text-[var(--gray)]" />
        </div>
      </div>
    </motion.div>
  );
}
