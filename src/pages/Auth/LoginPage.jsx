import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Circle, CheckCircle2 } from 'lucide-react';
import googleIcon from '../../assets/google-icon.svg';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' },
  }),
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ emailOrPhone: '', password: '', remember: false });

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="auth-page-shell auth-page-shell--login">
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
            <h1>Log in</h1>
          </div>
        </motion.div>

        <form onSubmit={handleLogin} className="auth-form-stack">
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="auth-field">
            <label htmlFor="login-email">Email</label>
            <div className="auth-input-wrap">
              <Mail size={16} />
              <input
                id="login-email"
                type="text"
                placeholder="example@gmail.com"
                value={form.emailOrPhone}
                onChange={handleChange('emailOrPhone')}
              />
            </div>
          </motion.div>

          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="auth-field">
            <label htmlFor="login-password">Password</label>
            <div className="auth-input-wrap">
              <Lock size={16} />
              <input
                id="login-password"
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

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="auth-meta-row">
            <label className="auth-check-wrap">
              <input type="checkbox" checked={form.remember} onChange={handleChange('remember')} />
              {form.remember ? <CheckCircle2 size={12} /> : <Circle size={12} />}
              <span>Remember me</span>
            </label>
            <button type="button" className="auth-link-btn">Forgot your password</button>
          </motion.div>

          <motion.button custom={4} variants={fadeUp} initial="hidden" animate="visible" type="submit" className="auth-primary-btn">
            Log in
          </motion.button>
        </form>

        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="auth-divider">or</motion.div>

        <motion.button custom={6} variants={fadeUp} initial="hidden" animate="visible" type="button" className="auth-google-btn">
          <span className="auth-google-icon">
            <img src={googleIcon} alt="Google" width="14" height="14" />
          </span>
          Log in with google
        </motion.button>

        <motion.p custom={7} variants={fadeUp} initial="hidden" animate="visible" className="auth-footnote">
          Don't have an account?{' '}
          <Link to="/signup">Register here</Link>
        </motion.p>
      </motion.section>
    </div>
  );
}
