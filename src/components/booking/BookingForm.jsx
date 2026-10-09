import { content } from '../../content/index.js';
import { bookingService } from '../../services/booking/index.js';
import { LARGE_GROUP_FROM, MAX_PASSENGERS, todayISO } from '../../lib/booking.js';
import Field from '../ui/Field.jsx';
import SegmentedControl from '../ui/SegmentedControl.jsx';

const t = content.booking;
const PAX_OPTIONS = Array.from({ length: MAX_PASSENGERS }, (_, i) => i + 1);

export default function BookingForm({ booking }) {
  const { form, errors, status, locating, setField, toggleStop, swap, locate, submit } = booking;
  const today = todayISO();
  const loading = status === 'loading';
  const onInput = (key) => (e) => setField(key, e.target.value);

  return (
    <>
      <div className="booking__head">
        <h2 id="book-title" className="booking__title">
          {t.title}
        </h2>
        <SegmentedControl
          className="booking__trip"
          label={t.tripLabel}
          value={form.trip}
          onChange={(v) => setField('trip', v)}
          options={[
            { value: 'oneway', label: t.oneWay },
            { value: 'return', label: t.return },
          ]}
        />
      </div>

      <form className="booking__form" noValidate onSubmit={submit} aria-busy={loading}>
        <div className="booking__row booking__row--wide">
          <Field
            id="booking-pickup"
            label={t.pickup}
            error={errors.pickup}
            action={
              <button type="button" className="link-btn link-btn--gold" onClick={locate} disabled={locating}>
                {locating ? t.locating : t.useLocation}
              </button>
            }
          >
            {(p) => (
              <input
                {...p}
                className="input"
                type="text"
                autoComplete="street-address"
                placeholder={t.pickupPlaceholder}
                value={form.pickup}
                onChange={onInput('pickup')}
              />
            )}
          </Field>

          <Field
            id="booking-dest"
            label={t.destination}
            error={errors.dest}
            action={
              <button type="button" className="chip-btn" onClick={swap} aria-label={t.swapLabel}>
                {t.swap}
              </button>
            }
          >
            {(p) => (
              <input
                {...p}
                className="input"
                type="text"
                placeholder={t.destinationPlaceholder}
                value={form.dest}
                onChange={onInput('dest')}
              />
            )}
          </Field>
        </div>

        {form.hasStop ? (
          <Field
            id="booking-stop"
            label={t.stop}
            error={errors.stop}
            action={
              <button type="button" className="link-btn link-btn--muted" onClick={toggleStop}>
                {t.removeStop}
              </button>
            }
          >
            {(p) => (
              <input
                {...p}
                className="input"
                type="text"
                placeholder={t.stopPlaceholder}
                value={form.stop}
                onChange={onInput('stop')}
              />
            )}
          </Field>
        ) : (
          <button type="button" className="booking__add-stop" onClick={toggleStop}>
            {t.addStop}
          </button>
        )}

        <div className="booking__row booking__row--narrow">
          <Field id="booking-date" label={t.date} error={errors.date}>
            {(p) => (
              <input {...p} className="input input--compact" type="date" min={today} value={form.date} onChange={onInput('date')} />
            )}
          </Field>
          <Field id="booking-time" label={t.time} error={errors.time}>
            {(p) => (
              <input {...p} className="input input--compact" type="time" step="300" value={form.time} onChange={onInput('time')} />
            )}
          </Field>
          <Field id="booking-pax" label={t.passengers}>
            {(p) => (
              <select {...p} className="input input--compact" value={form.pax} onChange={onInput('pax')}>
                {PAX_OPTIONS.map((n) => (
                  <option key={n} value={String(n)}>
                    {t.passengerOption(n)}
                  </option>
                ))}
              </select>
            )}
          </Field>
          <SegmentedControl
            legend
            className="booking__luggage"
            label={t.luggage}
            value={form.luggage}
            onChange={(v) => setField('luggage', v)}
            options={[
              { value: 'yes', label: t.yes },
              { value: 'no', label: t.no },
            ]}
          />
        </div>

        {form.trip === 'return' ? (
          <div className="booking__row booking__row--narrow booking__row--return">
            <Field id="booking-rdate" label={t.returnDate} error={errors.rdate}>
              {(p) => (
                <input
                  {...p}
                  className="input input--compact"
                  type="date"
                  min={form.date || today}
                  value={form.rdate}
                  onChange={onInput('rdate')}
                />
              )}
            </Field>
            <Field id="booking-rtime" label={t.returnTime} error={errors.rtime}>
              {(p) => (
                <input {...p} className="input input--compact" type="time" step="300" value={form.rtime} onChange={onInput('rtime')} />
              )}
            </Field>
          </div>
        ) : null}

        {Number(form.pax) >= LARGE_GROUP_FROM ? <p className="booking__note">{t.largeGroup}</p> : null}

        {errors.form ? (
          <p role="alert" className="booking__alert">
            {errors.form}
          </p>
        ) : null}

        <div className="booking__foot">
          {!bookingService.isLive ? <p className="booking__disclaimer">{t.notConnected}</p> : <span />}
          <button type="submit" className="booking__submit" disabled={loading}>
            {loading ? <span aria-live="polite">{t.loading}</span> : <span>{t.submit}</span>}
          </button>
        </div>
      </form>
    </>
  );
}
