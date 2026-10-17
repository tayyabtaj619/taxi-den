import { content } from '../../content/index.js';
import { STEPS } from '../../lib/booking.js';
import { bookPath } from '../../hooks/useHashRoute.js';
import Icon from '../ui/Icon.jsx';

const t = content.flow;
const ICONS = { luggage: 'suitcase', offers: 'tag', travel: 'calendar', contact: 'user' };

/**
 * Progress indicator: completed steps are links back (values are kept),
 * the current step is marked aria-current, upcoming steps are inert.
 */
export default function Progress({ current, allDone = false }) {
  const idx = allDone ? STEPS.length : STEPS.indexOf(current);
  const pct = Math.round(((Math.min(idx, STEPS.length - 1) + (allDone ? 1 : 0.5)) / STEPS.length) * 100);

  return (
    <nav className="progress" aria-label={t.progressLabel}>
      <p className="progress__count">
        {allDone ? null : t.stepOf(idx + 1, STEPS.length)}
        <span className="progress__current-name">{allDone ? null : ` · ${t.steps[current]}`}</span>
      </p>
      <div className="progress__bar" aria-hidden="true">
        <span style={{ width: `${pct}%` }} />
      </div>
      <ol className="progress__list">
        {STEPS.map((step, i) => {
          const state = i < idx ? 'done' : i === idx ? 'current' : 'upcoming';
          const inner = (
            <>
              <span className="progress__dot">
                {state === 'done' ? <Icon name="check" size={14} strokeWidth={2.4} /> : <Icon name={ICONS[step]} size={15} />}
              </span>
              <span className="progress__name">{t.steps[step]}</span>
              {state === 'done' ? <span className="sr-only">, {t.completed}</span> : null}
            </>
          );
          return (
            <li key={step} className={`progress__item is-${state}`}>
              {state === 'done' && !allDone ? (
                <a href={bookPath(step)} className="progress__step">
                  {inner}
                </a>
              ) : (
                <span className="progress__step" aria-current={state === 'current' ? 'step' : undefined}>
                  {inner}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
