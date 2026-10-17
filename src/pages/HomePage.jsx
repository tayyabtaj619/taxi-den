import { useLayoutEffect } from 'react';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import Hero from '../sections/Hero.jsx';
import Services from '../sections/Services.jsx';
import WhyChoose from '../sections/WhyChoose.jsx';
import Airport from '../sections/Airport.jsx';
import LocalTaxi from '../sections/LocalTaxi.jsx';
import Reviews from '../sections/Reviews.jsx';
import AppPromo from '../sections/AppPromo.jsx';
import Faq from '../sections/Faq.jsx';
import Contact from '../sections/Contact.jsx';

// Section order follows the approved design. The booking entry now lives in
// the hero (id="book"); the four steps are on the booking page.
export default function HomePage({ anchor }) {
  // Arriving from the booking page (e.g. #services, #book): the target only
  // exists after this render, so scroll to it here.
  useLayoutEffect(() => {
    if (!anchor || anchor === 'top') {
      window.scrollTo({ top: 0 });
      return;
    }
    const el = document.getElementById(anchor);
    if (el) el.scrollIntoView({ block: anchor === 'book' ? 'center' : 'start' });
  }, [anchor]);

  return (
    <div className="page">
      <a href="#book" className="skip-link">
        Skip to booking form
      </a>
      <Header current="home" />
      <main id="top">
        <Hero />
        <Services />
        <WhyChoose />
        <Airport />
        <LocalTaxi />
        <Reviews />
        <AppPromo />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
