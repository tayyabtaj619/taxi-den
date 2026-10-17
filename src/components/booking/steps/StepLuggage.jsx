import { content } from '../../../content/index.js';
import { validateLuggage } from '../../../lib/booking.js';
import Icon from '../../ui/Icon.jsx';
import StepShell from '../StepShell.jsx';
import { useStepForm } from './useStepForm.js';

const t = content.flow.luggage;

export default function StepLuggage({ onNext, onBack }) {
  const { data, errors, update, check } = useStepForm(validateLuggage, ['luggage']);

  const options = [
    { value: 'yes', label: t.yes, hint: t.yesHint, icon: 'suitcase' },
    { value: 'no', label: t.no, hint: t.noHint, icon: 'noBag' },
  ];

  return (
    <StepShell
      id="step-luggage"
      title={t.title}
      intro={t.intro}
      alert={errors.form}
      onBack={onBack}
      onContinue={(e) => {
        e.preventDefault();
        if (check()) onNext();
      }}
    >
      <fieldset className="choice-group" aria-describedby={errors.luggage ? 'f-luggage-err' : undefined}>
        <legend className="sr-only">{t.title}</legend>
        <div className="choice-grid">
          {options.map((o, i) => (
            <label key={o.value} className={`choice${data.luggage === o.value ? ' is-selected' : ''}`}>
              <input
                id={i === 0 ? 'f-luggage' : undefined}
                type="radio"
                name="luggage"
                value={o.value}
                checked={data.luggage === o.value}
                onChange={() => update('luggage', o.value)}
                className="choice__input"
              />
              <span className="choice__icon">
                <Icon name={o.icon} size={24} />
              </span>
              <span className="choice__text">
                <span className="choice__label">{o.label}</span>
                <span className="choice__hint">{o.hint}</span>
              </span>
              <span className="choice__tick" aria-hidden="true">
                <Icon name="check" size={14} strokeWidth={2.6} />
              </span>
            </label>
          ))}
        </div>
        {errors.luggage ? (
          <p id="f-luggage-err" className="field__error">
            {errors.luggage}
          </p>
        ) : null}
      </fieldset>
    </StepShell>
  );
}
