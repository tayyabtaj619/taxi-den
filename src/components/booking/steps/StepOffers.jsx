import { useCallback, useEffect, useState } from 'react';
import { content } from '../../../content/index.js';
import { bookingService } from '../../../services/booking/index.js';
import { MAX_PASSENGERS, toBookingRequest, validateOffers } from '../../../lib/booking.js';
import { vehicleById } from '../../../data/vehicles.js';
import Icon from '../../ui/Icon.jsx';
import NumberStepper from '../../ui/NumberStepper.jsx';
import StepShell from '../StepShell.jsx';
import VehicleArt from '../VehicleArt.jsx';
import { useStepForm } from './useStepForm.js';

const t = content.flow.offers;

function priceLabel(offer) {
  if (typeof offer.price !== 'number') return null;
  return new Intl.NumberFormat(content.locale, { style: 'currency', currency: offer.currency || 'EUR' }).format(offer.price);
}

export default function StepOffers({ onNext, onBack }) {
  const { data, errors, update, patch, check } = useStepForm(validateOffers, ['vehicle']);
  const [offers, setOffers] = useState({ status: 'loading', list: [] });
  const [notice, setNotice] = useState('');

  // Offers depend on the journey only; passenger count filters locally.
  const { pickup, dest, stop, asap, date, time, luggage } = toBookingRequest(data);
  const load = useCallback(() => {
    let active = true;
    setOffers({ status: 'loading', list: [] });
    bookingService
      .getOffers({ pickup, dest, stop, asap, date, time, luggage, pax: data.pax })
      .then((list) => active && setOffers({ status: 'ready', list }))
      .catch((err) => {
        if (import.meta.env.DEV) console.warn('[offers]', err);
        if (active) setOffers({ status: 'error', list: [] });
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickup, dest, stop, asap, date, time, luggage]);
  useEffect(load, [load]);

  const setPax = (n) => {
    const current = vehicleById(data.vehicle);
    if (current && n > current.capacity) {
      patch({ pax: n, vehicle: '' });
      setNotice(t.deselected);
    } else {
      update('pax', n);
      setNotice('');
    }
  };

  const passengerControl = (
    <NumberStepper
      id="f-pax"
      label={t.passengers}
      value={data.pax}
      min={1}
      max={MAX_PASSENGERS}
      onChange={setPax}
      decreaseLabel={t.decrease}
      increaseLabel={t.increase}
    />
  );

  return (
    <StepShell
      id="step-offers"
      title={t.title}
      aside={passengerControl}
      alert={errors.form}
      onBack={onBack}
      onContinue={(e) => {
        e.preventDefault();
        if (offers.status === 'ready' && check()) onNext();
      }}
      footerNote={offers.status === 'ready' && offers.list.every((o) => typeof o.price !== 'number') ? t.fareNote : null}
    >
      {notice ? (
        <p className="alert alert--info" role="status">
          <Icon name="info" size={18} />
          {notice}
        </p>
      ) : null}

      {offers.status === 'loading' ? (
        <div className="offers offers--loading" aria-busy="true">
          <span className="sr-only" role="status">
            {t.loading}
          </span>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="offer offer--skeleton" aria-hidden="true" />
          ))}
        </div>
      ) : null}

      {offers.status === 'error' ? (
        <div className="alert alert--error" role="alert">
          <Icon name="info" size={18} />
          <span>{t.loadError}</span>
          <button type="button" className="btn btn--secondary btn--sm" onClick={load}>
            {t.retry}
          </button>
        </div>
      ) : null}

      {offers.status === 'ready' ? (
        <fieldset className="offers" aria-describedby={errors.vehicle ? 'f-vehicle-err' : undefined}>
          <legend className="sr-only">{t.title}</legend>
          {offers.list.map((offer, i) => {
            const v = vehicleById(offer.id);
            const text = content.vehicles[offer.id];
            if (!v || !text) return null;
            const tooSmall = data.pax > offer.capacity;
            const selected = data.vehicle === offer.id;
            const price = priceLabel(offer);
            return (
              <label
                key={offer.id}
                className={`offer${selected ? ' is-selected' : ''}${tooSmall ? ' is-disabled' : ''}`}
              >
                <input
                  id={i === 0 ? 'f-vehicle' : undefined}
                  type="radio"
                  name="vehicle"
                  value={offer.id}
                  checked={selected}
                  disabled={tooSmall}
                  onChange={() => update('vehicle', offer.id)}
                  className="offer__input"
                  aria-describedby={`offer-${offer.id}-cap`}
                />
                <span className="offer__art">
                  <VehicleArt shape={v.shape} />
                </span>
                <span className="offer__info">
                  <span className="offer__name">{text.name}</span>
                  <span className="offer__features">
                    {text.features.map((f) => (
                      <span key={f} className="offer__feature">
                        <Icon name="check" size={14} strokeWidth={2.4} />
                        {f}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="offer__side">
                  <span id={`offer-${offer.id}-cap`} className={`offer__cap${tooSmall ? ' is-warning' : ''}`}>
                    <Icon name="users" size={15} />
                    {tooSmall ? t.tooMany(offer.capacity) : t.upTo(offer.capacity)}
                  </span>
                  <span className="offer__price">{price || t.fareOnRequest}</span>
                  <span className="offer__select" aria-hidden="true">
                    {selected ? (
                      <>
                        <Icon name="check" size={14} strokeWidth={2.6} />
                        {t.selected}
                      </>
                    ) : (
                      t.select
                    )}
                  </span>
                </span>
              </label>
            );
          })}
          {errors.vehicle ? (
            <p id="f-vehicle-err" className="field__error">
              {errors.vehicle}
            </p>
          ) : null}
        </fieldset>
      ) : null}
    </StepShell>
  );
}
