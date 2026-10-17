import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// Self-hosted Manrope (no request to Google Fonts; unicode-range subsets mean
// browsers only download the glyph ranges a page actually uses).
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-ext-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-ext-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-ext-600.css';
import '@fontsource/manrope/latin-700.css';
import '@fontsource/manrope/latin-ext-700.css';
import '@fontsource/manrope/latin-800.css';
import '@fontsource/manrope/latin-ext-800.css';
import './styles/base.css';
import './styles/components.css';
import './styles/header-hero.css';
import './styles/sections.css';
import './styles/booking.css';
import './styles/pages.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
