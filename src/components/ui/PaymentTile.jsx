import { motion } from 'framer-motion';

export default function PaymentTile({ option, active, onClick }) {
  const Icon = option.icon;

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`payment-tile ${active ? 'payment-tile--active' : ''}`}
      onClick={onClick}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {Icon ? (
           <div style={{ 
             width: 40, height: 40, borderRadius: 12, 
             background: active ? '#10b981' : '#f1f5f9', 
             color: active ? '#fff' : '#64748b',
             display: 'grid', placeItems: 'center',
             transition: 'all 0.2s ease'
           }}>
             <Icon size={20} />
           </div>
        ) : null}
        <div>
          <p className="payment-tile__title">{option.label}</p>
          <p className="payment-tile__desc">{option.description}</p>
        </div>
      </div>
      <span className="payment-tile__radio" aria-hidden="true" />
    </motion.button>
  );
}
