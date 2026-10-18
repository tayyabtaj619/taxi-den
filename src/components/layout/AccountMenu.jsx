import { useEffect, useId, useRef, useState } from 'react';
import { content } from '../../content/index.js';
import { config, storeLinks } from '../../config.js';
import { driverRegisterPath } from '../../hooks/useHashRoute.js';
import Icon from '../ui/Icon.jsx';

const t = content.nav.account;

/**
 * Account entry points. Customer login/registration link to the existing
 * pages on the current live site (configurable, see config.js). Driver login
 * uses the Snel Taxi App Store URL from config (confirm listing with client).
 * "Become a driver" opens the in-site registration entry screen.
 */
export function accountLinks() {
  return {
    customers: [
      { key: 'login', href: config.customerLoginUrl, label: t.items.login.label, external: true },
      { key: 'register', href: config.customerRegisterUrl, label: t.items.register.label, external: true },
    ],
    drivers: [
      { key: 'driverLogin', href: storeLinks.appStore, label: t.items.driverLogin.label, external: true },
      { key: 'driverApply', href: driverRegisterPath(), label: t.items.driverApply.label },
    ],
  };
}

function LinkGroup({ title, links, onNavigate }) {
  return (
    <div className="account__group">
      <p className="account__group-title">{title}</p>
      <ul>
        {links.map((l) => (
          <li key={l.key}>
            <a
              href={l.href}
              className="account__link"
              onClick={onNavigate}
              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Account links as a static list (used in the mobile menu). */
export function AccountLinks({ onNavigate }) {
  const links = accountLinks();
  return (
    <div className="account__groups">
      <LinkGroup title={t.customers} links={links.customers} onNavigate={onNavigate} />
      <LinkGroup title={t.drivers} links={links.drivers} onNavigate={onNavigate} />
    </div>
  );
}

/** Desktop dropdown. Closes on Escape, outside click or link choice. */
export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  return (
    <div className="account" ref={wrapRef}>
      <button
        ref={btnRef}
        type="button"
        className="account__btn"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name="user" size={16} />
        {t.button}
        <Icon name="chevronDown" size={14} className={open ? 'is-flipped' : ''} />
      </button>
      {open ? (
        <div id={panelId} className="account__panel" aria-label={t.menuLabel} role="group">
          <AccountLinks onNavigate={() => setOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}
