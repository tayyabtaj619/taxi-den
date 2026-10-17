import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { bookingService } from '../services/booking/index.js';
import { initialBooking, toBookingRequest } from '../lib/booking.js';

// Shared state for the hero entry card and the four booking steps. Values
// survive moving back and forth between steps and a page refresh (stored in
// sessionStorage for this browser tab only; cleared after a new booking).

const STORAGE_KEY = 'tdb-booking-v2';
const BookingContext = createContext(null);

function load() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return initialBooking;
    const saved = JSON.parse(raw);
    // Only keep known keys with the expected type.
    const next = { ...initialBooking };
    for (const k of Object.keys(initialBooking)) {
      if (typeof saved[k] === typeof initialBooking[k]) next[k] = saved[k];
    }
    return next;
  } catch {
    return initialBooking;
  }
}

function save(data) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable (private mode etc.): state still works in memory */
  }
}

export function BookingProvider({ children }) {
  const [data, setData] = useState(load);
  const [submission, setSubmission] = useState({ status: 'idle', result: null, error: null });

  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    save(data);
  }, [data]);

  const setField = useCallback((key, value) => setData((d) => ({ ...d, [key]: value })), []);
  const patch = useCallback((obj) => setData((d) => ({ ...d, ...obj })), []);

  const submit = useCallback(async (failedMessage) => {
    setSubmission({ status: 'loading', result: null, error: null });
    try {
      const res = await bookingService.submitBookingRequest(toBookingRequest(data));
      if (!res?.ok) throw new Error(res?.error || 'Booking request failed');
      if (mounted.current) setSubmission({ status: 'done', result: res, error: null });
      return true;
    } catch (err) {
      if (import.meta.env.DEV) console.warn('[booking]', err);
      if (mounted.current) setSubmission({ status: 'idle', result: null, error: failedMessage });
      return false;
    }
  }, [data]);

  const reset = useCallback(() => {
    setData(initialBooking);
    setSubmission({ status: 'idle', result: null, error: null });
  }, []);

  const value = useMemo(
    () => ({ data, setField, patch, submission, submit, reset }),
    [data, setField, patch, submission, submit, reset]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}
