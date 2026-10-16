// Fill in anything missing in `remote` from `defaults` (so a half-filled / older content file never breaks the site).
// Arrays are taken from `remote` as they are.
export function mergeDefaults(defaults, remote) {
  if (remote === undefined || remote === null) return defaults;
  const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
  if (isObj(defaults) && isObj(remote)) {
    const out = { ...remote };
    Object.keys(defaults).forEach((k) => {
      out[k] = mergeDefaults(defaults[k], remote[k]);
    });
    return out;
  }
  return remote;
}
