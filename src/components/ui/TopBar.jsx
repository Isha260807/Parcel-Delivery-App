import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Search, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TopBar({ title, subtitle, showBack = false, onBack, actions = [], className = '', light = false, style = {} }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const iconMap = {
    search: Search,
    bell: Bell,
    wallet: Wallet,
  };

  return (
    <header className={`topbar px-5 ${light ? 'topbar--light' : ''} ${className}`} style={style}>
      <div className="topbar__left">
        {showBack && (
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleBack}
            className="icon-btn mr-1"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </motion.button>
        )}
        <div>
          <p className="topbar__title">{title}</p>
          {subtitle ? <p className="topbar__subtitle">{subtitle}</p> : null}
        </div>
      </div>

      <div className="topbar__actions">
        {actions.map((action) => {
          const Icon = iconMap[action.icon] || Bell;
          if (action.type === 'wallet') {
            return (
              <motion.button
                key={action.id}
                whileTap={{ scale: 0.92 }}
                className="wallet-chip flex items-center gap-1.5 bg-white shadow-sm border border-slate-100 rounded-full px-2.5 py-1"
                onClick={action.onClick}
              >
                <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Icon size={13} className="text-emerald-600" />
                </div>
                <span className="text-[11px] font-black text-slate-700 leading-none">{action.label}</span>
              </motion.button>
            )
          }
          return (
            <motion.button
              key={action.id}
              whileTap={{ scale: 0.92 }}
              className="icon-btn"
              onClick={action.onClick}
              aria-label={action.label}
            >
              <Icon size={17} />
            </motion.button>
          );
        })}
      </div>
    </header>
  );
}
