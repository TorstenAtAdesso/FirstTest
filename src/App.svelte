<script>
  import { createHtmlDiff } from './diff.js';

  let versionA = $state(`<h1>Version A</h1>\n<p>Dies ist der <strong>alte</strong> Stand.</p>`);
  let versionB = $state(`<h1>Version B</h1>\n<p>Dies ist der <em>neue</em> Stand mit Änderungen.</p>`);
  let diffHtml = $state('');
  let status = $state('Bereit');

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
    min-height: 240px;
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
</style>
