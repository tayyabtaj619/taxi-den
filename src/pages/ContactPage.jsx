import { content, contact } from '../content/index.js';
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/PageHero.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Icon from '../components/ui/Icon.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';

const t = content.pages.contact;
const d = t.details;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.location.mapQuery)}`;

function DetailItem({ icon, label, children, note }) {
  return (
    <li className="contact-detail">
      <span className="contact-detail__icon" aria-hidden="true">
        <Icon name={icon} size={20} />
      </span>
      <div className="contact-detail__text">
        <p className="contact-detail__label">{label}</p>
        <div className="contact-detail__value">{children}</div>
        {note ? <p className="contact-detail__note">{note}</p> : null}
      </div>
    </li>
  );
}

export default function ContactPage({ topic }) {
  return (
    <PageLayout current="contact">
      <PageHero id="contact-title" eyebrow={t.hero.eyebrow} title={t.hero.title} body={t.hero.body} image={t.hero.image} size="compact" />

      <section className="container contact-page" aria-label={t.hero.title}>
        <div className="contact-page__grid">
          <div className="contact-page__details">
            <h2 className="contact-page__subtitle">{d.title}</h2>
            <p className="contact-page__urgent">
              {t.urgent}{' '}
              <a href={contact.phoneHref} className="contact-page__urgent-link">
                {contact.phoneDisplay}
              </a>
            </p>
            <ul className="contact-details">
              <DetailItem icon="phone" label={d.phone.label} note={d.phone.note}>
                <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
              </DetailItem>
              <DetailItem icon="chat" label={d.whatsapp.label} note={d.whatsapp.note}>
                <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">
                  {contact.whatsappDisplay}
                </a>
              </DetailItem>
              <DetailItem icon="mail" label={d.email.label} note={d.email.note}>
                <a href={`mailto:${contact.email}`} className="contact-detail__email">
                  {contact.email}
                </a>
              </DetailItem>
              <DetailItem icon="clock" label={d.hours.label}>
                {d.hours.value}
              </DetailItem>
              <DetailItem icon="pin" label={d.office.label}>
                {contact.addressLines[0]}
                <br />
                {contact.addressLines[1]}
              </DetailItem>
            </ul>
          </div>

          <div className="contact-page__form">
            <ContactForm topic={topic} />
          </div>
        </div>
      </section>

      {/* No embedded map: the published address has no house number, so we
          link to a map search instead of placing a pin we cannot verify. */}
      <section className="container section contact-location-wrap" aria-labelledby="location-title">
        <div className="contact-location">
          <span className="contact-location__icon" aria-hidden="true">
            <Icon name="pin" size={26} />
          </span>
          <div className="contact-location__text">
            <SectionHeading id="location-title" eyebrow={t.location.eyebrow} title={t.location.title} className="contact-location__title" />
            <p className="lede">{t.location.body}</p>
            <p className="contact-location__address">{contact.addressLines.join(', ')}</p>
          </div>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--md btn--ink contact-location__btn">
            {t.location.mapLink}
            <Icon name="external" size={16} />
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
