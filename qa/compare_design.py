"""Screenshot the design reference and the implementation side by side.

Usage: python3 shots.py <out_dir> [widths...]
Blocked CDNs (unpkg, Google Fonts) are served from local node_modules.
"""
import pathlib, re, sys
from playwright.sync_api import sync_playwright

PROJ = pathlib.Path(__file__).resolve().parent.parent
NM = PROJ / 'node_modules'
OUT = pathlib.Path(sys.argv[1]); OUT.mkdir(parents=True, exist_ok=True)
WIDTHS = [int(w) for w in sys.argv[2:]] or [1440, 834, 390]

REF = 'http://localhost:4100/Taxi%20Den%20Bosch%20Homepage%20v2.dc.html'
IMPL = 'http://localhost:4200/'

font_css = ''
for w in (400, 500, 600, 700, 800):
    css = (NM / f'@fontsource/manrope/{w}.css').read_text()
    font_css += re.sub(r'url\(\./files/', 'url(https://fonts.gstatic.com/local/', css)


def route(r):
    url = r.request.url
    if 'unpkg.com/react@' in url:
        return r.fulfill(path=str(NM / 'react/umd/react.production.min.js'), content_type='application/javascript')
    if 'unpkg.com/react-dom@' in url:
        return r.fulfill(path=str(NM / 'react-dom/umd/react-dom.production.min.js'), content_type='application/javascript')
    if 'fonts.googleapis.com' in url:
        return r.fulfill(body=font_css, content_type='text/css')
    if 'fonts.gstatic.com/local/' in url:
        name = url.split('/local/')[1]
        return r.fulfill(path=str(NM / '@fontsource/manrope/files' / name), content_type='font/woff2')
    return r.continue_()


with sync_playwright() as p:
    b = p.chromium.launch()
    for w in WIDTHS:
        for label, url in (('ref', REF), ('impl', IMPL)):
            ctx = b.new_context(viewport={'width': w, 'height': 900})
            page = ctx.new_page()
            logs = []
            page.on('console', lambda m: logs.append(f'{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
            page.on('pageerror', lambda e: logs.append(f'pageerror: {e}'))
            page.route('**/*', route)
            page.goto(url, wait_until='networkidle')
            page.wait_for_timeout(600)
            page.evaluate('document.fonts.ready')
            h = page.evaluate('document.documentElement.scrollHeight')
            sw = page.evaluate('document.documentElement.scrollWidth')
            page.screenshot(path=str(OUT / f'{label}-{w}.png'), full_page=True)
            print(f'{label} {w}: height={h} scrollWidth={sw} logs={logs[:5]}')
            ctx.close()
    b.close()
