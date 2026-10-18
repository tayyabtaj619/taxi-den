import { content, contact } from '../content/index.js';
import { bookPath } from '../hooks/useHashRoute.js';

const t = content.cta;

export default function Contact() {
  return (
    <section id="contact" className="container section section--tight contact" aria-labelledby="contact-title">
      <div className="dark-panel contact__panel">
        <div>
          <h2 id="contact-title" className="h2">
            {t.title}
          </h2>
          <p className="contact__body">{t.body}</p>
          <div className="btn-row contact__ctas">
            <a href={bookPath()} className="btn btn--lg btn--gold">
              {t.book}
            </a>
            <a href={contact.phoneHref} className="btn btn--lg btn--ghost-dark">
              {t.call}
            </a>
            <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn--lg btn--ghost-dark">
              {t.whatsapp}
            </a>
          </div>
        </div>
        <dl className="contact__list">
          <div>
            <dt>{t.labels.phone}</dt>
            <dd>
              <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            </dd>
          </div>
          <div>
            <dt>{t.labels.whatsapp}</dt>
            <dd>
              <a href={contact.whatsappHref}>{contact.whatsappDisplay}</a>
            </dd>
          </div>
          <div>
            <dt>{t.labels.email}</dt>
            <dd className="contact__email">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </dd>
          </div>
          <div>
            <dt>{t.labels.hours}</dt>
            <dd>{t.hours}</dd>
          </div>
          <div>
            <dt>{t.labels.office}</dt>
            <dd>
              {contact.addressLines[0]}
              <br />
              {contact.addressLines[1]}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
