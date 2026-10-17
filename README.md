# taxi-den — Taxi Den Bosch website

React + Vite frontend for Taxi Den Bosch (Snel Taxi): the public homepage
and a four-step booking flow. Public site only. Customer and driver dashboards,
dispatch, pricing and payments belong to later phases.

## Commands

Requires Node.js 18+ (tested on Node 22).

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:5173
npm run check:assets  # verify every image import points to a real file
npm run build      # asset check, then production build into dist/
npm run preview    # serve the production build locally
```

`dist/` is a static site that works on any static host. Booking pages use hash
URLs (`#/book/offers`), so no server rewrite rules are needed.

## Environment variables

Copy `.env.example` to `.env.local`. Every variable is optional and the
defaults are safe.

| Variable | Default | Purpose |
|---|---|---|
| `VITE_BOOKING_MODE` | `mock` | `mock` sends nothing anywhere. `api` uses the real adapter, which is **not implemented yet** and fails visibly. |
| `VITE_BOOKING_API_URL` | empty | Public base URL of the client's booking API. |
| `VITE_CUSTOMER_PORTAL_URL` | `https://www.taxidenbosch.eu` | Base URL for the customer login and registration links. |
| `VITE_CUSTOMER_LOGIN_URL` / `_REGISTER_URL` | `<portal>/login`, `<portal>/register` | Override the individual links. |
| `VITE_CONTACT_MODE` | `handoff` | `handoff` opens the visitor's email app or WhatsApp with the message ready. `api` uses `submitContactMessage`, which is **not implemented yet**. |
| `VITE_GOOGLE_PLAY_URL` | empty | Snel Taxi app on Google Play. The button is hidden until this is set. |

## Routes

| URL | Page |
|---|---|
| `#top` / no hash | Homepage (hero with the booking card, then the sections) |
| `#/about` | About |
| `#/services` | Services; `#/services/<slug>` scrolls to one service (`local`, `airport`, `business`, `events`, `groups`, `tours`) |
| `#/contact` | Contact; `#/contact/<topic>` presets the subject (e.g. `business`, `events`, `tours`) |
| `#/book/<step>` | Booking flow: `luggage`, `offers`, `travel`, `contact`, `done` |

The header (Home, Services, About, Contact) marks the current page with
`aria-current="page"` on desktop and in the mobile menu. Each route sets its
own document title. After in-app navigation, focus moves to the new page's
`<h1>`.

## Structure

```
design-reference/           Approved v2 homepage design (sections below the hero)
public/
  favicon.svg
assets/originals/           Untouched original image files (archive, not deployed)
scripts/check-assets.mjs    Build-time check that image imports exist
src/
  images/                   Image files imported by components (see "Images")
  App.jsx                   Hash router: homepage or booking page
  config.js                 Reads VITE_* env vars
  content/en.js             ALL copy, including image alt text (imageAlt)
  data/vehicles.js          Vehicle classes + passenger capacity (confirm with client)
  lib/
    booking.js              Initial state, per-step validation, request mapping
    contact.js              Contact validation, hand-off URLs
  booking/
    BookingContext.jsx      Shared flow state (kept across steps, saved for the tab session)
    RouterContext.jsx
  hooks/                    useHashRoute, useGeolocation
  pages/
    HomePage.jsx            Hero (with booking entry) + all homepage sections
    BookingPage.jsx         Progress band, step, journey summary, step guards
    AboutPage.jsx           Hero, introduction + key facts, principles, photos, CTA
    ServicesPage.jsx        Hero, six service cards with real actions, help CTA
    ContactPage.jsx         Compact hero, contact details, form, location
  components/
    layout/                 Header (overlay/solid, active page), AccountMenu, Footer,
                            Logo, PageLayout, SkipLink
    PageHero.jsx            Image-led hero for content pages (large/medium/compact)
    ServiceCard.jsx         One service card, shared by homepage and Services page
    CtaBand.jsx             Dark closing call-to-action panel
    ContactForm.jsx         Contact form (hand-off or API mode)
    booking/                EntryCard, Progress, StepShell, TripSummary,
                            VehicleArt, BookingDone, steps/Step{Luggage,Offers,Travel,Contact}
    ui/                     Field, Icon, Media, NumberStepper, SegmentedControl, SectionHeading
  services/booking/         bookingService → mockAdapter | apiAdapter (integration point)
  services/contact/         contact mode + submitContactMessage (integration point)
  lib/contact.js            Contact validation, mailto / WhatsApp hand-off URLs
  styles/                   base (tokens), components, header-hero, sections, booking, pages
qa/                         Browser test scripts
```

## Phase 1 features

**Hero and navigation**
- The hero is built around a single photo: one full-bleed image with a
  controlled dark gradient, a short headline, three trust points, and the
  booking card beside the image. On phones and tablets the headline and card
  stack, and the form starts within the first screen.
- The header is compact: brand, five links, the 24/7 phone number, an
  **Account** menu and a gold **Book a Taxi** button. Below 1080px it switches
  to Call plus Menu; the menu includes all the account links. Escape closes the
  menus and returns focus.
- Account entry points:
  - **Customer log in** and **Create an account** go to the existing customer
    pages on the live site (`/login`, `/register`).
  - **Driver login** goes to the Snel Taxi app, because that is where the live
    site sends drivers; there is no driver web portal.
  - **Become a driver** opens an email to the company.
  - Each link says where it leads. No fake login or registration was built.

**Booking entry (hero card)**
- Pickup, with "Use my location"; destination, with swap; an optional stop.
- **Now** (as soon as possible) or **Schedule**, with date and time. A
  scheduled pickup must be at least 15 minutes ahead.
- Continue validates the fields and opens step 1.

**Four-step flow**, matching the steps of the current live site:

1. **Luggage:** a yes/no choice card.
2. **Offers:**
   - a passenger counter (1–7)
   - four vehicle classes from the live site: Standard, Luxury Car,
     Electric Car, Taxi Van
   - passenger rule: the cars take up to 4 and the van up to 7; vehicles
     that are too small are disabled with an explanation, and an invalid
     selection is cleared with a notice
   - **"Fare on request"**, because no fares are calculated online yet
3. **Travel information:**
   - an outbound journey summary
   - a return journey switch, with return date and time that must come after
     the outward pickup (the live site labels this toggle "Revenue", a
     mistranslation)
   - optional flight number, format-checked
   - optional comments (500 characters, with a live counter)
4. **Contact details:**
   - first name, last name, WhatsApp number and email, all validated
   - "booking as a guest" label
   - log-in and create-account links
   - notice that online booking is not connected yet

Across the flow:
- The progress bar shows completed steps (links back), the current step and
  upcoming steps; on phones it's a compact "Step 2 of 4" with dots.
- Values are kept when going back, through the browser Back button, via
  progress links, and after a page refresh.
- Deep links can't skip unfinished steps, and the done page requires a
  submission.
- The journey summary is a sticky side card on desktop and a collapsible
  panel on mobile.
- Focus moves to each step's heading on arrival and to the first invalid
  field on errors. There's a loading state for the offers list (skeleton)
  and for sending (spinner), with clear error messages and a retry.
- The **Done** screen is labelled TEST MODE and says nothing was sent.

## About, Services and Contact pages

All copy comes from content the site already had: the services, why-us,
local-taxi, FAQ and contact sections. It's in `content/en.js` under
`pages`. Nothing in the design mockup's placeholders was used: not its phone
number, `info@` email, "10+ years" or founding story, and there are no
testimonials, statistics or prices.

- **About:**
  - hero with Book a Taxi and View Our Services
  - introduction and a key-facts card (based in 's-Hertogenbosch, available
    24/7, drivers speak Dutch and English, cash, card or billing on account)
  - four principles: reliable journeys, professional service, comfortable
    travel, convenient booking
  - two photo slots with captions
  - closing call to action
- **Services:**
  - six cards: local, airport, business, events, groups, tours
  - tags shown only where the content backs them up: airports served,
    "Up to 7 passengers", "Billing on account"
  - there are no detail pages, so each card leads somewhere real: bookable
    services go to the booking card; business, events and tours open the
    Contact page with the subject preset
  - a "Not sure which service you need?" panel with call, WhatsApp and
    message options
- **Contact:**
  - compact hero, a "need a taxi now? call" line, then phone (`tel:`),
    WhatsApp (verified `wa.me` link), email (`mailto:`), opening hours and
    head office
  - the form: name, email, optional phone, subject and message, with visible
    labels, inline errors, focus on the first error and a character counter
  - two columns on desktop, one column on mobile, with the contact details
    first
  - **No embedded map:** the published address has no house number, so the
    page links to a Google Maps search for it rather than placing a pin that
    can't be verified.

### Contact form status

There is **no contact backend**. In the default `handoff` mode, a valid
message opens the visitor's own email app (sent to
Sneltaxidenbosch@hotmail.com) or WhatsApp (+31 6 4447 9990). The message,
name, email, phone and subject are filled in, and the visitor presses Send
there. The page says so before and after, including "Nothing has been sent
from this website", and offers a link to try again. To connect a real
endpoint, implement `submitContactMessage` in `src/services/contact/index.js`
and set `VITE_CONTACT_MODE=api`. The form then shows one Send button with
sending, sent and failed states, and reports success only when the server
confirms it.

## Integration points (later phases)

1. **`src/services/booking/apiAdapter.js`**
   - `getOffers()` returns vehicle classes and fares quoted by the API. Never
     calculate fares in the browser; weekend surcharges and commission belong
     in the backend.
   - `submitBookingRequest()` sends the booking and returns the API's
     reference.
   - Then set `VITE_BOOKING_MODE=api` and `VITE_BOOKING_API_URL`.
2. **`src/components/booking/BookingDone.jsx`:** change the copy to what the
   API actually confirms, and show `result.reference`.
3. **`src/data/vehicles.js`:** align vehicle ids and capacities with the API,
   or load them from `getOffers()`.
4. **Account links:** point the `VITE_CUSTOMER_*` variables at the new
   customer portal once it exists. Add a driver portal link to
   `AccountMenu.jsx` when the driver dashboard is built.
5. **"Use my location"** currently fills coordinates. Add reverse geocoding
   and address autocomplete once a provider is chosen.
6. **FAQ** (`content/en.js`): remove "online booking … not yet connected"
   when it goes live.

## Images

**Each component imports the photo it renders from `src/images/`.** Vite
bundles and fingerprints that file. Alt text stays in `content/en.js` as
`imageAlt`, because it is translated copy. There is no image registry and no
image path in the content file.

```jsx
// src/sections/Hero.jsx
import Media from '../components/ui/Media.jsx';
import heroImage from '../images/home-hero.webp';

<Media
  src={heroImage}
  alt={t.imageAlt}
  tone="dark"
  className="hero__media"
  eager
/>
```

`src/images/home-hero.webp` is a module import, not a browser URL. Do not
write `src="/src/images/home-hero.webp"`.

### Replacing an image

1. Put the new file in `src/images/`, named in lowercase with hyphens.
2. Change the import filename in the component that shows it.
3. If the picture changed, update `imageAlt` in `src/content/en.js`.
4. Run `npm run build`. The asset check runs first and fails if an import
   points at a missing file, including wrong letter case.

Leaving `src` off `<Media>` shows the design's placeholder slot. During
development a broken file is outlined in red, and in every environment it is
logged as an error, never silently hidden.

### Folder structure and where each image is used

```
src/images/
  home-hero.webp                    Homepage hero (sections/Hero.jsx)
  local-taxi.webp                   Service card: Local taxi (home + Services page)
  airport-transfers.webp            Service card: Airport transfers
  business-transport.webp           Service card: Business & executive
  wedding-transport.webp            Service card: Weddings & events
  group-transport.webp              Service card: Group transport & taxi vans
  private-tours.webp                Service card: Private tours
  airport-transfers-feature.webp    Homepage: Airport transfers section
  local-taxi-feature.webp           Homepage: Local taxi section
  booking-app.webp                  Homepage: Snel Taxi app section
  city-at-night.webp                available, not imported
  eindhoven-airport.webp            available, not imported
  schiphol-airport.webp             available, not imported
```

No photo file exists yet, so these show placeholders. Import one in the page
when a real photo is available:
- About hero (`pages/AboutPage.jsx`): the client's black Mercedes
- Services hero (`pages/ServicesPage.jsx`)
- Contact hero (`pages/ContactPage.jsx`): `city-at-night.webp` is available
- About page driver photo and fleet photo (`pages/AboutPage.jsx`)

Other static assets:
- **Fonts:** Manrope, from the `@fontsource/manrope` npm package. Vite bundles
  and hashes it, with no request to Google.
- **Icons:** inline SVG in `components/ui/Icon.jsx`.
- **Logo:** the gold "TDB" mark, drawn in CSS (no logo file exists yet).
- **Favicon:** `public/favicon.svg`.
- **Vehicle drawings** on the offers step: inline SVG.
- There are no CSS background images. If you add one, import the file
  (`import photo from '../images/….webp'`) and use that URL. Do not point CSS
  at `/src/images/…`.

### About these images

- The seven `.webp` files made from the 1774×887 PNG originals are
  **generated promotional images**: the hero, the airport, wedding and group
  services, the airport section, the app, and the city-at-night image. They
  are not photos of the client's own vehicle, so replace them with real fleet
  photos when available.
- The others came from photos (JPEG/WebP with camera data). **Note:**
  `services/local-taxi.webp` shows **London taxis with UK number plates**,
  which may confuse visitors on a Den Bosch local-taxi card.
- The served files are WebP copies at quality 82, at most 1600–2000px wide:
  22.7 MB of originals became 2.6 MB. Components import those WebP files from
  `src/images/`. The untouched originals are kept in `assets/originals/`
  (and a copy under `src/assets/images/`) under their original names. Those
  folders are not imported, so nothing there is deployed.

## Testing

`qa/pages.py <url>` runs 89 checks on the About, Services and Contact pages:
- every page has the right `<h1>` and title, exactly one active nav item
  (also in the mobile menu), and only valid routes in its links
- no mockup placeholders, no broken images, no prices
- navigation, browser Back, focus on the new heading, and footer deep links
  to a single service
- each service card's action, including the preset subject on Contact
- `tel:`, `mailto:` and WhatsApp links
- every form rule, the WhatsApp and email hand-off links and their content,
  the honest status message, and edit keeping the values
- the skip link, mobile order (details before the form), touch-target sizes
- no horizontal scroll from 320px to 1920px
- no console errors

Results: **89/89** on the dev server and on the production build, plus the
existing suite below.


`qa/interactions.py <url>` runs 101 browser checks:
- **Homepage, menus and accessibility:**
  - anchors, mobile and account menus (links, Escape, focus return, outside
    click), FAQ
  - skip link and visible focus, names on every control, touch-target sizes
- **Entry card:** every validation rule, location, swap, stop, now or
  schedule, lead time.
- **Steps:** each step's validation, the passenger and vehicle rules, the
  return-trip rules, flight format, comment counter, contact validation,
  loading and done states.
- **Navigation:** values kept on Back, browser Back, progress links and
  refresh; deep-link guards; header links from the booking page.
- **Layout:** no horizontal scroll from 320px to 1920px on the homepage and
  every step.
- **Errors:** no console errors and no failed requests.

Results: **101/101** on both the dev server and the production build. The
`api` setting was checked separately: the offers step shows an error with a
retry button and the phone number, and the visitor can't continue.

`qa/compare_design.py` screenshots the original v2 design next to the app.
The hero now intentionally differs from that design.

**Not tested:** Safari, Firefox, real phones, screen readers, a real
geolocation prompt (it was simulated) and any real API, since none exists yet.
