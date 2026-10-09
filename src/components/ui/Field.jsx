/**
 * Labelled form control with an optional action button in the label row and an
 * inline error. `children` receives the props the control must spread so the
 * label, error and aria wiring stay consistent across every field.
 */
export default function Field({ id, label, error, action, children }) {
  const errorId = `${id}-err`;
  const controlProps = {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
  };

  return (
    <div className="field">
      <div className="field__head">
        <label htmlFor={id} className="field__label">
          {label}
        </label>
        {action}
      </div>
      {children(controlProps)}
      {error ? (
        <p id={errorId} className="field__error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
