import { content } from '../content/index.js';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import localTaxiImage from '../images/Hero section.png';
import airportTransfersImage from '../images/Airport transfers.png';
import businessTransportImage from '../images/business transport.jpg';
import weddingTransportImage from '../images/Wedding transport.png';
import groupTransportImage from '../images/Group transport.png';
import privateToursImage from '../images/Private tours in Den Bosch.jpg';

const t = content.services;

function service(slug) {
  return t.items.find((item) => item.slug === slug);
}

export default function Services() {
  return (
    <section id="services" className="container section" aria-labelledby="services-title">
      <div className="section-head">
        <div>
          <SectionHeading id="services-title" eyebrow={t.eyebrow} title={t.title} />
        </div>
        <p className="section-head__intro">{t.intro}</p>
      </div>
      <div className="cards">
        <ServiceCard item={service('local')} src={localTaxiImage} />
        <ServiceCard item={service('airport')} src={airportTransfersImage} />
        <ServiceCard item={service('business')} src={businessTransportImage} />
        <ServiceCard item={service('events')} src={weddingTransportImage} />
        <ServiceCard item={service('groups')} src={groupTransportImage} />
        <ServiceCard item={service('tours')} src={privateToursImage} />
      </div>
    </section>
  );
}
