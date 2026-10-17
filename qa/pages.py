"""Checks for the About, Services and Contact pages.
Usage: python3 qa/pages.py <base_url>"""
import re
import sys
from urllib.parse import unquote

from playwright.sync_api import sync_playwright

BASE = sys.argv[1].rstrip('/') + '/'
results = []
ROUTE_RE = re.compile(r'^#(top|book|/book/[a-z]+|/(about|services|contact)(/[a-z0-9-]+)?|[a-z-]+)$')
PLACEHOLDERS = ['+31 73 700 1234', '737001234', 'info@taxidenbosch.eu', '10+', 'years of experience']


def check(name, cond, detail=''):
    results.append((name, bool(cond), detail))


def go(page, hash_):
    page.goto(BASE + hash_, wait_until='networkidle')
    page.reload(wait_until='networkidle')
    page.wait_for_timeout(300)


with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={'width': 1440, 'height': 900})
    # Capture window.open (WhatsApp hand-off) instead of opening a tab.
    ctx.add_init_script("window.__opened = []; window.open = (u) => { window.__opened.push(u); return null; };")
    page = ctx.new_page()
    errors, failed = [], []
    # A mailto: hand-off in a browser with no mail handler is reported by
    # Chromium as a console error; that is the browser, not the page.
    page.on('console', lambda m: errors.append(m.text) if m.type in ('error', 'warning') and 'mailto' not in m.text else None)
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.on('response', lambda r: failed.append(f'{r.status} {r.url}') if r.status >= 400 else None)

    pages = {
        'about': ('Your Trusted Taxi Partner in Den Bosch', 'About | Taxi Den Bosch'),
        'services': ('Reliable Taxi Services for Every Journey', 'Services | Taxi Den Bosch'),
        'contact': ('Get in Touch', 'Contact | Taxi Den Bosch'),
    }

    # ---------- Every page: heading, title, active nav, links, placeholders ----------
    for name, (h1, title) in pages.items():
        go(page, f'#/{name}')
        check(f'{name}: renders its h1', page.locator('main h1').inner_text().strip() == h1, page.locator('main h1').inner_text())
        check(f'{name}: document title', page.title() == title, page.title())
        current = page.locator('.nav a[aria-current="page"]').all_inner_texts()
        check(f'{name}: exactly one active nav item', current == [name.capitalize()], current)
        hrefs = page.eval_on_selector_all('a[href^="#"]', 'els => els.map(e => e.getAttribute("href"))')
        bad = [h for h in hrefs if not ROUTE_RE.match(h)]
        check(f'{name}: every in-app link is a valid route', not bad, bad)
        anchors = [h for h in hrefs if re.match(r'^#[a-z-]+$', h) and h not in ('#book', '#top', '#main')]
        check(f'{name}: no stray homepage-only anchors', not anchors, anchors)
        text = page.inner_text('body')
        leaked = [s for s in PLACEHOLDERS if s in text]
        check(f'{name}: no mockup placeholder details', not leaked, leaked)
        broken = page.eval_on_selector_all('img', 'els => els.filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src)')
        check(f'{name}: no broken images', not broken, broken)
        check(f'{name}: book CTA goes to booking entry', page.locator('main a[href="#book"]').count() >= (0 if name == 'contact' else 1))

    # ---------- Navigation between pages ----------
    go(page, '')
    page.locator('.nav').get_by_role('link', name='About').click()
    page.wait_for_function("location.hash === '#/about'")
    page.wait_for_timeout(200)
    check('nav: Home → About', page.locator('main h1').inner_text().startswith('Your Trusted'))
    check('nav: focus moves to new page heading', page.evaluate("document.activeElement.tagName") == 'H1')
    check('nav: page starts at top', page.evaluate('window.scrollY') < 5)
    page.locator('.nav').get_by_role('link', name='Home').click()
    page.wait_for_timeout(300)
    check('nav: back to Home', page.locator('.hero #book').count() == 1 and
          page.locator('.nav a[aria-current="page"]').inner_text() == 'Home')
    page.go_back()
    page.wait_for_timeout(300)
    check('browser back returns to About', page.evaluate('location.hash') == '#/about')

    go(page, '#/about')
    page.locator('.page-hero').get_by_role('link', name='Book a Taxi').click()
    page.wait_for_timeout(500)
    check('about: Book a Taxi → hero booking card', page.evaluate('location.hash') == '#book' and page.locator('#entry-pickup').is_visible())

    # Footer deep link to one service.
    go(page, '#/contact')
    page.locator('footer').get_by_role('link', name='Airport Transfers').click()
    page.wait_for_timeout(500)
    box = page.locator('#service-airport').bounding_box()
    check('footer: service link opens Services at that card', page.evaluate('location.hash') == '#/services/airport' and box and abs(box['y']) < 80, box)

    # ---------- Services page ----------
    go(page, '#/services')
    titles = page.locator('.cards--services .card__title').all_inner_texts()
    check('services: six services', titles == ['Local Taxi Services', 'Airport Transfers', 'Business & Executive Transport',
                                              'Wedding & Event Transport', 'Group Transport & Taxi Vans', 'Private Tours'], titles)
    check('services: card titles are h2', page.locator('.cards--services h2.card__title').count() == 6)
    actions = page.eval_on_selector_all('.cards--services .card__action', 'els => els.map(e => [e.closest("article").id, e.getAttribute("href")])')
    expected = {'service-local': '#book', 'service-airport': '#book', 'service-business': '#/contact/business',
                'service-events': '#/contact/events', 'service-groups': '#book', 'service-tours': '#/contact/tours'}
    check('services: each card has a real action', dict(actions) == expected, actions)
    check('services: verified tags only', page.locator('#service-groups .card__tags').inner_text() == 'Up to 7 passengers')
    check('services: images reserve space (16:10 slots)', all(
        abs(bb['width'] / bb['height'] - 1.6) < .05 for bb in
        [page.locator('.cards--services .card__media').nth(i).bounding_box() for i in range(6)]))
    check('services: no prices on page', '€' not in page.inner_text('main'))
    page.locator('#service-business .card__action').click()
    page.wait_for_function("location.hash === '#/contact/business'")
    page.wait_for_timeout(200)
    check('services → contact with subject preset', page.input_value('#c-subject') == 'business')
    help_links = None
    go(page, '#/services')
    help_links = page.eval_on_selector_all('.cta-band a', 'els => els.map(e => e.getAttribute("href"))')
    check('services: help CTA uses verified contact routes', help_links == ['tel:+31732340600', 'https://wa.me/31644479990', '#/contact'], help_links)

    # ---------- Contact page ----------
    go(page, '#/contact')
    details = page.eval_on_selector_all('.contact-details a', 'els => els.map(e => e.getAttribute("href"))')
    check('contact: tel / WhatsApp / mailto links', details == ['tel:+31732340600', 'https://wa.me/31644479990', 'mailto:Sneltaxidenbosch@hotmail.com'], details)
    check('contact: hours shown', '24 hours a day, 7 days a week' in page.locator('.contact-details').inner_text())
    check('contact: no embedded map; maps link to published address',
          page.locator('iframe').count() == 0 and 'Klokkenlaan' in unquote(page.locator('.contact-location__btn').get_attribute('href')))
    check('contact: notice that the site does not send', "doesn't send messages from the website" in page.locator('.contact-form__notice').inner_text())
    labels = page.eval_on_selector_all('.contact-form input, .contact-form select, .contact-form textarea', 'els => els.map(e => e.labels[0] && e.labels[0].textContent)')
    check('contact: every field has a visible label', all(labels) and len(labels) == 5, labels)
    types = page.eval_on_selector_all('.contact-form input', 'els => els.map(e => e.type)')
    check('contact: appropriate input types', types == ['text', 'email', 'tel'], types)

    send = page.get_by_role('button', name='Send by Email')
    send.click()
    check('contact: required fields flagged', all(page.locator(f'#c-{k}-err').is_visible() for k in ('name', 'email', 'message')))
    check('contact: phone optional (no error)', page.locator('#c-phone-err').count() == 0)
    check('contact: form-level alert', page.get_by_role('alert').is_visible())
    check('contact: focus on first invalid field', page.evaluate('document.activeElement.id') == 'c-name')
    page.fill('#c-name', 'Anna de Vries')
    check('contact: typing clears error', page.locator('#c-name-err').count() == 0)
    page.fill('#c-email', 'anna@')
    page.fill('#c-phone', '12')
    page.fill('#c-message', 'short')
    send.click()
    check('contact: invalid email / phone / short message', all(page.locator(f'#c-{k}-err').is_visible() for k in ('email', 'phone', 'message')))
    page.fill('#c-email', 'anna@example.com')
    page.fill('#c-phone', '+31 6 1234 5678')
    page.select_option('#c-subject', 'fare')
    page.fill('#c-message', 'Fixed fare to Schiphol on Friday at 06:00 for 3 people, please.')
    check('contact: message counter', '1937 characters left' in page.locator('#c-message-hint').inner_text())

    page.get_by_role('button', name='Send via WhatsApp').click()
    page.wait_for_timeout(200)
    opened = page.evaluate('window.__opened')
    wa = opened[-1] if opened else ''
    check('contact: WhatsApp hand-off to verified number', wa.startswith('https://wa.me/31644479990?text='), wa[:60])
    check('contact: WhatsApp text includes subject + message + name',
          all(s in unquote(wa) for s in ('Fixed fare request', 'Schiphol on Friday', 'Anna de Vries')))
    status = page.locator('.contact-form--status').inner_text()
    check('contact: truthful hand-off status', 'Nothing has been sent from this website' in status)
    check('contact: status heading focused', page.evaluate('document.activeElement.className') == 'contact-form__status-title')
    page.get_by_role('button', name='Edit message').click()
    check('contact: edit keeps values', page.input_value('#c-message').startswith('Fixed fare') and page.input_value('#c-subject') == 'fare')

    send = page.get_by_role('button', name='Send by Email')
    send.click()
    page.wait_for_timeout(300)
    mail = page.locator('.contact-form--status a.btn').get_attribute('href') or ''
    check('contact: email hand-off to verified address', mail.startswith('mailto:Sneltaxidenbosch@hotmail.com?subject='), mail[:60])
    check('contact: email body includes details', all(s in unquote(mail) for s in ('Schiphol on Friday', 'anna@example.com', '+31 6 1234 5678')))
    check('contact: no fake "sent" message', 'Message sent' not in page.inner_text('main'))

    # ---------- Mobile: menu active state, overflow, order, touch targets ----------
    page.set_viewport_size({'width': 390, 'height': 844})
    go(page, '#/services')
    page.get_by_role('button', name='Menu').click()
    cur = page.locator('#mobile-menu a[aria-current="page"]').all_inner_texts()
    check('mobile menu: active page marked', cur == ['Services'], cur)
    page.locator('#mobile-menu').get_by_role('link', name='Contact').click()
    page.wait_for_timeout(400)
    check('mobile menu: navigates and closes', page.evaluate('location.hash') == '#/contact' and page.locator('#mobile-menu').count() == 0)
    d_y = page.locator('.contact-page__details').bounding_box()['y']
    f_y = page.locator('.contact-page__form').bounding_box()['y']
    check('mobile contact: details before form', d_y < f_y)
    small = page.evaluate("""() => [...document.querySelectorAll('.contact-form .input, .contact-form .btn, .contact-details a, .header__menu-btn')]
        .filter(el => el.getBoundingClientRect().height < 40 && getComputedStyle(el).display !== 'inline').map(el => el.className)""")
    check('mobile: form controls ≥ 40px tall', not small, small)

    go(page, '#/about')
    page.keyboard.press('Tab')
    check('skip link is first tab stop', page.evaluate('document.activeElement.textContent') == 'Skip to content')
    page.keyboard.press('Enter')
    page.wait_for_timeout(200)
    check('skip link stays on page and focuses main', page.evaluate('location.hash') == '#/about'
          and page.evaluate('document.activeElement.id') == 'main')

    for name in pages:
        go(page, f'#/{name}')
        for w in (320, 375, 768, 1024, 1440, 1920):
            page.set_viewport_size({'width': w, 'height': 900})
            page.wait_for_timeout(120)
            sw = page.evaluate('document.documentElement.scrollWidth')
            check(f'{name}: no horizontal overflow @{w}', sw <= w, sw)
        miss = page.evaluate("""() => [...document.querySelectorAll('a[href],button,input,select,textarea')]
          .filter(el => !((el.labels && el.labels.length) || el.getAttribute('aria-label') || (el.textContent||'').trim()))
          .map(el => el.outerHTML.slice(0, 80))""")
        check(f'{name}: every control has a name', not miss, miss)
        page.set_viewport_size({'width': 390, 'height': 844})

    check('no console errors/warnings', not errors, errors[:5])
    check('no failed requests', not failed, failed[:5])
    b.close()

ok = sum(r[1] for r in results)
for name, passed, detail in results:
    print(('PASS ' if passed else 'FAIL ') + name + (f'  -> {detail}' if not passed and detail != '' else ''))
print(f'\n{ok}/{len(results)} passed')
sys.exit(0 if ok == len(results) else 1)
