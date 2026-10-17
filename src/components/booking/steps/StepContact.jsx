import { content } from '../../../content/index.js';
import { config } from '../../../config.js';
import { bookingService } from '../../../services/booking/index.js';
import { validateContact, validateEntry } from '../../../lib/booking.js';
import Field from '../../ui/Field.jsx';
import Icon from '../../ui/Icon.jsx';
import StepShell from '../StepShell.jsx';
import { useStepForm } from './useStepForm.js';

const t = content.flow.contact;
const ORDER = ['firstName', 'lastName', 'phone', 'email'];

export default function StepContact({ onBack, onDone, onEditJourney }) {
  const { data, errors, setErrors, update, check, submission, submit, msg } = useStepForm(validateContact, ORDER);
  const onInput = (key) => (e) => update(key, e.target.value);
  const busy = submission.status === 'loading';

  // A scheduled pickup can drift into the past while the visitor fills in
  // the steps, so the entry is re-checked against the real clock on submit.
  const entryProblem = (() => {
    const e = validateEntry(data, msg);
    return e.time || e.date ? e.time || e.date : null;
  })();

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!check()) return;
    if (entryProblem) {
      setErrors({ form: entryProblem });
      return;
    }
    if (await submit(msg.failed)) onDone();
  };

  const external = { target: '_blank', rel: 'noopener noreferrer' };

  return (
    <StepShell
      id="step-contact"
      title={t.title}
      aside={
        <span className="guest-badge">
          <Icon name="user" size={15} />
          {t.guest}
        </span>
      }
      alert={errors.form || submission.error}
      onBack={onBack}
      onContinue={onSubmit}
      continueLabel={t.submit}
      continueBusy={busy}
      busyLabel={t.submitting}
      footerNote={!bookingService.isLive ? content.flow.notConnected : null}
    >
      {errors.form && entryProblem && errors.form === entryProblem ? (
        <button type="button" className="link-btn link-btn--gold" onClick={onEditJourney}>
          {content.flow.editJourney}
        </button>
      ) : null}

      <div className="grid-2">
        <Field id="f-firstName" label={t.firstName} error={errors.firstName}>
          {(p) => (
            <input {...p} className="input" type="text" autoComplete="given-name" value={data.firstName} onChange={onInput('firstName')} />
          )}
        </Field>
        <Field id="f-lastName" label={t.lastName} error={errors.lastName}>
          {(p) => (
            <input {...p} className="input" type="text" autoComplete="family-name" value={data.lastName} onChange={onInput('lastName')} />
          )}
        </Field>
        <Field id="f-phone" label={t.phone} hint={t.phoneHint} error={errors.phone}>
          {(p) => (
            <input
              {...p}
              className="input"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={t.phonePlaceholder}
              value={data.phone}
              onChange={onInput('phone')}
            />
          )}
        </Field>
        <Field id="f-email" label={t.email} error={errors.email}>
          {(p) => (
            <input
              {...p}
              className="input"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={t.emailPlaceholder}
              value={data.email}
              onChange={onInput('email')}
            />
          )}
        </Field>
      </div>

      <div className="account-note">
        <p>
          <span className="account-note__item">
            {t.haveAccount}{' '}
            <a href={config.customerLoginUrl} {...external}>
              {t.login}
            </a>
          </span>
          <span className="account-note__sep" aria-hidden="true">
            ·
          </span>
          <span className="account-note__item">
            {t.noAccount}{' '}
            <a href={config.customerRegisterUrl} {...external}>
              {t.register}
            </a>
          </span>
        </p>
        <p className="account-note__hint">{t.accountNote}</p>
      </div>
    </StepShell>
  );
}
