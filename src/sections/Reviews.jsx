import { content } from '../content/index.js';
import { config } from '../config.js';
import SectionHeading from '../components/ui/SectionHeading.jsx';

const t = content.reviews;

/**
 * The design marks this section as a dev note "not shown in production" until
 * verified reviews exist. With no reviews, production renders nothing; in
 * development the pending notice is visible. Add verified reviews to
 * content/en.js (reviews.items: [{ quote, name, context }]) to show them.
 */
export default function Reviews() {
  const hasReviews = t.items.length > 0;
  if (!hasReviews && !config.showDevNotes) return null;

  return (
    <section id="reviews" className="container section" aria-labelledby="reviews-title">
      <SectionHeading id="reviews-title" eyebrow={t.eyebrow} title={t.title} className="reviews__title" />
      {hasReviews ? (
        <ul className="cards">
          {t.items.map((r) => (
            <li key={r.name + r.quote} className="card card__body" style={{ listStyle: 'none' }}>
              <blockquote className="card__text" style={{ margin: 0 }}>
                {r.quote}
              </blockquote>
              <p className="card__title" style={{ fontSize: 16 }}>
                {r.name}
                {r.context ? <span className="card__text"> · {r.context}</span> : null}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="reviews__pending">
          <p>
            <strong>{t.pendingStrong}</strong>
            {t.pendingBody}
          </p>
          <span className="dev-note">{t.devNote}</span>
        </div>
      )}
    </section>
  );
}
