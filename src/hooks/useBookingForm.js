import { useCallback, useEffect, useRef, useState } from 'react';
import { bookingService } from '../services/booking/index.js';
import { initialBookingForm, toBookingRequest, validateBooking } from '../lib/booking.js';

/**
 * Booking form state machine: idle → loading → done (or back to idle with an
 * error). All network work goes through `bookingService`.
 * @param {Record<string,string|Function>} msg  booking.errors + currentLocation
 */
export function useBookingForm(msg) {
  const [form, setForm] = useState(initialBookingForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | done
  const [result, setResult] = useState(null);
  const [locating, setLocating] = useState(false);
  // Guards async callbacks against setting state after unmount. Set on every
  // mount so React StrictMode's dev double-mount does not leave it false.
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const clearError = (key) =>
    setErrors((e) => (e[key] || e.form ? { ...e, [key]: undefined, form: undefined } : e));

  const setField = useCallback((key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    clearError(key);
  }, []);

  const toggleStop = useCallback(() => {
    setForm((f) => ({ ...f, hasStop: !f.hasStop, stop: '' }));
    clearError('stop');
  }, []);

  const swap = useCallback(() => {
    setForm((f) => ({ ...f, pickup: f.dest, dest: f.pickup }));
    setErrors({});
  }, []);

  const locate = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setErrors((e) => ({ ...e, pickup: msg.geoUnsupported }));
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!mounted.current) return;
        setLocating(false);
        // Coordinates only — reverse geocoding needs a provider the client
        // has not chosen yet, so we do not invent a street address.
        const label = msg.currentLocation(pos.coords.latitude.toFixed(4), pos.coords.longitude.toFixed(4));
        setForm((f) => ({ ...f, pickup: label }));
        clearError('pickup');
      },
      () => {
        if (!mounted.current) return;
        setLocating(false);
        setErrors((e) => ({ ...e, pickup: msg.geoFailed }));
      },
      { timeout: 8000 }
    );
  }, [msg]);

  const submit = useCallback(
    async (ev) => {
      ev.preventDefault();
      const found = validateBooking(form, msg);
      if (Object.keys(found).length) {
        setErrors({ ...found, form: msg.form });
        // Move keyboard/screen-reader focus to the first invalid field.
        const first = ['pickup', 'dest', 'stop', 'date', 'time', 'rdate', 'rtime'].find((k) => found[k]);
        if (first) document.getElementById(`booking-${first}`)?.focus();
        return;
      }
      setStatus('loading');
      setErrors({});
      try {
        const res = await bookingService.submitBookingRequest(toBookingRequest(form));
        if (!res?.ok) throw new Error(res?.error || 'Booking request failed');
        if (!mounted.current) return;
        setResult(res);
        setStatus('done');
      } catch (err) {
        if (import.meta.env.DEV) console.warn('[booking]', err);
        if (!mounted.current) return;
        setStatus('idle');
        setErrors({ form: msg.failed });
      }
    },
    [form, msg]
  );

  const edit = useCallback(() => {
    setStatus('idle');
    setResult(null);
  }, []);

  return { form, errors, status, result, locating, setField, toggleStop, swap, locate, submit, edit };
}
