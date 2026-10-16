// Small helpers used to write page content quickly.
// Everything here only builds plain objects - the Admin Panel edits the same objects (stored in content.json).
export const H2 = (text) => ({ type: 'heading', level: 'h2', text });
export const H3 = (text) => ({ type: 'heading', level: 'h3', text });
export const P = (text) => ({ type: 'paragraph', text });
export const UL = (...items) => ({ type: 'list', bullets: items.map((text) => ({ text })) });
export const STATS = (...pairs) => ({ type: 'stats', stats: pairs.map(([value, label]) => ({ value, label })) });
export const CARDS = (title, pairs) => ({ type: 'cards', title, cards: pairs.map(([t, text, href, linkLabel]) => ({ title: t, text, href: href || '', linkLabel: linkLabel || '', img: '' })) });
export const STEPS = (title, pairs) => ({ type: 'steps', title, steps: pairs.map(([t, text]) => ({ title: t, text })) });
export const FAQ = (title, pairs) => ({ type: 'faq', title, faqs: pairs.map(([q, a]) => ({ q, a })) });
export const TABLE = (title, headers, rows) => ({
  type: 'table', title, col1: headers[0] || '', col2: headers[1] || '', col3: headers[2] || '',
  rows: rows.map(([c1, c2, c3]) => ({ c1: c1 || '', c2: c2 || '', c3: c3 || '' })),
});
export const QUOTE = (text, author) => ({ type: 'quote', text, author });
export const CALL = (title, text) => ({ type: 'callout', title, text });
export const BTN = (label, href) => ({ type: 'button', label, href });
export const IMG = (img, caption) => ({ type: 'image', img, caption });

export const page = (path, title, intro, blocks, extra = {}) => ({ path, title, intro, heroImage: '', ...extra, blocks });
