// Runtime configuration read from Vite environment variables (see .env.example).
// Only public, non-secret values belong here.

const env = import.meta.env;

const portal = (env.VITE_CUSTOMER_PORTAL_URL || 'https://www.taxidenbosch.eu').replace(/\/+$/, '');

export const config = {
  bookingMode: env.VITE_BOOKING_MODE === 'api' ? 'api' : 'mock',
  bookingApiUrl: env.VITE_BOOKING_API_URL || '',
  googlePlayUrl: env.VITE_GOOGLE_PLAY_URL || '',
  // Existing customer account pages on the current live site. Point these at
  // the new portal's routes when customer accounts are rebuilt (later phase).
  customerLoginUrl: env.VITE_CUSTOMER_LOGIN_URL || `${portal}/login`,
  customerRegisterUrl: env.VITE_CUSTOMER_REGISTER_URL || `${portal}/register`,
  // Dev-only notes (photo slot captions, review dev note) show while
  // developing and are hidden in production builds.
  showDevNotes: env.DEV,
};
