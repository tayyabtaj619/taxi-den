import { useCallback, useEffect, useState } from 'react';

// Minimal hash router (no dependency, works on any static host).
//   #/book[/<step>]              booking flow (default step: entry)
//   #/about                      About page
//   #/services[/<slug>]          Services page, optionally scrolled to a service
//   #/contact[/<topic>]          Contact page, optionally with a subject preselected
//   #/help                       Help Center
//   #/privacy                    Privacy Policy
//   #/terms                      Terms of Use
//   #/drivers/register           Driver registration entry (flow forthcoming)
//   anything else                homepage; a plain hash (#services) is an in-page anchor

export const PAGES = ['about', 'services', 'contact', 'help', 'privacy', 'terms'];
export const BOOK_STEPS = ['entry', 'luggage', 'offers', 'travel', 'contact', 'done'];

export function parse(hash) {
  const h = hash || '';
  const book = h.match(/^#\/book(?:\/([a-z-]+))?\/?$/);
  if (book) {
    const step = book[1] || 'entry';
    return { page: 'book', step: BOOK_STEPS.includes(step) ? step : 'entry', param: null, anchor: null };
  }
  const drivers = h.match(/^#\/drivers\/(register)\/?$/);
  if (drivers) return { page: 'drivers', step: null, param: drivers[1], anchor: null };
  const page = h.match(/^#\/([a-z]+)(?:\/([a-z0-9-]+))?\/?$/);
  if (page && PAGES.includes(page[1])) return { page: page[1], step: null, param: page[2] || null, anchor: null };
  if (h.startsWith('#/')) return { page: 'home', step: null, param: null, anchor: null };
  return { page: 'home', step: null, param: null, anchor: h.length > 1 ? h.slice(1) : null };
}

/** Booking URL. Default `#/book` opens the journey entry form. */
export const bookPath = (step = 'entry') => (step === 'entry' ? '#/book' : `#/book/${step}`);

export const pagePath = (page, param) => (param ? `#/${page}/${param}` : `#/${page}`);

export const driverRegisterPath = () => '#/drivers/register';

export function useHashRoute() {
  const [route, setRoute] = useState(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  /** Navigate to a hash; `replace` avoids adding a history entry (redirects). */
  const navigate = useCallback((hash, { replace = false } = {}) => {
    if (replace) {
      window.history.replaceState(null, '', hash);
      setRoute(parse(hash));
    } else if (window.location.hash === hash) {
      setRoute(parse(hash));
    } else {
      window.location.hash = hash;
    }
  }, []);

  return { route, navigate };
}
