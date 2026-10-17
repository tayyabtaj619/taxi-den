// Neutral line illustrations of a car and a van for the offer cards. They
// stand for a vehicle class, not a specific car in the client's fleet; swap
// for real fleet photos later if the client supplies them.

const SEDAN = (
  <>
    <path d="M8 44h-3a3 3 0 01-3-3v-6c0-3 2-5 5-5.6l10-2 9-8.4c2-1.6 4-2 6.5-2h21c3 0 5.4 1 7.4 3l9 8.8 11.6 2.2c3 .6 5.5 2.6 5.5 5.6V41a3 3 0 01-3 3h-3" />
    <path d="M30 44h40" />
    <path d="M26 27l7-6.5c1.2-1 2.4-1.5 4-1.5h9v8z" />
    <path d="M52 19h5c1.6 0 3 .6 4 1.6l6.2 6.4H52z" />
    <circle cx="19" cy="44" r="6.5" />
    <circle cx="81" cy="44" r="6.5" />
  </>
);

const VAN = (
  <>
    <path d="M8 44h-3a3 3 0 01-3-3V17a5 5 0 015-5h52c2.5 0 4.5 1 6 2.8l13 15 11.2 2.4c2.4.5 4.8 2.6 4.8 5.3V41a3 3 0 01-3 3h-3" />
    <path d="M30 44h40" />
    <path d="M9 18h16v10H9zM31 18h16v10H31z" />
    <path d="M53 18h8.5c1.3 0 2.4.6 3.2 1.5l7.3 8.5H53z" />
    <path d="M50 18v26" />
    <circle cx="19" cy="44" r="6.5" />
    <circle cx="81" cy="44" r="6.5" />
  </>
);

export default function VehicleArt({ shape }) {
  return (
    <svg
      className="vehicle-art"
      viewBox="0 0 100 54"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shape === 'van' ? VAN : SEDAN}
    </svg>
  );
}
