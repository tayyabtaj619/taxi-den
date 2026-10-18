// English site copy. All user-facing text lives here so a Dutch file (nl.js)
// with the same shape can be added later without touching components.
// Source: approved design "Taxi Den Bosch Homepage v2".
//
// Photos are imported in the component that renders them, from src/images/.
// This file keeps the alt text (`imageAlt`) because it is translated copy.
// To swap a photo, change that component's import filename.
//
// Do not add reviews, fares, discounts or guarantees that are not verified
// with the client.

// Booking entry route used in footer / service copy. Keep in sync with bookPath().
const BOOK = '#/book';

export const contact = {
  phoneDisplay: '073 234 0600',
  phoneHref: 'tel:+31732340600',
  whatsappDisplay: '+31 6 4447 9990',
  whatsappHref: 'https://wa.me/31644479990',
  email: 'Sneltaxidenbosch@hotmail.com',
  addressLines: ['Klokkenlaan', '5231 BE Den Bosch'],
  // Snel Taxi App Store URL from the live site — keep in sync with storeLinks.
  appStoreUrl: 'https://apps.apple.com/app/snel-taxi/id6476443399',
};

const en = {
  locale: 'en-GB',
  brand: {
    name: 'Den Bosch Taxi',
    sub: '',
    mark: 'DB',
    homeLabel: 'Den Bosch Taxi, back to the homepage',
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
      // Driver login uses the verified Snel Taxi app listing.
      items: {
        login: { label: 'Customer log in' },
        register: { label: 'Create an account' },
        driverLogin: { label: 'Driver login' },
        driverApply: { label: 'Become a driver' },
      },
    },
  },

  hero: {
    eyebrow: 'DEN BOSCH TAXI · 24/7',
    title: 'Reliable Taxi Service. Whenever You Need It.',
    body: 'Local journeys, airport transfers and business travel from Den Bosch, with professional drivers and clear fares.',
    callPrefix: 'Prefer to call?',
    points: ['Available 24/7', 'Transparent fares, no hidden costs', 'Trained, professional drivers'],
    // Generated promotional image (not the client's own car). Swap the import
    // in sections/Hero.jsx for a real photo of the client's vehicle when available.
    imageAlt: 'Black Mercedes taxi on a square in Den Bosch at sunset',
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
      'Development version: online booking is not yet connected. Your request will not be sent to Den Bosch Taxi and no fare will be calculated.',

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
        afterStrong: ' been sent to Den Bosch Taxi and no journey has been booked. Call ',
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
        imageAlt: 'Two black taxis on a city street',
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
        imageAlt: 'Driver loading luggage into a black Mercedes at an airport terminal',
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
        imageAlt: 'Chauffeur holding the rear door of a black car open for a passenger',
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
        imageAlt: 'Bride and groom beside a black Mercedes',
      },
      {
        id: 'groups',
        slug: 'groups',
        action: 'book',
        title: 'Group Transport & Taxi Vans',
        body: [
          'Spacious vehicles such as the Mercedes Vito and V-Class for company outings, family celebrations, a group trip to Schiphol or a ride home after a party.',
        ],
        links: [{ href: BOOK, label: 'Book group transport →' }],
        imageAlt: 'Travellers with luggage boarding a black Mercedes V-Class van',
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
        imageAlt: 'Chauffeur at the open door of a black luxury car on a city street',
      },
    ],
  },

  why: {
    eyebrow: 'WHY DEN BOSCH TAXI',
    title: 'A Better Way to Travel',
    intro:
      "Den Bosch Taxi provides taxi transport from 's-Hertogenbosch to destinations across the Netherlands and beyond, for both personal and business travel.",
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
    imageAlt: 'Aircraft at an airport gate at sunset',
  },

  local: {
    eyebrow: 'LOCAL TAXI',
    title: 'Your Local Taxi in Den Bosch',
    body: [
      "Whether you're travelling across Den Bosch, heading to a hotel or station, or arranging a journey elsewhere in the Netherlands, Den Bosch Taxi provides convenient transport for personal and business travel.",
      'Our drivers are punctual, experienced and know the area well. Fares are clear upfront, with no extra costs afterwards.',
    ],
    ctaBook: 'Book a Local Taxi',
    ctaCall: `Call ${contact.phoneDisplay}`,
    imageAlt: 'Driver standing beside a black Mercedes taxi outside a building',
  },

  reviews: {
    eyebrow: 'CUSTOMER REVIEWS',
    title: 'What Our Passengers Say',
    // Empty until genuine, attributable testimonials are confirmed with the client.
    items: [],
    pendingStrong: 'Reviews pending verification.',
    pendingBody: ' Customer reviews will be shown here once genuine, attributable testimonials have been confirmed with Den Bosch Taxi.',
    devNote: 'dev note · not shown in production',
  },

  app: {
    eyebrow: 'SNEL TAXI APP',
    title: 'Book your next ride with the Snel Taxi app',
    body: 'Prefer booking from your phone? Download the Snel Taxi app to arrange your taxi journey with Den Bosch Taxi.',
    appStorePre: 'Download on the',
    appStore: 'App Store',
    googlePlayPre: 'Get it on',
    googlePlay: 'Google Play',
    imageAlt: 'Hand holding a phone with a taxi booking app, a black Mercedes in the background',
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
        q: 'Is Den Bosch Taxi available around the clock?',
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
    body: 'Book your next taxi journey with Den Bosch Taxi. Get in touch to arrange local transport, an airport transfer, or a journey for business or leisure.',
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
      home: 'Den Bosch Taxi | 24/7 Taxi, Airport Transfers & Business Transport',
      about: 'About | Den Bosch Taxi',
      services: 'Services | Den Bosch Taxi',
      contact: 'Contact | Den Bosch Taxi',
      book: 'Book a Taxi | Den Bosch Taxi',
      help: 'Help Center | Den Bosch Taxi',
      privacy: 'Privacy Policy | Den Bosch Taxi',
      terms: 'Terms of Use | Den Bosch Taxi',
      driverRegister: 'Become a Driver | Den Bosch Taxi',
    },

    about: {
      hero: {
        eyebrow: 'ABOUT US',
        title: 'Your Trusted Taxi Partner in Den Bosch',
        body: "Den Bosch Taxi provides taxi transport from 's-Hertogenbosch to destinations across the Netherlands and beyond, for personal and business travel.",
        primary: 'Book a Taxi',
        secondary: 'View Our Services',
        imageAlt: 'Den Bosch Taxi vehicle in Den Bosch',
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
          imageAlt: 'A Den Bosch Taxi driver next to one of the cars',
          caption: 'Experienced local drivers',
        },
        {
          imageAlt: 'Den Bosch Taxi vehicles',
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
        imageAlt: 'Den Bosch Taxi black Mercedes',
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
        // No photo imported yet. city-at-night.webp is available in src/images/.
        imageAlt: 'Den Bosch at dusk',
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
          `${message}\n\n—\nName: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ''}\nSubject: ${subject}\n(Sent via the contact form on the Den Bosch Taxi website)`,
      },
      location: {
        eyebrow: 'LOCATION',
        title: 'Find us in Den Bosch',
        body: 'We serve Den Bosch and the surrounding area, with journeys across the Netherlands and beyond.',
        mapLink: 'Open in Google Maps',
        mapQuery: "Klokkenlaan, 5231 BE 's-Hertogenbosch",
      },
    },

    // Help content drawn from the live Help Center contact details and the
    // verified FAQ / booking copy on this site. No unverified cancellation
    // or refund rules are stated.
    help: {
      eyebrow: 'HELP CENTER',
      title: 'How can we help?',
      intro:
        'Answers about booking a taxi with Den Bosch Taxi. If you need something else, call or WhatsApp us — we are available 24 hours a day, 7 days a week.',
      sections: ({ contact: c, bookPath, pagePath }) => [
        {
          title: 'Booking a taxi',
          paragraphs: [
            `You can start a booking on this website, call ${c.phoneDisplay}, send a WhatsApp message to ${c.whatsappDisplay}, or use the Snel Taxi app.`,
            'Online booking on this website collects your journey details in a guided form. Until the booking system is fully connected, please also confirm by phone or WhatsApp if you need an immediate confirmation.',
          ],
          actions: [
            { href: bookPath(), label: 'Book a Taxi' },
            { href: c.phoneHref, label: `Call ${c.phoneDisplay}` },
          ],
        },
        {
          title: 'Immediate versus scheduled journeys',
          paragraphs: [
            'In the booking form you can choose “Now” for as soon as possible, or “Schedule” to pick a date and time.',
            'Scheduled pickups should be at least 15 minutes ahead when you choose a specific time. For airport and early-morning trips, booking ahead helps us plan around your travel schedule.',
          ],
        },
        {
          title: 'Changing or cancelling a booking',
          paragraphs: [
            'This website does not yet publish a self-service change or cancellation policy for online requests.',
            `To change or cancel a journey you have arranged, contact us by phone on ${c.phoneDisplay} or via WhatsApp. Specific cancellation terms for a booked ride follow the applicable transport conditions — see Terms of Use.`,
          ],
          actions: [{ href: pagePath('terms'), label: 'Terms of Use' }],
        },
        {
          title: 'Airport transfers',
          paragraphs: [
            'We provide pre-booked, door-to-door transfers to and from Eindhoven Airport, Amsterdam Schiphol Airport and Maastricht Airport.',
            'When you book, you can add an optional flight number so your driver can follow your arrival. Fixed fares are available for many airport routes — ask us for the fare for your trip.',
          ],
          actions: [{ href: bookPath(), label: 'Book an airport transfer' }],
        },
        {
          title: 'Account access',
          paragraphs: [
            'Customer log in and registration open the existing customer portal on taxidenbosch.eu.',
            'Driver login uses the Snel Taxi app. A dedicated web registration flow for new drivers is being prepared on this site.',
          ],
        },
        {
          title: 'Contacting the company',
          paragraphs: [
            `Phone: ${c.phoneDisplay} · WhatsApp: ${c.whatsappDisplay} · Email: ${c.email}`,
            `Head office: ${c.addressLines.join(', ')}. Open 24 hours a day, 7 days a week.`,
          ],
          actions: [{ href: pagePath('contact'), label: 'Contact form' }],
        },
      ],
      contactAside: {
        title: 'Still need help?',
        body: 'Call or WhatsApp for the quickest answer, or send a message through the contact form.',
        form: 'Contact form',
      },
    },

    // Privacy summary based on the Dutch privacy statement published at
    // taxidenbosch.eu/privacy-and-policy. That source page truncates mid-section;
    // missing details are flagged below for client/legal confirmation.
    privacy: {
      eyebrow: 'PRIVACY',
      title: 'Privacy Policy',
      intro:
        'This page summarises the privacy statement published for Snel Taxi Den Bosch / Taxi Den Bosch. It explains, in plain language, how personal data may be collected and used when you use the website, the Snel Taxi app, or taxi services.',
      sections: [
        {
          id: 'scope',
          heading: 'Scope',
          paragraphs: [
            'The source privacy statement applies to the collection, processing and use of personal data in general, and specifically when using the Taxi Snel Taxi Den Bosch website and the Snel Taxi Den Bosch app.',
            'References to “Snel Taxi Den Bosch” in the source statement also cover affiliated parties and connected taxi entrepreneurs associated with Taxi Centrale Den Bosch, as described there.',
          ],
        },
        {
          id: 'principles',
          heading: 'How personal data is used',
          paragraphs: [
            'According to the source statement, only personal data needed to perform the service you request is processed. Data may also be used to improve services, to provide relevant information, and where needed to meet legal requirements.',
            'To deliver services, Snel Taxi Den Bosch works with parties that help maintain and secure software and IT infrastructure.',
          ],
        },
        {
          id: 'who',
          heading: 'Whose data is collected',
          paragraphs: ['The source statement lists collection of personal data from:'],
          list: [
            'Passengers who take taxi journeys',
            'Representatives of business relations',
            'Website visitors',
            'Employees and job applicants',
            'Affiliated taxi entrepreneurs and their employees',
          ],
        },
        {
          id: 'how',
          heading: 'When data is collected',
          paragraphs: ['Examples given in the source statement include:'],
          list: [
            'When you call',
            'When you request or use services',
            'When you enter into an agreement',
            'When you email or use a contact form',
            'When you use products, applications or software such as the Snel Taxi Den Bosch app',
            'When you visit the website',
            'When you follow social channels or leave a review on a review platform',
          ],
        },
        {
          id: 'purposes',
          heading: 'Purposes described in the source statement',
          paragraphs: [
            'Data provided under an agreement is used to perform that agreement, for personalised product information related to the agreement, and to improve service (for example shorter arrival times and taxi availability). Completing a taxi journey and downloading the app are given as examples of agreements.',
            'When you contact the company to order a taxi or request information, the data you provide is processed to deliver the service, answer the request, or respond to your questions.',
            'On the website, general visit data and click behaviour may be recorded to improve layout and information. Cookies may be placed so the website functions correctly.',
          ],
          list: [
            'Performing agreements and taxi journeys, including via external parties (apps)',
            'Security of drivers and passengers may involve a camera that can be placed in the taxi; whether a camera is used is described in the source as the choice and responsibility of the taxi entrepreneur',
          ],
        },
      ],
      confirmation: {
        title: 'Client / legal confirmation needed',
        body:
          'The privacy statement published on taxidenbosch.eu appears incomplete on the public page (it cuts off mid-sentence in the camera/security section). Details that still need confirmation before this can be treated as a final legal document include: the full cookie policy, retention periods, your rights under the GDPR (access, correction, erasure), data-sharing partners, international transfers, the data controller’s formal identity and contact for privacy requests, and any English-language official version. Until then, treat the Dutch source statement and your counsel’s advice as authoritative.',
      },
    },

    // Terms taken from the Dutch text published at taxidenbosch.eu/terms-of-use
    // (KNV Zorgvervoer en Taxi general conditions, filed 10 December 2019).
    terms: {
      eyebrow: 'TERMS',
      title: 'Terms of Use',
      intro:
        'The transport conditions below are the Terms of Use published on the existing Den Bosch Taxi / Snel Taxi site. They are presented here in the original Dutch wording of that source.',
      sourceNote:
        'Nederlands Vervoer ter griffie van de rechtbank te ’s-Gravenhage op 10 december 2019, aktenummer 35/2019. Deze algemene voorwaarden treden in werking per 1 januari 2020.',
      articles: [
        {
          id: 'art1',
          heading: 'Artikel 1: Begripsomschrijving',
          paragraphs: [
            'In deze Algemene Voorwaarden voor Zorgvervoer en Taxi vervoer wordt verstaan onder:',
          ],
          list: [
            'Taxivervoer/Zorgvervoer: al het overeengekomen personenvervoer per Auto zoals bedoeld in artikel 1 van de Wet personenvervoer 2000, waarbij de ritprijs van tevoren is overeengekomen dan wel wordt bepaald door het hanteren van de Taxameter. Het vervoer omvat tevens het in- en uitstappen.',
            'Vervoerovereenkomst: de tussen Reiziger/ Opdrachtgever en Vervoerder afgesloten overeenkomst om taxivervoer te verrichten.',
            'Taxistandplaats: een deel van de voor het openbaar verkeer openstaande weg dat door de wegbeheerder is aangewezen als parkeerplaats voor taxi’s.',
            'Auto: motorrijtuig, als bedoeld in artikel 1 van de Wet personenvervoer 2000.',
            'Reiziger: de persoon die door Vervoerder wordt vervoerd.',
            'Opdrachtgever: de natuurlijke of rechtspersoon die een Vervoerovereenkomst aangaat met Vervoerder.',
            'Opdracht: (a) een opdracht van een natuurlijke persoon aan een Vervoerder die op een Taxistandplaats reizigers afwacht; (b) iedere andere opdracht van een Reiziger/ Opdrachtgever aan Vervoerder.',
            'Vervoerder: de natuurlijke persoon of rechtspersoon, lid van KNV Zorgvervoer en Taxi, dan wel beschikkend over een geldig TX-Keurmerk, diens Bestuurder(s) van de auto(’s) daaronder begrepen, die zich verbindt personen te vervoeren per Auto.',
            'Bestuurder: bestuurder van de auto waarmee taxivervoer wordt verricht (de taxichauffeur) in dienst van Vervoerder met inbegrip van andere Bestuurders van de auto, die niet in dienst zijn van vervoerder maar wel dienst doen in zijn opdracht in een vervoermiddel van Vervoerder of een vervoermiddel dat aan Vervoerder beschikbaar is gesteld.',
            'Handbagage: bagage die een Reiziger als gemakkelijk mee te voeren, draagbaar dan wel verrijdbaar bij zich heeft, daaronder begrepen levende dieren, alsmede andere voorwerpen die door de Vervoerder als handbagage worden toegelaten.',
            'Taxi meter: apparaat in de auto dat de vervoerprijs overeenkomstig de kenbaar gemaakte tarieven aangeeft. De Taxi meter dient zichtbaar aanwezig te zijn.',
            'Stichting TX-Keur: Stichting die het kwaliteitskeurmerk TX-Keur verleent en beheert.',
            'KNV Zorgvervoer en Taxi: Werkgeversorganisatie waarbij vervoerder als lid is aangesloten.',
          ],
        },
        {
          id: 'art2',
          heading: 'Artikel 2: Toepassingsgebied Algemene Voorwaarden',
          paragraphs: [
            'Deze Algemene Voorwaarden zijn van toepassing op alle Vervoerovereenkomsten en vormen de basis voor de behandeling van geschillen door de Geschillencommissie Zorgvervoer en Taxi, zoals bedoeld in artikel 14 van deze algemene voorwaarden.',
          ],
        },
        {
          id: 'art3',
          heading: 'Artikel 3: Totstandkoming Vervoerovereenkomst',
          list: [
            'Een Vervoerovereenkomst komt tot stand door aanvaarding door de Reiziger/Opdrachtgever van het aanbod van de Vervoerder.',
            'Als sprake is van een Opdracht als bedoeld in artikel 1 lid 7a, dan is Vervoerder verplicht deze opdracht te aanvaarden, behoudens het bepaalde in artikel 4 lid 1.',
            'De verplichtingen van Vervoerder, waaronder artikel 7, gelden eveneens tegenover de Reiziger die niet als Opdrachtgever optreedt.',
          ],
        },
        {
          id: 'art4',
          heading: 'Artikel 4: Beëindiging en annulering Vervoerovereenkomst',
          list: [
            'Vervoerder kan het voortzetten van de rit onmiddellijk staken en aldus de Vervoerovereenkomst beëindigen, indien de Reiziger dusdanige hinder veroorzaakt dat in alle redelijkheid niet van de Vervoerder kan worden gevergd dat hij de Reiziger (verder) vervoert. Vervoerder kan in dat geval de Reiziger gelasten het voertuig onmiddellijk te verlaten.',
            'Vervoerder is in een geval zoals is bedoeld in lid 1, niet gehouden de Reiziger enige schade te vergoeden.',
            'Bij voortijdige beëindiging is Reiziger, ingeval de ritprijs tot stand komt via de Taxameter, het bedrag verschuldigd dat de Taxameter aangeeft op het moment van beëindiging van de rit. Ingeval voor aanvang van de rit een ritprijs is overeengekomen, is Reiziger/Opdrachtgever een evenredig deel van de vooraf overeengekomen prijs verschuldigd, ter vergoeding van het reeds gereden deel van de rit.',
            'Reiziger/Opdrachtgever kan voor aanvang van de bij Vervoerder bestelde rit afzien. In een dergelijk geval is de Reiziger/Opdrachtgever gehouden tot een schadeloosstelling naar redelijkheid en billijkheid aan de Vervoerder wanneer sprake is van aantoonbare schade. Dit geldt ook wanneer de Reiziger niet verschijnt op de met de Vervoerder afgesproken plaats.',
            'Ingeval Vervoerder bij een bestelde rit niet volgens afspraak verschijnt, heeft Reiziger bij aantoonbare schade recht op een op redelijkheid en billijkheid gebaseerde schadevergoeding.',
          ],
        },
        {
          id: 'art5',
          heading: 'Artikel 5: Verplichtingen en bevoegdheden Reiziger',
          paragraphs: [
            'Reiziger is gehouden door Vervoerder in alle redelijkheid gegeven aanwijzingen of instructies op te volgen, zoals het plaatsnemen op de door vervoerder aangewezen zitplaats, en de gordel om te doen voorafgaand aan de rit. Een boete die voortvloeit uit het zich niet houden aan deze verplichting door de Reiziger kan op deze worden verhaald.',
            'Reiziger is verplicht zich in de Auto te onthouden van beschadiging en/of verontreiniging; het gebruik van alcoholhoudende dranken zonder toestemming; het meevoeren en/of gebruiken van verdovende middelen; het gebruiken van rookwaar; agressie of onbehoorlijk gedrag; en het hinderen van Vervoerder.',
            'Reiziger is gehouden hetzij de vooraf overeengekomen ritprijs, hetzij de door de Taxameter bepaalde ritprijs te betalen.',
            'Indien reiziger ervoor kiest om gebruik te maken van een van onze taxi’s gaat hij hiermee akkoord dat er in de auto dashcam beelden worden opgenomen. Een dashcam is aanwezig in verband met de veiligheid van zowel de reiziger als de chauffeur.',
          ],
        },
        {
          id: 'art6',
          heading: 'Artikel 6: Betaling',
          paragraphs: [
            'Uitvoering op grond van de Vervoerovereenkomst geschiedt op grond van de Wet Personenvervoer 2000 vastgestelde en op correcte wijze bekend gemaakte tarieven, zoals bepaald door de Taxameter of waarbij de ritprijs van te voren overeen is gekomen.',
            'Betalingen door Reiziger/Opdrachtgever aan Vervoerder dienen contant met een in Nederland algemeen geaccepteerd betaalmiddel te geschieden, daarbij algemeen erkende vormen van elektronische betalingen inbegrepen, tenzij anders is overeengekomen.',
          ],
        },
        {
          id: 'art7',
          heading: 'Artikel 7: Verplichtingen en bevoegdheden Vervoerder',
          paragraphs: [
            'Vervoerder is verplicht de Reiziger, alsmede de door hem meegevoerde Handbagage op zorgvuldige en veilige wijze te vervoeren, de Reiziger naar de bestemming te brengen volgens de voor de Reiziger gunstigste weg, behulpzaam te zijn bij in- en uitstappen en bagage, en zorgvuldig om te gaan met persoonlijke gegevens verkregen in verband met de boeking (AVG).',
          ],
        },
        {
          id: 'art8-14',
          heading: 'Artikelen 8–14 (samenvatting uit de brontekst)',
          paragraphs: [
            'Artikel 8 betreft handbagage (verpakking, weigeringsgronden voor gevaarlijke of verboden goederen, zorgplicht). Artikel 9 betreft vervoer van dieren, met een uitzondering voor hulphonden. Artikel 10 betreft gevonden voorwerpen. Artikel 11 betreft overmacht. Artikelen 12 en 13 betreffen aansprakelijkheid van vervoerder en reiziger, met de in de bron genoemde wettelijke maximeringen. Artikel 14 betreft klachten en geschillen, waaronder de Geschillencommissie Zorgvervoer en Taxi, Postbus 19365, 2500 CJ Den Haag, en vermeldt algemene voorwaarden van Taxi Centraal Den Bosch.',
          ],
        },
      ],
      confirmation: {
        title: 'Client / legal confirmation needed',
        body:
          'The full Dutch source text on taxidenbosch.eu/terms-of-use should be treated as the binding publication until counsel confirms whether these KNV conditions apply unchanged to Den Bosch Taxi, whether an English translation should be issued, and whether website-specific terms (accounts, online booking requests, app use) need a separate addendum. Articles 8–14 are summarised above where the source is lengthy; publish the complete official text if required for compliance.',
      },
    },

    driverRegister: {
      eyebrow: 'DRIVERS',
      title: 'Become a driver',
      body: 'Thank you for your interest in driving with Den Bosch Taxi. A dedicated driver registration flow is being prepared for this website.',
      status: 'Registration is not open for online submission yet. Nothing you do on this page creates an application or account.',
      call: `Call ${contact.phoneDisplay}`,
      contact: 'Contact us',
      home: 'Back to the homepage',
    },
  },

  footer: {
    tagline: 'Den Bosch Taxi. Taxi transport 24 hours a day, 7 days a week.',
    columns: [
      {
        title: 'Company',
        links: [
          { href: '#/about', label: 'About' },
          { href: '#/contact', label: 'Contact' },
          { href: BOOK, label: 'Book a Taxi' },
        ],
      },
      {
        title: 'Useful links',
        links: [
          { href: '#/help', label: 'Help Center' },
          { href: '#/privacy', label: 'Privacy Policy' },
          { href: '#/terms', label: 'Terms of Use' },
        ],
      },
    ],
    contactTitle: 'Contact',
    whatsappPrefix: 'WhatsApp ',
    open: 'Open 24/7',
    copyright: (year) => `© ${year} Den Bosch Taxi`,
  },
};

export default en;
