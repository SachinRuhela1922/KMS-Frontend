import { useContent } from '../../context/ContentContext.jsx';
import { img } from '../../lib/media.js';
import SmartLink from '../common/SmartLink.jsx';

// All footer styles live here (rendered via <style> below). Scoped with the `ft-` prefix.
const FOOTER_CSS = `
.ft { position: relative; overflow: hidden; color: #e9d9dc; background: #2a0b12 center bottom / cover no-repeat; -webkit-font-smoothing: antialiased; }
.ft::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(60, 8, 20, 0.93), rgba(25, 5, 10, 0.97)); }
.ft-inner { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; padding: 44px 20px 26px; display: grid; grid-template-columns: 1.25fr 1fr 1.5fr; gap: 36px; }

.ft-title { position: relative; margin: 0 0 18px; padding-bottom: 10px; font-size: 16px; font-weight: 700; letter-spacing: 0.01em; color: #fff; }
.ft-title::after { content: ''; position: absolute; left: 0; bottom: 0; width: 32px; height: 3px; border-radius: 3px; background: #ffc107; }
.ft-title.sub { margin-top: 22px; font-size: 15px; }

.ft-text { margin: 0 0 10px; font-size: 14px; line-height: 1.65; color: #d9c3c8; }
.ft-text a { color: #ffc107; text-decoration: none; word-break: break-word; }
.ft-text a:hover { text-decoration: underline; text-underline-offset: 3px; }

.ft-map { display: inline-flex; align-items: center; margin-top: 6px; padding: 8px 18px; font-size: 13.5px; font-weight: 700; color: #1f2430; background: #ffc107; border: 0; border-radius: 8px; text-decoration: none; transition: background 0.2s, color 0.2s; }
.ft-map:hover { color: #fff; background: #b71a34; }

.ft-social { display: flex; flex-wrap: wrap; gap: 10px; margin: 0; padding: 0; list-style: none; }
.ft-social a { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; color: #fff; background: rgba(255, 255, 255, 0.1); border-radius: 50%; text-decoration: none; transition: background 0.25s, color 0.25s, transform 0.25s; }
.ft-social a:hover { color: #1f2430; background: #ffc107; transform: translateY(-3px); }

.ft-links { margin: 0; padding: 0; list-style: none; }
.ft-links.two { columns: 2; column-gap: 28px; }
.ft-links li { break-inside: avoid; }
.ft-links a { display: inline-block; padding: 4px 0; font-size: 14px; line-height: 1.5; color: #d9c3c8; text-decoration: none; transition: color 0.2s, transform 0.2s; }
.ft-links a:hover { color: #ffc107; transform: translateX(4px); }

.ft-bar { position: relative; z-index: 1; padding: 14px 20px; text-align: center; background: rgba(0, 0, 0, 0.3); border-top: 1px solid rgba(255, 255, 255, 0.1); }
.ft-bar p { margin: 0; font-size: 12.5px; color: #b9a2a7; }

.ft a:focus-visible { outline: 2px solid #ffc107; outline-offset: 3px; border-radius: 4px; }

@media (max-width: 991px) {
  .ft-inner { grid-template-columns: 1fr 1fr; gap: 30px 28px; padding-top: 38px; }
  .ft-col-wide { grid-column: 1 / -1; }
}
@media (max-width: 560px) {
  .ft-inner { grid-template-columns: 1fr; padding: 34px 18px 20px; }
  .ft-links.two { columns: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .ft-links a, .ft-social a, .ft-map { transition: none; }
  .ft-links a:hover, .ft-social a:hover { transform: none; }
}
`;

export default function Footer() {
  const { footer: f, settings } = useContent();
  const bg = settings.footerBg ? { backgroundImage: `url(${img(settings.footerBg, 1920)})` } : undefined;

  return (
    <footer className="ft" style={bg}>
      <style>{FOOTER_CSS}</style>

      <div className="ft-inner">
        {/* Campus location + contacts */}
        <div>
          <h5 className="ft-title">{f.addressTitle}</h5>
          <p className="ft-text">{f.address}</p>
          {(f.emailContacts || []).map((c, i) => (
            <p className="ft-text" key={`${c.email}-${i}`}>
              {c.text} <br />
              <a href={`mailto:${c.email}`}>{c.email}</a>
            </p>
          ))}

          {f.mapLabel && (
            <a href={f.mapUrl} className="ft-map" target="_blank" rel="noopener noreferrer">
              {f.mapLabel}
            </a>
          )}

          {(f.socialLinks || []).length > 0 && (
            <>
              <h5 className="ft-title sub">{f.socialTitle}</h5>
              <ul className="ft-social">
                {f.socialLinks.map((s, i) => (
                  <li key={`${s.icon}-${i}`}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.icon.replace('fa-', '')}>
                      <i className={`fa ${s.icon}`}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Information */}
        <div>
          <h5 className="ft-title">{f.informationTitle}</h5>
          <ul className="ft-links">
            {(f.information || []).map((l, i) => (
              <li key={`${l.label}-${i}`}>
                <SmartLink href={l.href} newTab={l.newTab}>
                  {l.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div className="ft-col-wide">
          <h5 className="ft-title">{f.quickLinksTitle}</h5>
          <ul className="ft-links two">
            {(f.quickLinks || []).map((l, i) => (
              <li key={`${l.label}-${i}`}>
                <SmartLink href={l.href} newTab={l.newTab}>
                  {l.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ft-bar">
        <p>{f.copyright}</p>
      </div>
    </footer>
  );
}