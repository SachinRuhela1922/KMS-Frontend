import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContent } from '../../context/ContentContext.jsx';
import usePageTitle from '../../lib/usePageTitle.js';
import ClassPicker from '../../components/classes/ClassPicker.jsx';
import { classPath, groupByStage } from '../../lib/classes.js';
import NotFound from '../NotFound.jsx';
import styles from './Classes.module.css';

const Empty = ({ children }) => <p className={styles.empty}>{children}</p>;

function Overview({ c }) {
  return (
    <>
      <p className={styles.lead}>{c.about}</p>
      {!!c.highlights?.length && (
        <ul className={styles.ticks}>
          {c.highlights.map((h, i) => <li key={i}>{h.text}</li>)}
        </ul>
      )}
    </>
  );
}

function Subjects({ c }) {
  return (
    <>
      {c.subjects?.length ? (
        <div className={styles.cards}>
          {c.subjects.map((s, i) => (
            <div className={styles.miniCard} key={i}>
              <strong>{s.name}</strong>
              {s.note && <span>{s.note}</span>}
            </div>
          ))}
        </div>
      ) : <Empty>Subjects will be updated soon.</Empty>}
      {!!c.streams?.length && (
        <>
          <h3 className={styles.sub}>Streams available</h3>
          <div className={styles.cards}>
            {c.streams.map((s, i) => (
              <div className={`${styles.miniCard} ${styles.stream}`} key={i}>
                <strong>{s.name}</strong>
                <span>{s.subjects}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function Faculty({ c }) {
  if (!c.faculty?.length) return <Empty>Faculty details will be updated soon.</Empty>;
  return (
    <div className={styles.cards}>
      {c.faculty.map((t, i) => (
        <div className={`${styles.miniCard} ${styles.person}`} key={i}>
          <span className={styles.avatar} aria-hidden="true">{(t.name || '?').replace(/^(Mr|Mrs|Ms|Dr|Smt|Shri)\.?\s+/i, '').charAt(0)}</span>
          <div>
            <strong>{t.name}</strong>
            <span>{t.role}</span>
            {t.qualification && <em>{t.qualification}</em>}
          </div>
        </div>
      ))}
    </div>
  );
}

function Fees({ c }) {
  if (!c.fees?.length) return <Empty>Fee details are available at the school office.</Empty>;
  return (
    <>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead><tr><th>Fee</th><th>Amount</th><th>Note</th></tr></thead>
          <tbody>
            {c.fees.map((f, i) => (
              <tr key={i}><td>{f.label}</td><td className={styles.amount}>{f.amount}</td><td>{f.note}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      {c.feeNote && <p className={styles.note}>{c.feeNote}</p>}
    </>
  );
}

function Events({ c }) {
  if (!c.events?.length) return <Empty>Events will be updated soon.</Empty>;
  return (
    <ol className={styles.timeline}>
      {c.events.map((ev, i) => (
        <li key={i}>
          <span className={styles.month}>{ev.month}</span>
          <div><strong>{ev.title}</strong>{ev.text && <p>{ev.text}</p>}</div>
        </li>
      ))}
    </ol>
  );
}

const TABS = [
  { id: 'overview', label: 'Overview', View: Overview },
  { id: 'subjects', label: 'Subjects & Stream', View: Subjects },
  { id: 'faculty', label: 'Faculty', View: Faculty },
  { id: 'fees', label: 'Fees', View: Fees },
  { id: 'events', label: 'Events', View: Events },
];

function Details({ c, items }) {
  const { settings } = useContent();
  const [tab, setTab] = useState('overview');
  useEffect(() => setTab('overview'), [c.slug]);
  const i = items.findIndex((x) => x.slug === c.slug);
  const prev = items[i - 1];
  const next = items[i + 1];
  const Active = TABS.find((t) => t.id === tab).View;
  const facts = [
    ['Total strength', c.strength ? `${c.strength} students` : ''],
    ['Sections', c.sections],
    ['Per section', c.studentsPerSection],
    ['Class teacher', c.classTeacher],
    ['School timing', c.timing],
    ['Medium', c.medium],
    ['Age group', c.ages],
    ['Board', c.board],
  ].filter(([, v]) => v);

  return (
    <div className={styles.detail}>
      <div className={styles.banner}>
        <span className={styles.stage}>{c.stage}</span>
        <h2>{c.name}</h2>
        <p>{c.board}{c.medium ? ` · ${c.medium} medium` : ''}</p>
      </div>

      <div className={styles.facts}>
        {facts.map(([k, v]) => (
          <div className={styles.fact} key={k}><span>{k}</span><strong>{v}</strong></div>
        ))}
      </div>

      <div className={styles.tabs} role="tablist">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} className={`${styles.tab} ${tab === t.id ? styles.tabOn : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className={styles.panel} role="tabpanel"><Active c={c} /></div>

      <div className={styles.footerRow}>
        <div className={styles.pn}>
          {prev && <Link to={classPath(prev)}>← {prev.name}</Link>}
          {next && <Link to={classPath(next)}>{next.name} →</Link>}
        </div>
        {settings?.applyUrl && (
          <a className={styles.apply} href={settings.applyUrl} target={/^https?:/.test(settings.applyUrl) ? '_blank' : undefined} rel="noopener noreferrer">
            {settings.applyLabel || 'Apply Now'} for {c.name}
          </a>
        )}
      </div>
    </div>
  );
}

// Page: /classes  and  /classes/:slug     (data: Admin Panel -> School -> Classes)
export default function Classes() {
  const { slug } = useParams();
  const { classes } = useContent();
  const items = classes?.items || [];
  const current = items.find((c) => c.slug === slug);
  usePageTitle(current ? `${current.name} – Class Details` : classes?.title || 'Classes');

  if (slug && !current) return <NotFound />;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.inner}>
          <span className={styles.badge}>{classes?.board} · Session {classes?.session}</span>
          <h1>{classes?.title}</h1>
          <p>{classes?.intro}</p>
          <ClassPicker items={items} current={slug} placeholder={classes?.placeholder} />
        </div>
      </header>

      <div className={styles.body}>
        {current ? (
          <Details c={current} items={items} />
        ) : (
          <div className={styles.overview}>
            {classes?.admissionNote && <p className={styles.admission}>{classes.admissionNote}</p>}
            {groupByStage(items).map((g) => (
              <section key={g.stage}>
                <h3 className={styles.sub}>{g.stage}</h3>
                <div className={styles.grid}>
                  {g.list.map((c) => (
                    <Link to={classPath(c)} className={styles.classCard} key={c.slug}>
                      <strong>{c.name}</strong>
                      <span>{c.strength} students · {c.ages}</span>
                      <em>View details →</em>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
