import { useState } from 'react';
import { content, contact } from '../content/index.js';
import LegalLayout from '../components/layout/LegalLayout.jsx';
import { bookPath, pagePath } from '../hooks/useHashRoute.js';

const t = content.pages.help;

function HelpSection({ item, index, open, onToggle }) {
  const panelId = `help-${index}`;
  const buttonId = `help-btn-${index}`;
  return (
    <div className="help__item">
      <h2 className="help__q">
        <button
          id={buttonId}
          type="button"
          className="help__btn"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
        >
          <span>{item.title}</span>
          <span className="faq__sign" aria-hidden="true">
            {open ? '−' : '+'}
          </span>
        </button>
      </h2>
      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
        <div className="help__a">
          {item.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {item.actions?.length ? (
            <p className="help__actions">
              {item.actions.map((a) => (
                <a key={a.label} href={a.href} className="btn btn--md btn--ink">
                  {a.label}
                </a>
              ))}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const sections = t.sections({ contact, bookPath, pagePath });

  return (
    <LegalLayout current="help" titleId="help-title" eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      <div className="help__list">
        {sections.map((item, i) => (
          <HelpSection
            key={item.title}
            item={item}
            index={i}
            open={openIndex === i}
            onToggle={(idx) => setOpenIndex((cur) => (cur === idx ? -1 : idx))}
          />
        ))}
      </div>
      <aside className="legal-note" aria-label={t.contactAside.title}>
        <h2 className="legal-note__title">{t.contactAside.title}</h2>
        <p>{t.contactAside.body}</p>
        <p className="help__actions">
          <a href={contact.phoneHref} className="btn btn--md btn--gold">
            {contact.phoneDisplay}
          </a>
          <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn--md btn--ink">
            WhatsApp
          </a>
          <a href={pagePath('contact')} className="btn btn--md btn--ink">
            {t.contactAside.form}
          </a>
        </p>
      </aside>
    </LegalLayout>
  );
}
