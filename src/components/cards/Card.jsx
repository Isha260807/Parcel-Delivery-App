import { motion } from 'framer-motion';

export default function Card({ children, className = '', onClick, hoverable = false }) {
    return (
        <motion.div
            whileHover={hoverable ? { scale: 1.02, y: -2 } : {}}
            onClick={onClick}
            className={`
        bg-white rounded-[var(--radius)] shadow-[var(--shadow)]
        border border-white/60
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
        >
            {children}
        </motion.div>
    );
}
