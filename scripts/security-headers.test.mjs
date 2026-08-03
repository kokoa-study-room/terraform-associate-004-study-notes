import { describe, expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';

const headers = await readFile(new URL('../public/_headers', import.meta.url), 'utf8');
const policy = headers.match(/^\s*Content-Security-Policy:\s*(.+)$/m)?.[1];

if (!policy) throw new Error('public/_headers must define Content-Security-Policy');

const directive = (name) =>
  policy
    .split(';')
    .map((value) => value.trim())
    .find((value) => value.startsWith(`${name} `))
    ?.split(/\s+/)
    .slice(1) ?? [];

describe('Content Security Policy', () => {
  test('allows Pagefind WebAssembly without enabling JavaScript eval', () => {
    // Given
    const scriptSources = directive('script-src');

    // When
    const allowsPagefindWasm = scriptSources.includes("'wasm-unsafe-eval'");

    // Then
    expect(allowsPagefindWasm).toBe(true);
    expect(scriptSources).not.toContain("'unsafe-eval'");
  });

  test('allows the Cloudflare Web Analytics script injected at the edge', () => {
    // Given
    const scriptSources = directive('script-src');
    const connectSources = directive('connect-src');

    // When
    const allowsInjectedScript = scriptSources.includes('https://static.cloudflareinsights.com/beacon.min.js/');

    // Then
    expect(allowsInjectedScript).toBe(true);
    expect(connectSources).toContain("'self'");
  });

  test('keeps the Pagefind worker restricted to same-origin and blob URLs', () => {
    // Given
    const workerSources = directive('worker-src');

    // When
    const workerPolicy = new Set(workerSources);

    // Then
    expect(workerPolicy).toEqual(new Set(["'self'", 'blob:']));
  });

  test('does not attach a separate stale CSP to fixed-name Pagefind assets', () => {
    // Given
    const pagefindRule = headers.match(/^\/pagefind\/\*\n((?:\s+.+\n?)*)/m)?.[1] ?? '';

    // When
    const detachesDocumentPolicy = /^\s*! Content-Security-Policy\s*$/m.test(pagefindRule);
    const revalidatesFixedAssets = /^\s*Cache-Control:\s*public, max-age=0, must-revalidate\s*$/m.test(pagefindRule);

    // Then
    expect(detachesDocumentPolicy).toBe(true);
    expect(revalidatesFixedAssets).toBe(true);
  });
});
