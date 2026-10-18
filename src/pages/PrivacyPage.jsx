import { content } from '../content/index.js';
import LegalLayout from '../components/layout/LegalLayout.jsx';

const t = content.pages.privacy;

export default function PrivacyPage() {
  return (
    <LegalLayout current="privacy" titleId="privacy-title" eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      {t.sections.map((section) => (
        <section key={section.heading} className="legal-section" aria-labelledby={`privacy-${section.id}`}>
          <h2 id={`privacy-${section.id}`} className="legal-section__title">
            {section.heading}
          </h2>
          {section.paragraphs?.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {section.list?.length ? (
            <ul>
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
      <aside className="legal-note" role="note">
        <h2 className="legal-note__title">{t.confirmation.title}</h2>
        <p>{t.confirmation.body}</p>
      </aside>
    </LegalLayout>
  );
}
