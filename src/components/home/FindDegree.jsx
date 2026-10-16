import { useContent } from '../../context/ContentContext.jsx';
import './FindDegree.css';

// Optional CMS fields (f.subtitle, f.popularLabel, f.popular) — agar content me nahi hain to ye defaults use honge.
const DEFAULT_POPULAR = ['Engineering', 'Business', 'Computer Science', 'Design'];

export default function FindDegree() {
  const { findDegree: f } = useContent();
  const popular = f.popular || DEFAULT_POPULAR;

  return (
    <section className="theme-bg-01 pb-lg-100 pt-lg-50 pb-40 pt-30 fd-section">
      <span className="fd-orb fd-orb--one" aria-hidden="true" />
      <span className="fd-orb fd-orb--two" aria-hidden="true" />

      <div className="container-fluid position-relative">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="fd-head">
              <h2 className="font-weight-600 text-white fd-title">{f.title}</h2>
              <p className="fd-subtitle">
                {f.subtitle || 'Pick a programme, type a keyword, and see the courses that match.'}
              </p>
            </div>

            <form className="programme-search fd-form" action={f.action}>
              <div className="row no-gutters fd-bar">
                <div className="col-md-2 fd-cell fd-cell--select">
                  <select className="form-control" name="programme" defaultValue="">
                    <option value="">{f.selectLabel}</option>
                    {(f.options || []).map((o, i) => (
                      <option key={`${o.value}-${i}`} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-8 fd-cell fd-cell--input">
                  <svg className="fd-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <input
                    name="q"
                    className="form-control"
                    type="text"
                    placeholder={f.placeholder}
                    autoComplete="off"
                  />
                </div>
                <div className="col-md-2 fd-cell fd-cell--button">
                  <button className="btn btn-block fd-btn">
                    <span>{f.buttonLabel}</span>
                  </button>
                </div>
              </div>
            </form>

            {popular.length > 0 && (
              <div className="fd-popular">
                <span className="fd-popular-label">{f.popularLabel || 'Popular searches'}</span>
                {popular.map((p, i) => (
                  <a
                    key={`${p}-${i}`}
                    className="fd-chip"
                    href={`${f.action || ''}?q=${encodeURIComponent(p)}`}
                  >
                    {p}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}