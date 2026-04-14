export const BOOKING_STATUS = {
  pending: 'pending',
  driver_assigned: 'driver_assigned',
  arriving: 'arriving',
  picked_up: 'picked_up',
  in_transit: 'in_transit',
  completed: 'completed',
  cancelled: 'cancelled',
};

const delay = (ms = 380) => new Promise((resolve) => setTimeout(resolve, ms));

let services = [
  {
    id: 'transport',
    label: 'On-Demand Transport',
    shortLabel: 'Transport',
    icon: 'truck',
    imageUrl: '/transport_white.png',
    accent: 'emerald',
    description: 'Instant vehicle booking: Bike, Tempo, Mini Trucks',
    eta: 'Instant',
    comingSoon: false,
  },
  {
    id: 'parcel',
    label: 'Parcel Delivery',
    shortLabel: 'Parcel',
    icon: 'package',
    imageUrl: '/parcel_yellow.png',
    accent: 'yellow',
    description: 'Small and large parcel pickup with OTP delivery',
    eta: '15-35 min',
    comingSoon: false,
  },
  {
    id: 'packers',
    label: 'Packers & Movers',
    shortLabel: 'Packers & Movers',
    icon: 'boxes',
    imageUrl: '/packers_white.png',
    accent: 'violet',
    description: 'House and office shifting with labor options',
    eta: 'Scheduled',
    comingSoon: false,
  },
  {
    id: 'rentals',
    label: 'Vehicle Rentals',
    shortLabel: 'Rentals',
    icon: 'car',
    imageUrl: '/rentals_car_3d_premium_1776161320520.png',
    accent: 'sky',
    description: 'Hourly and daily vehicle packages',
    eta: 'Instant',
    comingSoon: false,
  },
  {
    id: 'outstation',
    label: 'Outstation',
    shortLabel: 'Outstation',
    icon: 'route',
    imageUrl: '/outstation_map_3d_premium_1776161357524.png',
    accent: 'teal',
    description: 'One-way and round-trip long-distance rides',
    eta: 'Scheduled',
    comingSoon: false,
  },
];

const vehicleCatalog = {
  transport: [
    { id: 'bike', label: 'Bike', capacity: 'Up to 20kg', eta: '5-10 min', base: 45, perKm: 8, icon: 'bike' },
    { id: 'tempo-3w', label: '3-Wheeler', capacity: 'Up to 500kg', eta: '12-18 min', base: 145, perKm: 18, icon: 'truck' },
    { id: 'mini-truck', label: 'Mini Truck', capacity: 'Up to 750kg', eta: '15-22 min', base: 210, perKm: 22, icon: 'truck' },
    { id: 'pickup-8ft', label: 'Tempo', capacity: 'Up to 1.5 tons', eta: '20-30 min', base: 350, perKm: 28, icon: 'truck' },
  ],
  parcel: [
    { id: 'parcel-small', label: 'Small Parcel', capacity: 'Up to 5kg', eta: '15-30 min', base: 60, perKm: 10 },
    { id: 'parcel-large', label: 'Large Parcel', capacity: 'Up to 20kg', eta: '25-45 min', base: 120, perKm: 15 },
    { id: 'parcel-intercity', label: 'Inter-city Express', capacity: 'Full Logistics', eta: '1-2 Days', base: 450, perKm: 8 },
  ],
  packers: [
    { id: 'packers-1bhk', label: '1 BHK / Small House', capacity: 'Up to 2 tons', eta: 'Next Day', base: 2500, perKm: 40 },
    { id: 'packers-3bhk', label: '2-3 BHK / Large House', capacity: 'Up to 5 tons', eta: 'Next Day', base: 5500, perKm: 65 },
    { id: 'packers-office', label: 'Office Shifting', capacity: 'Custom Load', eta: 'Next Day', base: 8000, perKm: 80 },
  ],
  rentals: [
    { id: 'rental-4hr', label: '4hr / 40km Package', capacity: 'Standard Car', eta: 'Fixed Price', base: 1200, perKm: 15 },
    { id: 'rental-8hr', label: '8hr / 80km Package', capacity: 'Standard Car', eta: 'Fixed Price', base: 2200, perKm: 15 },
    { id: 'rental-fullday', label: 'Full Day / 120km', capacity: 'Premium Sedan', eta: 'Fixed Price', base: 3500, perKm: 20 },
  ],
  outstation: [
    { id: 'os-sedan', label: 'Comfort Sedan', capacity: '4 Seats + Boot', eta: 'Scheduled', base: 2800, perKm: 13 },
    { id: 'os-suv', label: 'XL SUV', capacity: '6 Seats + Large Boot', eta: 'Scheduled', base: 4500, perKm: 18 },
    { id: 'os-luxury', label: 'Luxury Premium', capacity: '4 Seats + Exec', eta: 'Scheduled', base: 7500, perKm: 25 },
  ],
};

let orders = [
  {
    id: 'BK1001',
    serviceType: 'transport',
    pickup: 'Connaught Place, Delhi',
    drop: 'Cyber Hub, Gurugram',
    status: BOOKING_STATUS.in_transit,
    statusLabel: 'In Transit',
    distanceKm: 24,
    etaMinutes: 19,
    amount: 462,
    vehicleLabel: 'Mini Truck',
    createdAt: '2026-04-13T10:05:00Z',
    driver: { name: 'Vikram Singh', phone: '+91 98900 12012', rating: 4.9, vehicleNo: 'DL 1L AC 4421' },
    timeline: [
      { key: BOOKING_STATUS.pending, label: 'Booking placed', done: true, time: '10:05 AM' },
      { key: BOOKING_STATUS.driver_assigned, label: 'Driver assigned', done: true, time: '10:07 AM' },
      { key: BOOKING_STATUS.arriving, label: 'Driver arriving', done: true, time: '10:11 AM' },
      { key: BOOKING_STATUS.picked_up, label: 'Pickup completed', done: true, time: '10:20 AM' },
      { key: BOOKING_STATUS.in_transit, label: 'In transit', done: true, time: '10:27 AM' },
      { key: BOOKING_STATUS.completed, label: 'Delivered', done: false, time: '--' },
    ],
    tracking: {
      progress: 0.64,
      path: [
        { x: 18, y: 70 },
        { x: 35, y: 55 },
        { x: 57, y: 45 },
        { x: 78, y: 30 },
      ],
    },
    payment: { method: 'UPI', state: 'paid' },
    rated: false,
  },
  {
    id: 'BK1002',
    serviceType: 'parcel',
    pickup: 'Sector 62, Noida',
    drop: 'Sector 18, Noida',
    status: BOOKING_STATUS.completed,
    statusLabel: 'Delivered',
    distanceKm: 8,
    etaMinutes: 0,
    amount: 184,
    vehicleLabel: 'Express Bike',
    createdAt: '2026-04-12T15:35:00Z',
    driver: { name: 'Pranav Das', phone: '+91 97111 11119', rating: 4.7, vehicleNo: 'UP 16 BK 8290' },
    timeline: [
      { key: BOOKING_STATUS.pending, label: 'Booking placed', done: true, time: '03:35 PM' },
      { key: BOOKING_STATUS.driver_assigned, label: 'Driver assigned', done: true, time: '03:39 PM' },
      { key: BOOKING_STATUS.arriving, label: 'Driver arriving', done: true, time: '03:46 PM' },
      { key: BOOKING_STATUS.picked_up, label: 'Pickup completed', done: true, time: '03:55 PM' },
      { key: BOOKING_STATUS.in_transit, label: 'In transit', done: true, time: '04:02 PM' },
      { key: BOOKING_STATUS.completed, label: 'Delivered', done: true, time: '04:20 PM' },
    ],
    tracking: {
      progress: 1,
      path: [
        { x: 18, y: 70 },
        { x: 35, y: 55 },
        { x: 57, y: 45 },
        { x: 78, y: 30 },
      ],
    },
    payment: { method: 'Card', state: 'paid' },
    rated: true,
  },
];

export function getServiceCatalog() {
  return delay().then(() => [...services]);
}

export function getVehicleCatalog(serviceType) {
  return delay(250).then(() => [...(vehicleCatalog[serviceType] || [])]);
}

export const estimateFare = async ({ serviceType, distanceKm = 12, vehicleId, options = {} }) => {
  await delay(600);
  const catalog = vehicleCatalog[serviceType] || [];
  const selected = catalog.find((v) => v.id === vehicleId) || catalog[0];

  if (!selected) return { total: 0 };

  const base = selected.base;
  const perKm = selected.perKm;
  let subtotal = base + (distanceKm * perKm);

  // Packers specialized pricing
  if (serviceType === 'packers') {
     if (options.material) subtotal += 1200;
     if (options.labor) subtotal += 1800;
     subtotal += (options.floors || 0) * 350;
  }

  const surge = distanceKm > 20 ? Math.round(subtotal * 0.1) : 0;
  const tax = Math.round((subtotal + surge) * 0.05);

  return {
    serviceType,
    vehicleId,
    base,
    surge,
    tax,
    total: Math.round(subtotal + surge + tax),
    etaText: selected.eta || '15-25 min',
    distanceKm,
  };
};

export function createBooking(draft) {
  const bookingId = `BK${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();
  const status = BOOKING_STATUS.driver_assigned;
  const statusLabel = 'Driver Assigned';

  const item = {
    id: bookingId,
    serviceType: draft.serviceType,
    pickup: draft.pickup,
    drop: draft.drop,
    status,
    statusLabel,
    distanceKm: draft.estimate.distanceKm,
    etaMinutes: Number((draft.estimate.etaText || '20').split('-')[0]) || 20,
    amount: draft.estimate.total,
    vehicleLabel: draft.vehicleLabel,
    createdAt: now,
    driver: { name: 'Aman Verma', phone: '+91 98765 12009', rating: 4.8, vehicleNo: 'HR 26 LT 9700' },
    timeline: [
      { key: BOOKING_STATUS.pending, label: 'Booking placed', done: true, time: 'Now' },
      { key: BOOKING_STATUS.driver_assigned, label: 'Driver assigned', done: true, time: 'Now' },
      { key: BOOKING_STATUS.arriving, label: 'Driver arriving', done: false, time: '--' },
      { key: BOOKING_STATUS.picked_up, label: 'Pickup completed', done: false, time: '--' },
      { key: BOOKING_STATUS.in_transit, label: 'In transit', done: false, time: '--' },
      { key: BOOKING_STATUS.completed, label: 'Delivered', done: false, time: '--' },
    ],
    tracking: {
      progress: 0.18,
      path: [
        { x: 18, y: 70 },
        { x: 35, y: 55 },
        { x: 57, y: 45 },
        { x: 78, y: 30 },
      ],
    },
    payment: { method: '', state: 'pending' },
    rated: false,
  };

  orders = [item, ...orders];
  return delay(420).then(() => ({ ...item }));
}

export function getBookingById(id) {
  const booking = orders.find((item) => item.id === id);
  return delay(260).then(() => (booking ? { ...booking } : null));
}

export function getOrders(filters = {}) {
  const { status = 'all', serviceType = 'all' } = filters;
  const filtered = orders.filter((item) => {
    const statusMatch = status === 'all' || item.status === status;
    const serviceMatch = serviceType === 'all' || item.serviceType === serviceType;
    return statusMatch && serviceMatch;
  });
  return delay(260).then(() => [...filtered]);
}

export function payOrder({ bookingId, method }) {
  orders = orders.map((item) => {
    if (item.id !== bookingId) return item;
    return { ...item, payment: { method, state: 'paid' } };
  });
  const invoice = {
    invoiceId: `INV-${bookingId}`,
    bookingId,
    issuedAt: new Date().toISOString(),
    company: 'Porter Logistics Pvt Ltd',
    lineItems: [
      { title: 'Base + Distance Fare', amount: Math.round(orders.find((o) => o.id === bookingId)?.amount || 0) },
    ],
    total: Math.round(orders.find((o) => o.id === bookingId)?.amount || 0),
    method,
  };
  return delay(420).then(() => invoice);
}

export function rateOrder({ bookingId, stars, tags = [], comment = '' }) {
  orders = orders.map((item) => (item.id === bookingId ? { ...item, rated: true } : item));
  return delay(250).then(() => ({ bookingId, stars, tags, comment, saved: true }));
}

export function subscribeTracking(bookingId, callback) {
  let progress = 0.2;
  const tick = setInterval(() => {
    progress = Math.min(progress + Math.random() * 0.12, 1);

    const status =
      progress < 0.35
        ? BOOKING_STATUS.arriving
        : progress < 0.5
          ? BOOKING_STATUS.picked_up
          : progress < 0.95
            ? BOOKING_STATUS.in_transit
            : BOOKING_STATUS.completed;

    callback({
      bookingId,
      status,
      progress,
      etaMinutes: Math.max(0, Math.round((1 - progress) * 28)),
    });

    if (progress >= 1) {
      clearInterval(tick);
    }
  }, 2600);

  return () => clearInterval(tick);
}
