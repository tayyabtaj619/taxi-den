// Booking service — the only module the UI talks to. It picks an adapter from
// VITE_BOOKING_MODE ("mock" by default). Components never call fetch directly.

import { config } from '../../config.js';
import { mockAdapter } from './mockAdapter.js';
import { apiAdapter } from './apiAdapter.js';

const adapter = config.bookingMode === 'api' ? apiAdapter : mockAdapter;

export const bookingService = {
  /** "mock" or "api" — the UI uses this to show the not-connected notice. */
  mode: adapter.mode,
  isLive: adapter.mode === 'api',

  /**
   * @param {import('./types.js').BookingRequest} request
   * @returns {Promise<import('./types.js').BookingResult>}
   */
  submitBookingRequest: (request) => adapter.submitBookingRequest(request),
};
