import { useEffect, useRef } from 'react';
import { content, contact } from '../../content/index.js';
import Icon from '../ui/Icon.jsx';

const d = content.flow.done;

/**
 * Shown after the service layer resolves. In mock mode it states plainly that
 * nothing was sent. INTEGRATION POINT: once the real API is connected, change
 * this copy to what the API actually confirms (request received vs. booked)
 * and show the reference it returns (`result.reference`).
 */
export default function BookingDone({ result, onNew, onHome }) {
  const headingRef = useRef(null);
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="step step--done" role="status">
      <div className="done__mark" aria-hidden="true">
        <Icon name="check" size={28} strokeWidth={2.4} />
      </div>
      {result.mock ? <span className="badge badge--test">{d.badge}</span> : null}
      <h1 className="step__title" ref={headingRef} tabIndex={-1}>
        {d.title}
      </h1>
      {result.mock ? (
        <p className="step__intro">
          {d.mock.before}
          <strong>{d.mock.strong}</strong>
          {d.mock.afterStrong}
          <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
          {d.mock.beforeLink}
          <a href={contact.whatsappHref}>{d.mock.link}</a>
          {d.mock.after}
        </p>
      ) : null}
      {result.reference ? <p className="done__ref">{result.reference}</p> : null}
      <div className="step__actions step__actions--start">
        <a href={contact.phoneHref} className="btn btn--primary">
          <Icon name="phone" />
          {d.call}
        </a>
        <button type="button" className="btn btn--secondary" onClick={onNew}>
          {d.newBooking}
        </button>
        <button type="button" className="btn btn--ghost" onClick={onHome}>
          {d.home}
        </button>
      </div>
    </div>
  );
}
