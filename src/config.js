// Runtime configuration read from Vite environment variables (see .env.example).
// Only public, non-secret values belong here.

const env = import.meta.env;

const portal = (env.VITE_CUSTOMER_PORTAL_URL || 'https://www.taxidenbosch.eu').replace(/\/+$/, '');

/**
 * App store destinations for the Snel Taxi mobile app.
 * Replace these when the client confirms final store listing URLs.
 */
export const storeLinks = {
  // Existing App Store URL from the live site / prior project config.
  // Apple’s lookup API returned no result for id 6476443399 at last check
  // (HTTP 404) — keep until the client confirms a working listing URL.
  appStore: env.VITE_APP_STORE_URL || 'https://apps.apple.com/app/snel-taxi/id6476443399',
  // TEMPORARY: generic Google Play Store homepage until the client provides
  // the real Snel Taxi listing URL. Do not invent an app listing ID.
  googlePlay: env.VITE_GOOGLE_PLAY_URL || 'https://play.google.com/store/apps',
};

export const config = {
  bookingMode: env.VITE_BOOKING_MODE === 'api' ? 'api' : 'mock',
  bookingApiUrl: env.VITE_BOOKING_API_URL || '',
  // Existing customer account pages on the current live site. Point these at
  // the new portal's routes when customer accounts are rebuilt (later phase).
  customerLoginUrl: env.VITE_CUSTOMER_LOGIN_URL || `${portal}/login`,
  customerRegisterUrl: env.VITE_CUSTOMER_REGISTER_URL || `${portal}/register`,
  // Dev-only notes (photo slot captions, review dev note) show while
  // developing and are hidden in production builds.
  showDevNotes: env.DEV,
};
