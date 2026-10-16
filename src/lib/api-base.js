// Backend URL. Empty in local dev (Vite proxy forwards /api to the backend).
// In production set VITE_API_URL (e.g. https://jgu-api.onrender.com) before `npm run build`.
export const API_BASE = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');
export const apiUrl = (path) => `${API_BASE}${path}`;

// Static copy of the content - used when the backend is down / asleep (see ContentContext).
export const CONTENT_URL = (import.meta.env.VITE_CONTENT_URL || '').trim() || '/content.json';
