// English site copy. All user-facing text lives here so a Dutch file (nl.js)
// with the same shape can be added later without touching components.
// Source: approved design "Taxi Den Bosch Homepage v2". Do not add reviews,
// fares, discounts or guarantees that are not verified with the client.

export const contact = {
  phoneDisplay: "073 234 0600",
  phoneHref: "tel:+31732340600",
  whatsappDisplay: "+31 6 4447 9990",
  whatsappHref: "https://wa.me/31644479990",
  email: "Sneltaxidenbosch@hotmail.com",
  addressLines: ["Klokkenlaan", "5231 BE Den Bosch"],
  appStoreUrl: "https://apps.apple.com/app/snel-taxi/id6476443399",
};

const en = {
  locale: "en-GB",
  brand: {
    name: "TAXI DEN BOSCH",
    sub: "SNEL TAXI",
    mark: "TDB",
    homeLabel: "Taxi Den Bosch, back to the homepage",
  },

  nav: {
    label: "Main navigation",
    mobileLabel: "Mobile navigation",
    links: [
      { href: "#services", label: "Services" },
      { href: "#airport", label: "Airport Transfers" },
      { href: "#business", label: "Business Transport" },
      { href: "#about", label: "About" },
      { href: "#contact", label: "Contact" },
    ],
    available: "AVAILABLE 24/7",
    book: "Book a Taxi",
    call: "Call",
    callLabel: `Call ${contact.phoneDisplay}`,
    menu: "Menu",
    close: "Close",
  },

  hero: {
    eyebrow: "TAXI DEN BOSCH · AVAILABLE AROUND THE CLOCK",
    title: "Reliable Taxi Service. Whenever You Need It.",
    body: "Book reliable taxi transport in Den Bosch and beyond. From local journeys and airport transfers to business travel and group transport, we're here to help you reach your destination comfortably.",
    ctaBook: "Book a Taxi",
    ctaCall: `Call Us · ${contact.phoneDisplay}`,
    points: [
      "Available 24/7",
      "Transparent fares, no hidden costs",
      "Trained, professional drivers",
    ],
    image: {
      src: "../src/assets/images/Hero section.png",
      alt: "Black taxi at night in the centre of Den Bosch",
      caption: "hero photo: taxi / executive transport, 2400×1400",
    },
  },

  booking: {
    title: "Plan Your Journey",
    tripLabel: "Trip type",
    oneWay: "One-Way",
    return: "Return",
    pickup: "Pickup Location",
    pickupPlaceholder: "e.g. 's-Hertogenbosch Central Station",
    useLocation: "Use current location",
    locating: "Locating…",
    destination: "Destination",
    destinationPlaceholder: "e.g. Eindhoven Airport",
    swap: "⇄ Swap",
    swapLabel: "Swap pickup location and destination",
    stop: "Stop",
    stopPlaceholder: "Address of the stop",
    addStop: "+ Add a Stop",
    removeStop: "Remove stop",
    date: "Pickup Date",
    time: "Pickup Time",
    passengers: "Number of Passengers",
    passengerOption: (n) => `${n} ${n === 1 ? "passenger" : "passengers"}`,
    luggage: "Luggage",
    yes: "Yes",
    no: "No",
    returnDate: "Return Date",
    returnTime: "Return Time",
    largeGroup:
      "For 5 to 7 passengers we plan a spacious vehicle such as the Mercedes Vito or V-Class.",
    notConnected:
      "Development version: online booking is not yet connected. Your request will not be sent to Taxi Den Bosch and no fare will be calculated.",
    submit: "Calculate Fare & Book",
    loading: "Checking details…",
    errors: {
      pickup: "Please enter a pickup location.",
      dest: "Please enter a destination.",
      sameAddress: "The destination must differ from the pickup location.",
      stop: "Please enter the stop address, or remove the stop.",
      date: "Please choose a pickup date.",
      dateInvalid: "Please enter a valid date.",
      time: "Please choose a pickup time.",
      tooSoon: "Please choose a time at least 15 minutes from now.",
      rdate: "Please choose a return date.",
      rtime: "Please choose a return time.",
      returnBefore: "The return must be after the outward pickup.",
      form: "Please check the highlighted fields.",
      failed: `Something went wrong. Please try again or call ${contact.phoneDisplay}.`,
      geoUnsupported: "Your browser does not support location access.",
      geoFailed: "We could not access your location. Please enter an address.",
    },
    currentLocation: (lat, lng) => `Current location (${lat}, ${lng})`,
    done: {
      badge: "TEST MODE",
      title: "Your journey details are valid",
      // Split into parts so BookingSummary can render real links between them.
      mock: {
        before: "This is a development version. Your request has ",
        strong: "not",
        afterStrong:
          " been sent to Taxi Den Bosch and no journey has been booked. Call ",
        beforeLink: " or send a ",
        link: "WhatsApp message",
        after: " to book now.",
      },
      from: "From",
      to: "To",
      pickup: "Pickup",
      trip: "Trip",
      paxLug: "Passengers · luggage",
      via: (stop) => ` (via ${stop})`,
      oneWay: "One-way",
      returnAt: (when) => `Return · ${when}`,
      withLuggage: "with luggage",
      noLuggage: "no luggage",
      call: `Call ${contact.phoneDisplay}`,
      edit: "Edit Journey",
    },
  },

  services: {
    eyebrow: "OUR SERVICES",
    title: "Transport for every journey, in Den Bosch and beyond",
    intro:
      "From a short trip across town to a group outing or your wedding day. Every service can be booked online, by phone or via WhatsApp.",
    items: [
      {
        id: "local-card",
        title: "Local Taxi Services",
        body: [
          "Taxi journeys within Den Bosch and the surrounding area, with convenient booking and experienced drivers who speak Dutch and English.",
        ],
        links: [{ href: "#local", label: "Local taxi service →" }],
        image: {
          src: "../src/assets/images/local.jpg",
          alt: "Taxi in a Den Bosch city street",
          caption: "photo: taxi in Den Bosch",
        },
      },
      {
        id: "airport-card",
        title: "Airport Transfers",
        body: [
          "Pre-booked, door-to-door transport to and from the airport, for holidays and business trips alike.",
        ],
        links: [
          { href: "#airport", label: "Eindhoven Airport →" },
          { href: "#airport", label: "Amsterdam Schiphol Airport →" },
        ],
        image: {
          src: "../src/assets/images/Airport Transfers.png",
          alt: "Taxi at an airport departure hall",
          caption: "photo: airport departures",
        },
      },
      {
        id: "business",
        title: "Business & Executive Transport",
        body: [
          "Professional transport for appointments, corporate travel and executive journeys, with qualified drivers in a Mercedes E-Class, Mercedes V-Class or VW Sharan.",
          "Pay in cash or by card, or ask about billing on account.",
        ],
        links: [{ href: "#contact", label: "Enquire about business travel →" }],
        image: {
          src: "../src/assets/images/business transport.jpg",
          alt: "Business traveller stepping into a black Mercedes",
          caption: "photo: executive transport",
        },
      },
      {
        id: "weddings",
        title: "Wedding & Event Transport",
        body: [
          "Transport for your wedding day or special occasion, from collecting the wedding party to taking guests to the reception. Tell us what you need and we'll plan it with you.",
        ],
        links: [{ href: "#contact", label: "Plan your event transport →" }],
        image: {
          src: "../src/assets/images/Wedding transport.png",
          alt: "Decorated car for a wedding",
          caption: "photo: wedding transport",
        },
      },
      {
        id: "groups",
        title: "Group Transport & Taxi Vans",
        body: [
          "Spacious vehicles such as the Mercedes Vito and V-Class for company outings, family celebrations, a group trip to Schiphol or a ride home after a party.",
        ],
        links: [{ href: "#book", label: "Book group transport →" }],
        image: {
          src: "../src/assets/images/Group transport.png",
          alt: "Mercedes V-Class taxi van",
          caption: "photo: taxi van / V-Class",
        },
      },
      {
        id: "tours",
        title: "Private Tours",
        body: [
          "Discover the history, culture and hidden corners of Den Bosch and the surrounding area with an experienced driver who knows the city, on a route shaped around your interests.",
        ],
        links: [{ href: "#contact", label: "Ask about a private tour →" }],
        image: {
          src: "../src/assets/images/Private tours in Den Bosch.jpg",
          alt: "Historic centre of Den Bosch",
          caption: "photo: Den Bosch old town",
        },
      },
    ],
  },

  why: {
    eyebrow: "WHY TAXI DEN BOSCH",
    title: "A Better Way to Travel",
    intro:
      "Taxi Den Bosch (Snel Taxi) provides taxi transport from 's-Hertogenbosch to destinations across the Netherlands and beyond, for both personal and business travel.",
    items: [
      {
        badge: "24/7",
        title: "Available 24/7",
        body: "An early flight or a late night out: you can book a taxi at any hour, seven days a week.",
      },
      {
        badge: "02",
        title: "Professional Drivers",
        body: "Trained, experienced and well-presented drivers who speak Dutch and English and are happy to help with your luggage.",
      },
      {
        badge: "03",
        title: "Comfortable Vehicles",
        body: "Clean, well-maintained cars from Mercedes and Volkswagen, including the spacious Mercedes V-Class and Vito.",
      },
      {
        badge: "04",
        title: "Transparent Pricing",
        body: "Clear fares with no hidden costs afterwards, and fixed fares to many destinations in the Netherlands, Belgium and Germany.",
      },
      {
        badge: "05",
        title: "Convenient Booking",
        body: `Book or enquire through the website, by phone on ${contact.phoneDisplay}, via WhatsApp or with the Snel Taxi app.`,
      },
      {
        badge: "06",
        title: "Personal & Business Travel",
        body: "Local journeys, airport transfers, business travel and group transport, all arranged by one local company.",
      },
    ],
  },

  airport: {
    eyebrow: "AIRPORT TRANSFERS",
    title: "Comfortable, Reliable Airport Transfers",
    body: [
      "Plan your airport journey with pre-booked taxi transport from Den Bosch. Arrange a comfortable journey to or from Eindhoven Airport or Amsterdam Schiphol and book ahead for your travel schedule.",
      "Airport journeys are door to door, with fixed fares available for airport routes. Contact us for a fare for your trip.",
    ],
    routes: [
      "Eindhoven Airport",
      "Amsterdam Schiphol Airport",
      "Maastricht Airport",
    ],
    routeCta: "Plan this journey →",
    cta: "Book an Airport Transfer",
    image: {
      src: "../src/assets/images/Airport transfer.png",
      alt: "Driver loading suitcases into the boot",
      caption: "photo: driver with luggage",
    },
  },

  local: {
    eyebrow: "LOCAL TAXI",
    title: "Your Local Taxi in Den Bosch",
    body: [
      "Whether you're travelling across Den Bosch, heading to a hotel or station, or arranging a journey elsewhere in the Netherlands, Taxi Den Bosch provides convenient transport for personal and business travel.",
      "Our drivers are punctual, experienced and know the area well. Fares are clear upfront, with no extra costs afterwards.",
    ],
    ctaBook: "Book a Local Taxi",
    ctaCall: `Call ${contact.phoneDisplay}`,
    image: {
      src: "../src/assets/images/local taxi.jpg",
      alt: "Taxi outside 's-Hertogenbosch Central Station",
      caption: "photo: taxi at Den Bosch station",
    },
  },

  reviews: {
    eyebrow: "CUSTOMER REVIEWS",
    title: "What Our Passengers Say",
    // Empty until genuine, attributable testimonials are confirmed with the client.
    items: [],
    pendingStrong: "Reviews pending verification.",
    pendingBody:
      " Customer reviews will be shown here once genuine, attributable testimonials have been confirmed with Taxi Den Bosch.",
    devNote: "dev note · not shown in production",
  },

  app: {
    eyebrow: "SNEL TAXI APP",
    title: "Book your next ride with the Snel Taxi Den Bosch app",
    body: "Prefer booking from your phone? Download the Snel Taxi app to arrange your taxi journey.",
    appStorePre: "Download on the",
    appStore: "App Store",
    googlePlayPre: "Get it on",
    googlePlay: "Google Play",
    googlePlayPending: "Google Play link to be confirmed",
    image: {
      src: "../src/assets/images/Taxi booking app.png",
      alt: "Snel Taxi app on a phone",
      caption: "app screenshot",
    },
  },

  faq: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    title: "Good to Know",
    introBefore: "Can't find your answer? Call ",
    introMiddle: " or send us a ",
    introLink: "WhatsApp message",
    introAfter: ".",
    items: [
      {
        q: "How can I book a taxi?",
        a: `Use the booking form on this page, call ${contact.phoneDisplay}, send a WhatsApp message to ${contact.whatsappDisplay}, or book through the Snel Taxi app. Online booking on this new website is not yet connected, so please call or WhatsApp us for now.`,
      },
      {
        q: "Can I arrange an airport transfer?",
        a: "Yes. We provide pre-booked transfers to and from Eindhoven Airport and Amsterdam Schiphol Airport, as well as Maastricht Airport. Book ahead so we can plan your journey around your travel schedule.",
      },
      {
        q: "Is Taxi Den Bosch available around the clock?",
        a: "Yes. We are available 24 hours a day, 7 days a week, including early mornings and late evenings.",
      },
      {
        q: "Can I book transport for business travel?",
        a: "Yes. We provide business and executive transport with qualified drivers. Journeys can be paid in cash or by card, and billing on account is also possible. Contact us to discuss the options for your company.",
      },
      {
        q: "Is group transport available?",
        a: "Yes. Our spacious vehicles, such as the Mercedes Vito and V-Class, are suitable for groups of up to 7 passengers, for company outings, family events and other occasions.",
      },
      {
        q: "How can I enquire about a fixed fare?",
        a: "We offer fixed fares to many destinations in the Netherlands, Belgium and Germany. Call or WhatsApp us with your pickup location, destination and travel time, and we will tell you the fare for your journey.",
      },
    ],
  },

  cta: {
    title: "Ready for Your Next Journey?",
    body: "Book your next taxi journey with Taxi Den Bosch. Get in touch to arrange local transport, an airport transfer, or a journey for business or leisure.",
    book: "Book a Taxi",
    call: "Call Us",
    whatsapp: "WhatsApp",
    labels: {
      phone: "TELEPHONE",
      whatsapp: "WHATSAPP",
      email: "EMAIL",
      hours: "OPENING HOURS",
      office: "HEAD OFFICE",
    },
    hours: "24 hours a day, 7 days a week",
  },

  footer: {
    tagline:
      "Snel Taxi Den Bosch. Taxi transport 24 hours a day, 7 days a week.",
    columns: [
      {
        title: "Services",
        links: [
          { href: "#services", label: "All Services" },
          { href: "#airport", label: "Airport Transfers" },
          { href: "#business", label: "Business Transport" },
          { href: "#groups", label: "Group Transport" },
          { href: "#weddings", label: "Weddings & Events" },
          { href: "#tours", label: "Private Tours" },
        ],
      },
      {
        title: "Company",
        links: [
          { href: "#about", label: "About" },
          { href: "#contact", label: "Contact" },
          { href: "#book", label: "Book a Taxi" },
          {
            href: "https://www.taxidenbosch.eu/help-center",
            label: "Help Center",
          },
          {
            href: "https://www.taxidenbosch.eu/privacy-and-policy",
            label: "Privacy Policy",
          },
          {
            href: "https://www.taxidenbosch.eu/terms-of-use",
            label: "Terms of Use",
          },
        ],
      },
    ],
    contactTitle: "Contact",
    whatsappPrefix: "WhatsApp ",
    open: "Open 24/7",
    copyright: (year) => `© ${year} Taxi Den Bosch`,
  },
};

export default en;
