import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../../components/ui/AppShell';
import TopBar from '../../components/ui/TopBar';
import StatusChip from '../../components/ui/StatusChip';
import { getOrders } from '../../lib/mockApi';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'in_transit', label: 'In Transit' },
  { id: 'completed', label: 'Delivered' },
  { id: 'driver_assigned', label: 'Assigned' },
];

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getOrders({ status: activeFilter })
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [activeFilter]);

  return (
    <AppShell>
      <TopBar title="Order History" subtitle="Track all bookings" />

      <div className="pill-group" role="tablist" aria-label="Order filters">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={activeFilter === filter.id ? 'pill active' : 'pill'}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {loading ? <div className="skeleton list-skeleton" /> : null}

      {!loading && orders.length === 0 ? <div className="empty-card">No bookings in this segment.</div> : null}

      <div className="stack-12">
        {orders.map((order) => (
          <button
            key={order.id}
            className="order-card"
            type="button"
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
              <span>{Math.round(order.distanceKm)} km</span>
            </div>
          </button>
        ))}
      </div>
    </AppShell>
  );
}
