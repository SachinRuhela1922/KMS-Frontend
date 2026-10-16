import OwlCarousel, { useListKey } from '../common/OwlCarousel.jsx';
import { useContent } from '../../context/ContentContext.jsx';
import { img } from '../../lib/media.js';

// CSS isi file mein hai (alag file nahi chahiye). Sab classes `nw-` se start hoti hain.
const css = `
.nw-section { position: relative; overflow: hidden; isolation: isolate; }
.nw-section::before {
  content: ""; position: absolute; inset: 0; z-index: -1; opacity: .6;
  background-image: radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px); background-size: 24px 24px;
}
.nw-ring { position: absolute; z-index: -1; border-radius: 50%; pointer-events: none; }
.nw-ring--one { width: 360px; height: 360px; bottom: -170px; right: -110px; border: 42px solid rgba(255,255,255,.05); animation: nw-spin 60s linear infinite; }
.nw-ring--two { width: 300px; height: 300px; top: -140px; left: -110px; background: rgba(255,193,7,.17); filter: blur(70px); animation: nw-float 18s ease-in-out infinite alternate; }
@keyframes nw-spin { to { transform: rotate(360deg); } }
@keyframes nw-float { to { transform: translate3d(30px, 24px, 0) scale(1.12); } }
@keyframes nw-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@keyframes nw-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes nw-nudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(6px); } }
@keyframes nw-ping { 0% { box-shadow: 0 0 0 0 rgba(255,193,7,.55); } 70%, 100% { box-shadow: 0 0 0 10px rgba(255,193,7,0); } }

/* heading */
.nw-title { letter-spacing: -.015em; margin-bottom: 12px; animation: nw-rise .6s cubic-bezier(.2,.7,.2,1) both; }
.nw-rule { display: block; width: 64px; height: 4px; margin-bottom: 14px; border-radius: 4px; background: #ffc107; transform-origin: left; animation: nw-grow .7s .2s cubic-bezier(.2,.7,.2,1) both; }
.nw-subtitle { max-width: 52ch; margin: 0; color: rgba(255,255,255,.78); line-height: 1.65; animation: nw-rise .6s .12s cubic-bezier(.2,.7,.2,1) both; }
.nw-section .links-btn-02 { display: inline-flex; align-items: center; gap: 8px; transition: gap .3s ease; animation: nw-rise .6s .2s cubic-bezier(.2,.7,.2,1) both; }
.nw-section .links-btn-02:hover { gap: 16px; }

/* carousel */
.nw-stage { position: relative; animation: nw-rise .7s .25s cubic-bezier(.2,.7,.2,1) both; }
.nw-stage .owl-stage-outer { padding: 46px 4px 22px; margin-top: -30px; } /* room for the date badge */

/* news card */
.nw-section .nw-card {
  position: relative; display: block; height: 100%; isolation: isolate;
  background: #fff; border-radius: 20px; text-decoration: none; color: inherit;
  box-shadow: 0 22px 40px -26px rgba(0,0,0,.7);
  transition: transform .4s cubic-bezier(.2,.7,.2,1), box-shadow .4s ease;
}
.nw-section .nw-card:hover { transform: translateY(-8px); box-shadow: 0 34px 50px -26px rgba(0,0,0,.8); text-decoration: none; }

.nw-section .nw-card .grid-style-02-image {
  position: relative; overflow: hidden; height: 230px; border-radius: 20px 20px 0 0;
}
.nw-section .nw-card .grid-style-02-image img {
  display: block; width: 100%; height: 100%; object-fit: cover; transform: scale(1.001);
  transition: transform .9s cubic-bezier(.2,.7,.2,1);
}
.nw-section .nw-card:hover .grid-style-02-image img { transform: scale(1.1); }
.nw-section .nw-card .grid-style-02-image::after { /* shine on hover */
  content: ""; position: absolute; top: 0; bottom: 0; left: -70%; width: 40%; pointer-events: none;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,.4), transparent); transform: skewX(-18deg);
}
.nw-section .nw-card:hover .grid-style-02-image::after { left: 160%; transition: left .9s ease; }

/* content: reset theme positioning, then lay out ourselves */
.nw-section .nw-card .grid-style-02-content {
  position: relative; inset: auto; transform: none; width: auto; background: transparent;
  padding: 50px 24px 24px;
}
/* the date: a gold tile that overlaps the photo */
.nw-section .nw-card .grid-style-02-date {
  position: absolute; top: -34px; left: 24px; right: auto; bottom: auto; z-index: 2;
  min-width: 66px; padding: 10px 12px 11px; border-radius: 14px; text-align: center;
  background: linear-gradient(180deg, #ffd75e, #ffc107); color: #1c1c1c !important;
  box-shadow: 0 14px 22px -10px rgba(0,0,0,.55);
  transition: transform .4s cubic-bezier(.2,1.4,.4,1);
}
.nw-section .nw-card .grid-style-02-date span { color: #1c1c1c !important; }
.nw-section .nw-card .grid-style-02-date span:first-child { font-size: 1.7rem; line-height: 1; }
.nw-section .nw-card .grid-style-02-date span:last-child { font-size: .82rem; font-weight: 600; margin-top: 2px; }
.nw-section .nw-card:hover .grid-style-02-date { transform: translateY(-4px) rotate(-3deg); animation: nw-ping 1.2s ease-out; }

.nw-section .nw-card .grid-style-02-content h5 {
  margin: 0 0 12px !important; font-weight: 700; font-size: 1.12rem; line-height: 1.45; color: #1c1c1c; transition: color .3s ease;
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}
.nw-section .nw-card:hover .grid-style-02-content h5 { color: #9a6b00; }
.nw-section .nw-card .grid-style-02-content p:empty { display: none; }

.nw-more { display: inline-flex; align-items: center; gap: 8px; font-size: .9rem; font-weight: 700; color: #1c1c1c; transition: gap .3s ease; }
.nw-more i { color: #e0a800; }
.nw-section .nw-card:hover .nw-more { gap: 14px; }

/* yellow bar that grows along the bottom of the card */
.nw-section .nw-card::after {
  content: ""; position: absolute; left: 24px; right: 24px; bottom: 0; height: 4px; border-radius: 4px 4px 0 0;
  background: #ffc107; transform: scaleX(.15); transform-origin: left; transition: transform .5s ease;
}
.nw-section .nw-card:hover::after { transform: scaleX(1); }

/* hint under the carousel */
.nw-note { display: flex; align-items: center; justify-content: center; gap: 10px; margin: 6px 0 0; color: rgba(255,255,255,.7); font-size: .9rem; animation: nw-rise .6s .45s cubic-bezier(.2,.7,.2,1) both; }
.nw-note i { color: #ffc107; animation: nw-nudge 1.6s ease-in-out infinite; }

@media (max-width: 767.98px) {
  .nw-subtitle { margin-bottom: 8px; }
  .nw-section .nw-card .grid-style-02-image { height: 200px; }
  .nw-section .nw-card .grid-style-02-content { padding: 46px 18px 22px; }
  .nw-section .nw-card .grid-style-02-date { left: 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .nw-section *, .nw-section *::before, .nw-section *::after { animation: none !important; transition: none !important; }
}
`;

export default function News() {
  const { news } = useContent();
  const items = news.items || [];
  return (
    <section className="pb-lg-70 pt-lg-70 pb-40 pt-40 theme-bg-01 nw-section">
      <style>{css}</style>
      <span className="nw-ring nw-ring--one" aria-hidden="true" />
      <span className="nw-ring nw-ring--two" aria-hidden="true" />

      <div className="container-fluid position-relative">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="row mb-lg-30 mb-20 justify-content-between align-items-end">
              <div className="col-md-6">
                <h2 className="font-weight-700 text-white nw-title">{news.title}</h2>
                <span className="nw-rule" aria-hidden="true" />
                <p className="nw-subtitle">
                  {news.subtitle ||
                    'Announcements, events and achievements from around our campus. Catch up on what has been happening lately.'}
                </p>
              </div>
              <div className="col-md-6 text-lg-right">
                {news.linkLabel && (
                  <a href={news.linkHref} className="links-btn-02">
                    {news.linkLabel}{' '}
                    <span>
                      <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </span>
                  </a>
                )}
              </div>
            </div>
            {items.length > 0 && (
              <div className="nw-stage">
                <OwlCarousel
                  key={useListKey(items)}
                  className="owl-carousel-03"
                  options={{
                    loop: items.length > 3,
                    margin: 15,
                    nav: false,
                    dots: false,
                    responsive: { 0: { items: 1 }, 600: { items: 2 }, 1000: { items: 3 } },
                  }}
                >
                  {items.map((n, i) => (
                    <div className="item" key={`${n.href}-${i}`}>
                      <a href={n.href || '#'} target="_blank" rel="noopener noreferrer" className="grid-style-02 nw-card">
                        <div className="grid-style-02-image">
                          <img src={img(n.img, 900)} alt={n.title} />
                        </div>
                        <div className="grid-style-02-content">
                          <div className="grid-style-02-date text-white font-20 line-height-1">
                            <span className="d-block font-weight-700 mb-1">{n.day}</span>
                            <span className="d-block ">{n.month}</span>
                          </div>
                          <h5 className="mb-2">{n.title}</h5>
                          <p className="text-dark m-0"></p>
                          <span className="nw-more">
                            Read story <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                          </span>
                        </div>
                      </a>
                    </div>
                  ))}
                </OwlCarousel>
                <p className="nw-note">
                  {news.note || 'Drag or swipe to read more stories'} <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}