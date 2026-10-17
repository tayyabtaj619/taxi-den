// Pure booking helpers: initial state, per-step validation, request mapping
// and formatting. Free of React so they are easy to test and reuse.

import { MAX_PASSENGERS, vehicleById } from '../data/vehicles.js';

export { MAX_PASSENGERS };
export const MIN_LEAD_MINUTES = 15;
export const COMMENTS_MAX = 500;

/** Flow steps in order. `id` is used in the URL hash (#/book/<id>). */
export const STEPS = ['luggage', 'offers', 'travel', 'contact'];

export const initialBooking = {
  // Entry (hero card)
  pickup: '',
  dest: '',
  hasStop: false,
  stop: '',
  when: 'now', // 'now' | 'later'
  date: '',
  time: '',
  // Step 1
  luggage: '', // 'yes' | 'no'
  // Step 2
  pax: 1,
  vehicle: '',
  // Step 3
  isReturn: false,
  rdate: '',
  rtime: '',
  flight: '',
  comments: '',
  // Step 4
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
};

const pad = (n) => String(n).padStart(2, '0');

/** Today's date as YYYY-MM-DD in the visitor's local time (for <input min>). */
export function todayISO(d = new Date()) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const toDate = (date, time) => new Date(`${date}T${time}`);

/** Outward pickup moment: a Date for scheduled trips, `now` for "now". */
function outwardDate(f, now) {
  if (f.when !== 'later') return new Date(now);
  if (!f.date || !f.time) return null;
  const d = toDate(f.date, f.time);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function validateEntry(f, msg, now = Date.now()) {
  const e = {};
  const pickup = f.pickup.trim();
  const dest = f.dest.trim();
  if (pickup.length < 3) e.pickup = msg.pickup;
  if (dest.length < 3) e.dest = msg.dest;
  if (!e.pickup && !e.dest && pickup.toLowerCase() === dest.toLowerCase()) e.dest = msg.sameAddress;
  if (f.hasStop && f.stop.trim().length < 3) e.stop = msg.stop;

  if (f.when === 'later') {
    if (!f.date) e.date = msg.date;
    if (!f.time) e.time = msg.time;
    if (f.date && f.time) {
      const d = toDate(f.date, f.time);
      if (Number.isNaN(d.getTime())) e.date = msg.dateInvalid;
      else if (d.getTime() < now + MIN_LEAD_MINUTES * 60000) e.time = msg.tooSoon;
    }
  }
  return e;
}

export function validateLuggage(f, msg) {
  return f.luggage === 'yes' || f.luggage === 'no' ? {} : { luggage: msg.luggage };
}

export function validateOffers(f, msg) {
  const v = vehicleById(f.vehicle);
  if (!v || f.pax > v.capacity) return { vehicle: msg.vehicle };
  return {};
}

const FLIGHT_RE = /^[A-Z0-9]{2,3}\s?\d{1,4}[A-Z]?$/i;

export function validateTravel(f, msg, now = Date.now()) {
  const e = {};
  if (f.isReturn) {
    if (!f.rdate) e.rdate = msg.rdate;
    if (!f.rtime) e.rtime = msg.rtime;
    if (f.rdate && f.rtime) {
      const back = toDate(f.rdate, f.rtime);
      const out = outwardDate(f, now);
      if (Number.isNaN(back.getTime())) e.rdate = msg.dateInvalid;
      else if (out && back <= out) e.rtime = msg.returnBefore;
    }
  }
  if (f.flight.trim() && !FLIGHT_RE.test(f.flight.trim())) e.flight = msg.flight;
  if (f.comments.length > COMMENTS_MAX) e.comments = msg.comments;
  return e;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(f, msg) {
  const e = {};
  if (!f.firstName.trim()) e.firstName = msg.firstName;
  if (!f.lastName.trim()) e.lastName = msg.lastName;
  const digits = f.phone.replace(/\D/g, '');
  if (!/^\+?[\d\s()-]+$/.test(f.phone.trim()) || digits.length < 9 || digits.length > 15) e.phone = msg.phone;
  if (!EMAIL_RE.test(f.email.trim())) e.email = msg.email;
  return e;
}

export const stepValidators = {
  luggage: validateLuggage,
  offers: validateOffers,
  travel: validateTravel,
  contact: validateContact,
};

/**
 * First step the visitor may not skip past, given current data. Used to keep
 * deep links (#/book/contact) from bypassing earlier steps. Returns 'entry'
 * when the hero card itself is incomplete.
 */
export function firstIncompleteStep(f, msg, now = Date.now()) {
  if (Object.keys(validateEntry(f, msg, now)).length) return 'entry';
  for (const step of STEPS) {
    if (Object.keys(stepValidators[step](f, msg, now)).length) return step;
  }
  return null;
}

/** Map flow state to the service-layer BookingRequest (see services/booking/types.js). */
export function toBookingRequest(f) {
  return {
    pickup: f.pickup.trim(),
    dest: f.dest.trim(),
    stop: f.hasStop ? f.stop.trim() || null : null,
    asap: f.when !== 'later',
    date: f.when === 'later' ? f.date : null,
    time: f.when === 'later' ? f.time : null,
    luggage: f.luggage === 'yes',
    pax: f.pax,
    vehicle: f.vehicle,
    trip: f.isReturn ? 'return' : 'oneway',
    rdate: f.isReturn ? f.rdate : null,
    rtime: f.isReturn ? f.rtime : null,
    flight: f.flight.trim().toUpperCase() || null,
    comments: f.comments.trim() || null,
    contact: {
      firstName: f.firstName.trim(),
      lastName: f.lastName.trim(),
      phone: f.phone.trim(),
      email: f.email.trim(),
    },
  };
}

/** "Fri 16 October, 14:30" style label. */
export function formatWhen(date, time, locale) {
  const d = toDate(date, time);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'long' })}, ${time}`;
}
