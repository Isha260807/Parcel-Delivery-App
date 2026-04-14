import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronsRight, Package } from 'lucide-react';
import welcomeImg from '../../assets/welcomePage.png';

export default function SplashPage() {
    const navigate = useNavigate();
    const constraintsRef = useRef(null);

    return (
        <div
            className="h-dvh flex flex-col relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #e8f8ef 0%, #dff3e8 55%, #d2ecdf 100%)' }}
        >

            {/* ===== TOP HERO ===== */}
            <div
                // ❌ flex-1 हटाया + spacing control किया
                className="relative flex flex-col items-center justify-center pt-12 pb-6 overflow-hidden"
            >
                {/* blobs */}
                <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full bg-[rgba(47,163,107,0.18)]" />
                <div className="absolute top-[30px] left-[-40px] w-32 h-32 rounded-full bg-[rgba(47,163,107,0.10)]" />
                <div className="absolute bottom-[-20px] left-[10%] w-20 h-20 rounded-full bg-[rgba(47,163,107,0.12)]" />

                {/* logo */}
                <motion.div
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="absolute top-12 left-5 flex items-center gap-2.5"
                >
                    <div className="w-10 h-10 rounded-2xl green-gradient flex items-center justify-center shadow-[var(--shadow-card)]">
                        <span className="text-white font-black text-xl">P</span>
                    </div>
                    <div>
                        <p className="text-base font-black text-[var(--primary)]">Porter</p>
                        <p className="text-[10px] text-[var(--primary-dark)] font-semibold uppercase tracking-widest">
                            Courier
                        </p>
                    </div>
                </motion.div>

                {/* image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.82, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.85, type: 'spring', stiffness: 90, damping: 14 }}
                    className="float-anim relative z-10"
                >
                    <div className="absolute inset-0 rounded-full blur-3xl opacity-30 scale-90 bg-[radial-gradient(circle,#2FA36B_0%,transparent_70%)]" />

                    <img
                        src={welcomeImg}
                        alt="Delivery"
                        // ✅ image ko thoda neeche push kiya overlap ke liye
                        className="relative z-10 w-[min(72vw,18rem)] drop-shadow-2xl -mb-2 mt-10"
                    />
                </motion.div>

                {/* badges */}
                <motion.div className="absolute top-[42%] right-5 bg-white rounded-2xl px-3 py-2 shadow flex gap-2">
                    <span>📦</span>
                    <div>
                        <p className="text-[10px] font-bold">Fast Delivery</p>
                        <p className="text-[9px] text-gray-400">Under 30 min</p>
                    </div>
                </motion.div>

                <motion.div className="absolute bottom-[22%] left-5 bg-white rounded-2xl px-3 py-2 shadow flex gap-2">
                    <span>⭐</span>
                    <div>
                        <p className="text-[10px] font-bold">4.9 Rating</p>
                        <p className="text-[9px] text-gray-400">10k+ reviews</p>
                    </div>
                </motion.div>
            </div>

            {/* ===== BOTTOM CARD ===== */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}

                // ❌ -mt-24 हटाया
                // ✅ translate use किया (strong + stable)
                className="px-8 pt-6 pb-8 relative z-20 text-center -translate-y-8"
            >
                <div className="inline-flex items-center gap-1.5 bg-[var(--primary-light)] px-2.5 py-1 rounded-full mb-6">
                    <div className="w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-pulse" />
                    <span className="text-[9px] font-bold text-[var(--primary)] uppercase">
                        Trusted Delivery Service
                    </span>
                </div>

                <h1 className="text-[28px] font-black leading-tight mb-8 text-[var(--primary)]">
                    Fast, Safe & <br />
                    <span className="text-[var(--primary)]">Always On Time</span>
                </h1>

                <p className="text-base text-[var(--text-light)] max-w-[400px] mx-auto">
                    Your trusted courier partner for quick, secure deliveries — anywhere, anytime.
                </p>

                {/* Secure spacer to guarantee gap */}
                <div className="h-4" />

                <div
                    ref={constraintsRef}
                    className="w-full max-w-[min(92vw,380px)] mx-auto mt-3 h-[64px] bg-[#278f5c] rounded-full shadow-sm border border-[#72bd4d] relative flex items-center overflow-hidden"
                >
                    {/* Text and arrows */}
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-[16px] text-white pointer-events-none pl-6">
                        Slide to Start
                    </div>

                    <div className="absolute right-4 text-white/80 pointer-events-none">
                        <ChevronsRight size={22} className="animate-pulse" />
                    </div>

                    {/* Draggable Circle */}
                    <motion.div
                        drag="x"
                        dragConstraints={constraintsRef}
                        dragSnapToOrigin={true}
                        dragElastic={0.05}
                        onDragEnd={(_, info) => {
                            // Adjusted threshold since button width is smaller
                            if (info.offset.x > 140) {
                                navigate('/login');
                            }
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-[52px] h-[52px] ml-1.5 rounded-full bg-[#f4c542] flex items-center justify-center text-white shadow-md cursor-grab active:cursor-grabbing relative z-10"
                    >
                        <Package size={20} className="text-white" />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
