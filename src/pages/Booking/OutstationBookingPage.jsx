import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppShell from '../../components/ui/AppShell';
import TopBar from '../../components/ui/TopBar';
import SectionTitle from '../../components/ui/SectionTitle';
import FarePanel from '../../components/ui/FarePanel';
import { useBookingStore } from '../../store/BookingStore';

export default function OutstationBookingPage() {
  const navigate = useNavigate();
  const { setBookingDraft } = useBookingStore();

  const [form, setForm] = useState({
    pickup: '',
    drop: '',
    isRoundTrip: false,
    distanceKm: 150, // Default mock distance for outstation
  });

  const estimate = useMemo(() => {
    let base = 2500;
    const perKm = 12;
    const totalDistance = form.isRoundTrip ? form.distanceKm * 2 : form.distanceKm;
    let subtotal = base + (totalDistance * perKm);
    
    // Outstation specific charges
    const tollEstimate = 250;
    const driverAllowance = 300;
    subtotal += tollEstimate + driverAllowance;
    
    const tax = Math.round(subtotal * 0.05);

    return {
      serviceType: 'outstation',
      total: subtotal + tax,
      base: base,
      surge: tollEstimate + driverAllowance, // Reusing surge for tolls/allowance display
      tax: tax,
      etaText: 'Scheduled',
      distanceKm: totalDistance,
    };
  }, [form.isRoundTrip, form.distanceKm]);

  const canContinue = Boolean(form.pickup.trim() && form.drop.trim());

  return (
    <AppShell>
      <TopBar title="Outstation" subtitle="Step 1 of 2" showBack />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: '0 8px', marginBottom: 16 }}
      >
        <div style={{ display: 'flex', gap: 12, background: 'rgba(255,255,255,0.9)', padding: 6, borderRadius: 999, border: '1px solid var(--line)' }}>
          <button
             type="button"
             className={`pill ${!form.isRoundTrip ? 'active' : ''}`}
             style={{ flex: 1, border: 'none', minHeight: 38 }}
             onClick={() => setForm(p => ({ ...p, isRoundTrip: false }))}
          >
             One-Way
          </button>
          <button
             type="button"
             className={`pill ${form.isRoundTrip ? 'active' : ''}`}
             style={{ flex: 1, border: 'none', minHeight: 38 }}
             onClick={() => setForm(p => ({ ...p, isRoundTrip: true }))}
          >
             Round-Trip
          </button>
        </div>
      </motion.div>

      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="form-card"
      >
        <label>
          Pickup City / Address
          <input
            value={form.pickup}
            onChange={(e) => setForm((prev) => ({ ...prev, pickup: e.target.value }))}
            placeholder="Starting from"
          />
        </label>
        <label>
          Destination City
          <input
            value={form.drop}
            onChange={(e) => setForm((prev) => ({ ...prev, drop: e.target.value }))}
            placeholder="Going to"
          />
        </label>
        
        {/* Mocking distance input since we don't have real map data */}
        <label>
          Est. One-Way Distance (km)
          <input
            type="number"
            value={form.distanceKm}
            onChange={(e) => setForm((prev) => ({ ...prev, distanceKm: Number(e.target.value) }))}
          />
        </label>
      </motion.section>

      <motion.div
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.2 }}
         style={{ marginTop: 16 }}
      >
         <SectionTitle title="Fare Breakdown" caption="Includes estimated tolls & driver allowance" />
         <FarePanel estimate={estimate} />
      </motion.div>

      <button
        className="btn-primary"
        style={{ marginTop: 16, width: '100%' }}
        type="button"
        disabled={!canContinue}
        onClick={() => {
          setBookingDraft({
            serviceType: 'outstation',
            pickup: form.pickup,
            drop: form.drop,
            schedule: '',
            distanceKm: estimate.distanceKm,
            vehicleId: 'outstation-sedan',
            vehicleLabel: form.isRoundTrip ? 'Sedan (Round Trip)' : 'Sedan (One-Way)',
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
