import { useState } from 'react';
import { useBooking } from '../../../booking/BookingContext.jsx';
import { content } from '../../../content/index.js';

const msg = content.flow.errors;

/**
 * Per-step error handling: `update` sets a value and clears its error;
 * `check` runs the step validator, focuses the first invalid control and
 * returns true when the step is valid.
 */
export function useStepForm(validate, order) {
  const booking = useBooking();
  const [errors, setErrors] = useState({});

  const update = (key, value) => {
    booking.setField(key, value);
    setErrors((e) => (e[key] || e.form ? { ...e, [key]: undefined, form: undefined } : e));
  };

  const check = () => {
    const found = validate(booking.data, msg);
    if (Object.keys(found).length === 0) {
      setErrors({});
      return true;
    }
    setErrors({ ...found, form: msg.form });
    const first = order.find((k) => found[k]);
    if (first) document.getElementById(`f-${first}`)?.focus();
    return false;
  };

  return { ...booking, errors, setErrors, update, check, msg };
}
