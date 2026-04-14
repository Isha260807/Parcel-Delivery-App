import { motion } from 'framer-motion';
import {
    Bike, Zap, MapPin, Navigation, PlusCircle, Truck,
    Package, FileText, Cpu, Utensils, Shirt,
} from 'lucide-react';

const iconMap = {
    bike: Bike,
    zap: Zap,
    'map-pin': MapPin,
    navigation: Navigation,
    'plus-circle': PlusCircle,
    truck: Truck,
    package: Package,
    'file-text': FileText,
    cpu: Cpu,
    utensils: Utensils,
    shirt: Shirt,
};

export default function ServiceCard({ name, icon, bg, iconColor, onClick }) {
    const Icon = iconMap[icon] || Package;

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={onClick}
            className="flex flex-col items-center justify-center gap-2 bg-white rounded-[18px] px-2.5 py-3 shadow-[0_2px_10px_rgba(2,6,23,0.06)] border border-gray-100 cursor-pointer h-full min-h-[94px]"
        >
            {/* Icon box */}
            <div
                className="w-11 h-11 rounded-[14px] flex items-center justify-center transition-transform"
                style={{
                    backgroundColor: bg,
                }}
            >
                <Icon size={20} color={iconColor} strokeWidth={2} />
            </div>

            {/* Label */}
            <span className="text-[11px] font-semibold text-[var(--secondary)] text-center leading-[1.25] tracking-tight min-h-[28px]">
                {name}
            </span>
        </motion.div>
    );
}
