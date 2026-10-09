"""Interaction QA against a running build. Usage: python3 qa.py <url>"""
import sys, datetime
from playwright.sync_api import sync_playwright

URL = sys.argv[1]
results = []


def check(name, cond, detail=''):
    results.append((name, bool(cond), detail))


with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={'width': 390, 'height': 844}, geolocation={'latitude': 51.69, 'longitude': 5.30},
                        permissions=['geolocation'])
    page = ctx.new_page()
    errors = []
    page.on('console', lambda m: errors.append(m.text) if m.type in ('error', 'warning') else None)
    page.on('pageerror', lambda e: errors.append(str(e)))
    failed = []
    page.on('requestfailed', lambda r: failed.append(r.url))
    page.on('response', lambda r: failed.append(f'{r.status} {r.url}') if r.status >= 400 else None)
    page.goto(URL, wait_until='networkidle')

    # --- Anchors all resolve
    missing = page.evaluate("""() => [...document.querySelectorAll('a[href^="#"]')]
        .map(a => a.getAttribute('href')).filter(h => h.length > 1 && !document.getElementById(h.slice(1)))""")
    check('all in-page anchors resolve', not missing, missing)

    # --- Mobile menu
    btn = page.get_by_role('button', name='Menu')
    btn.click()
    check('menu opens', page.locator('#mobile-menu').is_visible())
    check('aria-expanded true', page.get_by_role('button', name='Close').get_attribute('aria-expanded') == 'true')
    page.keyboard.press('Escape')
    check('Escape closes menu', page.locator('#mobile-menu').count() == 0)
    check('focus returns to toggle', page.evaluate("document.activeElement.textContent") == 'Menu')
    page.get_by_role('button', name='Menu').click()
    page.locator('#mobile-menu a', has_text='Airport Transfers').click()
    page.wait_for_timeout(400)
    check('menu link closes menu', page.locator('#mobile-menu').count() == 0)

    # --- FAQ
    faq_btns = page.locator('.faq__btn')
    check('first FAQ open by default', faq_btns.nth(0).get_attribute('aria-expanded') == 'true')
    faq_btns.nth(2).click()
    check('opening another FAQ closes first', faq_btns.nth(0).get_attribute('aria-expanded') == 'false'
          and faq_btns.nth(2).get_attribute('aria-expanded') == 'true')
    check('open panel visible', page.locator('#faq-2').is_visible())
    faq_btns.nth(2).focus(); page.keyboard.press('Enter')
    check('keyboard Enter toggles FAQ closed', faq_btns.nth(2).get_attribute('aria-expanded') == 'false')
    check('closed panel hidden', not page.locator('#faq-2').is_visible())

    # --- Booking: empty submit
    page.locator('#book').scroll_into_view_if_needed()
    page.get_by_role('button', name='Calculate Fare & Book').click()
    check('form alert shown', page.get_by_role('alert').inner_text() == 'Please check the highlighted fields.')
    check('pickup error', page.locator('#booking-pickup-err').is_visible())
    check('aria-invalid set', page.locator('#booking-pickup').get_attribute('aria-invalid') == 'true')
    check('focus moved to first invalid', page.evaluate('document.activeElement.id') == 'booking-pickup')
    page.fill('#booking-pickup', 'Station')
    check('typing clears field error', page.locator('#booking-pickup-err').count() == 0)

    # same address
    page.fill('#booking-dest', 'station')
    page.get_by_role('button', name='Calculate Fare & Book').click()
    check('same-address error', 'must differ' in page.locator('#booking-dest-err').inner_text())

    # geolocation
    page.get_by_role('button', name='Use current location').click()
    page.wait_for_timeout(500)
    check('geolocation fills pickup', page.input_value('#booking-pickup').startswith('Current location (51.69'))

    # swap
    page.fill('#booking-pickup', "'s-Hertogenbosch Central Station")
    page.fill('#booking-dest', 'Eindhoven Airport')
    page.get_by_role('button', name='Swap pickup location and destination').click()
    check('swap works', page.input_value('#booking-pickup') == 'Eindhoven Airport')
    page.get_by_role('button', name='Swap pickup location and destination').click()

    # stop add/remove + validation
    page.get_by_role('button', name='+ Add a Stop').click()
    check('stop field appears', page.locator('#booking-stop').is_visible())
    page.get_by_role('button', name='Remove stop').click()
    check('stop removed', page.locator('#booking-stop').count() == 0)
    page.get_by_role('button', name='+ Add a Stop').click()
    page.fill('#booking-stop', 'Vught')

    # too-soon time
    now = datetime.datetime.now()
    page.fill('#booking-date', now.strftime('%Y-%m-%d'))
    page.fill('#booking-time', now.strftime('%H:%M'))
    page.get_by_role('button', name='Calculate Fare & Book').click()
    check('too-soon time rejected', '15 minutes' in page.locator('#booking-time-err').inner_text())

    tomorrow = (now + datetime.timedelta(days=1)).strftime('%Y-%m-%d')
    page.fill('#booking-date', tomorrow)
    page.fill('#booking-time', '06:30')

    # return trip ordering
    page.get_by_role('button', name='Return', exact=True).click()
    check('return fields appear', page.locator('#booking-rdate').is_visible())
    check('return min tracks pickup date', page.get_attribute('#booking-rdate', 'min') == tomorrow)
    page.fill('#booking-rdate', tomorrow)
    page.fill('#booking-rtime', '06:00')
    page.get_by_role('button', name='Calculate Fare & Book').click()
    check('return-before-outward rejected', 'after the outward' in page.locator('#booking-rtime-err').inner_text())
    page.fill('#booking-rtime', '18:00')

    # passengers & luggage
    page.select_option('#booking-pax', '6')
    check('large group note', page.locator('.booking__note').is_visible())
    page.get_by_role('button', name='Yes', exact=True).click()
    check('luggage pressed', page.get_by_role('button', name='Yes', exact=True).get_attribute('aria-pressed') == 'true')

    # submit -> loading -> done
    page.get_by_role('button', name='Calculate Fare & Book').click()
    check('loading state', page.locator('.booking__submit').is_disabled()
          and 'Checking details' in page.locator('.booking__submit').inner_text())
    page.wait_for_selector('.summary', timeout=4000)
    s = page.locator('.summary').inner_text()
    check('summary shows TEST MODE', 'TEST MODE' in s)
    check('summary says not sent', 'not' in s and 'been sent' in s)
    check('summary lists via stop', '(via Vught)' in s)
    check('summary lists return', 'Return ·' in s and '18:00' in s)
    check('summary pax/luggage', '6 passengers · with luggage' in s)
    check('summary heading focused', page.evaluate('document.activeElement.className') == 'summary__title')
    page.get_by_role('button', name='Edit Journey').click()
    check('edit keeps values', page.input_value('#booking-stop') == 'Vught')

    # --- Keyboard focus visibility (first tab stop = skip link)
    page.goto(URL, wait_until='networkidle')
    page.keyboard.press('Tab')
    outline = page.evaluate("getComputedStyle(document.activeElement).outlineStyle + ' ' + document.activeElement.textContent")
    check('skip link is first tab stop with visible focus', outline.startswith('solid') and 'Skip' in outline, outline)

    # --- Accessible names on controls
    unnamed = page.evaluate("""() => [...document.querySelectorAll('input,select,button,a')].filter(el => {
        const lab = el.labels && el.labels.length; const n = (el.getAttribute('aria-label')||el.textContent||'').trim();
        return !lab && !n; }).map(el => el.outerHTML.slice(0, 80))""")
    check('every control has a name', not unnamed, unnamed)

    # --- Overflow at several widths
    for w in (320, 375, 768, 1024, 1280, 1920):
        page.set_viewport_size({'width': w, 'height': 900})
        page.wait_for_timeout(150)
        sw = page.evaluate('document.documentElement.scrollWidth')
        check(f'no horizontal overflow @{w}', sw <= w, sw)

    check('no console errors/warnings', not errors, errors[:5])
    check('no failed requests', not failed, failed[:5])
    b.close()

ok = sum(r[1] for r in results)
for name, passed, detail in results:
    print(('PASS ' if passed else 'FAIL ') + name + (f'  -> {detail}' if not passed and detail else ''))
print(f'\n{ok}/{len(results)} passed')
