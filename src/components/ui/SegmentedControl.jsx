/**
 * Two-or-more option toggle built from pressed buttons, as in the design.
 * `as="fieldset"` adds a visible legend (used for Luggage).
 */
export default function SegmentedControl({ label, options, value, onChange, legend = false, className = '' }) {
  const buttons = (
    <div className="segmented" role={legend ? undefined : 'group'} aria-label={legend ? undefined : label}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className="segmented__btn"
          aria-pressed={value === opt.value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );

  if (!legend) return <div className={className}>{buttons}</div>;

  return (
    <fieldset className={className}>
      <legend>{label}</legend>
      {buttons}
    </fieldset>
  );
}
