import { motion } from 'framer-motion';
import { Bike, Truck, Package2, Calendar, Route, Boxes, Car } from 'lucide-react';

const iconMap = {
  truck: Truck,
  package: Package2,
  bike: Bike,
  calendar: Calendar,
  route: Route,
  boxes: Boxes,
  car: Car,
};

export default function ServiceCard({ service, onClick }) {
  const Icon = iconMap[service.icon] || Truck;

  return (
    <motion.button
      whileHover={{ y: -6, boxShadow: 'var(--shadow-2)' }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`service-card service-card--${service.accent}`}
    >
      <div className="service-card__icon">
        {service.imageUrl ? (
          <div className={service.id === 'transport' ? 'icon-shine-wrapper' : ''} style={{ width: '100%', height: '100%' }}>
            <img 
              src={service.imageUrl} 
              alt={service.shortLabel} 
              className="w-full h-full object-contain" 
              style={{ 
                width: '100%', 
                height: '100%', 
                transform: service.id === 'transport' ? 'scaleX(-1)' : 'none' 
              }}
            />
          </div>
        ) : (
          <Icon size={24} />
        )}
      </div>
      <div className="service-card__content">
        <p className="service-card__title">{service.shortLabel}</p>
        <p className="service-card__desc">{service.eta}</p>
      </div>
      {service.comingSoon ? <span className="chip">Coming Soon</span> : null}
    </motion.button>
  );
}
