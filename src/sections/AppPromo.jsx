import { content, contact } from '../content/index.js';
import { config } from '../config.js';
import Media from '../components/ui/Media.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import bookingAppImage from '../images/booking-app.webp';

const t = content.app;

function StoreButton({ href, pre, name }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn--ink store-btn">
      <span className="store-btn__pre">{pre}</span>
      <span>{name}</span>
    </a>
  );
}

export default function AppPromo() {
  return (
    <section id="app" className="container section" aria-labelledby="app-title">
      <div className="app-card">
        <div>
          <SectionHeading id="app-title" eyebrow={t.eyebrow} title={t.title} className="app-card__title" />
          <p className="lede app-card__body">{t.body}</p>
          <div className="app-card__stores">
            <StoreButton href={contact.appStoreUrl} pre={t.appStorePre} name={t.appStore} />
            {config.googlePlayUrl ? (
              <StoreButton href={config.googlePlayUrl} pre={t.googlePlayPre} name={t.googlePlay} />
            ) : config.showDevNotes ? (
              <span className="app-card__pending">{t.googlePlayPending}</span>
            ) : null}
          </div>
        </div>
        <Media src={bookingAppImage} alt={t.imageAlt} className="app-card__media" />
      </div>
    </section>
  );
}
