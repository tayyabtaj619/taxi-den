import { content, contact } from '../content/index.js';
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import Icon from '../components/ui/Icon.jsx';
import { pagePath } from '../hooks/useHashRoute.js';
import localTaxiImage from '../images/local-taxi.webp';
import airportTransfersImage from '../images/airport-transfers.webp';
import businessTransportImage from '../images/business-transport.webp';
import weddingTransportImage from '../images/wedding-transport.webp';
import groupTransportImage from '../images/group-transport.webp';
import privateToursImage from '../images/private-tours.webp';

const t = content.pages.services;

// No per-service detail pages exist, so each card leads somewhere real:
// bookable services go to the booking entry; services that need planning
// (business, events, tours) open the contact form with the subject preset.
function actionFor(item) {
  if (item.action === 'contact') {
    return { href: pagePath('contact', item.slug), label: t.actions.contact, button: true };
  }
  return { href: '#book', label: t.actions.book, button: true };
}

function service(slug) {
  return content.services.items.find((item) => item.slug === slug);
}

export default function ServicesPage() {
  const local = service('local');
  const airport = service('airport');
  const business = service('business');
  const events = service('events');
  const groups = service('groups');
  const tours = service('tours');

  return (
    <PageLayout current="services">
      <PageHero id="services-page-title" eyebrow={t.hero.eyebrow} title={t.hero.title} body={t.hero.body} alt={t.hero.imageAlt} size="medium" />

      <section className="container section services-page" aria-label={t.gridLabel}>
        <div className="cards cards--services">
          <ServiceCard id="service-local" item={local} src={localTaxiImage} headingLevel={2} tags={t.tags.local} links={[actionFor(local)]} />
          <ServiceCard id="service-airport" item={airport} src={airportTransfersImage} headingLevel={2} tags={t.tags.airport} links={[actionFor(airport)]} />
          <ServiceCard id="service-business" item={business} src={businessTransportImage} headingLevel={2} tags={t.tags.business} links={[actionFor(business)]} />
          <ServiceCard id="service-events" item={events} src={weddingTransportImage} headingLevel={2} tags={t.tags.events} links={[actionFor(events)]} />
          <ServiceCard id="service-groups" item={groups} src={groupTransportImage} headingLevel={2} tags={t.tags.groups} links={[actionFor(groups)]} />
          <ServiceCard id="service-tours" item={tours} src={privateToursImage} headingLevel={2} tags={t.tags.tours} links={[actionFor(tours)]} />
        </div>
      </section>

      <CtaBand id="services-help-title" title={t.help.title} body={t.help.body}>
        <a href={contact.phoneHref} className="btn btn--lg btn--gold">
          <Icon name="phone" />
          {t.help.call}
        </a>
        <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn--lg btn--ghost-dark">
          <Icon name="chat" />
          {t.help.whatsapp}
        </a>
        <a href={pagePath('contact')} className="btn btn--lg btn--ghost-dark">
          {t.help.form}
        </a>
      </CtaBand>
    </PageLayout>
  );
}
