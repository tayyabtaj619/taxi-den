# Taxi Den Bosch — website

Production React frontend for the approved **Taxi Den Bosch Homepage v2** design
(`design-reference/Taxi Den Bosch Homepage v2.dc.html`). Public homepage only:
no admin, driver or app features.

## Commands

Requires Node.js 18+ (tested on Node 22).

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

`dist/` is a static site: deploy it to any static host (Netlify, Vercel,
Cloudflare Pages, Nginx…). No server-side rendering is required.

## Environment variables

Copy `.env.example` to `.env.local`. All are optional; the defaults are safe.

| Variable | Default | Purpose |
|---|---|---|
| `VITE_BOOKING_MODE` | `mock` | `mock` sends nothing anywhere. `api` uses the real adapter, which is **not implemented yet** and fails with a clear error. |
| `VITE_BOOKING_API_URL` | empty | Public base URL of the client's booking API. |
| `VITE_GOOGLE_PLAY_URL` | empty | Snel Taxi app on Google Play. The button is hidden until this is set. |

`VITE_*` values are bundled into public JavaScript. Never put API keys or
secrets in them.

## Project structure

```
design-reference/          Approved design + its runtime (source of truth)
public/favicon.svg
src/
  main.jsx                 Entry: fonts, global CSS, <App/>
  App.jsx                  Section order, as in the design
  config.js                Reads VITE_* env vars
  content/
    en.js                  ALL copy, contact details, FAQ, alt texts
    index.js               Locale switch point (add nl.js later)
  styles/
    base.css               Design tokens (colours, spacing, radii), resets, focus
    components.css         Buttons, headings, media slots, form controls
    sections.css           Header → footer, in page order, with breakpoints
  components/
    layout/                Header (desktop nav + mobile menu), Footer, Logo
    ui/                    Field, SegmentedControl, SectionHeading, Media
    booking/               BookingForm, BookingSummary
  sections/                Hero, Booking, Services, WhyChoose, Airport,
                           LocalTaxi, Reviews, AppPromo, Faq, Contact
  hooks/useBookingForm.js  Form state machine (idle → loading → done/error)
  lib/booking.js           Pure validation, request mapping, date formatting
  services/booking/
    index.js               bookingService — the only thing the UI calls
    mockAdapter.js         Default: simulates a delay, sends nothing
    apiAdapter.js          ⚠ Integration point — not implemented
    types.js               BookingRequest / BookingResult shapes (JSDoc)
qa/                        Browser test scripts (see "Testing")
```

## What's implemented

- Every section of the design, in its order: header, hero, booking form,
  services (local, airport – Eindhoven and Schiphol, business, weddings and
  events, groups and vans, private tours), the dark "why" panel, airport
  transfers, local taxi, reviews, app, FAQ, final CTA and contact, footer.
- The design's tokens: black, white and gold palette, Manrope 400–800 (self-hosted),
  spacing, radii and type scale.
- Responsive layout as designed: compact header and mobile menu below
  1080px, `auto-fit` grids, `clamp()` type and spacing. Mobile refinements
  that keep the design's look:
  - full-width hero CTAs, trip toggle and submit button
  - two-column footer links
  - logo mark only below 360px, so the header doesn't overflow
- Booking form:
  - one-way or return
  - pickup and destination, with swap and "use current location"
  - an optional stop
  - date and time, with past dates blocked and a 15-minute minimum lead time
  - return date and time, which must come after the outward trip
  - 1–7 passengers, with a vehicle note from 5 passengers
  - luggage yes/no
  - inline errors, a form-level alert and focus moved to the first error
  - loading, error and success states
- FAQ accordion: one item open at a time, first open by default, `aria-expanded`
  and `hidden` panels.
- Mobile menu with Escape to close (focus returns to the toggle) and auto-close
  when a link is chosen.
- Accessibility:
  - semantic landmarks and headings
  - labels on every control and `fieldset`/`legend` for luggage
  - gold `:focus-visible` ring and a skip link
  - `prefers-reduced-motion` respected
- Dev-only notes from the design (photo captions, the "reviews pending" box,
  "Google Play link to be confirmed") show in `npm run dev` and are removed in
  production builds.

## Booking API integration

The form never computes fares and never claims a booking was made. Until the
client supplies an API, `mock` mode validates input and shows a summary
labelled **TEST MODE** that says nothing was sent. The design's "online booking
is not yet connected" notice is shown under the form.

To connect the real API:

1. **`src/services/booking/apiAdapter.js` → `submitBookingRequest`.**
   Map `BookingRequest` to the API's documented body. Field names, date format
   and time zone (Europe/Amsterdam) must come from the API docs. Return only
   values the API returns (reference, quoted fare). If the API needs
   credentials, call it through the client's own server; never put keys in
   the browser.
2. **`.env.local`:** set `VITE_BOOKING_MODE=api` and `VITE_BOOKING_API_URL`.
   This also hides the "not yet connected" notice (`bookingService.isLive`).
3. **`src/components/booking/BookingSummary.jsx`:** change the confirmation
   copy to match what the API actually confirms ("request received" or
   "booking confirmed") and show any reference it returns.
4. **`src/content/en.js`:** remove the FAQ sentence saying online booking
   isn't connected yet.
5. **Optional:** add address autocomplete and reverse geocoding for "use
   current location" (it currently fills coordinates) once the client chooses
   a provider.

## Dutch localisation

All text is in `src/content/en.js`. Create `nl.js` with the same shape, pick
the locale in `src/content/index.js`, and set `<html lang>`. No component
changes are needed.

## Before going live: client to supply

- **Photography.** The design specifies 10 photo slots with captions and
  sizes; no image files were included. Add each `src` (with `srcSet`/`sizes`)
  to the matching `image` object in `content/en.js`. The `Media` component
  then renders a lazy-loaded `<img>` with the existing alt text; the hero
  loads eagerly. Use WebP/AVIF. The hero is 2400×1400.
- **Reviews.** Hidden in production until genuine, attributable reviews are
  added to `reviews.items`.
- **Google Play URL** (`VITE_GOOGLE_PLAY_URL`).
- **Booking API documentation** (see above).
- **Content check.** All business details come from the approved design. Ask
  the client to confirm them before launch:
  - phone, WhatsApp, email and address
  - vehicle models
  - payment options
  - Maastricht Airport route
  - fixed fares for NL/BE/DE

## Testing

`qa/` contains Playwright scripts used during development
(`pip install playwright && playwright install chromium`):

- `qa/interactions.py <url>` runs 45 checks:
  - anchors, mobile menu, FAQ, keyboard focus and control names
  - every validation rule, loading, success and edit states
  - horizontal overflow from 320px to 1920px
  - console errors and failed requests
- `qa/compare_design.py <out_dir> [widths]` screenshots the design reference
  (served on :4100) and the app (on :4200) side by side.

Not tested: real devices, Safari/Firefox (Chromium only), screen readers, the
real geolocation prompt (simulated), and any real API (none exists yet).
