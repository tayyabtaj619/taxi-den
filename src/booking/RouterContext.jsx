import { createContext, useContext } from 'react';

/** Exposes { route, navigate } from useHashRoute to deep components. */
export const RouterContext = createContext({ route: { page: 'home' }, navigate: () => {} });
export const useRouter = () => useContext(RouterContext);
