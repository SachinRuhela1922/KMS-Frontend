import { useRef, useState } from 'react';
import { uploadFile } from './api.js';
import { useAdmin } from './AdminContext.js';
import MediaLibrary from './MediaLibrary.jsx';
import { img as optImg } from '../lib/media.js';

const resolveLabel = (label, item) => (typeof label === 'function' ? label(item || {}) : label);

/** Empty value for a field definition */
const blankValue = (f) => {
  if (f.type === 'bool') return false;
  if (f.type === 'list') return [];
  if (f.type === 'group') return blankItem(f.fields);
  if (f.type === 'number') return 0;
  if (f.type === 'select') return f.options?.[0]?.value ?? f.options?.[0] ?? '';
  return '';
};
export const blankItem = (fields = []) => {
  const o = {};
  fields.forEach((f) => {
    if (!(f.key in o)) o[f.key] = blankValue(f);
  });
  return o;
};

/* ---------------------------------------------------------------- media field */
function MediaField({ field, value, onChange }) {
  const { status, toast } = useAdmin();
  const [progress, setProgress] = useState(null);
  const [picker, setPicker] = useState(false);
  const fileRef = useRef(null);
  const isVideo = field.type === 'video';

  const upload = async (file) => {
    if (!file) return;
    try {
      setProgress(0);
      const r = await uploadFile(file, setProgress);
      if ((r.kind === 'video') !== isVideo) throw new Error(`Please choose a ${isVideo ? 'video' : 'image'} file here`);
      onChange(r.url);
      toast('Uploaded to Cloudinary ✓', 'ok');
    } catch (e) {
      toast(e.message, 'error');
    } finally {
      setProgress(null);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="adm-media-field">
      <div className="adm-media-preview">
        {value ? (
          isVideo ? (
            <video src={value} muted controls preload="metadata" />
          ) : (
            <img src={optImg(value, 400)} alt="" onError={(e) => { e.currentTarget.style.opacity = 0.2; }} />
          )
        ) : (
          <span>{isVideo ? 'No video' : 'No image'}</span>
        )}
      </div>
      <div className="adm-media-side">
        <input className="adm-input" value={value || ''} placeholder="https://… (paste a link or upload)" onChange={(e) => onChange(e.target.value)} />
        <div className="adm-row">
          <input ref={fileRef} type="file" hidden accept={isVideo ? 'video/*' : 'image/*'} onChange={(e) => upload(e.target.files?.[0])} />
          <button
            type="button"
            className="adm-btn adm-btn-primary"
            disabled={progress !== null || !status.cloudinary}
            title={status.cloudinary ? '' : 'Cloudinary is not configured in .env'}
            onClick={() => fileRef.current?.click()}
          >
            ⬆ Upload
          </button>
          <button type="button" className="adm-btn" disabled={!status.cloudinary} onClick={() => setPicker(true)}>☁ Library</button>
          {value && <button type="button" className="adm-btn adm-btn-ghost" onClick={() => onChange('')}>Remove</button>}
        </div>
        {progress !== null && (
          <div className="adm-progress"><div style={{ width: `${progress}%` }} /><span>{progress}%</span></div>
        )}
      </div>

      {picker && (
        <div className="adm-modal" onClick={() => setPicker(false)}>
          <div className="adm-modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Choose {isVideo ? 'a video' : 'an image'}</h3>
            <MediaLibrary
              kind={isVideo ? 'video' : 'image'}
              onClose={() => setPicker(false)}
              onSelect={(u) => {
                onChange(u);
                setPicker(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- list field */
function ListEditor({ field, value, onChange }) {
  const { status, toast } = useAdmin();
  const items = Array.isArray(value) ? value : [];
  const [open, setOpen] = useState(() => new Set(items.length <= 2 ? items.map((_, i) => i) : []));
  const [bulk, setBulk] = useState(null);
  const bulkRef = useRef(null);

  const emit = (next, nextOpen) => {
    onChange(next);
    if (nextOpen) setOpen(nextOpen);
  };
  const shiftOpen = (fn) => new Set(Array.from(open).map(fn).filter((n) => n !== null));

  const add = (extra = {}) => {
    const item = { ...blankItem(field.fields), ...(field.defaults || {}), ...extra };
    if (item.children) item.children = [];
    emit([...items, item], new Set([...open, items.length]));
  };
  const remove = (i) => {
    if (!window.confirm('Delete this item?')) return;
    emit(items.filter((_, k) => k !== i), shiftOpen((n) => (n === i ? null : n > i ? n - 1 : n)));
  };
  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    emit(next, shiftOpen((n) => (n === i ? j : n === j ? i : n)));
  };
  const dup = (i) => {
    const next = [...items];
    next.splice(i + 1, 0, JSON.parse(JSON.stringify(items[i])));
    emit(next, shiftOpen((n) => (n > i ? n + 1 : n)));
  };
  const toggle = (i) =>
    setOpen((s) => {
      const n = new Set(s);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  const update = (i, item) => onChange(items.map((x, k) => (k === i ? item : x)));

  const bulkUpload = async (files) => {
    const arr = Array.from(files || []);
    if (!arr.length) return;
    const added = [];
    for (let k = 0; k < arr.length; k += 1) {
      try {
        setBulk(`Uploading ${k + 1}/${arr.length}…`);
        // eslint-disable-next-line no-await-in-loop
        const r = await uploadFile(arr[k], (p) => setBulk(`Uploading ${k + 1}/${arr.length} — ${p}%`));
        added.push({ ...blankItem(field.fields), ...(field.defaults || {}), [field.bulkImageKey]: r.url });
      } catch (e) {
        toast(e.message, 'error');
      }
    }
    setBulk(null);
    if (bulkRef.current) bulkRef.current.value = '';
    if (added.length) {
      onChange([...items, ...added]);
      toast(`${added.length} image(s) added`, 'ok');
    }
  };

  const firstImageKey = field.fields.find((f) => f.type === 'image')?.key;

  return (
    <div className="adm-list">
      {items.length === 0 && <p className="adm-muted">Nothing here yet.</p>}
      {items.map((item, i) => {
        const title = typeof field.itemLabel === 'function' ? field.itemLabel(item) : item?.[field.itemLabel] || '';
        const isOpen = open.has(i);
        const thumb = firstImageKey ? item?.[firstImageKey] : '';
        return (
          <div className={`adm-item${isOpen ? ' is-open' : ''}`} key={i}>
            <div className="adm-item-head" onClick={() => toggle(i)}>
              <span className="adm-item-num">{i + 1}</span>
              {thumb ? <img className="adm-item-thumb" src={optImg(thumb, 80)} alt="" /> : null}
              <span className="adm-item-title">{String(title || '(untitled)').slice(0, 90)}</span>
              <span className="adm-item-actions" onClick={(e) => e.stopPropagation()}>
                <button type="button" title="Move up" onClick={() => move(i, -1)} disabled={i === 0}>↑</button>
                <button type="button" title="Move down" onClick={() => move(i, 1)} disabled={i === items.length - 1}>↓</button>
                {!field.fixed && <button type="button" title="Duplicate" onClick={() => dup(i)}>⧉</button>}
                {!field.fixed && <button type="button" title="Delete" className="adm-danger" onClick={() => remove(i)}>✕</button>}
              </span>
              <span className="adm-item-caret">{isOpen ? '▾' : '▸'}</span>
            </div>
            {isOpen && (
              <div className="adm-item-body">
                <FieldsEditor fields={field.fields} value={item || {}} onChange={(v) => update(i, v)} />
              </div>
            )}
          </div>
        );
      })}

      {!field.fixed && (
        <div className="adm-row">
          <button type="button" className="adm-btn adm-btn-primary" onClick={() => add()}>＋ {field.addLabel || 'Add item'}</button>
          {field.bulkImageKey && (
            <>
              <input ref={bulkRef} type="file" hidden multiple accept="image/*" onChange={(e) => bulkUpload(e.target.files)} />
              <button type="button" className="adm-btn" disabled={!status.cloudinary || !!bulk} onClick={() => bulkRef.current?.click()}>
                ⬆ Upload many images at once
              </button>
              {bulk && <span className="adm-muted">{bulk}</span>}
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- single field */
export function FieldEditor({ field, value, onChange, item }) {
  const label = resolveLabel(field.label, item);
  let control;

  switch (field.type) {
    case 'textarea':
      control = <textarea className="adm-input" rows={field.rows || 4} value={value ?? ''} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />;
      break;
    case 'number':
      control = <input className="adm-input" type="number" value={value ?? 0} onChange={(e) => onChange(Number(e.target.value))} />;
      break;
    case 'bool':
      return (
        <label className="adm-check">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
          <span>{label}</span>
        </label>
      );
    case 'select':
      control = (
        <select className="adm-input" value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
          {(field.options || []).map((o) => {
            const v = typeof o === 'string' ? o : o.value;
            const l = typeof o === 'string' ? o.replace('fa-', '') : o.label;
            return <option key={v} value={v}>{l}</option>;
          })}
        </select>
      );
      break;
    case 'image':
    case 'video':
      control = <MediaField field={field} value={value} onChange={onChange} />;
      break;
    case 'list':
      control = <ListEditor field={field} value={value} onChange={onChange} />;
      break;
    case 'group':
      control = <FieldsEditor fields={field.fields} value={value || {}} onChange={onChange} />;
      break;
    default:
      control = <input className="adm-input" type="text" value={value ?? ''} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />;
  }

  return (
    <div className={`adm-field adm-field-${field.type}`}>
      <div className="adm-label">{label}</div>
      {control}
    </div>
  );
}

/** Renders all fields of an object */
export function FieldsEditor({ fields, value, onChange }) {
  return (
    <>
      {fields.map((f, idx) => {
        if (f.showIf && !f.showIf(value)) return null;
        return (
          <FieldEditor
            key={`${f.key}-${f.type}-${idx}`}
            field={f}
            item={value}
            value={value[f.key]}
            onChange={(v) => onChange({ ...value, [f.key]: v })}
          />
        );
      })}
    </>
  );
}
