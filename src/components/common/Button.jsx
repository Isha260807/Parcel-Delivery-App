import { motion } from 'framer-motion';

const variants = {
    primary: {
        bg: 'linear-gradient(135deg, #2FA36B 0%, #1e7a4f 100%)',
        cls: 'text-white shadow-[0_6px_20px_rgba(47,163,107,0.38)]',
    },
    secondary: {
        bg: null,
        cls: 'bg-[var(--primary-light)] text-[var(--primary)] font-semibold',
    },
    ghost: {
        bg: null,
        cls: 'bg-transparent text-[var(--primary)] border-2 border-[var(--primary)]',
    },
    danger: {
        bg: null,
        cls: 'bg-red-50 text-red-500 border-2 border-red-200',
    },
    white: {
        bg: null,
        cls: 'bg-white text-[var(--secondary)] shadow-[var(--shadow-sm)]',
    },
};

export default function Button({
    label,
    variant = 'primary',
    onClick,
    fullWidth = false,
    disabled = false,
    icon,
    size = 'md',
    className = '',
}) {
    const v = variants[variant] || variants.primary;

    const sizeClass =
        size === 'sm'
            ? 'py-2.5 px-4 text-sm'
            : size === 'lg'
                ? 'py-4.5 px-8 text-base'
                : 'py-4 px-6 text-base';

    return (
        <motion.button
            whileTap={{ scale: disabled ? 1 : 0.96 }}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            onClick={onClick}
            disabled={disabled}
            style={v.bg ? { background: v.bg } : {}}
            className={`
        flex items-center justify-center gap-2
        font-bold tracking-wide rounded-[var(--radius-lg)]
        transition-all duration-200 cursor-pointer select-none
        ${v.cls}
        ${sizeClass}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {label}
        </motion.button>
    );
}
