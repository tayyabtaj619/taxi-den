// REAL API adapter — NOT IMPLEMENTED.
//
// ┌─────────────────────────────────────────────────────────────────────────┐
// │ INTEGRATION POINT: implement `submitBookingRequest` once Taxi Den Bosch │
// │ provides its booking API documentation. Until then this adapter refuses │
// │ to run so the site can never pretend a booking was sent.               │
// └─────────────────────────────────────────────────────────────────────────┘
//
// When implementing:
//   1. Map the `BookingRequest` (see types.js) to the API's request body.
//      Field names, date/time format and time zone (Europe/Amsterdam) must
//      match the API spec — do not guess them.
//   2. POST to `${config.bookingApiUrl}/<endpoint from the API docs>`.
//      The base URL comes from VITE_BOOKING_API_URL. Never put API keys in
//      the frontend; if the API needs credentials, call it via the client's
//      own server/proxy instead.
//   3. Return `{ ok: true, mock: false, request, reference, fare }` using only
//      values the API actually returned (e.g. a booking reference or quoted
//      fare). Never compute or invent a fare in the browser.
//   4. On failure return `{ ok: false, error }` or throw; the form shows a
//      generic error and the phone number.
//   5. Update BookingSummary.jsx so the confirmation copy reflects what the
//      API really does (request received vs. booking confirmed).

import { config } from '../../config.js';

export class BookingApiNotImplementedError extends Error {
  constructor() {
    super(
      'Booking API adapter is not implemented. Set VITE_BOOKING_MODE=mock, or implement ' +
        'src/services/booking/apiAdapter.js against the client booking API.'
    );
    this.name = 'BookingApiNotImplementedError';
  }
}

export const apiAdapter = {
  mode: 'api',

  // eslint-disable-next-line no-unused-vars
  async submitBookingRequest(request) {
    if (!config.bookingApiUrl) {
      throw new Error('VITE_BOOKING_API_URL is not set.');
    }
    throw new BookingApiNotImplementedError();
  },
};
