import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Info, Search, Locate, Clock, ChevronRight, Plus, ShieldCheck, Box, UserCheck, Layers, Car, Tag, Calendar, Route } from 'lucide-react';
import AppShell from '../../components/ui/AppShell';
import TopBar from '../../components/ui/TopBar';
import SectionTitle from '../../components/ui/SectionTitle';
import VehicleCard from '../../components/ui/VehicleCard';
import { estimateFare, getVehicleCatalog, createBooking } from '../../lib/mockApi';
import { useBookingStore } from '../../store/BookingStore';

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapResizer({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 13);
  }, [center, map]);
  return null;
}

function MapPreview({ pickup, drop }) {
  const hasRoute = pickup && drop;
  const center = [28.6139, 77.2090]; // Default Delhi center

  return (
    <div className="map-preview-container h-[220px] w-full bg-slate-100 rounded-[32px] relative overflow-hidden mb-0 border border-slate-200">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-full w-full grayscale-[0.5] sepia-[0.2] hue-rotate-[60deg] brightness-[1.05]"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <MapResizer center={center} />

        {hasRoute && (
          <>
            <Marker position={[28.6139, 77.2090]} />
            <Marker position={[28.5355, 77.3910]} />
          </>
        )}
      </MapContainer>

      {!hasRoute && (
        <div className="absolute inset-0 z-[1000] pointer-events-none flex flex-col items-center justify-center bg-emerald-900/5 text-slate-400 space-y-3 pb-8">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-100">
            <Navigation size={24} className="text-emerald-500 animate-pulse" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900/60">Select your route</p>
        </div>
      )}

      {hasRoute && (
        <div className="absolute top-4 right-4 z-[1000] bg-emerald-600 px-3 py-1.5 rounded-full shadow-lg">
          <p className="text-[10px] font-black text-white uppercase tracking-wider">Map Active</p>
        </div>
      )}
    </div>
  );
}

export default function BookingPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setBookingDraft } = useBookingStore();

  const step = parseInt(searchParams.get('step') || '1');
  const setStep = (s) => setSearchParams({ step: s });

  const [form, setForm] = useState({
    pickup: '',
    drop: '',
    distanceKm: 12,
  });

  const [vehicles, setVehicles] = useState([]);
  const [parcelMode, setParcelMode] = useState('local'); // 'local' or 'intercity'
  const [packersOptions, setPackersOptions] = useState({ material: false, labor: false, floors: 0, type: 'house' });
  const [rentalMode, setRentalMode] = useState('driver'); // 'self' or 'driver'
  const [outstationMode, setOutstationMode] = useState('oneway'); // 'oneway' or 'roundtrip'
  const [outstationDate, setOutstationDate] = useState('2024-04-14');
  const [outstationTime, setOutstationTime] = useState('10:30');
  const [returnDate, setReturnDate] = useState('2024-04-16');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [estimate, setEstimate] = useState(null);
  const [loadingEstimate, setLoadingEstimate] = useState(false);

  const { serviceType: rawServiceType } = useParams();
  const resolvedService = ['transport', 'parcel', 'packers', 'rentals', 'outstation'].includes(rawServiceType) ? rawServiceType : 'transport';

  // Filter vehicles based on service mode
  const displayedVehicles = useMemo(() => {
    if (resolvedService === 'transport') return vehicles;
    if (resolvedService === 'parcel') {
      if (parcelMode === 'local') {
        return vehicles.filter(v => v.id.includes('small') || v.id.includes('large'));
      }
      return vehicles.filter(v => v.id.includes('intercity'));
    }
    if (resolvedService === 'packers') {
       if (packersOptions.type === 'house') {
          return vehicles.filter(v => v.id.includes('bhk'));
       }
       return vehicles.filter(v => v.id.includes('office'));
    }
    return vehicles;
  }, [vehicles, resolvedService, parcelMode, packersOptions.type]);

  useEffect(() => {
    getVehicleCatalog(resolvedService).then((data) => {
      setVehicles(data);
      if (data[0]) setSelectedVehicle(data[0].id);
    });
  }, [resolvedService]);

  // Auto-select first vehicle when mode changes
  useEffect(() => {
    if (displayedVehicles.length > 0 && !displayedVehicles.find(v => v.id === selectedVehicle)) {
      setSelectedVehicle(displayedVehicles[0].id);
    }
  }, [displayedVehicles, selectedVehicle]);

  useEffect(() => {
    if (!selectedVehicle || !form.pickup || !form.drop) return;

    setLoadingEstimate(true);
    estimateFare({
      serviceType: resolvedService,
      distanceKm: form.distanceKm,
      vehicleId: selectedVehicle,
      options: resolvedService === 'packers' ? packersOptions : {}
    })
      .then(setEstimate)
      .finally(() => setLoadingEstimate(false));
  }, [form.distanceKm, selectedVehicle, resolvedService, form.pickup, form.drop, packersOptions]);

  const canQuickAssign = Boolean(form.pickup.trim() && form.drop.trim() && selectedVehicle && estimate);

  const currentVehicleData = vehicles.find(v => v.id === selectedVehicle);

  const handleCreateDraft = () => {
    setBookingDraft({
      serviceType: resolvedService,
      pickup: form.pickup,
      drop: form.drop,
      distanceKm: form.distanceKm,
      vehicleId: selectedVehicle,
      vehicleLabel: currentVehicleData?.label || 'Selected Vehicle',
      estimate,
    });
  };

  return (
    <AppShell className="bg-gradient-to-b from-emerald-50 via-white to-white min-h-screen">
      <TopBar 
        title={
          resolvedService === 'transport' ? 'Transport Booking' : 
          resolvedService === 'packers' ? 'Packers & Movers' : 
          resolvedService === 'rentals' ? 'Vehicle Rentals' :
          resolvedService === 'outstation' ? 'Outstation Express' :
          'Parcel Delivery'
        }
        subtitle={step === 1 ? 'Enter Details' : 'Choose Vehicle'}
        showBack
        onBack={step === 2 ? () => setStep(1) : () => navigate('/home')}
      />

      <div className="pb-32">
        <MapPreview pickup={form.pickup} drop={form.drop} />

        <div className="px-4">
          <motion.section 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-20 bg-white rounded-[32px] p-6 shadow-xl border border-slate-100 -mt-6 mb-8"
          >
          <div className="space-y-4">
            <div className="relative pl-8">
              <div className="absolute left-1 top-2 w-4 h-4 rounded-full border-2 border-emerald-500 bg-white shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pickup Information</p>
              <div className="flex items-center gap-2">
                <input
                  className="w-full text-sm font-semibold text-slate-800 placeholder:text-slate-300 border-none p-0 focus:ring-0 outline-none focus:outline-none bg-transparent"
                  value={form.pickup}
                  onChange={(e) => setForm(p => ({ ...p, pickup: e.target.value }))}
                  placeholder="Where should driver arrive?"
                />
                <button
                  onClick={() => setForm(p => ({ ...p, pickup: 'Current Live Location' }))}
                  className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  <Locate size={16} />
                </button>
              </div>
            </div>

            <div className="h-px bg-slate-100 ml-8" />

            <div className="relative pl-8">
              <div className="absolute left-1 top-2 w-4 h-4 rounded-full border-2 border-orange-400 bg-white shadow-[0_0_8px_rgba(251,146,60,0.3)]" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Drop-off Destination</p>
              <div className="flex items-center gap-2">
                <input
                  className="w-full text-sm font-semibold text-slate-800 placeholder:text-slate-300 border-none p-0 focus:ring-0 outline-none focus:outline-none bg-transparent"
                  value={form.drop}
                  onChange={(e) => setForm(p => ({ ...p, drop: e.target.value }))}
                  placeholder="Where are we delivering?"
                />
                <div className="p-2 text-slate-300">
                  <Search size={16} />
                </div>
              </div>
            </div>
            
            {resolvedService === 'parcel' && (
              <>
                <div className="h-px bg-slate-100 ml-8" />
                <div className="pt-2 flex flex-col gap-4">
                   <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Service Type</p>
                        <p className="text-[11px] font-bold text-emerald-600 mt-1">
                          {parcelMode === 'local' ? 'Intra-city (Local)' : 'Inter-city (Express)'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                         <button 
                           onClick={() => setParcelMode('local')}
                           className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all ${parcelMode === 'local' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-400'}`}
                         >
                           Local
                         </button>
                         <button 
                           onClick={() => setParcelMode('intercity')}
                           className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all ${parcelMode === 'intercity' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-400'}`}
                         >
                           Inter-city
                         </button>
                      </div>
                   </div>

                   <div className="flex items-center justify-between opacity-50 cursor-not-allowed">
                      <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                            <Plus size={16} className="text-slate-400" />
                         </div>
                         <div>
                            <p className="text-[11px] font-bold text-slate-900 leading-none">Multi-drop Selection</p>
                            <p className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase tracking-tighter">Future Scope</p>
                         </div>
                      </div>
                      <div className="w-10 h-5 bg-slate-200 rounded-full relative">
                         <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
                      </div>
                   </div>

                   <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center">
                         <ShieldCheck size={18} className="text-emerald-600" />
                      </div>
                      <div>
                         <p className="text-[11px] font-black text-emerald-900 leading-none">OTP Confirmation Secure</p>
                         <p className="text-[9px] font-bold text-emerald-600/70 mt-0.5">Recipient must provide 4-digit OTP</p>
                      </div>
                   </div>
                </div>
              </>
            )}

            {resolvedService === 'packers' && (
              <>
                <div className="h-px bg-slate-100 ml-8" />
                <div className="pt-2 flex flex-col gap-5">
                   {/* Shifting Type Toggle */}
                   <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Shifting Category</p>
                        <p className="text-[11px] font-bold text-emerald-600 mt-1 capitalize">{packersOptions.type} Shifting</p>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                         <button 
                           onClick={() => setPackersOptions(p => ({...p, type: 'house'}))}
                           className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all ${packersOptions.type === 'house' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-400'}`}
                         >
                           House
                         </button>
                         <button 
                           onClick={() => setPackersOptions(p => ({...p, type: 'office'}))}
                           className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all ${packersOptions.type === 'office' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-400'}`}
                         >
                           Office
                         </button>
                      </div>
                   </div>

                   {/* Add-on Services */}
                   <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setPackersOptions(p => ({...p, material: !p.material}))}
                        className={`p-3 rounded-2xl border transition-all flex flex-col gap-2 ${packersOptions.material ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-white border-slate-100'}`}
                      >
                         <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${packersOptions.material ? 'bg-emerald-200 text-emerald-700' : 'bg-slate-50 text-slate-400'}`}>
                            <Box size={16} />
                         </div>
                         <div className="text-left">
                            <p className="text-[11px] font-black text-slate-900 leading-tight">Packing Material</p>
                            <p className={`text-[9px] font-bold mt-0.5 ${packersOptions.material ? 'text-emerald-600' : 'text-slate-400'}`}>
                               {packersOptions.material ? 'Selected' : 'Add Pack'}
                            </p>
                         </div>
                      </button>

                      <button 
                        onClick={() => setPackersOptions(p => ({...p, labor: !p.labor}))}
                        className={`p-3 rounded-2xl border transition-all flex flex-col gap-2 ${packersOptions.labor ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-white border-slate-100'}`}
                      >
                         <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${packersOptions.labor ? 'bg-emerald-200 text-emerald-700' : 'bg-slate-50 text-slate-400'}`}>
                            <UserCheck size={16} />
                         </div>
                         <div className="text-left">
                            <p className="text-[11px] font-black text-slate-900 leading-tight">Labor Support</p>
                            <p className={`text-[9px] font-bold mt-0.5 ${packersOptions.labor ? 'text-emerald-600' : 'text-slate-400'}`}>
                               {packersOptions.labor ? 'Requested' : 'Need Help?'}
                            </p>
                         </div>
                      </button>
                   </div>

                   {/* Floor Selection */}
                   <div className="bg-slate-50/80 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                            <Layers size={18} className="text-emerald-600" />
                         </div>
                         <div>
                            <p className="text-[11px] font-black text-slate-900 leading-none">Floors / Stairs</p>
                            <p className="text-[10px] font-semibold text-slate-400 mt-1">Ground + {packersOptions.floors}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <button 
                           onClick={() => setPackersOptions(p => ({...p, floors: Math.max(0, p.floors - 1)}))}
                           className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-100 font-bold text-slate-600"
                         >—</button>
                         <span className="text-sm font-black text-slate-900">{packersOptions.floors}</span>
                         <button 
                           onClick={() => setPackersOptions(p => ({...p, floors: p.floors + 1}))}
                           className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-100 font-bold text-slate-600"
                         >＋</button>
                      </div>
                   </div>
                </div>
              </>
            )}
            {resolvedService === 'rentals' && (
              <>
                <div className="h-px bg-slate-100 ml-8" />
                <div className="pt-2 flex flex-col gap-4">
                   <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Rental Mode</p>
                        <p className="text-[11px] font-bold text-emerald-600 mt-1">
                          {rentalMode === 'driver' ? 'Vehicle + Driver' : 'Self-Drive Vehicle'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                         <button 
                           onClick={() => setRentalMode('driver')}
                           className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all ${rentalMode === 'driver' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-400'}`}
                         >
                           With Driver
                         </button>
                         <button 
                           onClick={() => setRentalMode('self')}
                           className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all ${rentalMode === 'self' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-400'}`}
                         >
                           Self-Drive
                         </button>
                      </div>
                   </div>

                   <div className="bg-sky-50/50 border border-sky-100/50 rounded-2xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center">
                         <Tag size={18} className="text-sky-600" />
                      </div>
                      <div>
                         <p className="text-[11px] font-black text-sky-900 leading-none">Fixed Hourly Packages</p>
                         <p className="text-[9px] font-bold text-sky-600/70 mt-0.5">Insurance & Fuel included in base fare</p>
                      </div>
                   </div>
                </div>
              </>
            )}
            {resolvedService === 'outstation' && (
              <>
                <div className="h-px bg-slate-100 ml-8" />
                <div className="pt-2 flex flex-col gap-6">
                   {/* Trip Type Selector */}
                   <div className="flex bg-slate-100/50 p-1.5 rounded-[20px] border border-slate-100">
                      <button 
                        onClick={() => setOutstationMode('oneway')}
                        className={`flex-1 py-2.5 text-[11px] font-black rounded-[14px] transition-all flex items-center justify-center gap-2 ${outstationMode === 'oneway' ? 'bg-white shadow-md text-emerald-700' : 'text-slate-400'}`}
                      >
                        <Navigation size={14} /> One-Way
                      </button>
                      <button 
                        onClick={() => setOutstationMode('roundtrip')}
                        className={`flex-1 py-2.5 text-[11px] font-black rounded-[14px] transition-all flex items-center justify-center gap-2 ${outstationMode === 'roundtrip' ? 'bg-white shadow-md text-emerald-700' : 'text-slate-400'}`}
                      >
                        <Route size={14} /> Round-Trip
                      </button>
                   </div>

                   {/* Date & Time Grid */}
                   <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                         <div 
                           onClick={() => document.getElementById('pickupDate').showPicker()}
                           className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100 cursor-pointer active:scale-95 transition-transform"
                         >
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Pickup Date</p>
                            <div className="flex items-center gap-2">
                               <Calendar size={14} className="text-emerald-500" />
                               <span className="text-xs font-bold text-slate-700">{outstationDate}</span>
                            </div>
                            <input 
                              type="date" 
                              id="pickupDate" 
                              className="sr-only" 
                              value={outstationDate}
                              onChange={(e) => setOutstationDate(e.target.value)}
                            />
                         </div>
                         <div 
                           onClick={() => document.getElementById('pickupTime').showPicker()}
                           className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100 cursor-pointer active:scale-95 transition-transform"
                         >
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Pickup Time</p>
                            <div className="flex items-center gap-2">
                               <Clock size={14} className="text-emerald-500" />
                               <span className="text-xs font-bold text-slate-700">{outstationTime}</span>
                            </div>
                            <input 
                              type="time" 
                              id="pickupTime" 
                              className="sr-only" 
                              value={outstationTime}
                              onChange={(e) => setOutstationTime(e.target.value)}
                            />
                         </div>
                      </div>

                      {outstationMode === 'roundtrip' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          onClick={() => document.getElementById('retDate').showPicker()}
                          className="bg-emerald-50/30 rounded-2xl p-3.5 border border-emerald-100 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all"
                        >
                           <div>
                              <p className="text-[9px] font-bold text-emerald-600/70 uppercase tracking-widest mb-1.5">Return Date</p>
                              <div className="flex items-center gap-2">
                                 <Calendar size={14} className="text-emerald-600" />
                                 <span className="text-xs font-bold text-emerald-900">{returnDate}</span>
                              </div>
                              <input 
                                type="date" 
                                id="retDate" 
                                className="sr-only" 
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                              />
                           </div>
                           <Tag size={16} className="text-emerald-400" />
                        </motion.div>
                      )}
                   </div>

                   {/* Fare Highlight & Badges */}
                   <div className="relative overflow-hidden bg-slate-900 rounded-[28px] p-5 text-white shadow-lg shadow-slate-200">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                         <Car size={80} strokeWidth={1} />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                         <div className="bg-emerald-500 px-2 py-0.5 rounded-full">
                            <p className="text-[8px] font-black uppercase">Best Price Guaranteed</p>
                         </div>
                         <span className="text-[9px] font-bold text-slate-400">Est. Time: 4h 20m</span>
                      </div>
                      <div className="flex items-end justify-between">
                         <div>
                            <p className="text-[10px] font-bold text-slate-400">Estimated Fare</p>
                            <p className="text-3xl font-black mt-1">₹{estimate?.total || '---'}</p>
                         </div>
                         <div className="text-right">
                            <p className="text-[10px] font-bold text-slate-400">Total Distance</p>
                            <p className="text-lg font-black">{form.distanceKm} KM</p>
                         </div>
                      </div>
                   </div>
                </div>
              </>
            )}
          </div>
        </motion.section>

        <AnimatePresence>
          {form.pickup && form.drop && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                  {resolvedService === 'rentals' ? 'Available Packages' : 'Recommended Vehicles'}
                </h3>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-slate-100 shadow-sm">
                  <Car size={12} className="text-slate-400" />
                  <span className="text-[11px] font-bold text-slate-600">Premium Fleet</span>
                </div>
              </div>

              <div className="grid gap-3 mb-24">
                {displayedVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    active={selectedVehicle === vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                    fare={Math.round((estimate?.total || 0) * (vehicle.id === selectedVehicle ? 1 : (vehicle.id.includes('small') ? 0.4 : 1.2)))}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex items-center justify-between gap-4 z-50">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Approx. Fare</span>
          <p className="text-xl font-black text-slate-900 tracking-tight">
            {loadingEstimate ? 'Calculating...' : `INR ${estimate?.total || '0'}`}
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={!canQuickAssign}
          onClick={() => {
            handleCreateDraft();
            navigate('/booking/review');
          }}
          className="px-10 bg-emerald-600 h-14 rounded-2xl flex items-center justify-center gap-2 group disabled:opacity-50 disabled:grayscale transition-all shadow-lg shadow-emerald-200"
        >
          <span className="text-white font-extrabold tracking-tight">Book Now</span>
          <ChevronRight size={18} className="text-white group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </AppShell>
  );
}

