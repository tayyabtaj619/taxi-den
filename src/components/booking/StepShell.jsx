import { useEffect, useRef } from 'react';
import { content } from '../../content/index.js';
import Icon from '../ui/Icon.jsx';

const t = content.flow;

/**
 * Common frame for each step: heading (focused on arrival so keyboard and
 * screen-reader users land at the new step), form-level alert, content, and
 * the Back / Continue bar. `onContinue` receives the submit event.
 */
export default function StepShell({
  id,
  title,
  intro,
  aside,
  alert,
  onBack,
  onContinue,
  continueLabel = t.continue,
  continueBusy = false,
  busyLabel,
  footerNote,
  children,
}) {
  const headingRef = useRef(null);
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [id]);

  return (
    <form className="step" noValidate onSubmit={onContinue} aria-busy={continueBusy} aria-labelledby={`${id}-title`}>
      <div className="step__head">
        <h1 id={`${id}-title`} className="step__title" ref={headingRef} tabIndex={-1}>
          {title}
        </h1>
        {aside}
      </div>
      {intro ? <p className="step__intro">{intro}</p> : null}

      {alert ? (
        <p role="alert" className="alert alert--error">
          <Icon name="info" size={18} />
          {alert}
        </p>
      ) : null}

      <div className="step__body">{children}</div>

      {footerNote ? <p className="step__note">{footerNote}</p> : null}

      <div className="step__actions">
        <button type="button" className="btn btn--secondary" onClick={onBack}>
          <Icon name="arrowLeft" />
          {t.back}
        </button>
        <button type="submit" className="btn btn--primary" disabled={continueBusy}>
          {continueBusy ? (
            <>
              <span className="spinner" aria-hidden="true" />
              <span aria-live="polite">{busyLabel}</span>
            </>
          ) : (
            <>
              {continueLabel}
              <Icon name="arrowRight" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
