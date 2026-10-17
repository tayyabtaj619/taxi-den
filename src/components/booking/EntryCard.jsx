import { useState } from 'react';
import { content, contact } from '../../content/index.js';
import { useBooking } from '../../booking/BookingContext.jsx';
import { useRouter } from '../../booking/RouterContext.jsx';
import { bookPath } from '../../hooks/useHashRoute.js';
import { useGeolocation } from '../../hooks/useGeolocation.js';
import { todayISO, validateEntry } from '../../lib/booking.js';
import Field from '../ui/Field.jsx';
import Icon from '../ui/Icon.jsx';
import SegmentedControl from '../ui/SegmentedControl.jsx';

const t = content.entry;
const msg = content.flow.errors;
const ORDER = ['pickup', 'stop', 'dest', 'date', 'time'];

/** Hero booking card: where from, where to, when → Continue into the steps. */
export default function EntryCard() {
  const { data, setField, patch } = useBooking();
  const { navigate } = useRouter();
  const { locating, locate } = useGeolocation();
  const [errors, setErrors] = useState({});

  const update = (key, value) => {
    setField(key, value);
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };
  const onInput = (key) => (e) => update(key, e.target.value);

  const useLocation = () =>
    locate(
      (lat, lng) => update('pickup', t.currentLocation(lat, lng)),
      (reason) => setErrors((e) => ({ ...e, pickup: reason === 'unsupported' ? msg.geoUnsupported : msg.geoFailed }))
    );

  const swap = () => {
    patch({ pickup: data.dest, dest: data.pickup });
    setErrors({});
  };

  const toggleStop = () => {
    patch({ hasStop: !data.hasStop, stop: '' });
    setErrors((e) => ({ ...e, stop: undefined }));
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const found = validateEntry(data, msg);
    setErrors(found);
    const first = ORDER.find((k) => found[k]);
    if (first) {
      document.getElementById(`entry-${first}`)?.focus();
      return;
    }
    navigate(bookPath('luggage'));
  };

  return (
    <div id="book" className="entry" role="region" aria-labelledby="entry-title">
      <p className="entry__eyebrow">{t.eyebrow}</p>
      <h2 id="entry-title" className="entry__title">
        {t.title}
      </h2>

      <form className="entry__form" noValidate onSubmit={onSubmit}>
        <div className={`route${data.hasStop ? ' route--stop' : ''}`}>
          <Field
            id="entry-pickup"
            className="route__field route__field--from"
            label={t.pickup}
            error={errors.pickup}
            action={
              <button type="button" className="link-btn link-btn--gold" onClick={useLocation} disabled={locating}>
                <Icon name="locate" size={14} />
                {locating ? t.locating : t.useLocation}
              </button>
            }
          >
            {(p) => (
              <span className="route__control">
                <input
                {...p}
                className="input"
                type="text"
                autoComplete="street-address"
                placeholder={t.pickupPlaceholder}
                value={data.pickup}
                onChange={onInput('pickup')}
              />
              </span>
            )}
          </Field>

          {data.hasStop ? (
            <Field
              id="entry-stop"
              className="route__field route__field--stop"
              label={t.stop}
              error={errors.stop}
              action={
                <button type="button" className="link-btn link-btn--muted" onClick={toggleStop}>
                  {t.removeStop}
                </button>
              }
            >
              {(p) => (
              <span className="route__control">
                <input
                  {...p}
                  className="input"
                  type="text"
                  placeholder={t.stopPlaceholder}
                  value={data.stop}
                  onChange={onInput('stop')}
                />
              </span>
            )}
            </Field>
          ) : null}

          <Field
            id="entry-dest"
            className="route__field route__field--to"
            label={t.destination}
            error={errors.dest}
            action={
              <button type="button" className="icon-btn" onClick={swap} aria-label={t.swapLabel} title={t.swapLabel}>
                <Icon name="swap" size={16} />
              </button>
            }
          >
            {(p) => (
              <span className="route__control">
                <input
                {...p}
                className="input"
                type="text"
                placeholder={t.destinationPlaceholder}
                value={data.dest}
                onChange={onInput('dest')}
              />
              </span>
            )}
          </Field>
        </div>

        {!data.hasStop ? (
          <button type="button" className="add-stop" onClick={toggleStop}>
            <Icon name="plus" size={16} />
            {t.addStop}
          </button>
        ) : null}

        <div className="entry__when">
          <span className="field__label" id="entry-when-label">
            {t.when}
          </span>
          <SegmentedControl
            label={t.when}
            value={data.when}
            onChange={(v) => {
              update('when', v);
              setErrors((e) => ({ ...e, date: undefined, time: undefined }));
            }}
            options={[
              { value: 'now', label: t.nowShort },
              { value: 'later', label: t.later },
            ]}
          />
        </div>

        {data.when === 'later' ? (
          <div className="entry__datetime">
            <Field id="entry-date" label={t.date} error={errors.date}>
              {(p) => (
                <input {...p} className="input" type="date" min={todayISO()} value={data.date} onChange={onInput('date')} />
              )}
            </Field>
            <Field id="entry-time" label={t.time} error={errors.time}>
              {(p) => <input {...p} className="input" type="time" step="300" value={data.time} onChange={onInput('time')} />}
            </Field>
          </div>
        ) : (
          <p className="entry__asap">
            <Icon name="clock" size={16} />
            {t.now}
          </p>
        )}

        <button type="submit" className="btn btn--primary btn--block">
          {t.continue}
          <Icon name="arrowRight" />
        </button>

        <p className="entry__call">
          {content.hero.callPrefix} <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
        </p>
      </form>
    </div>
  );
}
