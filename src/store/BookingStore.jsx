import { createContext, useContext, useMemo, useState } from 'react';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [bookingDraft, setBookingDraft] = useState(null);
  const [latestBooking, setLatestBooking] = useState(null);
  const [latestInvoice, setLatestInvoice] = useState(null);

  const value = useMemo(
    () => ({
      bookingDraft,
      setBookingDraft,
      latestBooking,
      setLatestBooking,
      latestInvoice,
      setLatestInvoice,
      resetDraft: () => setBookingDraft(null),
    }),
    [bookingDraft, latestBooking, latestInvoice],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBookingStore() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBookingStore must be used inside BookingProvider');
  }
  return ctx;
}
