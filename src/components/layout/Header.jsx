import { useEffect, useRef, useState } from 'react';
import { content, contact } from '../../content/index.js';
import { HeaderLogo } from './Logo.jsx';
import AccountMenu, { AccountLinks } from './AccountMenu.jsx';
import Icon from '../ui/Icon.jsx';

const { nav } = content;

/**
 * Site header shared by every page. `variant="overlay"` sits on a hero image;
 * `"solid"` is used on the booking pages. `current` marks the active nav item
 * with aria-current="page". "Book a Taxi" goes to the hero card on the homepage,
 * or straight into the flow when already on a booking page.
 */
export default function Header({ variant = 'overlay', bookHref = '#book', current = null }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`header header--${variant}`}>
      <div className="header__bar">
        <HeaderLogo />

        <nav className="nav" aria-label={nav.label}>
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} aria-current={l.page === current ? 'page' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a href={contact.phoneHref} className="header__phone">
            <Icon name="phone" size={16} />
            <span>
              <span className="header__phone-label">{nav.available}</span>
              <span className="header__phone-number">{contact.phoneDisplay}</span>
            </span>
          </a>
          <AccountMenu />
          <a href={bookHref} className="btn btn--gold header__book">
            {nav.book}
          </a>
        </div>

        <div className="header__compact">
          <a href={contact.phoneHref} className="header__call" aria-label={nav.callLabel}>
            <Icon name="phone" size={16} />
            <span className="header__call-text">{nav.call}</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="header__menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'chevronDown'} size={16} />
            {open ? nav.close : nav.menu}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-menu" className="mobile-menu" aria-label={nav.mobileLabel}>
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="mobile-menu__link"
              aria-current={l.page === current ? 'page' : undefined}
              onClick={close}
            >
              {l.label}
            </a>
          ))}
          <div className="mobile-menu__account">
            <AccountLinks onNavigate={close} />
          </div>
          <div className="mobile-menu__actions">
            <a href={bookHref} className="btn btn--gold" onClick={close}>
              {nav.book}
            </a>
            <a href={contact.phoneHref} className="btn mobile-menu__phone">
              {contact.phoneDisplay}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
