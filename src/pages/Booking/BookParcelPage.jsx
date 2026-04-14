import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Target, Minus, Plus, Bike, Zap, Truck } from 'lucide-react';
import Header from '../../components/layout/Header';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import { packageTypes, vehicleTypes } from '../../data/dummyData';
import { FileText, Shirt, Cpu, Utensils, Package } from 'lucide-react';

const pkgIconMap = {
    'file-text': FileText,
    shirt: Shirt,
    cpu: Cpu,
    utensils: Utensils,
    package: Package,
};

const vehicleIconMap = { bike: Bike, zap: Zap, truck: Truck };

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4 } }),
};

export default function BookParcelPage() {
    const navigate = useNavigate();
    const [pickup, setPickup] = useState('');
    const [drop, setDrop] = useState('');
    const [weight, setWeight] = useState(1);
    const [selectedPkg, setSelectedPkg] = useState(1);
    const [selectedVehicle, setSelectedVehicle] = useState(1);

    const vehicle = vehicleTypes.find((v) => v.id === selectedVehicle);
    const estimate = vehicle ? vehicle.base + weight * vehicle.perKg : 0;

    return (
        <div className="min-h-dvh pb-28" style={{ background: 'var(--bg)' }}>
            <Header title="Book Parcel" showBack />

            <div className="px-5 flex flex-col gap-5">
                {/* Location inputs */}
                <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="bg-white rounded-[var(--radius-lg)] p-4 shadow-[var(--shadow-sm)]">
                    <h3 className="text-sm font-bold text-[var(--secondary)] mb-3">Delivery Route</h3>

                    <div className="flex gap-3">
                        {/* Timeline indicators */}
                        <div className="flex flex-col items-center pt-4 gap-1">
                            <div className="w-3 h-3 rounded-full bg-[var(--primary)]" />
                            <div className="flex-1 w-px bg-dashed border-l-2 border-dashed border-gray-200 min-h-[30px]" />
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                        </div>

                        <div className="flex-1 flex flex-col gap-3">
                            <InputField
                                placeholder="Pickup location"
                                value={pickup}
                                onChange={(e) => setPickup(e.target.value)}
                                icon={<MapPin size={15} className="text-[var(--primary)]" />}
                            />
                            <InputField
                                placeholder="Drop location"
                                value={drop}
                                onChange={(e) => setDrop(e.target.value)}
                                icon={<Target size={15} className="text-red-400" />}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Package Type */}
                <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
                    <h3 className="text-sm font-bold text-[var(--secondary)] mb-3">Package Type</h3>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                        {packageTypes.map(({ id, name, icon }) => {
                            const Icon = pkgIconMap[icon] || Package;
                            const isActive = selectedPkg === id;
                            return (
                                <motion.button
                                    key={id}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedPkg(id)}
                                    className={`
                    flex items-center gap-2 px-3 py-2 rounded-full border-2 flex-shrink-0
                    transition-all duration-200 text-xs font-semibold
                    ${isActive
                                            ? 'border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)]'
                                            : 'border-gray-200 bg-white text-[var(--text-light)]'
                                        }
                  `}
                                >
                                    <Icon size={14} />
                                    {name}
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Weight */}
                <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
                    <div className="bg-white rounded-[var(--radius-lg)] p-4 shadow-[var(--shadow-sm)]">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-[var(--secondary)]">Package Weight</h3>
                                <p className="text-xs text-[var(--text-light)]">Select approximate weight</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <motion.button
                                    whileTap={{ scale: 0.85 }}
                                    onClick={() => setWeight((w) => Math.max(0.5, w - 0.5))}
                                    className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center"
                                >
                                    <Minus size={16} className="text-[var(--text)]" />
                                </motion.button>
                                <span className="text-lg font-black text-[var(--primary)] min-w-[50px] text-center">
                                    {weight} kg
                                </span>
                                <motion.button
                                    whileTap={{ scale: 0.85 }}
                                    onClick={() => setWeight((w) => Math.min(50, w + 0.5))}
                                    className="w-9 h-9 rounded-full green-gradient flex items-center justify-center shadow-[var(--shadow-card)]"
                                >
                                    <Plus size={16} className="text-white" />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Vehicle type */}
                <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
                    <h3 className="text-sm font-bold text-[var(--secondary)] mb-3">Select Service</h3>
                    <div className="flex flex-col gap-3">
                        {vehicleTypes.map(({ id, name, icon, base, perKg, eta }) => {
                            const Icon = vehicleIconMap[icon] || Bike;
                            const isActive = selectedVehicle === id;
                            const price = base + weight * perKg;
                            return (
                                <motion.button
                                    key={id}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedVehicle(id)}
                                    className={`
                    flex items-center gap-4 p-4 rounded-[var(--radius-lg)] border-2 text-left
                    transition-all duration-200
                    ${isActive
                                            ? 'border-[var(--primary)] bg-[var(--primary-light)] shadow-[var(--shadow-card)]'
                                            : 'border-gray-100 bg-white shadow-[var(--shadow-sm)]'
                                        }
                  `}
                                >
                                    <div className={`w-11 h-11 rounded-[var(--radius)] flex items-center justify-center ${isActive ? 'bg-[var(--primary)]' : 'bg-gray-100'}`}>
                                        <Icon size={22} className={isActive ? 'text-white' : 'text-[var(--text-light)]'} />
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-sm font-bold ${isActive ? 'text-[var(--primary)]' : 'text-[var(--secondary)]'}`}>{name}</p>
                                        <p className="text-xs text-[var(--text-light)]">ETA: {eta}</p>
                                    </div>
                                    <p className={`text-base font-black ${isActive ? 'text-[var(--primary)]' : 'text-[var(--secondary)]'}`}>
                                        ₹{price}
                                    </p>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Price Estimate */}
                <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
                    <div className="green-gradient rounded-[var(--radius-lg)] p-4 flex items-center justify-between shadow-[var(--shadow-card)]">
                        <div>
                            <p className="text-xs text-white/70">Estimated Price</p>
                            <p className="text-2xl font-black text-white">₹{estimate}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-white/70">ETA</p>
                            <p className="text-sm font-bold text-white">{vehicle?.eta}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Book Now */}
                <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible">
                    <Button
                        label="Book Now"
                        fullWidth
                        size="lg"
                        onClick={() => navigate('/track/ORD001')}
                        disabled={!pickup || !drop}
                    />
                </motion.div>
            </div>
        </div>
    );
}
