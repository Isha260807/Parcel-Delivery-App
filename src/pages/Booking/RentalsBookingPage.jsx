import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppShell from '../../components/ui/AppShell';
import TopBar from '../../components/ui/TopBar';
import SectionTitle from '../../components/ui/SectionTitle';
import FarePanel from '../../components/ui/FarePanel';
import { useBookingStore } from '../../store/BookingStore';

const packages = [
  { id: '4h40k', label: '4 Hrs / 40 Km', base: 800 },
  { id: '8h80k', label: '8 Hrs / 80 Km', base: 1400 },
  { id: 'full', label: 'Full Day', base: 2200 },
];

export default function RentalsBookingPage() {
  const navigate = useNavigate();
  const { setBookingDraft } = useBookingStore();

  const [form, setForm] = useState({
    pickup: '',
    packageId: '4h40k',
    needDriver: true,
  });

  const selectedPackage = packages.find(p => p.id === form.packageId) || packages[0];

  const estimate = useMemo(() => {
    let subtotal = selectedPackage.base;
    const driverCharge = form.needDriver ? 400 : 0;
    subtotal += driverCharge;
    const tax = Math.round(subtotal * 0.05);

    return {
      serviceType: 'rentals',
      total: subtotal + tax,
      base: selectedPackage.base,
      surge: driverCharge,
      tax: tax,
      etaText: 'Scheduled',
      distanceKm: 0,
    };
  }, [selectedPackage, form.needDriver]);

  const canContinue = Boolean(form.pickup.trim());

  return (
    <AppShell>
      <TopBar title="Vehicle Rentals" subtitle="Step 1 of 2" showBack />

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
            placeholder="Starting point"
          />
        </label>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <SectionTitle title="Select Package" caption="Choose duration and limits" />
        <div className="stack-12" style={{ padding: '0 8px', marginTop: 12 }}>
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              className={`payment-tile ${form.packageId === pkg.id ? 'payment-tile--active' : ''}`}
              onClick={() => setForm(p => ({ ...p, packageId: pkg.id }))}
              style={{ background: '#fff', borderRadius: 16, padding: '16px' }}
            >
              <div>
                <p className="payment-tile__title">{pkg.label}</p>
                <p className="payment-tile__desc">Extra km at ₹12/km</p>
              </div>
              <div className="payment-tile__radio" />
            </button>
          ))}
        </div>
      </motion.div>

      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="form-card"
        style={{ marginTop: 16 }}
      >
        <p className="eyebrow">Driver Preference</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          <button
             type="button"
             className={`pill ${form.needDriver ? 'active' : ''}`}
             style={{ flex: 1 }}
             onClick={() => setForm(p => ({ ...p, needDriver: true }))}
          >
             With Driver
          </button>
          <button
             type="button"
             className={`pill ${!form.needDriver ? 'active' : ''}`}
             style={{ flex: 1 }}
             onClick={() => setForm(p => ({ ...p, needDriver: false }))}
          >
             Self-Drive
          </button>
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
            serviceType: 'rentals',
            pickup: form.pickup,
            drop: 'As Directed', // Rentals might not have a fixed drop initially
            schedule: '',
            distanceKm: 0, // Package limits apply instead
            vehicleId: 'rental-car',
            vehicleLabel: `Rental Car (${selectedPackage.label})`,
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
