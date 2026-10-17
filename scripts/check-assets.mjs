// Asset check — runs before every production build (`npm run build`) and on
// its own with `npm run check:assets`.
//
// Photos are static imports from src/images/ in the component that renders
// them. Vite resolves those imports to fingerprinted URLs.
//
// Fails (exit 1) when:
//   - a static image import points at a file that does not exist (exact,
//     case-sensitive match)
//   - an image import lives outside src/images/
//   - source code uses a literal "/src/images/…" URL, a public/images path,
//     a content image object, or the old <Media image={…}> API
// Warns (no failure) about files in src/images that nothing imports, and
// about files left in public/images (Vite would copy those as-is).

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'src');
const imagesDir = join(srcDir, 'images');
const publicImagesDir = join(root, 'public', 'images');
const problems = [];
const warnings = [];

const walk = (dir) => {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
};

/** True only if every path segment exists with exactly this casing. */
function existsExact(absPath) {
  const rel = relative(root, absPath);
  if (!rel || rel.startsWith('..') || rel.includes(`..${sep}`)) return false;
  let dir = root;
  for (const part of rel.split(sep)) {
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      return false;
    }
    if (!entries.includes(part)) return false;
    dir = join(dir, part);
  }
  return statSync(dir).isFile();
}

const IMAGE_EXT = String.raw`(?:png|jpe?g|webp|avif|gif)`;
const IMPORT_RE = new RegExp(String.raw`import\s+\w+\s+from\s+(['"])([^'"]+\.${IMAGE_EXT})\1`, 'g');
const CSS_URL_RE = new RegExp(String.raw`url\(\s*(['"]?)([^'")]+?\.${IMAGE_EXT})\1\s*\)`, 'g');

const LEGACY = [
  [/['"`]\/src\/images\//, 'literal "/src/images/…" path (import the file so Vite can bundle it)'],
  [/['"`]\/images\//, 'public "/images/…" path (import from src/images/ instead)'],
  [/assets\/images/, 'reference to src/assets/images (import from src/images/)'],
  [/\.\.\/(\.\.\/)*public\//, 'relative path into public/ (import from src/images/)'],
  [/import\.meta\.glob\([^)]*images/, 'runtime image registry (import the file in the component)'],
  [/\brequire\s*\(\s*['"][^'"]+\.(?:png|jpe?g|webp|avif|gif)['"]\s*\)/, 'require() image load (use a static import)'],
  [/<Media\b[^>]*\bimage=/, 'old <Media image={…}> API (pass src and alt)'],
  [/\bimage\s*=\s*\{/, 'image={…} prop (pass the imported file as src)'],
];

const used = new Set();
let importCount = 0;

function recordImport(fromFile, spec) {
  importCount += 1;
  const abs = resolve(dirname(fromFile), spec.split('?')[0]);
  const rel = relative(root, abs);
  if (!existsExact(abs)) {
    problems.push(`${relative(root, fromFile)}: import "${spec}" → ${rel} does not exist (check spelling and letter case)`);
    return;
  }
  const fromImages = relative(imagesDir, abs);
  if (fromImages.startsWith('..') || fromImages.includes(`..${sep}`)) {
    problems.push(`${relative(root, fromFile)}: "${spec}" is outside src/images/`);
    return;
  }
  used.add(fromImages.split(sep).join('/'));
}

for (const file of walk(srcDir).filter((f) => /\.(jsx?|css)$/.test(f))) {
  const text = readFileSync(file, 'utf8');
  const relFile = relative(root, file);

  for (const [re, msg] of LEGACY) {
    if (re.test(text)) problems.push(`${relFile}: ${msg}`);
  }

  for (const match of text.matchAll(IMPORT_RE)) recordImport(file, match[2]);
  for (const match of text.matchAll(CSS_URL_RE)) {
    const spec = match[2];
    if (spec.startsWith('data:') || spec.startsWith('http:') || spec.startsWith('https:')) continue;
    if (spec.startsWith('/')) {
      problems.push(`${relFile}: CSS url("${spec}") is a public path; import the file from src/images/`);
      continue;
    }
    recordImport(file, spec);
  }
}

// Content must not carry image paths. Alt text stays as imageAlt.
const contentDir = join(srcDir, 'content');
const CONTENT_PATH = new RegExp(String.raw`['"][^'"]*\.${IMAGE_EXT}['"]|['"]\/images\/|['"]\/src\/images\/`);
for (const file of walk(contentDir).filter((f) => f.endsWith('.js'))) {
  const text = readFileSync(file, 'utf8');
  if (CONTENT_PATH.test(text) || /^\s*image\s*:/m.test(text)) {
    problems.push(`${relative(root, file)}: content still carries an image path or image object (import the file in the component; keep only imageAlt)`);
  }
}

for (const file of walk(imagesDir).filter((f) => new RegExp(String.raw`\.${IMAGE_EXT}$`, 'i').test(f))) {
  const url = relative(imagesDir, file).split(sep).join('/');
  if (!used.has(url)) warnings.push(`src/images/${url}`);
}

for (const file of walk(publicImagesDir).filter((f) => new RegExp(String.raw`\.${IMAGE_EXT}$`, 'i').test(f))) {
  warnings.push(`public/${relative(join(root, 'public'), file).split(sep).join('/')} (copied as-is; not imported)`);
}

console.log(`Asset check: ${importCount} image import(s), ${used.size} file(s) in use.`);
if (warnings.length) console.log(`  Not imported (kept on disk, not shown by a component):\n  - ${warnings.join('\n  - ')}`);
if (problems.length) {
  console.error(`\n✗ ${problems.length} asset problem(s):\n  - ${problems.join('\n  - ')}`);
  process.exit(1);
}
console.log('✓ All imported images exist.');
