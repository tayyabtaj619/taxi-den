// MOCK adapter — frontend only. Nothing is sent anywhere, no fare is
// calculated and no booking is made. It lets every step's loading and success
// states be exercised until the real booking API is available.

import { VEHICLES } from '../../data/vehicles.js';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const mockAdapter = {
  mode: 'mock',

  /**
   * @param {import('./types.js').OfferRequest} _request
   * @returns {Promise<import('./types.js').Offer[]>}
   */
  async getOffers(_request) {
    await delay(450);
    // price: null → the UI shows "Fare on request". Never invent fares here.
    return VEHICLES.map((v) => ({ id: v.id, capacity: v.capacity, price: null }));
  },

  /**
   * @param {import('./types.js').BookingRequest} request
   * @returns {Promise<import('./types.js').BookingResult>}
   */
  async submitBookingRequest(request) {
    await delay(1100);
    return { ok: true, mock: true, request };
  },
};
