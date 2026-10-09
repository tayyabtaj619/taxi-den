import { content, contact } from '../../content/index.js';
import { FooterLogo } from './Logo.jsx';

const { footer } = content;
const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <FooterLogo />
          <p className="footer__tagline">{footer.tagline}</p>
        </div>

        {footer.columns.map((col) => (
          <nav key={col.title} className="footer__col" aria-label={col.title}>
            <p className="footer__col-title">{col.title}</p>
            {col.links.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        ))}

        <div className="footer__col footer__contact">
          <p className="footer__col-title">{footer.contactTitle}</p>
          <a href={contact.phoneHref} className="footer__phone">
            {contact.phoneDisplay}
          </a>
          <a href={contact.whatsappHref}>
            {footer.whatsappPrefix}
            {contact.whatsappDisplay}
          </a>
          <a href={`mailto:${contact.email}`} className="footer__email">
            {contact.email}
          </a>
          <span>{contact.addressLines.join(', ')}</span>
          <span>{footer.open}</span>
        </div>
      </div>
      <div className="footer__bottom">{footer.copyright(year)}</div>
    </footer>
  );
}
