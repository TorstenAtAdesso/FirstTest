import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = process.env.GITHUB_ACTIONS && repositoryName ? `/${repositoryName}/` : '/';
const isVitest = process.env.VITEST === 'true';

export default defineConfig({
  base,
  plugins: [svelte()],
  resolve: {
    alias: isVitest
      ? {
          '@humanspeak/svelte-diff-match-patch': '/src/test-stubs/SvelteDiffMatchPatch.svelte'
        }
      : undefined,
    conditions: isVitest ? ['browser'] : undefined
  },
  test: {
    environment: 'jsdom'
  }
});
