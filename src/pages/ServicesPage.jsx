import { content, contact } from '../content/index.js';
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import Icon from '../components/ui/Icon.jsx';
import { pagePath } from '../hooks/useHashRoute.js';

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

export default function ServicesPage() {
  return (
    <PageLayout current="services">
      <PageHero id="services-page-title" eyebrow={t.hero.eyebrow} title={t.hero.title} body={t.hero.body} image={t.hero.image} size="medium" />

      <section className="container section services-page" aria-label={t.gridLabel}>
        <div className="cards cards--services">
          {content.services.items.map((item) => (
            <ServiceCard
              key={item.slug}
              id={`service-${item.slug}`}
              item={item}
              headingLevel={2}
              tags={t.tags[item.slug]}
              links={[actionFor(item)]}
            />
          ))}
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
