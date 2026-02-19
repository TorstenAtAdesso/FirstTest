export function resolveDiffFunction(mod) {
  const diffFn = mod?.default ?? mod?.htmldiff ?? mod;

  if (typeof diffFn !== 'function') {
    throw new Error('node-htmldiff export is not a function');
  }

  return diffFn;
}

export async function createHtmlDiff(versionA, versionB, options = {}) {
  const loader = options.loader ?? (() => import('https://esm.sh/node-htmldiff@0.9.4'));

  const mod = await loader();
  const diffFn = resolveDiffFunction(mod);

  return diffFn(versionA, versionB);
}
