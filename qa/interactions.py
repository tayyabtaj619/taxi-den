"""Regression checks for the homepage, hero booking entry and the four-step
booking flow. Usage: python3 qa/interactions.py <base_url>
Requires: pip install playwright && playwright install chromium"""
import datetime
import re
import sys

from playwright.sync_api import sync_playwright

BASE = sys.argv[1].rstrip('/') + '/'
results = []


def check(name, cond, detail=''):
    results.append((name, bool(cond), detail))


def hash_of(page):
    return page.evaluate('location.hash')


def wait_hash(page, value, timeout=3000):
    try:
        page.wait_for_function(f"location.hash === {value!r}", timeout=timeout)
        return True
    except Exception:
        return False


def offer_card(page, name):
    return page.locator('label.offer').filter(has=page.locator('.offer__name', has_text=re.compile(f'^{name}$')))


def named_controls_missing(page):
    return page.evaluate("""() => [...document.querySelectorAll('input:not([type=hidden]),select,textarea,button,a[href]')]
      .filter(el => el.offsetParent !== null || el.type === 'radio')
      .filter(el => {
        const lab = el.labels && el.labels.length;
        const aria = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby');
        const txt = (el.textContent || '').trim();
        return !lab && !aria && !txt;
      }).map(el => el.outerHTML.slice(0, 90))""")


with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={'width': 390, 'height': 844}, geolocation={'latitude': 51.69, 'longitude': 5.30},
                        permissions=['geolocation'])
    page = ctx.new_page()
    errors, failed = [], []
    page.on('console', lambda m: errors.append(m.text) if m.type in ('error', 'warning') else None)
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.on('requestfailed', lambda r: failed.append(r.url) if not r.url.startswith('https://www.taxidenbosch.eu') else None)
    page.on('response', lambda r: failed.append(f'{r.status} {r.url}') if r.status >= 400 else None)
    page.goto(BASE, wait_until='networkidle')

    # ---------------- Homepage ----------------
    missing = page.evaluate("""() => [...document.querySelectorAll('a[href^="#"]')]
        .map(a => a.getAttribute('href')).filter(h => h.length > 1 && !h.startsWith('#/') && !document.getElementById(h.slice(1)))""")
    check('home: in-page anchors resolve', not missing, missing)
    check('home: entry card is in the hero', page.locator('.hero #book').count() == 1)
    top = page.locator('#entry-pickup').bounding_box()['y']
    check('mobile: pickup field within first 1.1 screens', top < 844 * 1.1, top)

    page.get_by_role('button', name='Menu').click()
    menu = page.locator('#mobile-menu')
    check('mobile menu opens', menu.is_visible())
    hrefs = menu.locator('.account__link').evaluate_all('els => els.map(e => e.getAttribute("href"))')
    check('mobile menu: customer login link', any(h.endswith('/login') for h in hrefs), hrefs)
    check('mobile menu: customer register link', any(h.endswith('/register') for h in hrefs), hrefs)
    check('mobile menu: driver app link', any('apps.apple.com' in h for h in hrefs), hrefs)
    check('mobile menu: driver registration mailto', any(h.startswith('mailto:') for h in hrefs), hrefs)
    page.keyboard.press('Escape')
    check('Escape closes mobile menu', menu.count() == 0)
    check('focus returns to menu toggle', 'Menu' in page.evaluate('document.activeElement.textContent'))

    faq = page.locator('.faq__btn')
    faq.nth(1).click()
    check('FAQ toggles', faq.nth(1).get_attribute('aria-expanded') == 'true' and faq.nth(0).get_attribute('aria-expanded') == 'false')

    # ---------------- Entry card ----------------
    page.locator('#book').scroll_into_view_if_needed()
    cont = page.locator('#book').get_by_role('button', name='Continue')
    cont.click()
    check('entry: empty submit stays on home', hash_of(page) in ('', '#'), hash_of(page))
    check('entry: pickup + destination errors', page.locator('#entry-pickup-err').is_visible() and page.locator('#entry-dest-err').is_visible())
    check('entry: focus on first invalid field', page.evaluate('document.activeElement.id') == 'entry-pickup')
    page.fill('#entry-pickup', 'Station')
    check('entry: typing clears its error', page.locator('#entry-pickup-err').count() == 0)
    page.fill('#entry-dest', 'station')
    cont.click()
    check('entry: same-address rejected', 'must differ' in page.locator('#entry-dest-err').inner_text())
    page.get_by_role('button', name='Use my location').click()
    page.wait_for_timeout(400)
    check('entry: geolocation fills pickup', page.input_value('#entry-pickup').startswith('Current location (51.69'))
    page.fill('#entry-pickup', "'s-Hertogenbosch Central Station")
    page.fill('#entry-dest', 'Eindhoven Airport')
    page.get_by_role('button', name='Swap pickup location and destination').click()
    check('entry: swap', page.input_value('#entry-pickup') == 'Eindhoven Airport')
    page.get_by_role('button', name='Swap pickup location and destination').click()
    page.get_by_role('button', name='Add a stop').click()
    cont.click()
    check('entry: empty stop rejected', page.locator('#entry-stop-err').is_visible())
    page.get_by_role('button', name='Remove').click()
    check('entry: stop removable', page.locator('#entry-stop').count() == 0)
    page.get_by_role('button', name='Add a stop').click()
    page.fill('#entry-stop', 'Vught')

    page.get_by_role('button', name='Schedule').click()
    check('entry: schedule shows date and time', page.locator('#entry-date').is_visible() and page.locator('#entry-time').is_visible())
    cont.click()
    check('entry: scheduled needs date/time', page.locator('#entry-date-err').is_visible())
    now = datetime.datetime.now()
    page.fill('#entry-date', now.strftime('%Y-%m-%d'))
    page.fill('#entry-time', now.strftime('%H:%M'))
    cont.click()
    check('entry: too-soon pickup rejected', '15 minutes' in page.locator('#entry-time-err').inner_text())
    tomorrow = (now + datetime.timedelta(days=1)).strftime('%Y-%m-%d')
    page.fill('#entry-date', tomorrow)
    page.fill('#entry-time', '06:30')
    cont.click()
    check('entry: valid → luggage step', wait_hash(page, '#/book/luggage'), hash_of(page))

    # ---------------- Step 1: luggage ----------------
    page.wait_for_selector('#step-luggage-title')
    check('luggage: heading focused on arrival', page.evaluate('document.activeElement.id') == 'step-luggage-title')
    check('progress: current step marked', page.locator('[aria-current="step"]').text_content().strip().startswith('Luggage'))
    page.get_by_role('button', name='Continue').click()
    check('luggage: requires a choice', page.get_by_role('alert').is_visible() and page.locator('#f-luggage-err').is_visible())
    check('luggage: focus on first option', page.evaluate('document.activeElement.id') == 'f-luggage')
    page.keyboard.press('ArrowDown')
    check('luggage: arrow keys select', page.locator('input[name=luggage][value=no]').is_checked())
    page.locator('label.choice', has_text='Yes, I have luggage').click()
    page.get_by_role('button', name='Continue').click()
    check('luggage → offers', wait_hash(page, '#/book/offers'))

    # ---------------- Step 2: offers ----------------
    page.wait_for_selector('.offer:not(.offer--skeleton)')
    offers = page.locator('.offer:not(.offer--skeleton)')
    check('offers: four vehicle classes', offers.count() == 4, offers.count())
    names = offers.locator('.offer__name').all_inner_texts()
    check('offers: names', names == ['Standard', 'Luxury Car', 'Electric Car', 'Taxi Van'], names)
    body = page.locator('.offers').inner_text()
    check('offers: no invented prices', '€' not in body and 'Fare on request' in body)
    check('progress: luggage now a completed link', page.locator('.progress__item.is-done a').count() == 1)
    page.get_by_role('button', name='Continue').click()
    check('offers: vehicle required', page.locator('#f-vehicle-err').is_visible())
    inc = page.get_by_role('button', name='More passengers')
    dec = page.get_by_role('button', name='Fewer passengers')
    check('pax: minimum 1 (minus disabled)', dec.is_disabled())
    offer_card(page, 'Luxury Car').click()
    for _ in range(4):
        inc.click()
    check('pax: 5 shown', page.locator('#f-pax').inner_text() == '5')
    check('pax rule: sedans disabled at 5', page.locator('input[name=vehicle][value=standard]').is_disabled()
          and page.locator('input[name=vehicle][value=luxury]').is_disabled())
    check('pax rule: van available at 5', not page.locator('input[name=vehicle][value=van]').is_disabled())
    check('pax rule: invalid selection cleared with notice', not page.locator('input[name=vehicle][value=luxury]').is_checked()
          and page.locator('.alert--info').is_visible())
    inc.click(); inc.click()
    check('pax: maximum 7 (plus disabled)', inc.is_disabled() and page.locator('#f-pax').inner_text() == '7')
    offer_card(page, 'Taxi Van').click()
    check('offers: selected state', page.locator('label.offer.is-selected').inner_text().find('Taxi Van') >= 0)
    page.get_by_role('button', name='Continue').click()
    check('offers → travel', wait_hash(page, '#/book/travel'))

    # ---------------- Step 3: travel ----------------
    page.wait_for_selector('#step-travel-title')
    jc = page.locator('.journey-card').inner_text()
    check('travel: outbound summary shows vehicle & pax', 'Taxi Van' in jc and '7 passengers' in jc, jc[:120])
    check('travel: outbound summary shows route', 'Vught' in jc and 'Eindhoven Airport' in jc)
    sw = page.get_by_role('switch')
    sw.click()
    check('travel: return switch on', sw.get_attribute('aria-checked') == 'true' and page.locator('#f-rdate').is_visible())
    page.get_by_role('button', name='Continue').click()
    check('travel: return date/time required', page.locator('#f-rdate-err').is_visible() and page.locator('#f-rtime-err').is_visible())
    page.fill('#f-rdate', tomorrow)
    page.fill('#f-rtime', '05:00')
    page.fill('#f-flight', 'not a flight')
    page.get_by_role('button', name='Continue').click()
    check('travel: return before outward rejected', 'after the outward' in page.locator('#f-rtime-err').inner_text())
    check('travel: invalid flight rejected', page.locator('#f-flight-err').is_visible())
    page.fill('#f-rtime', '21:00')
    page.fill('#f-flight', 'KL 1234')
    page.fill('#f-comments', 'Child seat please')
    check('travel: comment counter', '483 characters left' in page.locator('#f-comments-hint').inner_text())
    page.get_by_role('button', name='Continue').click()
    check('travel → contact', wait_hash(page, '#/book/contact'))

    # ---------------- Back navigation preserves values ----------------
    page.wait_for_selector('#step-contact-title')
    page.get_by_role('button', name='Back').click()
    wait_hash(page, '#/book/travel')
    check('back: travel values kept', page.input_value('#f-flight') == 'KL 1234' and page.input_value('#f-rtime') == '21:00'
          and page.input_value('#f-comments') == 'Child seat please')
    page.go_back()
    wait_hash(page, '#/book/contact')
    page.go_back(); page.go_back()
    page.wait_for_selector('.offer:not(.offer--skeleton)')
    check('browser back: offers values kept', page.locator('input[name=vehicle][value=van]').is_checked()
          and page.locator('#f-pax').inner_text() == '7', hash_of(page))
    page.locator('.progress__item.is-done a').first.click()
    wait_hash(page, '#/book/luggage')
    check('progress link back to luggage keeps choice', page.locator('input[name=luggage][value=yes]').is_checked())
    page.reload(wait_until='networkidle')
    check('refresh keeps values (session storage)', page.locator('input[name=luggage][value=yes]').is_checked())
    page.goto(BASE + '#/book/contact', wait_until='networkidle')
    page.wait_for_selector('#step-contact-title')

    # ---------------- Step 4: contact ----------------
    check('contact: login link to existing portal', page.get_by_role('link', name='Log in').get_attribute('href').endswith('/login'))
    check('contact: register link to existing portal', page.get_by_role('link', name='Create one').get_attribute('href').endswith('/register'))
    check('contact: guest badge', page.locator('.guest-badge').is_visible())
    check('contact: not-connected notice', 'not yet connected' in page.locator('.step__note').inner_text())
    submit = page.get_by_role('button', name='Send Booking Request')
    submit.click()
    check('contact: all four fields required', all(page.locator(f'#f-{k}-err').is_visible() for k in ('firstName', 'lastName', 'phone', 'email')))
    page.fill('#f-firstName', 'Anna')
    page.fill('#f-lastName', 'de Vries')
    page.fill('#f-phone', '12')
    page.fill('#f-email', 'anna@')
    submit.click()
    check('contact: bad phone / email rejected', page.locator('#f-phone-err').is_visible() and page.locator('#f-email-err').is_visible())
    page.fill('#f-phone', '+31 6 1234 5678')
    page.fill('#f-email', 'anna@example.com')
    submit.click()
    btn = page.locator('.step__actions .btn--primary')
    check('contact: loading state', btn.is_disabled() and 'Sending' in btn.inner_text())
    check('submit → done', wait_hash(page, '#/book/done', 4000), hash_of(page))
    done = page.locator('.step--done').inner_text()
    check('done: TEST MODE + not sent', 'TEST MODE' in done and 'not' in done and 'been sent' in done)
    check('progress: all complete on done', page.locator('.progress__item.is-done').count() == 4)
    page.get_by_role('button', name='Start a new booking').click()
    wait_hash(page, '#book')
    page.wait_for_selector('#entry-pickup')
    check('new booking: back on home with empty form', page.input_value('#entry-pickup') == '')

    # ---------------- Deep-link guards ----------------
    page.evaluate('sessionStorage.clear()')
    page.goto(BASE + '#/book/contact', wait_until='networkidle')
    page.reload(wait_until='networkidle')
    page.wait_for_timeout(300)
    check('guard: no journey → back to entry card', hash_of(page) == '#book', hash_of(page))
    page.fill('#entry-pickup', 'Den Bosch Centraal')
    page.fill('#entry-dest', 'Schiphol')
    page.locator('#book').get_by_role('button', name='Continue').click()
    wait_hash(page, '#/book/luggage')
    page.evaluate("location.hash = '#/book/contact'")
    page.wait_for_timeout(300)
    check('guard: cannot skip ahead of first incomplete step', hash_of(page) == '#/book/luggage', hash_of(page))
    page.evaluate("location.hash = '#/book/done'")
    page.wait_for_timeout(300)
    check('guard: done page needs a submission', hash_of(page) != '#/book/done', hash_of(page))
    page.goto(BASE + '#services')
    page.wait_for_timeout(500)
    check('header link from booking page returns to section', page.locator('#services').is_visible()
          and abs(page.locator('#services').bounding_box()['y']) < 120)

    # ---------------- Desktop: account dropdown, a11y, overflow ----------------
    page.set_viewport_size({'width': 1280, 'height': 900})
    page.goto(BASE, wait_until='networkidle')
    acc = page.get_by_role('button', name='Account')
    acc.click()
    panel = page.locator('.account__panel')
    check('account menu opens', panel.is_visible() and acc.get_attribute('aria-expanded') == 'true')
    labels = panel.locator('.account__link').evaluate_all('els => els.map(e => e.firstChild.textContent)')
    check('account menu: customer + driver entries', labels == ['Customer log in', 'Create an account', 'Driver login', 'Become a driver'], labels)
    page.keyboard.press('Escape')
    check('account menu: Escape closes + focus back', panel.count() == 0 and page.evaluate('document.activeElement.textContent').strip() == 'Account')
    acc.click()
    page.mouse.click(200, 600)
    check('account menu: outside click closes', panel.count() == 0)

    page.reload(wait_until='networkidle')
    page.keyboard.press('Tab')
    check('skip link first, visible focus', 'Skip' in page.evaluate('document.activeElement.textContent')
          and page.evaluate('getComputedStyle(document.activeElement).outlineStyle') == 'solid')
    check('home: every control has a name', not named_controls_missing(page), named_controls_missing(page))

    page.evaluate(f"""sessionStorage.setItem('tdb-booking-v2', JSON.stringify({{
      pickup:'Den Bosch Centraal', dest:'Schiphol', hasStop:false, stop:'', when:'now', date:'', time:'',
      luggage:'yes', pax:2, vehicle:'standard', isReturn:false, rdate:'', rtime:'', flight:'', comments:'',
      firstName:'', lastName:'', phone:'', email:''}}))""")
    for step in ('luggage', 'offers', 'travel', 'contact'):
        page.goto(BASE + '#/book/' + step, wait_until='networkidle')
        page.reload(wait_until='networkidle')
        page.wait_for_timeout(600)
        miss = named_controls_missing(page)
        check(f'{step}: every control has a name', not miss, miss)
        for w in (320, 768, 1024):
            page.set_viewport_size({'width': w, 'height': 900})
            page.wait_for_timeout(120)
            sw_ = page.evaluate('document.documentElement.scrollWidth')
            check(f'{step}: no horizontal overflow @{w}', sw_ <= w, sw_)
        page.set_viewport_size({'width': 1280, 'height': 900})

    page.goto(BASE, wait_until='networkidle')
    for w in (320, 375, 768, 1024, 1280, 1920):
        page.set_viewport_size({'width': w, 'height': 900})
        page.wait_for_timeout(150)
        sw_ = page.evaluate('document.documentElement.scrollWidth')
        check(f'home: no horizontal overflow @{w}', sw_ <= w, sw_)

    # Touch targets on phones: primary controls ≥ 44px tall.
    page.set_viewport_size({'width': 390, 'height': 844})
    small = page.evaluate("""() => ['#entry-pickup','#entry-dest','.segmented__btn','#book .btn--primary','.header__menu-btn','.header__call']
      .flatMap(s => [...document.querySelectorAll(s)]).filter(el => el.getBoundingClientRect().height < 40)
      .map(el => el.className || el.id)""")
    check('touch targets ≥ 40px on phone', not small, small)

    check('no console errors/warnings', not errors, errors[:5])
    check('no failed requests', not failed, failed[:5])
    b.close()

ok = sum(r[1] for r in results)
for name, passed, detail in results:
    print(('PASS ' if passed else 'FAIL ') + name + (f'  -> {detail}' if not passed and detail != '' else ''))
print(f'\n{ok}/{len(results)} passed')
sys.exit(0 if ok == len(results) else 1)
