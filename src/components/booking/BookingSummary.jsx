import { useEffect, useRef } from 'react';
import { content, contact } from '../../content/index.js';
import { formatWhen } from '../../lib/booking.js';

const t = content.booking;
const d = t.done;

/**
 * Shown after the service layer resolves. In mock mode it states plainly that
 * nothing was sent. INTEGRATION POINT: when the real API is connected, adjust
 * this copy to match what the API confirms (request received vs. booked) and
 * show any reference number it returns.
 */
export default function BookingSummary({ result, onEdit }) {
  const headingRef = useRef(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const r = result.request;
  const rows = [
    [d.from, r.pickup + (r.stop ? d.via(r.stop) : '')],
    [d.to, r.dest],
    [d.pickup, formatWhen(r.date, r.time, content.locale)],
    [d.trip, r.trip === 'return' ? d.returnAt(formatWhen(r.rdate, r.rtime, content.locale)) : d.oneWay],
    [d.paxLug, `${t.passengerOption(r.pax)} · ${r.luggage ? d.withLuggage : d.noLuggage}`],
  ];

  return (
    <div className="summary" role="status">
      <div className="summary__head">
        {result.mock ? <span className="summary__badge">{d.badge}</span> : null}
        <h2 id="book-title" className="summary__title" ref={headingRef} tabIndex={-1}>
          {d.title}
        </h2>
      </div>

      {result.mock ? (
        <p className="summary__text">
          {d.mock.before}
          <strong>{d.mock.strong}</strong>
          {d.mock.afterStrong}
          <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
          {d.mock.beforeLink}
          <a href={contact.whatsappHref}>{d.mock.link}</a>
          {d.mock.after}
        </p>
      ) : null}

      <dl className="summary__list">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <div className="summary__actions">
        <a href={contact.phoneHref} className="btn btn--gold">
          {d.call}
        </a>
        <button type="button" className="secondary-btn" onClick={onEdit}>
          {d.edit}
        </button>
      </div>
    </div>
  );
}
