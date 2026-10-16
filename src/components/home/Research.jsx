import OwlCarousel, { useListKey } from '../common/OwlCarousel.jsx';
import { useContent } from '../../context/ContentContext.jsx';
import { img } from '../../lib/media.js';

// CSS isi file mein hai (alag file nahi chahiye). Sab classes `rs-` se start hoti hain.
const css = `
.rs-section { position: relative; overflow: hidden; isolation: isolate; background: linear-gradient(180deg, #fff 0%, #f6f7fb 100%); }
.rs-section::before {
  content: ""; position: absolute; inset: 0; z-index: -1;
  background-image: radial-gradient(rgba(0,0,0,.05) 1px, transparent 1px); background-size: 22px 22px;
  -webkit-mask-image: linear-gradient(180deg, #000, transparent 90%); mask-image: linear-gradient(180deg, #000, transparent 90%);
}
.rs-blob { position: absolute; z-index: -1; border-radius: 50%; filter: blur(70px); pointer-events: none; }
.rs-blob--one { width: 320px; height: 320px; top: -130px; right: -90px; background: rgba(255,193,7,.26); animation: rs-float 16s ease-in-out infinite alternate; }
.rs-blob--two { width: 300px; height: 300px; bottom: -130px; left: -100px; background: rgba(60,80,160,.11); animation: rs-float 20s ease-in-out infinite alternate-reverse; }
@keyframes rs-float { to { transform: translate3d(30px, 24px, 0) scale(1.12); } }
@keyframes rs-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@keyframes rs-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes rs-nudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(6px); } }

/* heading */
.rs-title { letter-spacing: -.015em; margin-bottom: 12px; animation: rs-rise .6s cubic-bezier(.2,.7,.2,1) both; }
.rs-rule { display: block; width: 64px; height: 4px; margin-bottom: 14px; border-radius: 4px; background: #ffc107; transform-origin: left; animation: rs-grow .7s .2s cubic-bezier(.2,.7,.2,1) both; }
.rs-subtitle { max-width: 54ch; margin: 0; color: #5b6170; line-height: 1.65; animation: rs-rise .6s .12s cubic-bezier(.2,.7,.2,1) both; }
.rs-section .links-btn-01 { display: inline-flex; align-items: center; gap: 8px; transition: gap .3s ease; animation: rs-rise .6s .2s cubic-bezier(.2,.7,.2,1) both; }
.rs-section .links-btn-01:hover { gap: 16px; }

/* carousel */
.rs-stage { position: relative; animation: rs-rise .7s .25s cubic-bezier(.2,.7,.2,1) both; }
.rs-stage .owl-stage-outer { padding: 14px 4px 22px; }

/* research card */
.rs-section .rs-card {
  position: relative; display: block; overflow: hidden; isolation: isolate; height: 100%;
  background: #fff; border-radius: 20px; border: 1px solid rgba(0,0,0,.06);
  box-shadow: 0 16px 34px -24px rgba(20,30,70,.55);
  text-decoration: none; color: inherit;
  transition: transform .4s cubic-bezier(.2,.7,.2,1), box-shadow .4s ease, border-color .4s ease;
}
.rs-section .rs-card:hover { transform: translateY(-8px); border-color: rgba(255,193,7,.75); box-shadow: 0 30px 44px -26px rgba(20,30,70,.6); text-decoration: none; }

.rs-section .rs-card .grid-style-01-image { position: relative; overflow: hidden; border-radius: 0; }
.rs-section .rs-card .grid-style-01-image img {
  display: block; width: 100%; height: 100%; object-fit: cover; transform: scale(1.001);
  transition: transform .9s cubic-bezier(.2,.7,.2,1);
}
.rs-section .rs-card:hover .grid-style-01-image img { transform: scale(1.1); }

/* gradient at the bottom of the photo + arrow badge in the corner */
.rs-shade { position: absolute; z-index: 1; inset: 0; background: linear-gradient(to top, rgba(15,10,30,.55), transparent 55%); opacity: .55; transition: opacity .4s ease; pointer-events: none; }
.rs-section .rs-card:hover .rs-shade { opacity: 1; }
.rs-badge {
  position: absolute; z-index: 2; top: 14px; right: 14px; width: 44px; height: 44px; border-radius: 50%;
  display: grid; place-items: center; background: #fff; color: #1c1c1c; box-shadow: 0 10px 20px -8px rgba(0,0,0,.45);
  transform: scale(.7) rotate(-45deg); opacity: 0; transition: transform .45s cubic-bezier(.2,1.4,.4,1), opacity .3s ease, background .3s ease;
}
.rs-section .rs-card:hover .rs-badge { transform: none; opacity: 1; background: #ffc107; }

/* shine across the photo */
.rs-section .rs-card .grid-style-01-image::after {
  content: ""; position: absolute; z-index: 2; top: 0; bottom: 0; left: -70%; width: 40%; pointer-events: none;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,.4), transparent); transform: skewX(-18deg);
}
.rs-section .rs-card:hover .grid-style-01-image::after { left: 160%; transition: left .9s ease; }

/* content area */
.rs-section .rs-card .grid-style-01-content { position: relative; margin-top: 0 !important; padding: 22px 22px 20px; }
.rs-section .rs-card .grid-style-01-content::before {
  content: ""; position: absolute; top: 0; left: 22px; width: 36px; height: 4px; border-radius: 0 0 4px 4px; background: #ffc107; transition: width .45s ease;
}
.rs-section .rs-card:hover .grid-style-01-content::before { width: calc(100% - 44px); }
.rs-section .rs-card .grid-style-01-content h5 {
  margin: 6px 0 14px; font-weight: 700; font-size: 1.12rem; line-height: 1.4;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.rs-more { display: inline-flex; align-items: center; gap: 8px; font-size: .9rem; font-weight: 700; color: #1c1c1c; transition: gap .3s ease, color .3s ease; }
.rs-more i { color: #e0a800; }
.rs-section .rs-card:hover .rs-more { gap: 14px; }

/* hint under the carousel */
.rs-note { display: flex; align-items: center; justify-content: center; gap: 10px; margin: 8px 0 0; color: #6a7080; font-size: .9rem; animation: rs-rise .6s .45s cubic-bezier(.2,.7,.2,1) both; }
.rs-note i { color: #e0a800; animation: rs-nudge 1.6s ease-in-out infinite; }

@media (max-width: 767.98px) {
  .rs-subtitle { margin-bottom: 8px; }
  .rs-badge { opacity: 1; transform: none; width: 38px; height: 38px; }
  .rs-section .rs-card .grid-style-01-content { padding: 18px 16px 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .rs-section *, .rs-section *::before, .rs-section *::after { animation: none !important; transition: none !important; }
}
`;

export default function Research() {
  const { research } = useContent();
  const items = research.items || [];
  return (
    <section className="pb-lg-70 pt-lg-70 pb-40 pt-40 rs-section">
      <style>{css}</style>
      <span className="rs-blob rs-blob--one" aria-hidden="true" />
      <span className="rs-blob rs-blob--two" aria-hidden="true" />

      <div className="container-fluid position-relative">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="row mb-lg-30 mb-20 justify-content-between align-items-end">
              <div className="col-md-6">
                <h2 className="font-weight-700 rs-title">{research.title}</h2>
                <span className="rs-rule" aria-hidden="true" />
                <p className="rs-subtitle">
                  {research.subtitle ||
                    'Curiosity-led projects, publications and discoveries from our students and faculty. See how ideas here turn into real-world impact.'}
                </p>
              </div>
              <div className="col-md-6 text-lg-right">
                {research.linkLabel && (
                  <a href={research.linkHref} className="links-btn-01">
                    {research.linkLabel}{' '}
                    <span>
                      <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </span>
                  </a>
                )}
              </div>
            </div>

            {items.length > 0 && (
              <div className="rs-stage">
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
                  {items.map((r, i) => (
                    <div className="item" key={`${r.href}-${i}`}>
                      <a href={r.href || '#'} target="_blank" rel="noopener noreferrer" className="grid-style-01 rs-card">
                        <div className="grid-style-01-image" style={{ height: '300px' }}>
                          <img src={img(r.img, 900)} alt={r.title} />
                          <span className="rs-shade" aria-hidden="true" />
                          <span className="rs-badge" aria-hidden="true">
                            <i className="fa fa-long-arrow-right"></i>
                          </span>
                        </div>
                        <div className="grid-style-01-content mt-20">
                          <h5>{r.title}</h5>
                          <span className="rs-more">
                            Read more <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                          </span>
                        </div>
                      </a>
                    </div>
                  ))}
                </OwlCarousel>
                <p className="rs-note">
                  {research.note || 'Drag or swipe to explore more research'} <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}