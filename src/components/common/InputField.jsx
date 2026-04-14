export default function InputField({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    icon,
    rightIcon,
    error,
    className = '',
}) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label className="text-xs font-semibold text-[var(--text-light)] uppercase tracking-wide">
                    {label}
                </label>
            )}
            <div
                className={`
          flex items-center gap-3 bg-white rounded-[var(--radius)] px-4 py-3.5
          border-2 transition-all duration-200
          ${error
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-100 focus-within:border-[var(--primary)] focus-within:shadow-[0_0_0_3px_var(--primary-glow)]'
                    }
        `}
            >
                {icon && (
                    <span className="text-[var(--gray)] flex-shrink-0">{icon}</span>
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="flex-1 text-sm text-[var(--text)] bg-transparent placeholder:text-[var(--gray)]"
                />
                {rightIcon && (
                    <span className="text-[var(--gray)] flex-shrink-0 cursor-pointer">{rightIcon}</span>
                )}
            </div>
            {error && (
                <span className="text-xs text-red-500 ml-1">{error}</span>
            )}
        </div>
    );
}
