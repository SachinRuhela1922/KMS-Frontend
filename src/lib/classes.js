// Groups the flat class list into stages (Pre-Primary, Primary ...) keeping the admin's order.
export function groupByStage(items = []) {
  const map = new Map();
  items.forEach((c) => {
    const key = c.stage || 'Classes';
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(c);
  });
  return [...map.entries()].map(([stage, list]) => ({ stage, list }));
}
export const classPath = (c) => `/classes/${c.slug}`;
