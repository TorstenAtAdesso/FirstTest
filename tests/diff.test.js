import test from 'node:test';
import assert from 'node:assert/strict';

import { createHtmlDiff, resolveDiffFunction } from '../src/diff.js';

test('resolveDiffFunction returns default export when available', () => {
  const fn = () => 'ok';
  assert.equal(resolveDiffFunction({ default: fn }), fn);
});

test('resolveDiffFunction returns htmldiff export when default is missing', () => {
  const fn = () => 'ok';
  assert.equal(resolveDiffFunction({ htmldiff: fn }), fn);
});

test('resolveDiffFunction throws for non-function export', () => {
  assert.throws(
    () => resolveDiffFunction({ default: 'not-a-function' }),
    /not a function/
  );
});

test('createHtmlDiff uses loader and returns diff output', async () => {
  const fakeLoader = async () => ({
    default: (a, b) => `<del>${a}</del><ins>${b}</ins>`
  });

  const result = await createHtmlDiff('<p>A</p>', '<p>B</p>', { loader: fakeLoader });
  assert.equal(result, '<del><p>A</p></del><ins><p>B</p></ins>');
});

test('createHtmlDiff propagates loader errors', async () => {
  const fakeLoader = async () => {
    throw new Error('load failed');
  };

  await assert.rejects(() => createHtmlDiff('A', 'B', { loader: fakeLoader }), /load failed/);
});
