import Header from './Header.jsx';
import SkipLink from './SkipLink.jsx';
import Footer from './Footer.jsx';

/** Shared frame for the public content pages (About, Services, Contact). */
export default function PageLayout({ current, className = '', children }) {
  return (
    <div className={`page page--content ${className}`.trim()}>
      <SkipLink />
      <Header current={current} />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
