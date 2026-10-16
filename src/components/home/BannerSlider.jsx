import OwlCarousel, { useListKey } from '../common/OwlCarousel.jsx';
import { useContent } from '../../context/ContentContext.jsx';
import { img } from '../../lib/media.js';

// CSS isi file mein hai (alag file nahi chahiye). Sab classes `bn-` se start hoti hain.
const css = `
.bn-section { position: relative; overflow: hidden; isolation: isolate; background: linear-gradient(180deg, #f6f7fb 0%, #fff 100%); }
.bn-section::before {
  content: ""; position: absolute; inset: 0; z-index: -1;
  background-image: radial-gradient(rgba(0,0,0,.05) 1px, transparent 1px); background-size: 22px 22px;
  -webkit-mask-image: linear-gradient(180deg, #000, transparent 90%); mask-image: linear-gradient(180deg, #000, transparent 90%);
}
.bn-blob { position: absolute; z-index: -1; border-radius: 50%; filter: blur(70px); pointer-events: none; }
.bn-blob--one { width: 300px; height: 300px; top: -120px; right: -80px; background: rgba(255,193,7,.26); animation: bn-float 16s ease-in-out infinite alternate; }
.bn-blob--two { width: 280px; height: 280px; bottom: -120px; left: -90px; background: rgba(60,80,160,.11); animation: bn-float 20s ease-in-out infinite alternate-reverse; }
@keyframes bn-float { to { transform: translate3d(30px, 24px, 0) scale(1.12); } }
@keyframes bn-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@keyframes bn-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes bn-ping { 0% { box-shadow: 0 0 0 0 rgba(255,193,7,.7); } 70%, 100% { box-shadow: 0 0 0 9px rgba(255,193,7,0); } }

.bn-wrap { max-width: 1240px; margin: 0 auto; }

/* heading */
.bn-head { margin-bottom: 22px; animation: bn-rise .6s cubic-bezier(.2,.7,.2,1) both; }
.bn-chip {
  display: inline-flex; align-items: center; gap: 8px; margin-bottom: 10px; padding: 5px 14px 5px 10px; border-radius: 999px;
  background: #fff; border: 1px solid rgba(0,0,0,.08); font-size: .84rem; font-weight: 700; color: #1c1c1c;
  box-shadow: 0 8px 18px -14px rgba(20,30,70,.6);
}
.bn-chip::before { content: ""; width: 9px; height: 9px; border-radius: 50%; background: #ffc107; animation: bn-ping 1.6s ease-out infinite; }
.bn-title { margin: 0 0 8px; font-weight: 700; letter-spacing: -.015em; font-size: clamp(24px, 3vw, 34px); line-height: 1.15; }
.bn-rule { display: block; width: 64px; height: 4px; margin-bottom: 12px; border-radius: 4px; background: #ffc107; transform-origin: left; animation: bn-grow .7s .2s cubic-bezier(.2,.7,.2,1) both; }
.bn-subtitle { max-width: 60ch; margin: 0; color: #5b6170; line-height: 1.65; }

/* slider */
.bn-stage { position: relative; animation: bn-rise .7s .2s cubic-bezier(.2,.7,.2,1) both; }
.bn-stage .owl-stage-outer { padding: 8px 4px 22px; }

/* each banner sits in a frame: image fits inside, blurred copy fills any empty space */
.bn-frame {
  position: relative; display: block; overflow: hidden; isolation: isolate; border-radius: 20px; background: #14121f;
  box-shadow: 0 22px 40px -26px rgba(20,30,70,.7);
  transition: box-shadow .4s ease, transform .4s cubic-bezier(.2,.7,.2,1);
}
.bn-frame::before {
  content: ""; position: absolute; z-index: -1; inset: -20px; background-image: var(--bg); background-size: cover; background-position: center;
  filter: blur(22px) saturate(1.2); transform: scale(1.1); opacity: .85;
}
.bn-frame img {
  display: block; width: 100%; height: auto;
  max-height: clamp(170px, 34vw, 440px);   /* never taller than this, whatever the image size */
  object-fit: contain; object-position: center;
  transition: transform .9s cubic-bezier(.2,.7,.2,1);
}
a.bn-frame:hover { transform: translateY(-4px); box-shadow: 0 32px 50px -26px rgba(20,30,70,.8); }
a.bn-frame:hover img { transform: scale(1.025); }
.bn-frame::after { /* shine on hover */
  content: ""; position: absolute; top: 0; bottom: 0; left: -70%; width: 40%; pointer-events: none;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,.3), transparent); transform: skewX(-18deg);
}
a.bn-frame:hover::after { left: 160%; transition: left .9s ease; }

/* owl arrows: round glass buttons floating over the slider */
.bn-section .owl-nav { position: absolute; inset: 0; margin: 0; pointer-events: none; }
.bn-section .owl-nav button.owl-prev, .bn-section .owl-nav button.owl-next {
  position: absolute; top: 46%; transform: translateY(-50%); pointer-events: auto;
  width: 46px; height: 46px; padding: 0; border-radius: 50% !important;
  display: grid; place-items: center; color: #1c1c1c !important;
  background: rgba(255,255,255,.88) !important; border: 1px solid rgba(255,255,255,.9) !important;
  -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
  box-shadow: 0 12px 22px -10px rgba(0,0,0,.55);
  transition: background .3s ease, transform .3s ease, box-shadow .3s ease;
}
.bn-section .owl-nav button.owl-prev { left: 16px; }
.bn-section .owl-nav button.owl-next { right: 16px; }
.bn-section .owl-nav button.owl-prev:hover, .bn-section .owl-nav button.owl-next:hover {
  background: #ffc107 !important; transform: translateY(-50%) scale(1.1);
}

/* hint */
.bn-note { margin: 0; text-align: center; color: #6a7080; font-size: .88rem; }
.bn-note i { color: #e0a800; margin-right: 6px; }

@media (max-width: 767.98px) {
  .bn-frame { border-radius: 14px; }
  .bn-frame img { max-height: clamp(130px, 46vw, 260px); }
  .bn-section .owl-nav button.owl-prev, .bn-section .owl-nav button.owl-next { width: 38px; height: 38px; }
  .bn-section .owl-nav button.owl-prev { left: 8px; }
  .bn-section .owl-nav button.owl-next { right: 8px; }
}
@media (prefers-reduced-motion: reduce) {
  .bn-section *, .bn-section *::before, .bn-section *::after { animation: none !important; transition: none !important; }
}
`;

// Auto-playing announcement / ranking banners below the hero
export default function BannerSlider() {
  const { bannerSlides } = useContent();
  const slides = (bannerSlides || []).filter((b) => b.img);
  if (!slides.length) return null;

  return (
    <section className="pt-lg-40 pt-20 pb-lg-40 pb-20 bn-section">
      <style>{css}</style>
      <span className="bn-blob bn-blob--one" aria-hidden="true" />
      <span className="bn-blob bn-blob--two" aria-hidden="true" />

      <div className="container-fluid position-relative">
        <div className="px-3">
          <div className="bn-wrap">
            <div className="bn-head">
              <span className="bn-chip">Latest updates</span>
              <h2 className="bn-title">Announcements and achievements</h2>
              <span className="bn-rule" aria-hidden="true" />
              <p className="bn-subtitle">
                Results, rankings and important notices from our school, all in one place. Stay up to date with what is new.
              </p>
            </div>

            <div className="bn-stage">
              <OwlCarousel
                key={useListKey(slides)}
                className="banner-02 owl-nav-active"
                options={{
                  autoplay: slides.length > 1,
                  autoplayTimeout: 3000,
                  loop: slides.length > 1,
                  autoplayHoverPause: true,
                  autoHeight: true,
                  margin: 15,
                  items: 1,
                  nav: slides.length > 1,
                  dots: false,
                }}
              >
                {slides.map((b, i) => (
                  <div className="item" key={`${b.img}-${i}`}>
                    {b.href ? (
                      <a
                        href={b.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bn-frame"
                        style={{ '--bg': `url("${img(b.img, 600)}")` }}
                      >
                        <img src={img(b.img, 1600)} width="100%" alt={b.alt || ''} decoding="async" />
                      </a>
                    ) : (
                      <div className="bn-frame" style={{ '--bg': `url("${img(b.img, 600)}")` }}>
                        <img src={img(b.img, 1600)} width="100%" alt={b.alt || ''} decoding="async" />
                      </div>
                    )}
                  </div>
                ))}
              </OwlCarousel>
              {slides.length > 1 && (
                <p className="bn-note">
                  <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                  Hover to pause the slides. Use the arrows to browse.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}