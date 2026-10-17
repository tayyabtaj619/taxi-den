// Shared shapes for the booking service layer (JSDoc only; no runtime code).

/**
 * Journey details used to request offers (vehicle classes + fares).
 * @typedef {Object} OfferRequest
 * @property {string} pickup
 * @property {string} dest
 * @property {string|null} stop
 * @property {boolean} asap          true = "as soon as possible"
 * @property {string|null} date      YYYY-MM-DD local (scheduled trips only)
 * @property {string|null} time      HH:mm local (scheduled trips only)
 * @property {boolean} luggage
 * @property {number} pax            1–7
 */

/**
 * One bookable vehicle class.
 * @typedef {Object} Offer
 * @property {'standard'|'luxury'|'electric'|'van'} id
 * @property {number} capacity       Max passengers
 * @property {number|null} price     Fare in EUR from the API; null = not quoted
 * @property {string} [currency]     'EUR'
 * @property {string} [quoteId]      API reference for the quoted fare, if any
 */

/**
 * Everything the flow hands to submitBookingRequest.
 * @typedef {Object} BookingRequest
 * @property {string} pickup
 * @property {string} dest
 * @property {string|null} stop
 * @property {boolean} asap
 * @property {string|null} date
 * @property {string|null} time
 * @property {boolean} luggage
 * @property {number} pax
 * @property {string} vehicle        Offer id
 * @property {'oneway'|'return'} trip
 * @property {string|null} rdate
 * @property {string|null} rtime
 * @property {string|null} flight
 * @property {string|null} comments
 * @property {{firstName:string,lastName:string,phone:string,email:string}} contact
 */

/**
 * @typedef {Object} BookingResult
 * @property {boolean} ok
 * @property {boolean} mock          true when nothing was actually sent
 * @property {BookingRequest} request
 * @property {string} [reference]    Booking reference, only if the real API returns one
 * @property {string} [error]
 */

export {};
