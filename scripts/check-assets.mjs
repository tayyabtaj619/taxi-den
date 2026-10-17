// Asset check — runs before every production build (`npm run build`) and on
// its own with `npm run check:assets`.
//
// Fails (exit 1) when:
//   - an image.src in the content files points to a file that does not exist
//     in public/ (exact, case-sensitive match, so it also fails on Linux hosts
//     when it would "work" on Windows/macOS)
//   - an image.src is not a root-relative public path ("/images/…")
//   - source code reintroduces legacy asset patterns (image imports,
//     src/assets/images, /src/images, ../public/…)
// Warns (no failure) about files in public/images that nothing references.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
const srcDir = join(root, 'src');
const problems = [];
const warnings = [];

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

/** True only if every path segment exists with exactly this casing. */
function existsExact(base, rel) {
  let dir = base;
  for (const part of rel.split('/').filter(Boolean)) {
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

// 1. Collect every image object ({ src, alt }) from the content modules.
const contentDir = join(srcDir, 'content');
const images = [];
function collect(value, path) {
  if (Array.isArray(value)) return value.forEach((v, i) => collect(v, `${path}[${i}]`));
  if (!value || typeof value !== 'object') return;
  if (typeof value.src === 'string' && 'alt' in value) images.push({ path, src: value.src, alt: value.alt });
  for (const [k, v] of Object.entries(value)) if (k !== 'src') collect(v, `${path}.${k}`);
}
for (const file of readdirSync(contentDir).filter((f) => f.endsWith('.js') && f !== 'index.js')) {
  const mod = await import(pathToFileURL(join(contentDir, file)).href);
  collect(mod.default, file.replace('.js', ''));
}

const used = new Set();
for (const img of images) {
  if (!img.src) continue; // empty = intentional placeholder slot
  if (!img.src.startsWith('/images/')) {
    problems.push(`${img.path}.src "${img.src}" must be a public path like "/images/…"`);
    continue;
  }
  if (!existsExact(publicDir, img.src)) problems.push(`${img.path}.src "${img.src}" → public${img.src} does not exist (check spelling and letter case)`);
  else used.add(img.src);
  if (!img.alt || !String(img.alt).trim()) problems.push(`${img.path}.alt is empty for "${img.src}"`);
}

// 2. Legacy patterns anywhere in source code.
const LEGACY = [
  [/import\s+\w+\s+from\s+['"][^'"]+\.(png|jpe?g|webp|avif|gif)['"]/, 'image imported in code (use image.src in content instead)'],
  [/assets\/images/, 'reference to src/assets/images (images live in public/images)'],
  [/['"`]\/src\/images/, '"/src/images" path (public files are served from "/images")'],
  [/\.\.\/(\.\.\/)*public\//, 'relative path into public/ (use "/images/…")'],
  [/import\.meta\.glob\([^)]*images/, 'runtime image registry (use image.src in content)'],
];
for (const file of walk(srcDir).filter((f) => /\.(jsx?|css)$/.test(f))) {
  const text = readFileSync(file, 'utf8');
  for (const [re, msg] of LEGACY) {
    if (re.test(text)) problems.push(`${relative(root, file)}: ${msg}`);
  }
}

// 3. Unreferenced public images (informational).
const imagesDir = join(publicDir, 'images');
for (const file of walk(imagesDir).filter((f) => /\.(png|jpe?g|webp|avif|gif|svg)$/i.test(f))) {
  const url = '/' + relative(publicDir, file).split(sep).join('/');
  if (!used.has(url)) warnings.push(url);
}

const placeholders = images.filter((i) => !i.src).map((i) => i.path);
console.log(`Asset check: ${images.length} image slots, ${used.size} files referenced, ${placeholders.length} empty slots.`);
if (placeholders.length) console.log(`  Empty slots (placeholder shown): ${placeholders.join(', ')}`);
if (warnings.length) console.log(`  Not referenced by any content (kept, not deployed to any page): ${warnings.join(', ')}`);
if (problems.length) {
  console.error(`\n✗ ${problems.length} asset problem(s):\n  - ${problems.join('\n  - ')}`);
  process.exit(1);
}
console.log('✓ All referenced images exist.');
