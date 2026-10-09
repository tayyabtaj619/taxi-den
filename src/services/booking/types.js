// Shared shapes for the booking service layer (JSDoc only; no runtime code).

/**
 * What the booking form hands to the service layer.
 * @typedef {Object} BookingRequest
 * @property {'oneway'|'return'} trip
 * @property {string} pickup        Free-text pickup address
 * @property {string} dest          Free-text destination address
 * @property {string|null} stop     Optional intermediate stop
 * @property {string} date          Pickup date, YYYY-MM-DD (local)
 * @property {string} time          Pickup time, HH:mm (local)
 * @property {string|null} rdate    Return date, YYYY-MM-DD (return trips only)
 * @property {string|null} rtime    Return time, HH:mm (return trips only)
 * @property {number} pax           Passengers, 1–7
 * @property {boolean} luggage      Whether the passengers carry luggage
 */

/**
 * What the service layer resolves with.
 * @typedef {Object} BookingResult
 * @property {boolean} ok
 * @property {boolean} mock               true when nothing was actually sent
 * @property {BookingRequest} request
 * @property {string} [reference]         Booking reference, only if the real API returns one
 * @property {string} [error]
 */

export {};
