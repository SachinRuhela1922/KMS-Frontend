import defaultContent from '../data/defaultContent.js';

/** "  Discover KMS " -> "/discover-kms"  (external https:// links are kept as they are) */
export const cleanPath = (p) => {
  const s = String(p || '').trim();
  if (!s) return '';
  if (/^(https?:|mailto:|tel:|#)/i.test(s)) return s;
  const out = `/${s.replace(/^\/+/, '')}`.toLowerCase().replace(/\s+/g, '-').replace(/\/{2,}/g, '/').replace(/(.)\/+$/, '$1');
  return out;
};

const eachNav = (nav, fn) => (nav || []).forEach((n) => { fn(n); (n.children || []).forEach(fn); });

/**
 * Keeps page links and navbar links in sync when saving, so a renamed page never turns into a 404:
 *  A) you changed a navbar link only      -> the page that used the old link gets the new link
 *  B) you changed a page's link (Pages)   -> navbar items that pointed to the old link follow it
 * Returns { draft, error }
 */
export function reconcilePaths(base, draft) {
  const ids = Object.keys(draft.pageContent || {});
  const pc = {};
  ids.forEach((id) => { pc[id] = { ...draft.pageContent[id] }; });
  const basePath = (id) => cleanPath(base?.pageContent?.[id]?.path) || defaultContent.pageContent?.[id]?.path;

  // A) navbar link edited -> move the page
  const pairs = [];
  const walk = (b, d) => {
    if (!Array.isArray(b) || !Array.isArray(d) || b.length !== d.length) return;
    b.forEach((bn, i) => {
      pairs.push([bn?.path, d[i]?.path]);
      walk(bn?.children, d[i]?.children);
    });
  };
  walk(base?.navMenu, draft.navMenu);
  const taken = () => new Set([...ids.map((id) => cleanPath(pc[id].path)), ...(draft.customPages || []).map((c) => cleanPath(c.path))]);
  pairs.forEach(([o, n]) => {
    const oc = cleanPath(o);
    const nc = cleanPath(n);
    if (!oc || !nc || oc === nc || !nc.startsWith('/') || nc === '/') return;
    const id = ids.find((i) => cleanPath(pc[i].path) === oc && basePath(i) === oc);
    if (id && !taken().has(nc)) pc[id].path = nc;
  });

  // B) page link edited -> navbar follows
  const nav = JSON.parse(JSON.stringify(draft.navMenu || []));
  ids.forEach((id) => {
    const o = basePath(id);
    const n = cleanPath(pc[id].path) || o;
    pc[id].path = n;
    if (o && n !== o) eachNav(nav, (item) => { if (cleanPath(item.path) === o) item.path = n; });
  });

  const customPages = (draft.customPages || []).map((c) => ({ ...c, path: cleanPath(c.path) || '/new-page' }));

  // same link used twice?
  const seen = new Map();
  let error = '';
  [...ids.map((id) => [pc[id].path, pc[id].title]), ...customPages.map((c) => [c.path, c.title])].forEach(([p, title]) => {
    if (seen.has(p) && !error) error = `Link "${p}" is used by two pages ("${seen.get(p)}" and "${title}"). Give each page its own link.`;
    seen.set(p, title);
  });

  return { draft: { ...draft, pageContent: pc, navMenu: nav, customPages }, error };
}
