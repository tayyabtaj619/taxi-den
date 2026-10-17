// English site copy. All user-facing text lives here so a Dutch file (nl.js)
// with the same shape can be added later without touching components.
// Source: approved design "Taxi Den Bosch Homepage v2".
//
// IMAGES: every image is an `image: { src, alt }` object next to the copy it
// belongs to. `src` is a root-relative path to a file in public/images/
// (e.g. '/images/hero/home-hero.webp'). To replace an image, add the new file
// to public/images/ and change `src` here; no component changes are needed.
// An empty src ('') shows the design's placeholder slot.
//
// Do not add reviews, fares, discounts or guarantees that are not verified
// with the client.

export const contact = {
  phoneDisplay: '073 234 0600',
  phoneHref: 'tel:+31732340600',
  whatsappDisplay: '+31 6 4447 9990',
  whatsappHref: 'https://wa.me/31644479990',
  email: 'Sneltaxidenbosch@hotmail.com',
  addressLines: ['Klokkenlaan', '5231 BE Den Bosch'],
  appStoreUrl: 'https://apps.apple.com/app/snel-taxi/id6476443399',
};

const en = {
  locale: 'en-GB',
  brand: {
    name: 'TAXI DEN BOSCH',
    sub: 'SNEL TAXI',
    mark: 'TDB',
    homeLabel: 'Taxi Den Bosch, back to the homepage',
  },

  nav: {
    label: 'Main navigation',
    mobileLabel: 'Mobile navigation',
    // `page` drives the active state (aria-current="page").
    links: [
      { href: '#top', label: 'Home', page: 'home' },
      { href: '#/services', label: 'Services', page: 'services' },
      { href: '#/about', label: 'About', page: 'about' },
      { href: '#/contact', label: 'Contact', page: 'contact' },
    ],
    available: 'AVAILABLE 24/7',
    book: 'Book a Taxi',
    call: 'Call',
    callLabel: `Call ${contact.phoneDisplay}`,
    menu: 'Menu',
    close: 'Close',
    account: {
      button: 'Account',
      menuLabel: 'Account options',
      customers: 'Customers',
      drivers: 'Drivers',
      // Customer pages exist on the current live site (taxidenbosch.eu).
      // Drivers have no web portal; the live site points them to the app.
      items: {
        login: { label: 'Customer log in', hint: 'Opens the current customer portal' },
        register: { label: 'Create an account', hint: 'Opens the current customer portal' },
        driverApp: { label: 'Driver login', hint: 'In the Snel Taxi app' },
        driverApply: { label: 'Become a driver', hint: 'Email us to register interest' },
      },
      driverApplySubject: 'Driver registration',
    },
  },

  hero: {
    eyebrow: 'TAXI DEN BOSCH · 24/7',
    title: 'Reliable Taxi Service. Whenever You Need It.',
    body: 'Local journeys, airport transfers and business travel from Den Bosch, with professional drivers and clear fares.',
    callPrefix: 'Prefer to call?',
    points: ['Available 24/7', 'Transparent fares, no hidden costs', 'Trained, professional drivers'],
    // Generated promotional image (not the client's own car). Swap for a real
    // photo of the client's vehicle when available.
    image: {
      src: '/images/hero/home-hero.webp',
      alt: "Black Mercedes taxi on a square in Den Bosch at sunset",
      position: 'center 55%',
      caption: 'home hero · public/images/hero/',
    },
  },

  // Booking entry card in the hero.
  entry: {
    eyebrow: 'BOOK A TAXI',
    title: 'Where are you going?',
    pickup: 'Pickup location',
    pickupPlaceholder: "e.g. 's-Hertogenbosch Central Station",
    useLocation: 'Use my location',
    locating: 'Locating…',
    destination: 'Destination',
    destinationPlaceholder: 'e.g. Eindhoven Airport',
    swapLabel: 'Swap pickup location and destination',
    stop: 'Stop',
    stopPlaceholder: 'Address of the stop',
    addStop: 'Add a stop',
    removeStop: 'Remove',
    when: 'When',
    now: 'As soon as possible',
    nowShort: 'Now',
    later: 'Schedule',
    date: 'Pickup date',
    time: 'Pickup time',
    continue: 'Continue',
    currentLocation: (lat, lng) => `Current location (${lat}, ${lng})`,
  },

  // Multi-step booking flow.
  flow: {
    pageTitle: 'Book your taxi',
    progressLabel: 'Booking progress',
    stepOf: (n, total) => `Step ${n} of ${total}`,
    completed: 'completed',
    steps: {
      luggage: 'Luggage',
      offers: 'Offers',
      travel: 'Travel information',
      contact: 'Contact details',
    },
    back: 'Back',
    continue: 'Continue',
    editJourney: 'Edit journey',

    luggage: {
      title: 'Are you travelling with luggage?',
      intro: 'This helps us plan the right vehicle. Luggage travels free of charge.',
      yes: 'Yes, I have luggage',
      yesHint: 'Suitcases, bags or other items',
      no: 'No luggage',
      noHint: 'Hand luggage or nothing to carry',
    },

    offers: {
      title: 'Choose your vehicle',
      passengers: 'Passengers',
      decrease: 'Fewer passengers',
      increase: 'More passengers',
      upTo: (n) => `Up to ${n} passengers`,
      tooMany: (n) => `Seats up to ${n}. Choose the taxi van for larger groups.`,
      select: 'Select',
      selected: 'Selected',
      fareOnRequest: 'Fare on request',
      fareNote: 'Fares are not calculated online yet. We confirm your fixed fare before the journey.',
      loading: 'Loading vehicles…',
      loadError: `We could not load the vehicles. Please try again or call ${contact.phoneDisplay}.`,
      retry: 'Try again',
      deselected: 'Your previous vehicle does not seat this many passengers, so please choose again.',
    },

    travel: {
      title: 'Travel information',
      returnTrip: 'Book a return journey',
      returnHint: 'We pick you up again for the journey back',
      outbound: 'Outbound journey',
      passengers: (n) => `${n} ${n === 1 ? 'passenger' : 'passengers'}`,
      returnJourney: 'Return journey',
      pickupWhen: 'Pickup date and time',
      returnDate: 'Return date',
      returnTime: 'Return time',
      flight: 'Flight number',
      flightHint: 'Optional · helps your driver follow your arrival',
      flightPlaceholder: 'e.g. KL 1234',
      comments: 'Comments for your driver',
      commentsHint: 'Optional',
      commentsPlaceholder: 'e.g. child seat needed, building entrance, extra luggage',
      charsLeft: (n) => `${n} characters left`,
    },

    contact: {
      title: 'Your contact details',
      guest: "You're booking as a guest",
      firstName: 'First name',
      lastName: 'Last name',
      phone: 'WhatsApp phone number',
      phoneHint: 'We send ride updates on WhatsApp',
      phonePlaceholder: '+31 6 12345678',
      email: 'Email',
      emailPlaceholder: 'name@example.com',
      haveAccount: 'Have an account?',
      login: 'Log in',
      noAccount: 'No account yet?',
      register: 'Create one',
      accountNote: 'Opens the current customer portal in a new tab.',
      submit: 'Send Booking Request',
      submitting: 'Sending…',
    },

    summary: {
      title: 'Your journey',
      toggle: 'Show journey details',
      from: 'From',
      via: 'Via',
      to: 'To',
      when: 'Pickup',
      asap: 'As soon as possible',
      luggage: 'Luggage',
      withLuggage: 'Yes',
      noLuggage: 'No',
      passengers: 'Passengers',
      vehicle: 'Vehicle',
      returnLabel: 'Return',
      oneWay: 'One-way',
      fare: 'Fare',
      fareValue: 'On request',
      notChosen: '—',
    },

    notConnected:
      'Development version: online booking is not yet connected. Your request will not be sent to Taxi Den Bosch and no fare will be calculated.',

    errors: {
      pickup: 'Please enter a pickup location.',
      dest: 'Please enter a destination.',
      sameAddress: 'The destination must differ from the pickup location.',
      stop: 'Please enter the stop address, or remove the stop.',
      date: 'Please choose a pickup date.',
      dateInvalid: 'Please enter a valid date.',
      time: 'Please choose a pickup time.',
      tooSoon: 'Please choose a time at least 15 minutes from now, or choose "Now".',
      luggage: 'Please choose whether you have luggage.',
      vehicle: 'Please select a vehicle.',
      rdate: 'Please choose a return date.',
      rtime: 'Please choose a return time.',
      returnBefore: 'The return must be after the outward pickup.',
      flight: 'Please enter a flight number like KL 1234, or leave it empty.',
      comments: 'Please keep comments under 500 characters.',
      firstName: 'Please enter your first name.',
      lastName: 'Please enter your last name.',
      phone: 'Please enter a valid phone number, including the country code if outside the Netherlands.',
      email: 'Please enter a valid email address.',
      form: 'Please check the highlighted fields.',
      failed: `Something went wrong. Please try again or call ${contact.phoneDisplay}.`,
      geoUnsupported: 'Your browser does not support location access.',
      geoFailed: 'We could not access your location. Please enter an address.',
    },

    done: {
      badge: 'TEST MODE',
      title: 'Your booking details are complete',
      mock: {
        before: 'This is a development version. Your request has ',
        strong: 'not',
        afterStrong: ' been sent to Taxi Den Bosch and no journey has been booked. Call ',
        beforeLink: ' or send a ',
        link: 'WhatsApp message',
        after: ' to book now.',
      },
      call: `Call ${contact.phoneDisplay}`,
      newBooking: 'Start a new booking',
      home: 'Back to the homepage',
    },
  },

  // Vehicle classes, as offered on the current live booking flow.
  // Capacities (4 / 7) follow the live site's "up to 4 / up to 7 people" choice.
  vehicles: {
    standard: {
      name: 'Standard',
      features: ['Always a private taxi', 'Luggage travels free', 'Certified taxi company'],
    },
    luxury: {
      name: 'Luxury Car',
      features: ['Luxury car from the E-segment', 'Driver dressed in a suit', 'Extra service and comfort'],
    },
    electric: {
      name: 'Electric Car',
      features: ['Fully electric car', 'Quiet and comfortable ride', 'The green choice'],
    },
    van: {
      name: 'Taxi Van',
      features: ['Room for groups up to 7', 'Luggage travels free', 'Certified taxi company'],
    },
  },

  services: {
    eyebrow: 'OUR SERVICES',
    title: 'Transport for every journey, in Den Bosch and beyond',
    intro:
      'From a short trip across town to a group outing or your wedding day. Every service can be booked online, by phone or via WhatsApp.',
    items: [
      {
        id: 'local-card',
        slug: 'local',
        action: 'book',
        title: 'Local Taxi Services',
        body: ['Taxi journeys within Den Bosch and the surrounding area, with convenient booking and experienced drivers who speak Dutch and English.'],
        links: [{ href: '#local', label: 'Local taxi service →' }],
        image: { src: '/images/services/local-taxi.webp', alt: 'Two black taxis on a city street' },
      },
      {
        id: 'airport-card',
        slug: 'airport',
        action: 'book',
        title: 'Airport Transfers',
        body: ['Pre-booked, door-to-door transport to and from the airport, for holidays and business trips alike.'],
        links: [
          { href: '#airport', label: 'Eindhoven Airport →' },
          { href: '#airport', label: 'Amsterdam Schiphol Airport →' },
        ],
        image: { src: '/images/services/airport-transfers.webp', alt: 'Driver loading luggage into a black Mercedes at an airport terminal' },
      },
      {
        id: 'business',
        slug: 'business',
        action: 'contact',
        title: 'Business & Executive Transport',
        body: [
          'Professional transport for appointments, corporate travel and executive journeys, with qualified drivers in a Mercedes E-Class, Mercedes V-Class or VW Sharan.',
          'Pay in cash or by card, or ask about billing on account.',
        ],
        links: [{ href: '#contact', label: 'Enquire about business travel →' }],
        image: { src: '/images/services/business-transport.webp', alt: 'Chauffeur holding the rear door of a black car open for a passenger' },
      },
      {
        id: 'weddings',
        slug: 'events',
        action: 'contact',
        title: 'Wedding & Event Transport',
        body: [
          "Transport for your wedding day or special occasion, from collecting the wedding party to taking guests to the reception. Tell us what you need and we'll plan it with you.",
        ],
        links: [{ href: '#contact', label: 'Plan your event transport →' }],
        image: { src: '/images/services/wedding-transport.webp', alt: 'Bride and groom beside a black Mercedes' },
      },
      {
        id: 'groups',
        slug: 'groups',
        action: 'book',
        title: 'Group Transport & Taxi Vans',
        body: [
          'Spacious vehicles such as the Mercedes Vito and V-Class for company outings, family celebrations, a group trip to Schiphol or a ride home after a party.',
        ],
        links: [{ href: '#book', label: 'Book group transport →' }],
        image: { src: '/images/services/group-transport.webp', alt: 'Travellers with luggage boarding a black Mercedes V-Class van' },
      },
      {
        id: 'tours',
        slug: 'tours',
        action: 'contact',
        title: 'Private Tours',
        body: [
          'Discover the history, culture and hidden corners of Den Bosch and the surrounding area with an experienced driver who knows the city, on a route shaped around your interests.',
        ],
        links: [{ href: '#contact', label: 'Ask about a private tour →' }],
        image: { src: '/images/services/private-tours.webp', alt: 'Chauffeur at the open door of a black luxury car on a city street' },
      },
    ],
  },

  why: {
    eyebrow: 'WHY TAXI DEN BOSCH',
    title: 'A Better Way to Travel',
    intro:
      "Taxi Den Bosch (Snel Taxi) provides taxi transport from 's-Hertogenbosch to destinations across the Netherlands and beyond, for both personal and business travel.",
    items: [
      { badge: '24/7', title: 'Available 24/7', body: 'An early flight or a late night out: you can book a taxi at any hour, seven days a week.' },
      { badge: '02', title: 'Professional Drivers', body: 'Trained, experienced and well-presented drivers who speak Dutch and English and are happy to help with your luggage.' },
      { badge: '03', title: 'Comfortable Vehicles', body: 'Clean, well-maintained cars from Mercedes and Volkswagen, including the spacious Mercedes V-Class and Vito.' },
      { badge: '04', title: 'Transparent Pricing', body: 'Clear fares with no hidden costs afterwards, and fixed fares to many destinations in the Netherlands, Belgium and Germany.' },
      { badge: '05', title: 'Convenient Booking', body: `Book or enquire through the website, by phone on ${contact.phoneDisplay}, via WhatsApp or with the Snel Taxi app.` },
      { badge: '06', title: 'Personal & Business Travel', body: 'Local journeys, airport transfers, business travel and group transport, all arranged by one local company.' },
    ],
  },

  airport: {
    eyebrow: 'AIRPORT TRANSFERS',
    title: 'Comfortable, Reliable Airport Transfers',
    body: [
      'Plan your airport journey with pre-booked taxi transport from Den Bosch. Arrange a comfortable journey to or from Eindhoven Airport or Amsterdam Schiphol and book ahead for your travel schedule.',
      'Airport journeys are door to door, with fixed fares available for airport routes. Contact us for a fare for your trip.',
    ],
    routes: ['Eindhoven Airport', 'Amsterdam Schiphol Airport', 'Maastricht Airport'],
    routeCta: 'Plan this journey →',
    cta: 'Book an Airport Transfer',
    image: { src: '/images/sections/airport-transfers-feature.webp', alt: 'Aircraft at an airport gate at sunset' },
  },

  local: {
    eyebrow: 'LOCAL TAXI',
    title: 'Your Local Taxi in Den Bosch',
    body: [
      "Whether you're travelling across Den Bosch, heading to a hotel or station, or arranging a journey elsewhere in the Netherlands, Taxi Den Bosch provides convenient transport for personal and business travel.",
      'Our drivers are punctual, experienced and know the area well. Fares are clear upfront, with no extra costs afterwards.',
    ],
    ctaBook: 'Book a Local Taxi',
    ctaCall: `Call ${contact.phoneDisplay}`,
    image: { src: '/images/sections/local-taxi-feature.webp', alt: 'Driver standing beside a black Mercedes taxi outside a building' },
  },

  reviews: {
    eyebrow: 'CUSTOMER REVIEWS',
    title: 'What Our Passengers Say',
    // Empty until genuine, attributable testimonials are confirmed with the client.
    items: [],
    pendingStrong: 'Reviews pending verification.',
    pendingBody: ' Customer reviews will be shown here once genuine, attributable testimonials have been confirmed with Taxi Den Bosch.',
    devNote: 'dev note · not shown in production',
  },

  app: {
    eyebrow: 'SNEL TAXI APP',
    title: 'Book your next ride with the Snel Taxi Den Bosch app',
    body: 'Prefer booking from your phone? Download the Snel Taxi app to arrange your taxi journey.',
    appStorePre: 'Download on the',
    appStore: 'App Store',
    googlePlayPre: 'Get it on',
    googlePlay: 'Google Play',
    googlePlayPending: 'Google Play link to be confirmed',
    image: { src: '/images/app/booking-app.webp', alt: 'Hand holding a phone with a taxi booking app, a black Mercedes in the background' },
  },

  faq: {
    eyebrow: 'FREQUENTLY ASKED QUESTIONS',
    title: 'Good to Know',
    introBefore: "Can't find your answer? Call ",
    introMiddle: ' or send us a ',
    introLink: 'WhatsApp message',
    introAfter: '.',
    items: [
      {
        q: 'How can I book a taxi?',
        a: `Use the booking form on this page, call ${contact.phoneDisplay}, send a WhatsApp message to ${contact.whatsappDisplay}, or book through the Snel Taxi app. Online booking on this new website is not yet connected, so please call or WhatsApp us for now.`,
      },
      {
        q: 'Can I arrange an airport transfer?',
        a: 'Yes. We provide pre-booked transfers to and from Eindhoven Airport and Amsterdam Schiphol Airport, as well as Maastricht Airport. Book ahead so we can plan your journey around your travel schedule.',
      },
      {
        q: 'Is Taxi Den Bosch available around the clock?',
        a: 'Yes. We are available 24 hours a day, 7 days a week, including early mornings and late evenings.',
      },
      {
        q: 'Can I book transport for business travel?',
        a: 'Yes. We provide business and executive transport with qualified drivers. Journeys can be paid in cash or by card, and billing on account is also possible. Contact us to discuss the options for your company.',
      },
      {
        q: 'Is group transport available?',
        a: 'Yes. Our spacious vehicles, such as the Mercedes Vito and V-Class, are suitable for groups of up to 7 passengers, for company outings, family events and other occasions.',
      },
      {
        q: 'How can I enquire about a fixed fare?',
        a: 'We offer fixed fares to many destinations in the Netherlands, Belgium and Germany. Call or WhatsApp us with your pickup location, destination and travel time, and we will tell you the fare for your journey.',
      },
    ],
  },

  cta: {
    title: 'Ready for Your Next Journey?',
    body: 'Book your next taxi journey with Taxi Den Bosch. Get in touch to arrange local transport, an airport transfer, or a journey for business or leisure.',
    book: 'Book a Taxi',
    call: 'Call Us',
    whatsapp: 'WhatsApp',
    labels: {
      phone: 'TELEPHONE',
      whatsapp: 'WHATSAPP',
      email: 'EMAIL',
      hours: 'OPENING HOURS',
      office: 'HEAD OFFICE',
    },
    hours: '24 hours a day, 7 days a week',
  },

  // About, Services and Contact pages. Every statement below is taken from
  // existing verified copy (why / local / services / faq / contact). No
  // founding dates, fleet sizes, years in business or testimonials.
  pages: {
    titles: {
      home: 'Taxi Den Bosch | 24/7 Taxi, Airport Transfers & Business Transport',
      about: 'About | Taxi Den Bosch',
      services: 'Services | Taxi Den Bosch',
      contact: 'Contact | Taxi Den Bosch',
      book: 'Book a Taxi | Taxi Den Bosch',
    },

    about: {
      hero: {
        eyebrow: 'ABOUT US',
        title: 'Your Trusted Taxi Partner in Den Bosch',
        body: "Taxi Den Bosch (Snel Taxi) provides taxi transport from 's-Hertogenbosch to destinations across the Netherlands and beyond, for personal and business travel.",
        primary: 'Book a Taxi',
        secondary: 'View Our Services',
        image: {
          src: '', // add e.g. /images/hero/about-hero.webp (client's black Mercedes)
          alt: 'Taxi Den Bosch black Mercedes in Den Bosch',
          position: 'center 60%',
          caption: "no image yet · public/images/hero/about-hero.webp · client's black Mercedes",
        },
      },
      intro: {
        eyebrow: 'WHO WE ARE',
        title: 'Local drivers, available around the clock',
        body: [
          "We're a taxi company based in 's-Hertogenbosch, available 24 hours a day, 7 days a week. Whether it's an early flight or a late night out, you can book a taxi at any hour.",
          'Our drivers are punctual, experienced and know the area well. They speak Dutch and English and are happy to help with your luggage.',
          'Fares are clear upfront, with no extra costs afterwards, and we offer fixed fares to many destinations in the Netherlands, Belgium and Germany.',
        ],
        factsLabel: 'Key facts',
        facts: [
          { term: 'Based in', value: "'s-Hertogenbosch" },
          { term: 'Available', value: '24 hours a day, 7 days a week' },
          { term: 'Drivers speak', value: 'Dutch and English' },
          { term: 'Payment', value: 'Cash, card or billing on account' },
        ],
      },
      principles: {
        eyebrow: 'HOW WE WORK',
        title: 'What you can count on',
        items: [
          { icon: 'clock', title: 'Reliable journeys', body: 'Available 24/7, with punctual drivers and pre-booked airport transfers planned around your travel schedule.' },
          { icon: 'user', title: 'Professional service', body: 'Trained, experienced and well-presented drivers who speak Dutch and English.' },
          { icon: 'car', title: 'Comfortable travel', body: 'Clean, well-maintained cars from Mercedes and Volkswagen, including the spacious Mercedes V-Class and Vito.' },
          { icon: 'phone', title: 'Convenient booking', body: `Book online, by phone on ${contact.phoneDisplay}, via WhatsApp or with the Snel Taxi app.` },
        ],
      },
      photos: [
        {
          image: {
            src: '', // add e.g. /images/about/about-driver.webp
            alt: 'A Taxi Den Bosch driver next to one of the cars',
            caption: 'no image yet · public/images/about/about-driver.webp',
          },
          caption: 'Experienced local drivers',
        },
        {
          image: {
            src: '', // add e.g. /images/about/about-fleet.webp
            alt: 'Taxi Den Bosch vehicles',
            caption: 'no image yet · public/images/about/about-fleet.webp',
          },
          caption: 'Mercedes and Volkswagen vehicles, including the V-Class and Vito',
        },
      ],
      cta: {
        title: 'Ready for your next journey?',
        body: 'Book a taxi online in a few steps, or see everything we offer.',
        primary: 'Book a Taxi',
        secondary: 'View Our Services',
      },
    },

    services: {
      hero: {
        eyebrow: 'OUR SERVICES',
        title: 'Reliable Taxi Services for Every Journey',
        body: 'From a short trip across town to an airport transfer, a business appointment or your wedding day. Every service can be booked online, by phone or via WhatsApp.',
        image: {
          src: '', // add e.g. /images/hero/services-hero.webp
          alt: 'Taxi Den Bosch black Mercedes',
          position: 'center 60%',
          caption: 'no image yet · public/images/hero/services-hero.webp',
        },
      },
      gridLabel: 'All services',
      actions: {
        book: 'Book a Taxi',
        contact: 'Ask About This Service',
      },
      // Verified details shown as small tags on some cards.
      tags: {
        airport: ['Eindhoven Airport', 'Amsterdam Schiphol', 'Maastricht Airport'],
        groups: ['Up to 7 passengers'],
        business: ['Billing on account'],
      },
      help: {
        title: 'Not sure which service you need?',
        body: "Tell us where and when you're travelling and how many people are coming, and we'll help you choose the right vehicle.",
        call: `Call ${contact.phoneDisplay}`,
        whatsapp: 'WhatsApp Us',
        form: 'Send a Message',
      },
    },

    contact: {
      hero: {
        eyebrow: 'CONTACT US',
        title: 'Get in Touch',
        body: 'Questions about a journey, a fixed fare, business travel or an event? Call or WhatsApp us for the quickest answer, or send us a message.',
        image: {
          src: '', // optional; /images/library/city-at-night.webp is available
          alt: 'Den Bosch at dusk',
          position: 'center 50%',
          caption: 'no image yet (optional) · public/images/hero/contact-hero.webp',
        },
      },
      urgent: 'Need a taxi right now? Calling is the fastest way:',
      details: {
        title: 'Talk to us directly',
        phone: { label: 'Call us', note: 'Available 24/7' },
        whatsapp: { label: 'WhatsApp', note: 'Send us a message' },
        email: { label: 'Email', note: 'For questions and quotes' },
        hours: { label: 'Opening hours', value: '24 hours a day, 7 days a week' },
        office: { label: 'Head office' },
      },
      form: {
        eyebrow: 'SEND A MESSAGE',
        title: 'How can we help?',
        name: 'Full name',
        email: 'Email address',
        phone: 'Phone number',
        phoneHint: 'Optional · so we can call you back',
        subject: 'Subject',
        subjects: [
          { value: 'general', label: 'General question' },
          { value: 'booking', label: 'Question about a booking' },
          { value: 'fare', label: 'Fixed fare request' },
          { value: 'airport', label: 'Airport transfer' },
          { value: 'business', label: 'Business travel or billing on account' },
          { value: 'events', label: 'Wedding or event' },
          { value: 'groups', label: 'Group transport' },
          { value: 'tours', label: 'Private tour' },
        ],
        message: 'Message',
        messagePlaceholder: 'Tell us about your request: where, when and how many people.',
        charsLeft: (n) => `${n} characters left`,
        sendEmail: 'Send by Email',
        sendWhatsapp: 'Send via WhatsApp',
        send: 'Send Message',
        notice:
          "This form doesn't send messages from the website yet. It opens your email app or WhatsApp with your message ready, and you press Send there.",
        errors: {
          name: 'Please enter your name.',
          email: 'Please enter a valid email address.',
          phone: 'Please enter a valid phone number, or leave it empty.',
          message: 'Please enter a message of at least 10 characters.',
          messageLong: 'Please keep your message under 2000 characters.',
          form: 'Please check the highlighted fields.',
          failed: `Your message could not be sent. Please try again, or call ${contact.phoneDisplay}.`,
        },
        handoff: {
          email: {
            title: 'Your email app should now open',
            body: 'Your message is ready there. Press Send in your email app to deliver it. Nothing has been sent from this website.',
            retry: 'Open email again',
          },
          whatsapp: {
            title: 'WhatsApp should now open',
            body: 'Your message is ready in WhatsApp. Press Send there to deliver it. Nothing has been sent from this website.',
            retry: 'Open WhatsApp again',
          },
          fallback: "Didn't open? Email us directly at ",
          edit: 'Edit message',
        },
        sent: {
          title: 'Message sent',
          body: 'Thank you. We will get back to you as soon as possible.',
        },
        sending: 'Sending…',
        bodyTemplate: ({ name, email, phone, subject, message }) =>
          `${message}\n\n—\nName: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ''}\nSubject: ${subject}\n(Sent via the contact form on the Taxi Den Bosch website)`,
      },
      location: {
        eyebrow: 'LOCATION',
        title: 'Find us in Den Bosch',
        body: 'We serve Den Bosch and the surrounding area, with journeys across the Netherlands and beyond.',
        mapLink: 'Open in Google Maps',
        mapQuery: "Klokkenlaan, 5231 BE 's-Hertogenbosch",
      },
    },
  },

  footer: {
    tagline: 'Snel Taxi Den Bosch. Taxi transport 24 hours a day, 7 days a week.',
    columns: [
      {
        title: 'Services',
        links: [
          { href: '#/services', label: 'All Services' },
          { href: '#/services/airport', label: 'Airport Transfers' },
          { href: '#/services/business', label: 'Business Transport' },
          { href: '#/services/groups', label: 'Group Transport' },
          { href: '#/services/events', label: 'Weddings & Events' },
          { href: '#/services/tours', label: 'Private Tours' },
        ],
      },
      {
        title: 'Company',
        links: [
          { href: '#/about', label: 'About' },
          { href: '#/contact', label: 'Contact' },
          { href: '#book', label: 'Book a Taxi' },
          { href: 'https://www.taxidenbosch.eu/help-center', label: 'Help Center' },
          { href: 'https://www.taxidenbosch.eu/privacy-and-policy', label: 'Privacy Policy' },
          { href: 'https://www.taxidenbosch.eu/terms-of-use', label: 'Terms of Use' },
        ],
      },
    ],
    contactTitle: 'Contact',
    whatsappPrefix: 'WhatsApp ',
    open: 'Open 24/7',
    copyright: (year) => `© ${year} Taxi Den Bosch`,
  },
};

export default en;
