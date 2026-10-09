import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './sections/Hero.jsx';
import Booking from './sections/Booking.jsx';
import Services from './sections/Services.jsx';
import WhyChoose from './sections/WhyChoose.jsx';
import Airport from './sections/Airport.jsx';
import LocalTaxi from './sections/LocalTaxi.jsx';
import Reviews from './sections/Reviews.jsx';
import AppPromo from './sections/AppPromo.jsx';
import Faq from './sections/Faq.jsx';
import Contact from './sections/Contact.jsx';

// Section order follows the approved design exactly.
export default function App() {
  return (
    <div className="page">
      <a href="#book" className="skip-link">
        Skip to booking form
      </a>
      <Header />
      <main id="top">
        <Hero />
        <Booking />
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
