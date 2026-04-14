import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppShell from '../../components/ui/AppShell';
import TopBar from '../../components/ui/TopBar';
import SectionTitle from '../../components/ui/SectionTitle';
import FarePanel from '../../components/ui/FarePanel';
import { useBookingStore } from '../../store/BookingStore';

const propertyTypes = ['1 BHK', '2 BHK', '3 BHK', 'Office Suite'];

export default function PackersBookingPage() {
  const navigate = useNavigate();
  const { setBookingDraft } = useBookingStore();

  const [form, setForm] = useState({
    pickup: '',
    drop: '',
    propertyType: '1 BHK',
    laborCount: 2,
    liftingNeeded: true,
  });

  const baseFare = useMemo(() => {
    let base = 1500;
    if (form.propertyType === '2 BHK') base = 3000;
    if (form.propertyType === '3 BHK') base = 5000;
    if (form.propertyType === 'Office Suite') base = 6500;
    return base;
  }, [form.propertyType]);

  const estimate = useMemo(() => {
    const laborFare = form.laborCount * 500;
    const liftingFare = form.liftingNeeded ? 300 : 0;
    const subtotal = baseFare + laborFare + liftingFare;
    const tax = Math.round(subtotal * 0.18);
    
    return {
      serviceType: 'packers',
      total: subtotal + tax,
      base: baseFare,
      surge: laborFare + liftingFare,
      tax: tax,
      etaText: 'Scheduled',
      distanceKm: 0,
    };
  }, [baseFare, form]);

  const canContinue = Boolean(form.pickup.trim() && form.drop.trim());

  return (
    <AppShell>
      <TopBar title="Packers & Movers" subtitle="Step 1 of 2" showBack />

      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="form-card"
      >
        <label>
          Pickup Location
          <input
            value={form.pickup}
            onChange={(e) => setForm((prev) => ({ ...prev, pickup: e.target.value }))}
            placeholder="Moving from"
          />
        </label>

        <label>
          Drop Location
          <input
            value={form.drop}
            onChange={(e) => setForm((prev) => ({ ...prev, drop: e.target.value }))}
            placeholder="Moving to"
          />
        </label>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <SectionTitle title="Property Details" caption="What are we moving?" />
        <div className="pill-group" style={{ padding: '0 8px', margin: '12px 0' }}>
          {propertyTypes.map((type) => (
            <button
              key={type}
              type="button"
              className={`pill ${form.propertyType === type ? 'active' : ''}`}
              onClick={() => setForm((prev) => ({ ...prev, propertyType: type }))}
            >
              {type}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="form-card"
      >
        <p className="eyebrow">Add-on Services</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Labor Support</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button 
              type="button" 
              className="icon-btn" 
              style={{ width: 28, height: 28 }}
              onClick={() => setForm(p => ({ ...p, laborCount: Math.max(1, p.laborCount - 1)}))}
            >-</button>
            <span style={{ fontWeight: 800 }}>{form.laborCount}</span>
            <button 
              type="button" 
              className="icon-btn" 
              style={{ width: 28, height: 28 }}
              onClick={() => setForm(p => ({ ...p, laborCount: p.laborCount + 1}))}
            >+</button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Staircase Lifting Needed</span>
          <label className="auth-check-wrap" style={{ cursor: 'pointer' }}>
             <input 
               type="checkbox" 
               checked={form.liftingNeeded}
               onChange={(e) => setForm(p => ({ ...p, liftingNeeded: e.target.checked }))} 
               style={{ display: 'block', width: 'auto', minHeight: 'auto' }}
             />
          </label>
        </div>
      </motion.section>

      <div style={{ marginTop: 16 }}>
        <FarePanel estimate={estimate} />
      </div>

      <button
        className="btn-primary"
        style={{ marginTop: 16, width: '100%' }}
        type="button"
        disabled={!canContinue}
        onClick={() => {
          setBookingDraft({
            serviceType: 'packers',
            pickup: form.pickup,
            drop: form.drop,
            schedule: '',
            distanceKm: 0,
            vehicleId: 'packers-truck',
            vehicleLabel: `${form.propertyType} Truck (${form.laborCount} labors)`,
            estimate,
          });
          navigate('/booking/review');
        }}
      >
        Continue to Review
      </button>
    </AppShell>
  );
}
