import { useState } from 'react';
import { content, contact } from '../content/index.js';
import SectionHeading from '../components/ui/SectionHeading.jsx';

const t = content.faq;

function FaqItem({ item, index, open, onToggle }) {
  const panelId = `faq-${index}`;
  const buttonId = `faq-btn-${index}`;
  return (
    <div className="faq__item">
      <h3 className="faq__q">
        <button
          id={buttonId}
          type="button"
          className="faq__btn"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
        >
          <span>{item.q}</span>
          <span className="faq__sign" aria-hidden="true">
            {open ? '−' : '+'}
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
        <p className="faq__a">{item.a}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  // One open at a time; the first is open by default, as in the design.
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (i) => setOpenIndex((cur) => (cur === i ? -1 : i));

  return (
    <section id="faq" className="container section" aria-labelledby="faq-title">
      <div className="faq">
        <div>
          <SectionHeading id="faq-title" eyebrow={t.eyebrow} title={t.title} />
          <p className="faq__intro">
            {t.introBefore}
            <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            {t.introMiddle}
            <a href={contact.whatsappHref}>{t.introLink}</a>
            {t.introAfter}
          </p>
        </div>
        <div className="faq__list">
          {t.items.map((item, i) => (
            <FaqItem key={item.q} item={item} index={i} open={openIndex === i} onToggle={toggle} />
          ))}
        </div>
      </div>
    </section>
  );
}
