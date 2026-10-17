/**
 * Labelled form control with an optional action in the label row, an optional
 * hint and an inline error. `children` receives the props the control must
 * spread so label, hint, error and aria wiring stay consistent everywhere.
 */
export default function Field({ id, label, hint, error, action, className = '', children }) {
  const errorId = `${id}-err`;
  const hintId = `${id}-hint`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;
  const controlProps = {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
  };

  return (
    <div className={`field ${className}`.trim()}>
      <div className="field__head">
        <label htmlFor={id} className="field__label">
          {label}
        </label>
        {action}
      </div>
      {children(controlProps)}
      {hint && !error ? (
        <p id={hintId} className="field__hint">
          {hint}
        </p>
      ) : null}
      {hint && error ? (
        <span id={hintId} className="sr-only">
          {hint}
        </span>
      ) : null}
      {error ? (
        <p id={errorId} className="field__error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
