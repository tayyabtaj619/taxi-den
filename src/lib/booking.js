// Pure booking helpers: initial state, validation, request mapping, formatting.
// Kept free of React so they are easy to test and reuse.

export const MAX_PASSENGERS = 7;
export const LARGE_GROUP_FROM = 5;
const MIN_LEAD_MINUTES = 15;

export const initialBookingForm = {
  trip: 'oneway',
  pickup: '',
  dest: '',
  hasStop: false,
  stop: '',
  date: '',
  time: '',
  rdate: '',
  rtime: '',
  pax: '1',
  luggage: 'no',
};

const pad = (n) => String(n).padStart(2, '0');

/** Today's date as YYYY-MM-DD in the visitor's local time (for <input min>). */
export function todayISO(d = new Date()) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const toDate = (date, time) => new Date(`${date}T${time}`);

/**
 * Validate the form. Returns an object of field → message; empty when valid.
 * @param {typeof initialBookingForm} f
 * @param {Record<string,string>} msg  Localised error messages
 * @param {number} now                 Timestamp, injectable for testing
 */
export function validateBooking(f, msg, now = Date.now()) {
  const e = {};
  const pickup = f.pickup.trim();
  const dest = f.dest.trim();

  if (pickup.length < 3) e.pickup = msg.pickup;
  if (dest.length < 3) e.dest = msg.dest;
  if (!e.pickup && !e.dest && pickup.toLowerCase() === dest.toLowerCase()) e.dest = msg.sameAddress;
  if (f.hasStop && f.stop.trim().length < 3) e.stop = msg.stop;

  if (!f.date) e.date = msg.date;
  if (!f.time) e.time = msg.time;

  let outward = null;
  if (f.date && f.time) {
    outward = toDate(f.date, f.time);
    if (Number.isNaN(outward.getTime())) {
      e.date = msg.dateInvalid;
      outward = null;
    } else if (outward.getTime() < now + MIN_LEAD_MINUTES * 60000) {
      e.time = msg.tooSoon;
    }
  }

  if (f.trip === 'return') {
    if (!f.rdate) e.rdate = msg.rdate;
    if (!f.rtime) e.rtime = msg.rtime;
    if (f.rdate && f.rtime && outward) {
      const back = toDate(f.rdate, f.rtime);
      if (Number.isNaN(back.getTime())) e.rdate = msg.dateInvalid;
      else if (back <= outward) e.rtime = msg.returnBefore;
    }
  }
  return e;
}

/** Map form state to the service-layer BookingRequest. */
export function toBookingRequest(f) {
  const isReturn = f.trip === 'return';
  return {
    trip: f.trip,
    pickup: f.pickup.trim(),
    dest: f.dest.trim(),
    stop: f.hasStop ? f.stop.trim() : null,
    date: f.date,
    time: f.time,
    rdate: isReturn ? f.rdate : null,
    rtime: isReturn ? f.rtime : null,
    pax: Number(f.pax),
    luggage: f.luggage === 'yes',
  };
}

/** "Fri 9 October, 14:30" style label for the summary. */
export function formatWhen(date, time, locale) {
  const label = toDate(date, time).toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'long' });
  return `${label}, ${time}`;
}
