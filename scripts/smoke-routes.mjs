/**
 * Route smoke test — renders the production bundle for every route in jsdom.
 *
 * The build environment has no browser, so this is the fastest way to catch a
 * crash, a missing provider or an empty page after a refactor.
 *
 *   npm run smoke
 */
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

const ROUTES = ['/', '/features', '/pricing', '/about', '/contact', '/design-system', '/missing'];
const MIN_TEXT = 200;

const indexPath = path.resolve('dist/index.html');
if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found — run `npm run build` first.');
  process.exit(1);
}

const shell = fs.readFileSync(indexPath, 'utf8').replace(/<script[^>]*><\/script>/, '');
const assetsDir = path.resolve('dist/assets');
const bundle = path.resolve(
  assetsDir,
  fs.readdirSync(assetsDir).find((file) => file.endsWith('.js') && !file.includes('modulepreload')),
);

const BROWSER_GLOBALS = [
  'HTMLElement',
  'Element',
  'Node',
  'Event',
  'MouseEvent',
  'KeyboardEvent',
  'MutationObserver',
  'HTMLIFrameElement',
  'CustomEvent',
];

let failures = 0;

for (const [index, route] of ROUTES.entries()) {
  const dom = new JSDOM(shell, {
    url: `https://preview.local${route}`,
    pretendToBeVisual: true,
  });
  const { window } = dom;

  Object.defineProperty(global, 'window', { value: window, configurable: true, writable: true });
  Object.defineProperty(global, 'document', {
    value: window.document,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(global, 'navigator', { value: window.navigator, configurable: true });
  for (const key of BROWSER_GLOBALS) {
    Object.defineProperty(global, key, {
      value: window[key],
      configurable: true,
      writable: true,
    });
  }

  global.getComputedStyle = window.getComputedStyle;
  global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
  global.cancelAnimationFrame = clearTimeout;
  window.scrollTo = () => {};
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
  });

  const errors = [];
  window.addEventListener('error', (event) => errors.push(event.message));

  try {
    // Cache-busting query: each route needs its own module instance.
    await import(`${bundle}?route=${index}`);
    await new Promise((resolve) => setTimeout(resolve, 150));

    const root = window.document.getElementById('root');
    const text = root?.textContent?.trim() ?? '';
    const heading = window.document.querySelector('h1')?.textContent?.trim() ?? '(no h1)';
    const h1Count = window.document.querySelectorAll('h1').length;

    const problems = [];
    if (errors.length) problems.push(`runtime error: ${errors[0]}`);
    if (text.length < MIN_TEXT) problems.push(`only ${text.length} characters rendered`);
    if (h1Count !== 1) problems.push(`${h1Count} h1 elements`);

    if (problems.length) failures += 1;

    console.log(
      `${problems.length ? 'FAIL' : 'PASS'}  ${route.padEnd(16)} ${String(text.length).padStart(5)} chars  h1: ${heading.slice(0, 44)}${problems.length ? `\n      → ${problems.join('; ')}` : ''}`,
    );
  } catch (error) {
    failures += 1;
    console.log(`FAIL  ${route.padEnd(16)} crash: ${error.message}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} route(s) failed.`);
  process.exit(1);
}

console.log(`\nAll ${ROUTES.length} routes rendered.`);
