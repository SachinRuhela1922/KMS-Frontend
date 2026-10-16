import { SETTINGS, HERO_BUTTONS, NAV_MENU, FOOTER } from './site.js';
import pages from './pages.js';

// true  = the site always shows the hardcoded content from src/data/school/ (menu, footer, inner pages, hero buttons).
// false = go back to Admin-panel controlled content for those parts.
export const HARDCODED = true;

/** Puts the hardcoded school content on top of whatever the API / content.json returned. */
export function applySchool(c) {
  if (!HARDCODED || !c) return c;
  return {
    ...c,
    settings: { ...c.settings, ...SETTINGS, favicon: c.settings?.logoBlue || c.settings?.favicon },
    hero: { ...c.hero, slides: (c.hero?.slides || []).map((s) => ({ ...s, buttons: HERO_BUTTONS })) },
    navMenu: NAV_MENU,
    footer: FOOTER,
    pageContent: pages,
    customPages: c.customPages || [],
  };
}
