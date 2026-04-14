import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SplashPage from '../pages/Splash/SplashPage';
import LoginPage from '../pages/Auth/LoginPage';
import SignupPage from '../pages/Auth/SignupPage';
import OtpPage from '../pages/Auth/OtpPage';
import HomePage from '../pages/Home/HomePage';
import ServicesPage from '../pages/Services/ServicesPage';
import BookingPage from '../pages/Booking/BookingPage';


import BookingReviewPage from '../pages/Booking/BookingReviewPage';
import AllocationPage from '../pages/Booking/AllocationPage';
import TrackingPage from '../pages/Tracking/TrackingPage';
import OrderHistoryPage from '../pages/Orders/OrderHistoryPage';
import OrderDetailPage from '../pages/Orders/OrderDetailPage';
import PaymentPage from '../pages/Payments/PaymentPage';
import RatingPage from '../pages/Ratings/RatingPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import WalletPage from '../pages/Wallet/WalletPage';
import BottomNav from '../components/layout/BottomNav';

export default function AppRouter() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<SplashPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/otp" element={<OtpPage />} />

          <Route path="/home" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />


          <Route path="/booking/:serviceType" element={<BookingPage />} />
          <Route path="/booking/review" element={<BookingReviewPage />} />
          <Route path="/booking/payment" element={<PaymentPage />} />
          <Route path="/booking/allocation" element={<AllocationPage />} />
          <Route path="/tracking/:bookingId" element={<TrackingPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/orders/:bookingId" element={<OrderDetailPage />} />
          <Route path="/payments/:bookingId" element={<PaymentPage />} />
          <Route path="/ratings/:bookingId" element={<RatingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/wallet" element={<WalletPage />} />

          <Route path="/book" element={<Navigate to="/booking/parcel" replace />} />
          <Route path="/track/:id" element={<Navigate to="/orders" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      {!['/', '/login', '/signup', '/otp', '/booking/allocation'].some(path => location.pathname === path) && 
       !location.pathname.startsWith('/tracking/') && 
       <BottomNav />
      }
    </>
  );
}
