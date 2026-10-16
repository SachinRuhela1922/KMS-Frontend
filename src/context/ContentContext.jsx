import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import defaultContent from '../data/defaultContent.js';
import { mergeDefaults } from '../lib/merge.js';
import { apiUrl, CONTENT_URL } from '../lib/api-base.js';

const ContentContext = createContext(defaultContent);
export const useContent = () => useContext(ContentContext);

const CACHE_KEY = 'jgu-content-cache-v1';

function readCache() {
  try {
    const c = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    return c && c.content ? c.content : null;
  } catch {
    return null;
  }
}

async function getJson(url, ms) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctrl.signal, cache: 'no-cache' });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const data = await r.json();
    // accepts { content: {...} } (API / snapshot) or the content object itself (Cloudinary copy)
    const content = data && typeof data.content === 'object' && !Array.isArray(data.content) ? data.content : data;
    if (!content || typeof content !== 'object' || Array.isArray(content) || !content.settings) throw new Error('bad response');
    return { version: data.version || 0, content };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Loads the site content. Order:
 *   1. live API (backend)                -> always the freshest
 *   2. static copy (content.json)        -> written by the backend on every save, so the site keeps
 *                                           showing the admin's latest changes even if the backend is OFF
 *   3. copy cached in this browser / bundled default content (the site never breaks)
 */
export function ContentProvider({ children }) {
  const cached = useMemo(readCache, []);
  const [content, setContent] = useState(cached ? mergeDefaults(defaultContent, cached) : null);

  useEffect(() => {
    let alive = true;

    (async () => {
      let data = null;
      try {
        data = await getJson(apiUrl('/api/content'), 8000);
      } catch {
        try {
          data = await getJson(CONTENT_URL, 8000);
        } catch {
          /* nothing reachable - keep cached / default */
        }
      }
      if (!alive) return;
      if (data) {
        setContent(mergeDefaults(defaultContent, data.content));
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        } catch {
          /* storage full / blocked - ignore */
        }
      } else {
        setContent((c) => c || defaultContent);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  if (!content) {
    return (
      <div className="site-loader" role="status" aria-label="Loading">
        <span />
      </div>
    );
  }
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}
