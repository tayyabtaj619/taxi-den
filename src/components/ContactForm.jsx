import { useEffect, useRef, useState } from 'react';
import { content, contact } from '../content/index.js';
import { contactMode, submitContactMessage } from '../services/contact/index.js';
import {
  MESSAGE_MAX,
  emailHandoffUrl,
  initialContact,
  validateContactForm,
  whatsappHandoffUrl,
} from '../lib/contact.js';
import Field from './ui/Field.jsx';
import Icon from './ui/Icon.jsx';

const t = content.pages.contact.form;
const ORDER = ['name', 'email', 'phone', 'message'];

/**
 * Contact form. In "handoff" mode (default, no backend) it validates, then
 * opens the visitor's email app or WhatsApp with the message prefilled and
 * says plainly that nothing was sent by the website. In "api" mode it uses
 * submitContactMessage with real loading / success / failure states.
 */
export default function ContactForm({ topic }) {
  const validTopic = t.subjects.some((s) => s.value === topic) ? topic : 'general';
  const [form, setForm] = useState({ ...initialContact, subject: validTopic });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle' }); // idle | handoff | sending | sent
  const statusRef = useRef(null);

  // Following a link with a different topic (e.g. from a service card) updates the subject.
  useEffect(() => {
    setForm((f) => ({ ...f, subject: validTopic }));
  }, [validTopic]);

  useEffect(() => {
    if (status.state === 'handoff' || status.state === 'sent') statusRef.current?.focus();
  }, [status.state]);

  const update = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => (er[key] || er.form ? { ...er, [key]: undefined, form: undefined } : er));
  };

  const valid = () => {
    const found = validateContactForm(form, t.errors);
    if (Object.keys(found).length) {
      setErrors({ ...found, form: t.errors.form });
      const first = ORDER.find((k) => found[k]);
      document.getElementById(`c-${first}`)?.focus();
      return false;
    }
    setErrors({});
    return true;
  };

  const subjectLabel = t.subjects.find((s) => s.value === form.subject)?.label || t.subjects[0].label;
  const body = () =>
    t.bodyTemplate({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      subject: subjectLabel,
      message: form.message.trim(),
    });

  const handoff = (channel) => {
    if (!valid()) return;
    const url =
      channel === 'email'
        ? emailHandoffUrl(contact.email, subjectLabel, body())
        : whatsappHandoffUrl(contact.whatsappHref, subjectLabel, body());
    setStatus({ state: 'handoff', channel, url });
    if (channel === 'email') window.location.href = url;
    else window.open(url, '_blank', 'noopener,noreferrer');
  };

  const submitApi = async () => {
    if (!valid()) return;
    setStatus({ state: 'sending' });
    try {
      const res = await submitContactMessage({ ...form, subject: subjectLabel });
      if (!res?.ok) throw new Error('Contact submission failed');
      setStatus({ state: 'sent' });
    } catch (err) {
      if (import.meta.env.DEV) console.warn('[contact]', err);
      setStatus({ state: 'idle' });
      setErrors({ form: t.errors.failed });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (contactMode === 'api') submitApi();
    else handoff('email');
  };

  if (status.state === 'handoff') {
    const h = t.handoff[status.channel];
    return (
      <div className="contact-form contact-form--status" role="status">
        <span className="contact-form__status-icon" aria-hidden="true">
          <Icon name={status.channel === 'email' ? 'mail' : 'chat'} size={22} />
        </span>
        <h3 className="contact-form__status-title" tabIndex={-1} ref={statusRef}>
          {h.title}
        </h3>
        <p className="contact-form__status-body">{h.body}</p>
        <div className="btn-row">
          <a
            href={status.url}
            className="btn btn--primary"
            {...(status.channel === 'whatsapp' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {h.retry}
            <Icon name="arrowRight" />
          </a>
          <button type="button" className="btn btn--secondary" onClick={() => setStatus({ state: 'idle' })}>
            {t.handoff.edit}
          </button>
        </div>
        <p className="contact-form__fallback">
          {t.handoff.fallback}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
      </div>
    );
  }

  if (status.state === 'sent') {
    return (
      <div className="contact-form contact-form--status" role="status">
        <span className="contact-form__status-icon" aria-hidden="true">
          <Icon name="check" size={22} strokeWidth={2.4} />
        </span>
        <h3 className="contact-form__status-title" tabIndex={-1} ref={statusRef}>
          {t.sent.title}
        </h3>
        <p className="contact-form__status-body">{t.sent.body}</p>
      </div>
    );
  }

  const sending = status.state === 'sending';
  const left = MESSAGE_MAX - form.message.length;

  return (
    <form className="contact-form" noValidate onSubmit={onSubmit} aria-labelledby="contact-form-title" aria-busy={sending}>
      <p className="eyebrow">{t.eyebrow}</p>
      <h2 id="contact-form-title" className="contact-form__title">
        {t.title}
      </h2>

      {errors.form ? (
        <p role="alert" className="alert alert--error">
          <Icon name="info" size={18} />
          {errors.form}
        </p>
      ) : null}

      <div className="grid-2">
        <Field id="c-name" label={t.name} error={errors.name}>
          {(p) => <input {...p} className="input" type="text" autoComplete="name" required value={form.name} onChange={update('name')} />}
        </Field>
        <Field id="c-email" label={t.email} error={errors.email}>
          {(p) => (
            <input
              {...p}
              className="input"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={update('email')}
            />
          )}
        </Field>
        <Field id="c-phone" label={t.phone} hint={t.phoneHint} error={errors.phone}>
          {(p) => (
            <input {...p} className="input" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} />
          )}
        </Field>
        <Field id="c-subject" label={t.subject}>
          {(p) => (
            <select {...p} className="input" value={form.subject} onChange={update('subject')}>
              {t.subjects.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field
          id="c-message"
          className="grid-2__full"
          label={t.message}
          hint={t.charsLeft(left)}
          error={errors.message}
        >
          {(p) => (
            <textarea
              {...p}
              className="input input--area"
              rows={5}
              required
              maxLength={MESSAGE_MAX}
              placeholder={t.messagePlaceholder}
              value={form.message}
              onChange={update('message')}
            />
          )}
        </Field>
      </div>

      {contactMode === 'api' ? (
        <div className="contact-form__actions">
          <button type="submit" className="btn btn--primary" disabled={sending}>
            {sending ? (
              <>
                <span className="spinner" aria-hidden="true" />
                <span aria-live="polite">{t.sending}</span>
              </>
            ) : (
              <>
                {t.send}
                <Icon name="arrowRight" />
              </>
            )}
          </button>
        </div>
      ) : (
        <>
          <div className="contact-form__actions">
            <button type="submit" className="btn btn--primary">
              <Icon name="mail" />
              {t.sendEmail}
            </button>
            <button type="button" className="btn btn--secondary" onClick={() => handoff('whatsapp')}>
              <Icon name="chat" />
              {t.sendWhatsapp}
            </button>
          </div>
          <p className="contact-form__notice">
            <Icon name="info" size={16} />
            {t.notice}
          </p>
        </>
      )}
    </form>
  );
}
