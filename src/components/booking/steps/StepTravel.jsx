import { content } from '../../../content/index.js';
import { COMMENTS_MAX, todayISO, validateTravel } from '../../../lib/booking.js';
import { vehicleById } from '../../../data/vehicles.js';
import Field from '../../ui/Field.jsx';
import Icon from '../../ui/Icon.jsx';
import StepShell from '../StepShell.jsx';
import { RouteList, whenLabel } from '../TripSummary.jsx';
import { useStepForm } from './useStepForm.js';

const t = content.flow.travel;
const ORDER = ['rdate', 'rtime', 'flight', 'comments'];

export default function StepTravel({ onNext, onBack }) {
  const { data, errors, update, patch, setErrors, check } = useStepForm(validateTravel, ORDER);
  const onInput = (key) => (e) => update(key, e.target.value);
  const vehicle = vehicleById(data.vehicle);
  const left = COMMENTS_MAX - data.comments.length;

  const toggleReturn = () => {
    patch({ isReturn: !data.isReturn, ...(data.isReturn ? { rdate: '', rtime: '' } : {}) });
    setErrors((e) => ({ ...e, rdate: undefined, rtime: undefined, form: undefined }));
  };

  return (
    <StepShell
      id="step-travel"
      title={t.title}
      alert={errors.form}
      onBack={onBack}
      onContinue={(e) => {
        e.preventDefault();
        if (check()) onNext();
      }}
    >
      <div className="journey-card">
        <div className="journey-card__head">
          <span className="journey-card__label">{t.outbound}</span>
          <span className="journey-card__meta">
            {vehicle ? content.vehicles[vehicle.id].name : null}
            <span className="dot-sep" aria-hidden="true" />
            <Icon name="users" size={15} />
            {t.passengers(data.pax)}
          </span>
        </div>
        <div className="journey-card__body">
          <p className="journey-card__when">
            <Icon name="clock" size={16} />
            <span>
              <span className="sr-only">{t.pickupWhen}: </span>
              {whenLabel(data)}
            </span>
          </p>
          <RouteList data={data} compact />
        </div>
      </div>

      <div className="switch-row">
        <button
          type="button"
          role="switch"
          aria-checked={data.isReturn}
          className="switch"
          onClick={toggleReturn}
          aria-labelledby="return-label"
          aria-describedby="return-hint"
        >
          <span className="switch__thumb" />
        </button>
        <span className="switch-row__text">
          <span id="return-label" className="switch-row__label">
            {t.returnTrip}
          </span>
          <span id="return-hint" className="switch-row__hint">
            {t.returnHint}
          </span>
        </span>
      </div>

      {data.isReturn ? (
        <div className="grid-2 return-fields">
          <Field id="f-rdate" label={t.returnDate} error={errors.rdate}>
            {(p) => (
              <input
                {...p}
                className="input"
                type="date"
                min={data.when === 'later' && data.date ? data.date : todayISO()}
                value={data.rdate}
                onChange={onInput('rdate')}
              />
            )}
          </Field>
          <Field id="f-rtime" label={t.returnTime} error={errors.rtime}>
            {(p) => <input {...p} className="input" type="time" step="300" value={data.rtime} onChange={onInput('rtime')} />}
          </Field>
        </div>
      ) : null}

      <div className="grid-2">
        <Field id="f-flight" label={t.flight} hint={t.flightHint} error={errors.flight}>
          {(p) => (
            <input
              {...p}
              className="input"
              type="text"
              inputMode="text"
              autoCapitalize="characters"
              maxLength={10}
              placeholder={t.flightPlaceholder}
              value={data.flight}
              onChange={onInput('flight')}
            />
          )}
        </Field>
        <Field id="f-comments" label={t.comments} hint={`${t.commentsHint} · ${t.charsLeft(left)}`} error={errors.comments} className="grid-2__full">
          {(p) => (
            <textarea
              {...p}
              className="input input--area"
              rows={4}
              maxLength={COMMENTS_MAX}
              placeholder={t.commentsPlaceholder}
              value={data.comments}
              onChange={onInput('comments')}
            />
          )}
        </Field>
      </div>
    </StepShell>
  );
}
