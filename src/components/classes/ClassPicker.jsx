import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { groupByStage, classPath } from '../../lib/classes.js';
import styles from './ClassPicker.module.css';

/**
 * Dropdown that lists every class (grouped by stage). Clicking a class opens /classes/<slug>.
 * `current` = slug of the class that is open right now (highlighted).
 */
export default function ClassPicker({ items = [], current = '', placeholder = 'Select your class' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const groups = groupByStage(items);
  const active = items.find((c) => c.slug === current);

  useEffect(() => {
    if (!open) return undefined;
    const close = (ev) => {
      if (ev.type === 'keydown' ? ev.key === 'Escape' : ref.current && !ref.current.contains(ev.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  const pick = (c) => {
    setOpen(false);
    navigate(classPath(c));
  };

  return (
    <div className={styles.picker} ref={ref}>
      <button type="button" className={styles.trigger} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span className={active ? styles.value : styles.placeholder}>{active ? `${active.name} · ${active.stage}` : placeholder}</span>
        <span className={`${styles.chev} ${open ? styles.chevOpen : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <div className={styles.panel} role="listbox" aria-label="Classes">
          {groups.map((g) => (
            <div key={g.stage} className={styles.group}>
              <div className={styles.groupTitle}>{g.stage}</div>
              <div className={styles.options}>
                {g.list.map((c) => (
                  <button
                    type="button"
                    role="option"
                    aria-selected={c.slug === current}
                    key={c.slug}
                    className={`${styles.option} ${c.slug === current ? styles.optionActive : ''}`}
                    onClick={() => pick(c)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
