import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header({
    title,
    showBack = false,
    showNotif = false,
    showSearch = false,
    transparent = false,
    light = false,
}) {
    const navigate = useNavigate();

    return (
        <div className={`flex items-center justify-between px-5 pt-12 pb-4 sticky top-0 z-10 ${transparent ? 'bg-transparent' : 'bg-[var(--bg)]'}`}>
            <div className="flex items-center gap-3">
                {showBack && (
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate(-1)}
                        className="w-9 h-9 rounded-full bg-white shadow-[var(--shadow-sm)] flex items-center justify-center"
                    >
                        <ChevronLeft size={20} className="text-[var(--secondary)]" />
                    </motion.button>
                )}
                {title && (
                    <h1 className={`text-base font-bold ${light ? 'text-white' : 'text-[var(--secondary)]'}`}>
                        {title}
                    </h1>
                )}
            </div>

            <div className="flex items-center gap-2">
                {showSearch && (
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 rounded-full bg-white shadow-[var(--shadow-sm)] flex items-center justify-center"
                    >
                        <Search size={18} className="text-[var(--secondary)]" />
                    </motion.button>
                )}
                {showNotif && (
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 rounded-full bg-white shadow-[var(--shadow-sm)] flex items-center justify-center relative"
                    >
                        <Bell size={18} className="text-[var(--secondary)]" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--primary)]" />
                    </motion.button>
                )}
            </div>
        </div>
    );
}
