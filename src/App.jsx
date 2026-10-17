import { useEffect, useMemo, useRef } from 'react';
import { BookingProvider } from './booking/BookingContext.jsx';
import { RouterContext } from './booking/RouterContext.jsx';
import { useHashRoute } from './hooks/useHashRoute.js';
import { content } from './content/index.js';
import HomePage from './pages/HomePage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

const CONTENT_PAGES = ['about', 'services', 'contact'];

export default function App() {
  const { route, navigate } = useHashRoute();
  const router = useMemo(() => ({ route, navigate }), [route, navigate]);
  // Last route the focus/scroll effect handled; null on initial load. Comparing
  // routes (not a first-render flag) keeps StrictMode's double effect run in
  // development from treating the initial load as a navigation.
  const lastRoute = useRef(null);

  // Page title for every route.
  useEffect(() => {
    document.title = content.pages.titles[route.page] || content.pages.titles.home;
  }, [route.page]);

  // Content pages: start at the top (or at the requested service), and move
  // focus to the page heading after in-app navigation so screen-reader and
  // keyboard users land on the new page.
  useEffect(() => {
    const key = `${route.page}/${route.param || ''}`;
    const previous = lastRoute.current;
    lastRoute.current = key;
    if (previous === key) return;
    const isFirst = previous === null;
    if (!CONTENT_PAGES.includes(route.page)) return;
    const target = route.page === 'services' && route.param ? document.getElementById(`service-${route.param}`) : null;
    if (target) target.scrollIntoView({ block: 'start' });
    else window.scrollTo({ top: 0 });
    if (!isFirst) document.querySelector('main h1')?.focus({ preventScroll: true });
  }, [route.page, route.param]);

  let page;
  if (route.page === 'book') page = <BookingPage step={route.step} />;
  else if (route.page === 'about') page = <AboutPage />;
  else if (route.page === 'services') page = <ServicesPage />;
  else if (route.page === 'contact') page = <ContactPage topic={route.param} />;
  else page = <HomePage anchor={route.anchor} />;

  return (
    <RouterContext.Provider value={router}>
      <BookingProvider>{page}</BookingProvider>
    </RouterContext.Provider>
  );
}
