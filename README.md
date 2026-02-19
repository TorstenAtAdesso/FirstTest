# Svelte 5 Starter

Dieses Repository enthält eine Test-App für HTML-Diffs mit **node-htmldiff**.

## Funktionsumfang

- Zwei HTML-Editoren für `versionA` und `versionB`
- Ein Button zum Erzeugen eines Diffs mit `node-htmldiff`
- Ein dritter Editor zur Anzeige der erzeugten Diff-HTML-Ausgabe

## Voraussetzungen

- Node.js 20+
- npm 10+

## Start

```bash
npm install
npm run dev
```

Danach ist die App standardmäßig unter `http://localhost:5173` erreichbar.

## Build

```bash
npm run build
npm run preview
```

## Tests

```bash
npm run test:scaffold
npm test
npm run test:coverage
```

Hinweis: In dieser Laufzeitumgebung sind `npm install` und damit `npm run build` ggf. durch Registry-Policy (`403 Forbidden`) blockiert.


## GitHub Pages

Die App kann automatisch über GitHub Pages veröffentlicht werden.

1. Push auf den Branch `main`.
2. Gehe in GitHub auf **Settings → Pages** und stelle als Source **GitHub Actions** ein.
3. Der Workflow `.github/workflows/deploy-pages.yml` baut und deployt nach jedem Push auf `main`.

Die App ist dann unter `https://<user>.github.io/<repo>/` erreichbar.
