// REAL API adapter — NOT IMPLEMENTED.
//
// ┌─────────────────────────────────────────────────────────────────────────┐
// │ INTEGRATION POINTS: implement `getOffers` and `submitBookingRequest`   │
// │ once Taxi Den Bosch provides its booking/dispatch API documentation.   │
// │ Until then both refuse to run so the site never pretends to quote a    │
// │ fare or send a booking.                                                │
// └─────────────────────────────────────────────────────────────────────────┘
//
// getOffers(OfferRequest) → Offer[]
//   - Return the vehicle classes the API offers for this journey, with the
//     fare the API quotes (`price`, `currency`, optional `quoteId`).
//   - Never calculate fares in the browser. Weekend surcharges, commissions
//     etc. belong in the backend.
//   - Offer ids must match src/data/vehicles.js, or extend that file.
//
// submitBookingRequest(BookingRequest) → BookingResult
//   - Map the request (see types.js) to the API body. Field names, date/time
//     format and time zone (Europe/Amsterdam) must come from the API spec.
//   - Return { ok: true, mock: false, request, reference } using only values
//     the API returned. On failure return { ok: false, error } or throw.
//   - Then update BookingDone.jsx copy to match what the API confirms.
//
// Credentials: never put API keys in VITE_* variables. If the API needs
// authentication, call it through the client's own server/proxy.

import { config } from '../../config.js';

export class BookingApiNotImplementedError extends Error {
  constructor(method) {
    super(
      `Booking API adapter method "${method}" is not implemented. Set VITE_BOOKING_MODE=mock, ` +
        'or implement src/services/booking/apiAdapter.js against the client booking API.'
    );
    this.name = 'BookingApiNotImplementedError';
  }
}

function requireBaseUrl() {
  if (!config.bookingApiUrl) throw new Error('VITE_BOOKING_API_URL is not set.');
}

export const apiAdapter = {
  mode: 'api',

  // eslint-disable-next-line no-unused-vars
  async getOffers(request) {
    requireBaseUrl();
    throw new BookingApiNotImplementedError('getOffers');
  },

  // eslint-disable-next-line no-unused-vars
  async submitBookingRequest(request) {
    requireBaseUrl();
    throw new BookingApiNotImplementedError('submitBookingRequest');
  },
};
