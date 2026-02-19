import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/svelte';

const { createHtmlDiffMock } = vi.hoisted(() => ({
  createHtmlDiffMock: vi.fn(async (a, b) => `<del>${a}</del><ins>${b}</ins>`)
}));

vi.mock('../src/diff.js', () => ({
  createHtmlDiff: createHtmlDiffMock
}));

import App from '../src/App.svelte';

afterEach(() => {
  cleanup();
  createHtmlDiffMock.mockClear();
});

describe('App shared-input demo behavior', () => {
  it('renders only the shared input textareas and binds them to both demos', async () => {
    const { getByLabelText, getByTestId, container } = render(App);

    const versionA = getByLabelText('versionA (HTML)');
    const versionB = getByLabelText('versionB (HTML)');

    expect(container.querySelectorAll('textarea').length).toBe(3);

    await fireEvent.input(versionA, { target: { value: '<p>Shared A</p>' } });
    await fireEvent.input(versionB, { target: { value: '<p>Shared B</p>' } });

    expect(getByTestId('svelte-dmp-props').textContent).toContain('<p>Shared A</p>|||<p>Shared B</p>');
  });

  it('uses shared inputs when generating node-htmldiff output', async () => {
    const { getByLabelText, getByRole } = render(App);

    const versionA = getByLabelText('versionA (HTML)');
    const versionB = getByLabelText('versionB (HTML)');

    await fireEvent.input(versionA, { target: { value: '<h1>A2</h1>' } });
    await fireEvent.input(versionB, { target: { value: '<h1>B2</h1>' } });

    await fireEvent.click(getByRole('button', { name: /Diff mit node-htmldiff erzeugen/i }));

    expect(createHtmlDiffMock).toHaveBeenCalledWith('<h1>A2</h1>', '<h1>B2</h1>');
    expect(getByLabelText('Diff-Ausgabe (HTML)').value).toContain('<del><h1>A2</h1></del><ins><h1>B2</h1></ins>');
  });
});
