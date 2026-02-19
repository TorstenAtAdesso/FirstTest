<script>
  import SvelteDiffMatchPatch from '@humanspeak/svelte-diff-match-patch';
  import { createHtmlDiff } from './diff.js';

  let versionA = $state(`<h1>Version A</h1>\n<p>Dies ist der <strong>alte</strong> Stand.</p>`);
  let versionB = $state(`<h1>Version B</h1>\n<p>Dies ist der <em>neue</em> Stand mit Änderungen.</p>`);
  let diffHtml = $state('');
  let status = $state('Bereit');

  let diffStats = $state('Noch nicht verarbeitet.');

  function onProcessing(timing, diff) {
    diffStats = `Compute: ${timing.computeTime}ms · Cleanup: ${timing.cleanupTime}ms · Segmente: ${diff.length}`;
  }

  async function createDiff() {
    status = 'Erzeuge Diff…';

    try {
      diffHtml = await createHtmlDiff(versionA, versionB);
      status = 'Diff erfolgreich erzeugt.';
    } catch (error) {
      status = `Fehler beim Laden von node-htmldiff: ${error?.message ?? error}`;
    }
  }
</script>

<main>
  <h1>Diff-Config Test-App</h1>
  <p>
    Vergleiche zwei HTML-Versionen und teste die Ausgabe von <code>node-htmldiff</code> direkt im Browser.
  </p>

  <section class="grid">
    <article>
      <label for="version-a">versionA (HTML)</label>
      <textarea id="version-a" bind:value={versionA}></textarea>
    </article>

    <article>
      <label for="version-b">versionB (HTML)</label>
      <textarea id="version-b" bind:value={versionB}></textarea>
    </article>
  </section>

  <div class="actions">
    <button type="button" onclick={createDiff}>Diff mit node-htmldiff erzeugen</button>
    <span>{status}</span>
  </div>

  <section>
    <label for="diff-output">Diff-Ausgabe (HTML)</label>
    <textarea id="diff-output" bind:value={diffHtml} readonly></textarea>
  </section>

  <hr />

  <section class="demo">
    <h2>@humanspeak/svelte-diff-match-patch Demo</h2>
    <p>
      Nutzt dieselben Eingaben wie oben (<code>versionA</code>/<code>versionB</code>), zeigt aber den Diff mit
      <code>@humanspeak/svelte-diff-match-patch</code> inklusive Timing-Infos über <code>onProcessing</code>.
    </p>

    <p class="stats">{diffStats}</p>

    <div class="patch-output">
      <SvelteDiffMatchPatch
        originalText={versionA}
        modifiedText={versionB}
        timeout={1}
        cleanupSemantic={false}
        cleanupEfficiency={4}
        {onProcessing}
        rendererClasses={{
          remove: 'diff-remove',
          insert: 'diff-insert',
          equal: 'diff-equal'
        }}
      />
    </div>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: Inter, system-ui, sans-serif;
    background: #0f172a;
    color: #e2e8f0;
  }

  main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem;
    display: grid;
    gap: 1rem;
  }

  h1,
  p {
    margin: 0;
  }

  h2 {
    margin: 0;
    font-size: 1.2rem;
  }

  hr {
    width: 100%;
    border: 0;
    border-top: 1px solid #334155;
    margin: 0.5rem 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1rem;
  }

  article,
  section {
    display: grid;
    gap: 0.5rem;
  }

  label {
    font-weight: 600;
  }

  textarea {
    min-height: 180px;
    width: 100%;
    background: #020617;
    color: #e2e8f0;
    border: 1px solid #334155;
    border-radius: 0.6rem;
    padding: 0.75rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.9rem;
    line-height: 1.4;
    resize: vertical;
    box-sizing: border-box;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    flex-wrap: wrap;
  }

  button {
    border: 0;
    border-radius: 999px;
    padding: 0.65rem 1rem;
    background: #38bdf8;
    color: #0f172a;
    font-weight: 700;
    cursor: pointer;
  }

  button:hover {
    filter: brightness(1.05);
  }

  .demo {
    gap: 0.9rem;
  }

  .stats {
    color: #93c5fd;
    font-size: 0.9rem;
  }

  .patch-output {
    background: #020617;
    border: 1px solid #334155;
    border-radius: 0.6rem;
    padding: 0.9rem;
    min-height: 84px;
    line-height: 1.5;
  }

  :global(.diff-remove) {
    background-color: #7f1d1d;
    color: #fecaca;
    text-decoration: line-through;
    border-radius: 0.25rem;
    padding: 0.03rem 0.2rem;
  }

  :global(.diff-insert) {
    background-color: #14532d;
    color: #bbf7d0;
    border-radius: 0.25rem;
    padding: 0.03rem 0.2rem;
  }

  :global(.diff-equal) {
    color: #e2e8f0;
  }
</style>
