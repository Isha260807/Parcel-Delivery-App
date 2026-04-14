import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppShell from '../../components/ui/AppShell';
import TopBar from '../../components/ui/TopBar';
import SectionTitle from '../../components/ui/SectionTitle';
import ServiceCard from '../../components/ui/ServiceCard';
import StatusChip from '../../components/ui/StatusChip';
import { getOrders, getServiceCatalog } from '../../lib/mockApi';

function formatDate(input) {
  return new Date(input).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function HomePage() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;

    Promise.all([getServiceCatalog(), getOrders()])
      .then(([serviceData, orderData]) => {
        if (!alive) return;
        setServices(serviceData);
        setOrders(orderData);
      })
      .catch(() => {
        if (!alive) return;
        setError('Could not load dashboard right now.');
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  return (
    <AppShell>
      <TopBar
        title="Hi, Ishaa 👋"
        subtitle="Where are we sending things today?"
        className="topbar--home"
        actions={[
          { id: 'wallet', type: 'wallet', icon: 'wallet', label: '₹420', onClick: () => navigate('/wallet') },
          { id: 'search', icon: 'search', label: 'Search', onClick: () => navigate('/services') },
          { id: 'bell', icon: 'bell', label: 'Alerts', onClick: () => {} },
        ]}
      />

      <div className="home-page-surface">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hero-banner"
      >
        <div>
          <p className="eyebrow">Express Delivery Active</p>
          <h1>Reliable delivery at your doorstep in minutes.</h1>
          <p className="hero-sub">Track your parcels live with upfront, transparent pricing.</p>
        </div>
        <button onClick={() => navigate('/services')} className="btn-primary" type="button">
          Start Booking
        </button>
      </motion.section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <SectionTitle
          title="Our Services"
          caption="Ready to move your goods anywhere in the city."
          action={
            <button type="button" className="text-btn" onClick={() => navigate('/services')}>
              View All
            </button>
          }
        />

        <div className="grid-2">
          {loading
            ? [1, 2, 3, 4].map((key) => <div key={key} className="skeleton service-skeleton" />)
            : services.slice(0, 4).map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onClick={() =>
                    service.comingSoon
                      ? navigate('/services')
                      : navigate(`/booking/${service.id}`)
                  }
                />
              ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <SectionTitle
          title="Recent Activity"
          caption="Track your current and past bookings here."
          action={
            <button type="button" className="text-btn" onClick={() => navigate('/orders')}>
              Review All
            </button>
          }
        />

        {error ? <div className="alert-card">{error}</div> : null}

        <div className="stack-12">
          {!loading && orders.length === 0 ? <div className="empty-card">No recent activity. Start your first delivery!</div> : null}
          {orders.slice(0, 3).map((order) => (
            <button
              key={order.id}
              type="button"
              className="order-card"
              onClick={() => navigate(`/orders/${order.id}`)}
            >
              <div className="order-card__top">
                <p className="order-id">#{order.id}</p>
                <StatusChip status={order.status} />
              </div>
              <p className="route">{order.pickup}</p>
              <p className="route route--muted">to {order.drop}</p>
              <div className="order-card__meta">
                <span>{order.vehicleLabel}</span>
                <span>INR {order.amount}</span>
                <span>{formatDate(order.createdAt)}</span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
      </div>
    </AppShell>
  );
}
