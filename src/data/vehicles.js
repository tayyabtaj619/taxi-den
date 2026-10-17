// Vehicle classes from the current live booking flow (Standard, Luxe Auto,
// Electric Auto, Bus of Van). Display text lives in content/en.js → vehicles.
// Capacities follow the live site's "up to 4 / up to 7 people" choice.
// CONFIRM WITH CLIENT before launch; the real API should become the source.

export const MAX_PASSENGERS = 7;

export const VEHICLES = [
  { id: 'standard', capacity: 4, shape: 'sedan' },
  { id: 'luxury', capacity: 4, shape: 'sedan' },
  { id: 'electric', capacity: 4, shape: 'sedan' },
  { id: 'van', capacity: 7, shape: 'van' },
];

export const vehicleById = (id) => VEHICLES.find((v) => v.id === id) || null;
