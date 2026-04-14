import { motion } from 'framer-motion';

export default function AppShell({ children, className = '', isFlush = false }) {
  return (
    <div className={`page-wrap ${isFlush ? 'page-wrap--flush' : ''}`}>
      <div className="page-glow" aria-hidden="true" />
      <motion.main
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.34, ease: 'easeOut' }}
        className={`page-shell ${className}`}
      >
        {children}
      </motion.main>
    </div>
  );
}
