import Icon from './Icon.jsx';

/** − [n] + number control. Buttons stay ≥44px for touch. */
export default function NumberStepper({ id, label, value, min, max, onChange, decreaseLabel, increaseLabel }) {
  return (
    <div className="num-stepper" role="group" aria-labelledby={`${id}-label`}>
      <span id={`${id}-label`} className="num-stepper__label">
        {label}
      </span>
      <div className="num-stepper__controls">
        <button
          type="button"
          className="num-stepper__btn"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={decreaseLabel}
        >
          <Icon name="minus" />
        </button>
        <output id={id} className="num-stepper__value" aria-live="polite">
          {value}
        </output>
        <button
          type="button"
          className="num-stepper__btn"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={increaseLabel}
        >
          <Icon name="plus" />
        </button>
      </div>
    </div>
  );
}
