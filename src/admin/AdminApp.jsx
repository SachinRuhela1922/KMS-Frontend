import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { api, getToken, setToken, clearToken } from './api.js';
import { AdminContext } from './AdminContext.js';
import { SECTIONS, GROUPS, sectionKey } from './schema.js';
import { FieldsEditor } from './Fields.jsx';
import MediaLibrary from './MediaLibrary.jsx';
import defaultContent from '../data/defaultContent.js';
import { mergeDefaults } from '../lib/merge.js';
import { reconcilePaths } from './paths.js';
import './admin.css';

const PUBLIC_CACHE_KEY = 'jgu-content-cache-v1';

/* ------------------------------------------------------------------ login */
function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { token } = await api.login(password);
      setToken(token);
      onLogin(token);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="adm adm-login">
      <form className="adm-login-card" onSubmit={submit}>
        <h1>Admin Panel</h1>
        <p className="adm-muted">Sign in to edit the website</p>
        <input className="adm-input" type="password" autoFocus placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div className="adm-note adm-note-warn">{error}</div>}
        <button className="adm-btn adm-btn-primary adm-btn-block" disabled={busy || !password}>{busy ? 'Signing in…' : 'Sign in'}</button>
        <a className="adm-link" href="/">← Back to website</a>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ dashboard + tools */
function Dashboard({ status, go }) {
  return (
    <div>
      <div className="adm-cards">
        <div className={`adm-card ${status.cloudinary ? 'ok' : 'bad'}`}>
          <b>Cloudinary</b>
          <span>{status.cloudinary ? `Connected (${status.cloudName})` : 'Not connected - add keys in .env'}</span>
        </div>
        <div className="adm-card ok">
          <b>Content saved in</b>
          <span>{status.storage === 'cloudinary' ? 'Cloudinary (safe on any host)' : 'server/data/content.json'}</span>
        </div>
        <div className={`adm-card ${status.defaultPassword ? 'bad' : 'ok'}`}>
          <b>Password</b>
          <span>{status.defaultPassword ? 'Default password in use - set ADMIN_PASSWORD in .env!' : 'Custom password set'}</span>
        </div>
      </div>
      <div className="adm-note">
        <b>Backend band ho tab bhi site chale:</b> har Save par backend ek static copy bhi banata hai.
        Local me wo <code>frontend/public/content.json</code> me apne aap likhi jati hai.
        {status.publicContentUrl ? (
          <> Production me frontend ke env me <code>VITE_CONTENT_URL</code> = <code>{status.publicContentUrl}</code> daalo (phir frontend dobara build/deploy).</>
        ) : (
          <> Production ke liye Cloudinary connect karo - tab yahan ek public backup URL dikhega.</>
        )}
      </div>
      <h3 className="adm-h3">How it works</h3>
      <ol className="adm-steps">
        <li>Pick what you want to change from the menu on the left. Inner pages (Admissions, Campus Life, About Us ...) are under <b>Pages</b>; each page is made of content blocks (text, lists, cards, FAQ, table ...).</li>
        <li>Change text, or press <b>Upload</b> to send an image / video to Cloudinary (or choose one from the <b>Library</b>).</li>
        <li>Press <b>Save changes</b> (or Ctrl+S). The live website updates immediately.</li>
      </ol>
      <h3 className="adm-h3">Quick links</h3>
      <div className="adm-row">
        <button className="adm-btn" onClick={() => go('hero')}>🎬 Hero video & image</button>
        <button className="adm-btn" onClick={() => go('navMenu')}>🧭 Menu</button>
        <button className="adm-btn" onClick={() => go('page-admissions')}>📄 Admissions page</button>
        <button className="adm-btn" onClick={() => go('customPages')}>➕ New page</button>
        <button className="adm-btn" onClick={() => go('media')}>☁️ Media library</button>
        <a className="adm-btn" href="/" target="_blank" rel="noreferrer">↗ Open website</a>
      </div>
    </div>
  );
}

function Tools({ draft, setDraft, status, toast, onReset }) {
  const fileRef = useRef(null);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `site-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importJson = async (file) => {
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Not a valid content file');
      setDraft(mergeDefaults(defaultContent, data.content && typeof data.content === 'object' ? data.content : data));
      toast('Imported. Review it and press “Save changes”.', 'ok');
    } catch (e) {
      toast(`Import failed: ${e.message}`, 'error');
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div>
      <div className="adm-note">
        Storage: <b>{status.storage === 'cloudinary' ? 'Cloudinary' : 'server file'}</b>. The last 20 saves are also backed up on the server (<code>server/data/backups</code>).
      </div>
      <h3 className="adm-h3">Backup</h3>
      <div className="adm-row">
        <button className="adm-btn adm-btn-primary" onClick={exportJson}>⬇ Download content (JSON)</button>
        <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(e) => importJson(e.target.files?.[0])} />
        <button className="adm-btn" onClick={() => fileRef.current?.click()}>⬆ Import content (JSON)</button>
      </div>
      <h3 className="adm-h3">Danger zone</h3>
      <button className="adm-btn adm-btn-danger" onClick={onReset}>Reset whole website to original content</button>
    </div>
  );
}

/* ------------------------------------------------------------------ main panel */
function Panel({ onLogout }) {
  const [status, setStatus] = useState(null);
  const [draft, setDraft] = useState(null);
  const [saved, setSaved] = useState('');
  const [active, setActive] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((msg, type = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), type === 'error' ? 7000 : 3500);
  }, []);

  const load = useCallback(async () => {
    setLoadError('');
    try {
      const [st, data] = await Promise.all([api.status(), api.getContent()]);
      const merged = mergeDefaults(defaultContent, data.content);
      setStatus(st);
      setDraft(merged);
      setSaved(JSON.stringify(merged));
    } catch (e) {
      setLoadError(e.message);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const dirty = draft !== null && JSON.stringify(draft) !== saved;

  const save = useCallback(async () => {
    if (!draft || saving) return;
    // keep page links <-> navbar links in sync (no 404 after renaming a page)
    const { draft: next, error: linkError } = reconcilePaths(JSON.parse(saved), draft);
    if (linkError) {
      toast(linkError, 'error');
      return;
    }
    setSaving(true);
    try {
      await api.saveContent(next);
      setDraft(next);
      setSaved(JSON.stringify(next));
      try {
        localStorage.removeItem(PUBLIC_CACHE_KEY); // so the public site fetches the fresh copy
      } catch {
        /* ignore */
      }
      toast('Saved ✓ - website updated', 'ok');
    } catch (e) {
      toast(e.message, 'error');
    } finally {
      setSaving(false);
    }
  }, [draft, saved, saving, toast]);

  // Ctrl/Cmd + S
  const saveRef = useRef(save);
  saveRef.current = save;
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveRef.current();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // warn before closing with unsaved changes
  useEffect(() => {
    if (!dirty) return undefined;
    const h = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);

  const reset = async () => {
    if (!window.confirm('This will replace ALL website content with the original version. Continue?')) return;
    try {
      const r = await api.reset();
      const merged = mergeDefaults(defaultContent, r.content);
      setDraft(merged);
      setSaved(JSON.stringify(merged));
      localStorage.removeItem(PUBLIC_CACHE_KEY);
      toast('Website reset to the original content', 'ok');
    } catch (e) {
      toast(e.message, 'error');
    }
  };

  const ctx = useMemo(() => ({ status: status || {}, toast }), [status, toast]);
  const section = SECTIONS.find((s) => s.id === active);

  const go = (id) => {
    setActive(id);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  if (loadError) {
    return (
      <div className="adm adm-login">
        <div className="adm-login-card">
          <h1>Could not load</h1>
          <div className="adm-note adm-note-warn">{loadError}</div>
          <button className="adm-btn adm-btn-primary adm-btn-block" onClick={load}>Try again</button>
          <button className="adm-btn adm-btn-block" onClick={onLogout}>Log out</button>
        </div>
      </div>
    );
  }
  if (!draft || !status) return <div className="adm adm-login"><p className="adm-muted">Loading…</p></div>;

  let body = null;
  if (active === 'dashboard') body = <Dashboard status={status} go={go} />;
  else if (section?.special === 'media') body = <MediaLibrary kind="image" />;
  else if (section?.special === 'tools') body = <Tools draft={draft} setDraft={setDraft} status={status} toast={toast} onReset={reset} />;
  else if (section) {
    const key = sectionKey(section);
    if (section.pageId) {
      // one inner page = draft.pageContent[pageId]
      const pid = section.pageId;
      body = (
        <FieldsEditor
          key={pid}
          fields={section.fields}
          value={draft.pageContent?.[pid] || {}}
          onChange={(v) => setDraft({ ...draft, pageContent: { ...(draft.pageContent || {}), [pid]: v } })}
        />
      );
    } else if (section.rootList) {
      body = (
        <FieldsEditor
          fields={[section.rootList]}
          value={{ __root: draft[key] || [] }}
          onChange={(v) => setDraft({ ...draft, [key]: v.__root })}
        />
      );
    } else {
      body = <FieldsEditor fields={section.fields} value={draft[key] || {}} onChange={(v) => setDraft({ ...draft, [key]: v })} />;
    }
  }

  return (
    <AdminContext.Provider value={ctx}>
      <div className="adm">
        <header className="adm-top">
          <button className="adm-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">☰</button>
          <strong className="adm-brand">Website Admin</strong>
          <span className="adm-spacer" />
          {dirty && <span className="adm-unsaved">● Unsaved changes</span>}
          <a className="adm-btn" href="/" target="_blank" rel="noreferrer">View site ↗</a>
          <button className="adm-btn adm-btn-primary" onClick={save} disabled={!dirty || saving}>{saving ? 'Saving…' : 'Save changes'}</button>
          <button className="adm-btn adm-btn-ghost" onClick={() => (dirty && !window.confirm('You have unsaved changes. Log out anyway?') ? null : onLogout())}>Log out</button>
        </header>

        <div className="adm-layout">
          <nav className={`adm-side${menuOpen ? ' is-open' : ''}`}>
            <button className={`adm-nav${active === 'dashboard' ? ' on' : ''}`} onClick={() => go('dashboard')}>🏠 Dashboard</button>
            {GROUPS.map((g) => (
              <div key={g.id}>
                <div className="adm-nav-group">{g.label}</div>
                {SECTIONS.filter((s) => s.group === g.id).map((s) => (
                  <button key={s.id} className={`adm-nav${active === s.id ? ' on' : ''}`} onClick={() => go(s.id)}>
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          <main className="adm-main">
            <h2 className="adm-title">{active === 'dashboard' ? 'Dashboard' : section?.label}</h2>
            {section?.help && <div className="adm-note">{section.help}</div>}
            {section?.path && <p><a className="adm-btn" href={section.path} target="_blank" rel="noreferrer">↗ Open this page ({section.path})</a></p>}
            {body}
          </main>
        </div>

        <div className="adm-toasts">
          {toasts.map((t) => (
            <div key={t.id} className={`adm-toast ${t.type}`}>{t.msg}</div>
          ))}
        </div>
      </div>
    </AdminContext.Provider>
  );
}

export default function AdminApp() {
  const [token, setTok] = useState(getToken());

  useEffect(() => {
    document.title = 'Admin Panel';
    const h = () => setTok('');
    window.addEventListener('admin-unauthorized', h);
    return () => window.removeEventListener('admin-unauthorized', h);
  }, []);

  if (!token) return <Login onLogin={setTok} />;
  return (
    <Panel
      onLogout={() => {
        clearToken();
        setTok('');
      }}
    />
  );
}
