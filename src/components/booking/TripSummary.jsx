import { content } from '../../content/index.js';
import { formatWhen } from '../../lib/booking.js';
import { vehicleById } from '../../data/vehicles.js';
import Icon from '../ui/Icon.jsx';

const t = content.flow.summary;

export function whenLabel(data) {
  return data.when === 'later' ? formatWhen(data.date, data.time, content.locale) : t.asap;
}

/** Route block: pickup → (stop) → destination with a gold connector line. */
export function RouteList({ data, compact = false }) {
  return (
    <ol className={`trip-route${compact ? ' trip-route--compact' : ''}`}>
      <li className="trip-route__from">
        <span className="trip-route__label">{t.from}</span>
        <span className="trip-route__value">{data.pickup}</span>
      </li>
      {data.hasStop && data.stop ? (
        <li className="trip-route__via">
          <span className="trip-route__label">{t.via}</span>
          <span className="trip-route__value">{data.stop}</span>
        </li>
      ) : null}
      <li className="trip-route__to">
        <span className="trip-route__label">{t.to}</span>
        <span className="trip-route__value">{data.dest}</span>
      </li>
    </ol>
  );
}

function rows(data) {
  const v = vehicleById(data.vehicle);
  return [
    [t.when, whenLabel(data)],
    [t.luggage, data.luggage === 'yes' ? t.withLuggage : data.luggage === 'no' ? t.noLuggage : t.notChosen],
    [t.passengers, String(data.pax)],
    [t.vehicle, v ? content.vehicles[v.id].name : t.notChosen],
    [
      t.returnLabel,
      data.isReturn && data.rdate && data.rtime ? formatWhen(data.rdate, data.rtime, content.locale) : t.oneWay,
    ],
  ];
}

/** Journey summary: sticky card on wide screens, collapsible on mobile. */
export default function TripSummary({ data }) {
  const body = (
    <>
      <RouteList data={data} />
      <dl className="trip-facts">
        {rows(data).map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <div className="trip-fare">
        <span>{t.fare}</span>
        <strong>{t.fareValue}</strong>
      </div>
    </>
  );

  return (
    <>
      <aside className="trip-summary trip-summary--wide" aria-labelledby="trip-summary-title">
        <h2 id="trip-summary-title" className="trip-summary__title">
          {t.title}
        </h2>
        {body}
      </aside>

      <details className="trip-summary trip-summary--compact">
        <summary>
          <span className="trip-summary__line">
            <span className="trip-summary__route">
              {data.pickup} <Icon name="arrowRight" size={14} /> {data.dest}
            </span>
            <span className="trip-summary__toggle">{t.toggle}</span>
          </span>
          <Icon name="chevronDown" size={16} className="trip-summary__chev" />
        </summary>
        <div className="trip-summary__body">{body}</div>
      </details>
    </>
  );
}
