/**
 * Interaction smoke test — exercises the homepage's interactive surfaces in the
 * production bundle so a visual polish pass cannot silently break behaviour.
 *
 *   npm run smoke   (build → routes → interactions)
 *
 * Covers: hero view tabs (click + arrow keys), the feature selector, the
 * monthly/annual pricing toggle, and the FAQ accordion's expanded/inert state.
 */
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

const shell = fs
  .readFileSync(path.resolve('dist/index.html'), 'utf8')
  .replace(/<script[^>]*><\/script>/, '');
const assetsDir = path.resolve('dist/assets');
const bundle = path.resolve(
  assetsDir,
  fs.readdirSync(assetsDir).find((file) => file.endsWith('.js') && !file.includes('modulepreload')),
);

const dom = new JSDOM(shell, { url: 'https://preview.local/', pretendToBeVisual: true });
const { window } = dom;

Object.defineProperty(global, 'window', { value: window, configurable: true, writable: true });
Object.defineProperty(global, 'document', {
  value: window.document,
  configurable: true,
  writable: true,
});
Object.defineProperty(global, 'navigator', { value: window.navigator, configurable: true });
for (const key of [
  'HTMLElement',
  'Element',
  'Node',
  'Event',
  'MouseEvent',
  'KeyboardEvent',
  'MutationObserver',
  'CustomEvent',
]) {
  Object.defineProperty(global, key, { value: window[key], configurable: true, writable: true });
}
global.getComputedStyle = window.getComputedStyle;
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame = clearTimeout;
window.scrollTo = () => {};
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  addEventListener() {},
  removeEventListener() {},
});

const errors = [];
const consoleErrors = [];
const originalConsoleError = console.error;
console.error = (...args) => {
  consoleErrors.push(args.join(' '));
  originalConsoleError(...args);
};
window.addEventListener('error', (e) => errors.push(e.message));
await import(bundle);
await new Promise((r) => setTimeout(r, 200));

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};
const text = () => window.document.body.textContent ?? '';

// --- Hero dashboard tabs -----------------------------------------------------
const tab = (key) => window.document.getElementById(`dashboard-tab-${key}`);
const panel = () => window.document.getElementById('dashboard-panel');

check(
  'hero tablist exists',
  !!window.document.querySelector('[role="tablist"][aria-label="Dashboard views"]'),
);
check('overview selected by default', tab('overview')?.getAttribute('aria-selected') === 'true');
check('overview content shown', (panel()?.textContent ?? '').includes('Good morning, Alex'));

tab('automations').click();
await new Promise((r) => setTimeout(r, 30));
check('automations tab selects', tab('automations')?.getAttribute('aria-selected') === 'true');
check('automations content swaps', (panel()?.textContent ?? '').includes('Automation runs'));
check('overview no longer selected', tab('overview')?.getAttribute('aria-selected') === 'false');
check(
  'panel labelled by active tab',
  panel()?.getAttribute('aria-labelledby') === 'dashboard-tab-automations',
);

// Keyboard: ArrowRight from automations → analytics
const kd = new window.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true });
tab('automations').dispatchEvent(kd);
await new Promise((r) => setTimeout(r, 30));
check('arrow key moves selection', tab('analytics')?.getAttribute('aria-selected') === 'true');
check('analytics content swaps', (panel()?.textContent ?? '').includes('Planned vs. completed'));

tab('team').click();
await new Promise((r) => setTimeout(r, 30));
check('team content swaps', (panel()?.textContent ?? '').includes('Capacity this week'));

// --- Feature selector --------------------------------------------------------
const featureTab = window.document.getElementById('feature-tab-collaboration');
check('feature tab role', featureTab?.getAttribute('role') === 'tab');
featureTab.dispatchEvent(new window.MouseEvent('mouseenter', { bubbles: false }));
featureTab.click();
await new Promise((r) => setTimeout(r, 30));
check('feature selects on click', featureTab?.getAttribute('aria-selected') === 'true');
check(
  'feature preview swaps',
  (window.document.getElementById('feature-panel')?.textContent ?? '').includes(
    'Guest access for client-facing projects',
  ),
);

// --- Pricing toggle ----------------------------------------------------------
const billingGroup = window.document.querySelector('[role="group"][aria-label="Billing period"]');
const billingButtons = [...billingGroup.querySelectorAll('button')];
check('billing toggle has two options', billingButtons.length === 2);
check('monthly pressed by default', billingButtons[0].getAttribute('aria-pressed') === 'true');
check('monthly prices', text().includes('$18') && text().includes('$39'));

billingButtons[1].click();
await new Promise((r) => setTimeout(r, 30));
check('annual pressed', billingButtons[1].getAttribute('aria-pressed') === 'true');
check('annual prices applied', text().includes('$14') && text().includes('$31'));
check('annual note shown', text().includes('Billed annually · 20% off'));

// --- Accordion ---------------------------------------------------------------
const faqButtons = [...window.document.querySelectorAll('#faq [aria-expanded]')];
check('faq items rendered', faqButtons.length === 7, `${faqButtons.length} items`);
check('first faq open', faqButtons[0].getAttribute('aria-expanded') === 'true');
const firstPanel = window.document.getElementById(faqButtons[0].getAttribute('aria-controls'));
check('open panel not inert', firstPanel && !firstPanel.hasAttribute('inert'));
check('first panel opacity 100', (firstPanel?.className ?? '').includes('opacity-100'));

faqButtons[2].click();
await new Promise((r) => setTimeout(r, 30));
check('faq opens on click', faqButtons[2].getAttribute('aria-expanded') === 'true');
check('previous faq closes', faqButtons[0].getAttribute('aria-expanded') === 'false');
const thirdPanel = window.document.getElementById(faqButtons[2].getAttribute('aria-controls'));
check('closed panel inert', firstPanel?.hasAttribute('inert') === true);
check('open panel grid visible', (thirdPanel?.className ?? '').includes('grid-rows-[1fr]'));

// --- Structural sanity -------------------------------------------------------
check('one h1', window.document.querySelectorAll('h1').length === 1);
check('no runtime errors', errors.length === 0, errors[0] ?? '');
check('no React warnings', consoleErrors.length === 0, consoleErrors[0]?.slice(0, 160) ?? '');
check(
  'dashboard controls are the only new focusables',
  [...window.document.querySelectorAll('[role="tab"]')].every((el) => el.tagName === 'BUTTON'),
);

const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} checks passed`);
if (failed) process.exit(1);
