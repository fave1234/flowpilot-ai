/** Smoke-test the production reveal enhancement with and without browser support. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

const shell = fs.readFileSync('dist/index.html', 'utf8').replace(/<script[^>]*><\/script>/, '');
const bundle = path.resolve(
  'dist/assets',
  fs.readdirSync('dist/assets').find((file) => file.endsWith('.js')),
);
const globals = [
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

for (const [index, scenario] of ['observer', 'no-observer', 'reduced-motion'].entries()) {
  const dom = new JSDOM(shell, { url: 'https://preview.local/', pretendToBeVisual: true });
  const { window } = dom;
  for (const [name, value] of Object.entries({
    window,
    document: window.document,
    navigator: window.navigator,
  })) {
    Object.defineProperty(globalThis, name, { value, configurable: true, writable: true });
  }
  for (const name of globals) globalThis[name] = window[name];
  globalThis.getComputedStyle = window.getComputedStyle;
  globalThis.requestAnimationFrame = (callback) => setTimeout(callback, 0);
  globalThis.cancelAnimationFrame = clearTimeout;
  window.scrollTo = () => {};
  window.matchMedia = (query) => ({
    matches: scenario === 'reduced-motion',
    media: query,
    addEventListener() {},
    removeEventListener() {},
  });

  const observers = [];
  if (scenario !== 'no-observer') {
    class MockObserver {
      constructor(callback) {
        this.callback = callback;
        observers.push(this);
      }
      observe(element) {
        this.element = element;
        this.observing = true;
      }
      unobserve() {
        this.observing = false;
      }
      disconnect() {
        this.observing = false;
      }
      intersect() {
        if (this.observing) this.callback([{ isIntersecting: true, target: this.element }]);
      }
    }
    window.IntersectionObserver = globalThis.IntersectionObserver = MockObserver;
  } else {
    delete globalThis.IntersectionObserver;
  }

  await import(`${bundle}?reveal=${index}`);
  await new Promise((resolve) => setTimeout(resolve, 200));
  const reveals = [...window.document.querySelectorAll('.scroll-reveal')];
  assert.ok(reveals.length > 20, 'homepage should contain section and item reveals');
  if (scenario === 'observer') {
    assert.ok(reveals.every((element) => element.dataset.reveal === 'pending'));
    const first = observers[0];
    first.intersect();
    assert.equal(first.element.dataset.reveal, 'visible');
    assert.equal(first.observing, false, 'reveals stop observing after first intersection');
    const focusTarget = window.document.querySelector('#pricing button');
    focusTarget.focus();
    assert.ok([...focusTarget.closest('.scroll-reveal').querySelectorAll(':focus')].length > 0);
    assert.equal(
      focusTarget.closest('.scroll-reveal').dataset.reveal,
      'visible',
      'focused controls reveal immediately',
    );
    const annual = [...window.document.querySelectorAll('#pricing button')].find(
      (button) => button.textContent === 'Annual',
    );
    annual.click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    assert.ok(
      window.document.querySelector('#pricing').textContent.includes('$14'),
      'pricing still updates',
    );
  } else {
    assert.ok(
      reveals.every((element) => !element.dataset.reveal),
      'fallback leaves content visible',
    );
    assert.equal(observers.length, 0);
  }
  console.log(`PASS reveal: ${scenario}`);
  dom.window.close();
}
