// MOCK adapter — frontend only. Nothing is sent anywhere, no fare is
// calculated and no booking is made. It exists so the form's loading and
// success states can be exercised until the real booking API is available.

const MOCK_DELAY_MS = 1100;

export const mockAdapter = {
  mode: 'mock',

  /**
   * @param {import('./types.js').BookingRequest} request
   * @returns {Promise<import('./types.js').BookingResult>}
   */
  submitBookingRequest(request) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ok: true, mock: true, request }), MOCK_DELAY_MS);
    });
  },
};
