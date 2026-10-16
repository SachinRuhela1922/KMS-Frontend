import { useEffect, useRef } from 'react';
import OwlCarousel, { useListKey } from '../common/OwlCarousel.jsx';
import { useContent } from '../../context/ContentContext.jsx';
import { img } from '../../lib/media.js';

// CSS isi file mein hai (alag file nahi chahiye). Sab classes `al-` se start hoti hain.
const css = `
.al-section { position: relative; overflow: hidden; isolation: isolate; background: linear-gradient(180deg, #fff 0%, #f6f7fb 100%); }
.al-section::before {
  content: ""; position: absolute; inset: 0; z-index: -1;
  background-image: radial-gradient(rgba(0,0,0,.05) 1px, transparent 1px); background-size: 22px 22px;
  -webkit-mask-image: linear-gradient(180deg, #000, transparent 90%); mask-image: linear-gradient(180deg, #000, transparent 90%);
}
.al-blob { position: absolute; z-index: -1; border-radius: 50%; filter: blur(70px); pointer-events: none; }
.al-blob--one { width: 320px; height: 320px; top: -130px; left: -90px; background: rgba(255,193,7,.26); animation: al-float 16s ease-in-out infinite alternate; }
.al-blob--two { width: 300px; height: 300px; bottom: -130px; right: -100px; background: rgba(60,80,160,.11); animation: al-float 20s ease-in-out infinite alternate-reverse; }
@keyframes al-float { to { transform: translate3d(30px, 24px, 0) scale(1.12); } }
@keyframes al-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@keyframes al-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes al-nudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(6px); } }
@keyframes al-ripple { 0% { transform: scale(1); opacity: .65; } 100% { transform: scale(2.1); opacity: 0; } }

/* heading */
.al-title { letter-spacing: -.015em; margin-bottom: 12px !important; animation: al-rise .6s cubic-bezier(.2,.7,.2,1) both; }
.al-rule { display: block; width: 64px; height: 4px; margin-bottom: 14px; border-radius: 4px; background: #ffc107; transform-origin: left; animation: al-grow .7s .2s cubic-bezier(.2,.7,.2,1) both; }
.al-subtitle { max-width: 52ch; margin: 0; color: #5b6170; line-height: 1.65; animation: al-rise .6s .12s cubic-bezier(.2,.7,.2,1) both; }
.al-section .links-btn-01 { display: inline-flex; align-items: center; gap: 8px; transition: gap .3s ease; animation: al-rise .6s .2s cubic-bezier(.2,.7,.2,1) both; }
.al-section .links-btn-01:hover { gap: 16px; }

/* carousel */
.al-stage { position: relative; animation: al-rise .7s .25s cubic-bezier(.2,.7,.2,1) both; }
.al-stage .owl-stage-outer { padding: 14px 4px 22px; }

/* alumni card: full photo, play button in the middle, name at the bottom */
.al-section .al-box {
  position: relative; overflow: hidden; isolation: isolate; height: 420px;
  border-radius: 22px; background: #1b1b2a;
  box-shadow: 0 22px 40px -26px rgba(20,30,70,.7);
  transition: transform .45s cubic-bezier(.2,.7,.2,1), box-shadow .45s ease;
}
.al-section .al-box:hover { transform: translateY(-8px); box-shadow: 0 34px 52px -26px rgba(20,30,70,.8); }

.al-section .al-box .alumni-box-image { position: absolute; inset: 0; margin: 0; height: 100%; }
.al-section .al-box .alumni-box-image img {
  display: block; width: 100%; height: 100%; object-fit: cover; object-position: top center; transform: scale(1.001);
  transition: transform 1s cubic-bezier(.2,.7,.2,1);
}
.al-section .al-box:hover .alumni-box-image img { transform: scale(1.1); }

/* shine across the photo on hover */
.al-section .al-box::before {
  content: ""; position: absolute; z-index: 3; top: 0; bottom: 0; left: -70%; width: 40%; pointer-events: none;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,.3), transparent); transform: skewX(-18deg);
}
.al-section .al-box:hover::before { left: 160%; transition: left .9s ease; }

/* content layer: reset theme positioning, then lay out ourselves */
.al-section .al-box .alumni-box-content {
  position: absolute; z-index: 2; inset: 0; width: auto; height: auto; transform: none; margin: 0; padding: 0; background: transparent;
  display: flex; flex-direction: column; justify-content: flex-end;
}
.al-section .al-box .alumni-box-content::before { /* gradient for readable text */
  content: ""; position: absolute; z-index: -1; inset: auto 0 0 0; height: 60%;
  background: linear-gradient(to top, rgba(14,8,26,.92) 0%, rgba(14,8,26,.6) 50%, transparent 100%);
}

/* "Alumni" tag in the corner */
.al-tag {
  position: absolute; z-index: 4; top: 16px; left: 16px; padding: 6px 14px; border-radius: 999px;
  font-size: .8rem; font-weight: 700; color: #fff; background: rgba(255,255,255,.16); border: 1px solid rgba(255,255,255,.35);
  -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
}

/* play button: centered, with ripples */
.al-section .al-box .alumni-box-content-play-btn {
  position: absolute; top: 46%; left: 50%; right: auto; bottom: auto; width: auto; height: auto; transform: translate(-50%, -50%); margin: 0;
}
.al-section .al-box .alumni-box-content-play-btn a {
  position: relative; display: grid; place-items: center; width: 74px; height: 74px; border-radius: 50%;
  background: linear-gradient(180deg, #ffd75e, #ffc107); color: #1c1c1c; font-size: 1.5rem; text-decoration: none;
  box-shadow: 0 16px 28px -10px rgba(0,0,0,.6);
  transition: transform .35s cubic-bezier(.2,1.4,.4,1), box-shadow .35s ease;
}
.al-section .al-box .alumni-box-content-play-btn a i { margin-left: 4px; }
.al-section .al-box .alumni-box-content-play-btn a::before,
.al-section .al-box .alumni-box-content-play-btn a::after {
  content: ""; position: absolute; inset: 0; border-radius: 50%; border: 2px solid rgba(255,193,7,.9); pointer-events: none;
  animation: al-ripple 2.4s ease-out infinite;
}
.al-section .al-box .alumni-box-content-play-btn a::after { animation-delay: 1.2s; }
.al-section .al-box:hover .alumni-box-content-play-btn a { transform: scale(1.14); box-shadow: 0 22px 34px -10px rgba(0,0,0,.7); }
.al-watch {
  position: absolute; top: calc(100% + 12px); left: 50%; transform: translateX(-50%); white-space: nowrap;
  padding: 5px 12px; border-radius: 999px; font-size: .78rem; font-weight: 600; color: #fff; background: rgba(0,0,0,.45);
  -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px);
}

/* name block */
.al-section .al-box .alumni-box-content-text { position: relative; margin: 0 !important; padding: 0 24px 24px !important; }
.al-role { display: block; margin-bottom: 6px; font-size: .84rem; color: #ffd75e; }
.al-section .al-box .alumni-box-content-text a {
  position: relative; display: inline-flex; align-items: center; gap: 10px; padding-top: 14px; color: #fff; text-decoration: none;
  transition: gap .3s ease, color .3s ease;
}
.al-section .al-box .alumni-box-content-text a::before { /* yellow bar above the name */
  content: ""; position: absolute; top: 0; left: 0; width: 36px; height: 4px; border-radius: 4px; background: #ffc107; transition: width .45s ease;
}
.al-section .al-box:hover .alumni-box-content-text a::before { width: 76px; }
.al-section .al-box .alumni-box-content-text a i { color: #ffc107; transition: transform .3s ease; }
.al-section .al-box:hover .alumni-box-content-text a i { transform: translateX(4px); }
.al-section a:focus-visible { outline: 3px solid #ffc107; outline-offset: 3px; }

/* hint under the carousel */
.al-note { display: flex; align-items: center; justify-content: center; gap: 10px; margin: 6px 0 0; color: #6a7080; font-size: .9rem; text-align: center; animation: al-rise .6s .45s cubic-bezier(.2,.7,.2,1) both; }
.al-note i { color: #e0a800; animation: al-nudge 1.6s ease-in-out infinite; }

@media (max-width: 767.98px) {
  .al-subtitle { margin-bottom: 8px; }
  .al-section .al-box { height: 380px; border-radius: 18px; }
  .al-section .al-box .alumni-box-content-play-btn a { width: 64px; height: 64px; font-size: 1.3rem; }
  .al-section .al-box .alumni-box-content-text { padding: 0 18px 20px !important; }
}
@media (prefers-reduced-motion: reduce) {
  .al-section *, .al-section *::before, .al-section *::after { animation: none !important; transition: none !important; }
}
`;

export default function Alumni() {
  const { alumni } = useContent();
  const items = alumni.items || [];
  const wrapRef = useRef(null);

  // YouTube video popup (Magnific Popup, delegated so it also works on Owl's cloned slides)
  useEffect(() => {
    const $ = window.jQuery;
    if (!$ || !$.fn.magnificPopup || !wrapRef.current) return undefined;
    const $wrap = $(wrapRef.current);
    $wrap.magnificPopup({ delegate: '.popup-youtube', type: 'iframe' });
    return () => {
      try {
        if ($wrap.data('magnificPopup')) $wrap.magnificPopup('close');
        $wrap.off('click.magnificPopup');
      } catch {
        /* ignore */
      }
    };
  }, []);

  return (
    <section className="pb-lg-70 pt-lg-70 pb-40 pt-40 al-section">
      <style>{css}</style>
      <span className="al-blob al-blob--one" aria-hidden="true" />
      <span className="al-blob al-blob--two" aria-hidden="true" />

      <div className="container-fluid position-relative">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="row mb-lg-30 mb-20 align-items-end justify-content-between">
              <div className="col-md-6 col-lg-5">
                <h2 className="font-weight-700 m-0 al-title">{alumni.title}</h2>
                <span className="al-rule" aria-hidden="true" />
                <p className="al-subtitle">
                  {alumni.subtitle ||
                    'Meet former students who began their journey here and went on to build careers and lives they are proud of. Their stories show what is possible.'}
                </p>
              </div>
              <div className="col-md-6 text-lg-right">
                {alumni.linkLabel && (
                  <a href={alumni.linkHref} className="links-btn-01">
                    {alumni.linkLabel}{' '}
                    <span>
                      <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </span>
                  </a>
                )}
              </div>
            </div>
            <div ref={wrapRef} className="al-stage">
              {items.length > 0 && (
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
                  {items.map((a, i) => (
                    <div className="item" key={`${a.href}-${i}`}>
                      <div className="alumni-box al-box">
                        <div className="alumni-box-image">
                          <img src={img(a.img, 700)} alt={a.name} />
                        </div>
                        <span className="al-tag" aria-hidden="true">Alumni</span>
                        <div className="alumni-box-content">
                          {a.video && (
                            <div className="alumni-box-content-play-btn">
                              <a href={a.video} className="popup-youtube" aria-label={`Watch ${a.name}'s story`}>
                                <i className="fa fa-play" aria-hidden="true"></i>
                              </a>
                              <span className="al-watch" aria-hidden="true">Watch their story</span>
                            </div>
                          )}
                          <div className="alumni-box-content-text pl-20 mb-10 pr-30">
                            <span className="al-role">{a.role || 'Proud alumnus'}</span>
                            <a href={a.href || '#'} target="_blank" rel="noopener noreferrer" className="font-weight-600 font-20" tabIndex={0}>
                              {a.name} <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              )}
              {items.length > 0 && (
                <p className="al-note">
                  {alumni.note || 'Drag or swipe to meet more alumni. Tap play to watch their story'} <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}