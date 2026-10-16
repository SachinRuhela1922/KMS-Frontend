import { useCallback, useEffect, useRef, useState } from 'react';
import { api, uploadFile } from './api.js';
import { useAdmin } from './AdminContext.js';

const fmtSize = (b = 0) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

/**
 * Browse / upload / delete files stored in Cloudinary.
 * - used inside a modal (onSelect given) to pick a file for a field
 * - used as a full page (no onSelect) to manage files
 */
export default function MediaLibrary({ kind: initialKind = 'image', onSelect, onClose }) {
  const { status, toast } = useAdmin();
  const [kind, setKind] = useState(initialKind);
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(null);
  const fileRef = useRef(null);

  const load = useCallback(
    async (more = false, from = null) => {
      setLoading(true);
      setError('');
      try {
        const res = await api.media(kind, more ? from : undefined);
        setItems((prev) => (more ? [...prev, ...res.items] : res.items));
        setCursor(res.nextCursor);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [kind]
  );

  useEffect(() => {
    if (status.cloudinary) load(false);
  }, [load, status.cloudinary]);

  const upload = async (files) => {
    const list = Array.from(files || []);
    if (!list.length) return;
    for (let i = 0; i < list.length; i += 1) {
      try {
        setProgress({ i: i + 1, n: list.length, pct: 0, name: list[i].name });
        // eslint-disable-next-line no-await-in-loop
        const r = await uploadFile(list[i], (pct) => setProgress({ i: i + 1, n: list.length, pct, name: list[i].name }));
        if (r.kind !== kind) setKind(r.kind);
      } catch (e) {
        toast(e.message, 'error');
      }
    }
    setProgress(null);
    if (fileRef.current) fileRef.current.value = '';
    load(false);
    toast('Upload finished', 'ok');
  };

  const remove = async (it) => {
    if (!window.confirm('Delete this file from Cloudinary?\nIf it is used on the website it will show as broken.')) return;
    try {
      await api.deleteMedia(it.publicId, it.type);
      setItems((l) => l.filter((x) => x.publicId !== it.publicId));
    } catch (e) {
      toast(e.message, 'error');
    }
  };

  const copy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toast('Link copied', 'ok');
    } catch {
      window.prompt('Copy this link:', url);
    }
  };

  if (!status.cloudinary) {
    return (
      <div className="adm-note adm-note-warn">
        <b>Cloudinary is not connected.</b> Add <code>CLOUDINARY_CLOUD_NAME</code>, <code>CLOUDINARY_API_KEY</code> and{' '}
        <code>CLOUDINARY_API_SECRET</code> to the <code>.env</code> file and restart the server. Until then you can still paste image / video links manually.
      </div>
    );
  }

  return (
    <div className="adm-media">
      <div className="adm-media-bar">
        <div className="adm-tabs">
          <button type="button" className={kind === 'image' ? 'on' : ''} onClick={() => setKind('image')}>Images</button>
          <button type="button" className={kind === 'video' ? 'on' : ''} onClick={() => setKind('video')}>Videos</button>
        </div>
        <div className="adm-row">
          <input ref={fileRef} type="file" hidden multiple accept="image/*,video/*" onChange={(e) => upload(e.target.files)} />
          <button type="button" className="adm-btn adm-btn-primary" disabled={!!progress} onClick={() => fileRef.current?.click()}>⬆ Upload</button>
          <button type="button" className="adm-btn" onClick={() => load(false)} disabled={loading}>↻ Refresh</button>
          {onClose && <button type="button" className="adm-btn" onClick={onClose}>✕ Close</button>}
        </div>
      </div>

      {progress && (
        <div className="adm-progress">
          <div style={{ width: `${progress.pct}%` }} />
          <span>Uploading {progress.i}/{progress.n}: {progress.name} — {progress.pct}%</span>
        </div>
      )}
      {error && <div className="adm-note adm-note-warn">{error}</div>}

      <div className="adm-grid">
        {items.map((it) => (
          <div className="adm-tile" key={it.publicId}>
            <button type="button" className="adm-tile-thumb" onClick={() => (onSelect ? onSelect(it.url) : copy(it.url))} title={onSelect ? 'Use this file' : 'Copy link'}>
              {it.type === 'video' ? (
                <video src={it.url} muted preload="metadata" />
              ) : (
                <img src={it.url.replace('/upload/', '/upload/c_fill,w_300,h_220,f_auto,q_auto/')} alt="" loading="lazy" />
              )}
            </button>
            <div className="adm-tile-meta">
              <span>{(it.format || '').toUpperCase()} · {fmtSize(it.bytes)}</span>
              <span>
                <button type="button" className="adm-link" onClick={() => copy(it.url)}>copy</button>
                <button type="button" className="adm-link adm-danger" onClick={() => remove(it)}>delete</button>
              </span>
            </div>
          </div>
        ))}
      </div>
      {!loading && !items.length && !error && <p className="adm-muted">No {kind}s uploaded yet.</p>}
      {loading && <p className="adm-muted">Loading…</p>}
      {cursor && !loading && (
        <button type="button" className="adm-btn" onClick={() => load(true, cursor)}>Load more</button>
      )}
    </div>
  );
}
