// Runtime configuration read from Vite environment variables (see .env.example).
// Only public, non-secret values belong here.

const env = import.meta.env;

export const config = {
  bookingMode: env.VITE_BOOKING_MODE === 'api' ? 'api' : 'mock',
  bookingApiUrl: env.VITE_BOOKING_API_URL || '',
  googlePlayUrl: env.VITE_GOOGLE_PLAY_URL || '',
  // Dev-only notes from the design (photo captions, review dev note) are shown
  // while developing and hidden in production builds.
  showDevNotes: env.DEV,
};
