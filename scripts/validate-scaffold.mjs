#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs';

const requiredFiles = [
  'package.json',
  'vite.config.js',
  'svelte.config.js',
  'index.html',
  'src/main.js',
  'src/App.svelte'
];

const missing = requiredFiles.filter((file) => !existsSync(file));
if (missing.length) {
  console.error('Missing required files:\n' + missing.map((f) => `- ${f}`).join('\n'));
  process.exit(1);
}

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const expectedScripts = ['dev', 'build', 'preview'];
const missingScripts = expectedScripts.filter((name) => !packageJson.scripts?.[name]);
if (missingScripts.length) {
  console.error('Missing npm scripts: ' + missingScripts.join(', '));
  process.exit(1);
}

const appSource = readFileSync('src/App.svelte', 'utf8');
if (!appSource.includes('$state(')) {
  console.error('src/App.svelte does not include a Svelte 5 rune ($state).');
  process.exit(1);
}

console.log('Scaffold validation passed.');
