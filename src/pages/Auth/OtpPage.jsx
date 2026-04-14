import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import Button from '../../components/common/Button';

export default function OtpPage() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const refs = useRef([]);

    const handleChange = (i, val) => {
        if (val.length > 1) return;
        const next = [...otp];
        next[i] = val;
        setOtp(next);
        if (val && i < 5) refs.current[i + 1]?.focus();
    };

    const handleKeyDown = (i, e) => {
        if (e.key === 'Backspace' && !otp[i] && i > 0) refs.current[i - 1]?.focus();
    };

    return (
        <div className="min-h-dvh bg-white flex flex-col">
            <div className="h-2 green-gradient" />

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/signup')}
                className="m-5 w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center self-start"
            >
                <ChevronLeft size={20} />
            </motion.button>

            <div className="flex-1 px-6 flex flex-col justify-center pb-20">
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-2xl green-gradient flex items-center justify-center mb-8 shadow-[var(--shadow-card)] pulse-green"
                >
                    <span className="text-white text-3xl">📱</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-black text-[var(--secondary)] mb-2"
                >
                    Verify OTP
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-[var(--text-light)] mb-10"
                >
                    We've sent a 6-digit code to your phone number
                </motion.p>

                {/* OTP Boxes */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-3 mb-8 justify-center"
                >
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={(el) => (refs.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            className={`
                w-12 h-14 text-center text-xl font-bold rounded-[var(--radius)]
                border-2 transition-all duration-200
                ${digit
                                    ? 'border-[var(--primary)] bg-[var(--primary-light)] text-[var(--primary)]'
                                    : 'border-gray-200 bg-gray-50 text-[var(--text)]'
                                }
                focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_var(--primary-glow)]
              `}
                        />
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                >
                    <Button
                        label="Verify OTP"
                        fullWidth
                        onClick={() => navigate('/home')}
                        disabled={otp.some((d) => !d)}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                >
                    <p className="text-sm text-[var(--text-light)]">
                        Didn't receive the code?{' '}
                        <button className="text-[var(--primary)] font-bold">Resend OTP</button>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
