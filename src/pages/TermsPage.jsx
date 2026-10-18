import { content } from '../content/index.js';
import LegalLayout from '../components/layout/LegalLayout.jsx';

const t = content.pages.terms;

export default function TermsPage() {
  return (
    <LegalLayout current="terms" titleId="terms-title" eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      <p className="legal-lede">{t.sourceNote}</p>
      {t.articles.map((article) => (
        <section key={article.id} className="legal-section" aria-labelledby={`terms-${article.id}`}>
          <h2 id={`terms-${article.id}`} className="legal-section__title">
            {article.heading}
          </h2>
          {article.paragraphs?.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {article.list?.length ? (
            <ol className={article.listStyle === 'alpha' ? 'legal-list--alpha' : undefined}>
              {article.list.map((item) => (
                <li key={typeof item === 'string' ? item : item.text}>
                  {typeof item === 'string' ? (
                    item
                  ) : (
                    <>
                      {item.text}
                      {item.sub?.length ? (
                        <ul>
                          {item.sub.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      ) : null}
                    </>
                  )}
                </li>
              ))}
            </ol>
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
