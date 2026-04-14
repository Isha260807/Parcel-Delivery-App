import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { House, Boxes, ClipboardList, User } from 'lucide-react';

const navItems = [
  { path: '/home', icon: House, label: 'Home' },
  { path: '/services', icon: Boxes, label: 'Services' },
  { path: '/orders', icon: ClipboardList, label: 'Orders' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const hiddenPrefix = ['/login', '/signup', '/otp', '/'];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const hidden = hiddenPrefix.includes(location.pathname) || 
                 location.pathname.startsWith('/tracking/') || 
                 location.pathname.startsWith('/booking/');
  if (hidden) return null;

  return (
    <div className="bottom-nav-wrap">
      <div className="bottom-nav">
        {navItems.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path || location.pathname.startsWith(`${path}/`);
          return (
            <motion.button
              key={path}
              whileTap={{ scale: 0.95 }}
              type="button"
              className={active ? 'bottom-nav__item active' : 'bottom-nav__item'}
              onClick={() => navigate(path)}
            >
              <div className="nav-icon-wrap">
                <Icon size={18} />
              </div>
              <span>{label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
