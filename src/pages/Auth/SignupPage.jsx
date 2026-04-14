import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import googleIcon from '../../assets/google-icon.svg';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' },
  }),
};

export default function SignupPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/otp');
  };

  return (
    <div className="auth-page-shell auth-page-shell--signup">
      <div className="auth-pattern" aria-hidden="true" />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="auth-card"
      >
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="auth-brand">
          <div className="auth-brand__logo">P</div>
          <div>
            <h1>Sign up</h1>
          </div>
        </motion.div>

        <form onSubmit={handleSignup} className="auth-form-stack">
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="auth-field">
            <label htmlFor="signup-email">Email</label>
            <div className="auth-input-wrap">
              <Mail size={16} />
              <input
                id="signup-email"
                type="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={handleChange('email')}
              />
            </div>
          </motion.div>

          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="auth-field">
            <label htmlFor="signup-password">Password</label>
            <div className="auth-input-wrap">
              <Lock size={16} />
              <input
                id="signup-password"
                type={showPass ? 'text' : 'password'}
                placeholder=".............."
                value={form.password}
                onChange={handleChange('password')}
              />
              <button
                type="button"
                onClick={() => setShowPass((prev) => !prev)}
                className="auth-input-action"
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </motion.div>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="auth-field">
            <label htmlFor="signup-confirm-password">Confirm password</label>
            <div className="auth-input-wrap">
              <Lock size={16} />
              <input
                id="signup-confirm-password"
                type={showConfirmPass ? 'text' : 'password'}
                placeholder=".............."
                value={form.confirmPassword}
                onChange={handleChange('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass((prev) => !prev)}
                className="auth-input-action"
                aria-label={showConfirmPass ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </motion.div>

          <motion.button custom={4} variants={fadeUp} initial="hidden" animate="visible" type="submit" className="auth-primary-btn">
            Sign up
          </motion.button>
        </form>

        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="auth-divider">or</motion.div>

        <motion.button custom={6} variants={fadeUp} initial="hidden" animate="visible" type="button" className="auth-google-btn">
          <span className="auth-google-icon">
            <img src={googleIcon} alt="Google" width="14" height="14" />
          </span>
          Sign up with google
        </motion.button>

        <motion.p custom={7} variants={fadeUp} initial="hidden" animate="visible" className="auth-footnote">
          Already have an account?{' '}
          <Link to="/login">Log in here</Link>
        </motion.p>
      </motion.section>
    </div>
  );
}
