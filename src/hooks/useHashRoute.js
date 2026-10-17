import { useCallback, useEffect, useState } from 'react';

// Minimal hash router (no dependency, works on any static host).
//   #/book/<step>        booking flow
//   #/about              About page
//   #/services[/<slug>]  Services page, optionally scrolled to a service
//   #/contact[/<topic>]  Contact page, optionally with a subject preselected
//   anything else        homepage; a plain hash (#services) is an in-page anchor

export const PAGES = ['about', 'services', 'contact'];

export function parse(hash) {
  const h = hash || '';
  const book = h.match(/^#\/book(?:\/([a-z-]+))?\/?$/);
  if (book) return { page: 'book', step: book[1] || 'luggage', param: null, anchor: null };
  const page = h.match(/^#\/([a-z]+)(?:\/([a-z0-9-]+))?\/?$/);
  if (page && PAGES.includes(page[1])) return { page: page[1], step: null, param: page[2] || null, anchor: null };
  if (h.startsWith('#/')) return { page: 'home', step: null, param: null, anchor: null };
  return { page: 'home', step: null, param: null, anchor: h.length > 1 ? h.slice(1) : null };
}

export const bookPath = (step) => `#/book/${step}`;
export const pagePath = (page, param) => (param ? `#/${page}/${param}` : `#/${page}`);

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
