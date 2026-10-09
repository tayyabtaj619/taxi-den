import { useEffect, useRef, useState } from 'react';
import { content, contact } from '../../content/index.js';
import { HeaderLogo } from './Logo.jsx';

const { nav } = content;

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);

  // Close the mobile menu with Escape and return focus to the toggle.
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
    <header className="header">
      <div className="header__bar">
        <HeaderLogo />

        {/* Wide layout (≥1080px) */}
        <nav className="nav" aria-label={nav.label}>
          {nav.links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="header__actions">
          <a href={contact.phoneHref} className="header__phone">
            <span className="header__phone-label">{nav.available}</span>
            <span>{contact.phoneDisplay}</span>
          </a>
          <a href="#book" className="btn btn--gold header__book">
            {nav.book}
          </a>
        </div>

        {/* Compact layout (<1080px) */}
        <div className="header__compact">
          <a href={contact.phoneHref} className="header__call" aria-label={nav.callLabel}>
            {nav.call}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="header__menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? nav.close : nav.menu}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-menu" className="mobile-menu" aria-label={nav.mobileLabel}>
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} className="mobile-menu__link" onClick={close}>
              {l.label}
            </a>
          ))}
          <div className="mobile-menu__actions">
            <a href="#book" className="btn btn--gold" onClick={close}>
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
