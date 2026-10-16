import OwlCarousel, { useListKey } from '../common/OwlCarousel.jsx';
import { useContent } from '../../context/ContentContext.jsx';
import { img } from '../../lib/media.js';

// CSS isi file mein hai (alag file nahi chahiye). Sab classes `rk-` se start hoti hain.
const css = `
.rk-section { position: relative; overflow: hidden; isolation: isolate; }
.rk-section::before {
  content: ""; position: absolute; inset: 0; z-index: -1;
  background-image: radial-gradient(rgba(0,0,0,.05) 1px, transparent 1px); background-size: 22px 22px;
}
.rk-blob { position: absolute; z-index: -1; width: 300px; height: 300px; border-radius: 50%; filter: blur(70px); pointer-events: none; }
.rk-blob--one { top: -120px; right: -80px; background: rgba(255,193,7,.24); animation: rk-float 16s ease-in-out infinite alternate; }
.rk-blob--two { bottom: -140px; left: -100px; background: rgba(60,80,160,.10); animation: rk-float 20s ease-in-out infinite alternate-reverse; }
@keyframes rk-float { to { transform: translate3d(30px, 24px, 0) scale(1.12); } }
@keyframes rk-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@keyframes rk-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }

/* heading */
.rk-title { letter-spacing: -.015em; margin-bottom: 12px; animation: rk-rise .6s cubic-bezier(.2,.7,.2,1) both; }
.rk-rule { display: block; width: 72px; height: 4px; margin: 0 auto 14px; border-radius: 4px; background: #ffc107; animation: rk-grow .7s .2s cubic-bezier(.2,.7,.2,1) both; }
.rk-subtitle { max-width: 58ch; margin: 0 auto; color: #5b6170; font-size: 1.02rem; line-height: 1.65; animation: rk-rise .6s .12s cubic-bezier(.2,.7,.2,1) both; }

/* carousel wrapper */
.rk-stage { animation: rk-rise .7s .25s cubic-bezier(.2,.7,.2,1) both; }
.rk-stage .owl-stage-outer { padding: 14px 4px 18px; }

/* every recognition sits on its own bigger, animated card */
.rk-card {
  position: relative; overflow: hidden; isolation: isolate;
  display: flex; align-items: center; justify-content: center;
  height: 190px; padding: 14px;
  background: #fff; border-radius: 18px; border: 1px solid rgba(0,0,0,.06);
  box-shadow: 0 14px 30px -20px rgba(20,30,70,.55);
  animation: rk-bob 4.5s ease-in-out var(--d, 0s) infinite;
  transition: transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s ease, border-color .35s ease;
}
/* stagger the floating so cards never move in sync */
.rk-section .owl-item:nth-child(5n+1) .rk-card { --d: 0s; }
.rk-section .owl-item:nth-child(5n+2) .rk-card { --d: -.9s; }
.rk-section .owl-item:nth-child(5n+3) .rk-card { --d: -1.8s; }
.rk-section .owl-item:nth-child(5n+4) .rk-card { --d: -2.7s; }
.rk-section .owl-item:nth-child(5n+5) .rk-card { --d: -3.6s; }
@keyframes rk-bob { 0%, 100% { translate: 0 0; } 50% { translate: 0 -7px; } }

/* light sweep that passes over each card every few seconds */
.rk-card::after {
  content: ""; position: absolute; z-index: 2; top: 0; bottom: 0; left: -60%; width: 40%; pointer-events: none;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,.75), transparent);
  transform: skewX(-18deg); animation: rk-shine 5.5s ease-in-out calc(var(--d, 0s) - 1s) infinite;
}
@keyframes rk-shine { 0%, 55% { left: -60%; } 100% { left: 160%; } }

/* soft yellow glow behind the logo */
.rk-card::before {
  content: ""; position: absolute; z-index: -1; width: 70%; height: 70%; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,193,7,.22), transparent 70%);
  transform: scale(.7); transition: transform .5s ease;
}
.rk-card img {
  position: relative; width: auto; height: auto; max-width: 100%; max-height: 100%; object-fit: contain;
  transition: transform .4s cubic-bezier(.2,.7,.2,1), filter .4s ease;
}
.rk-card:hover { animation-play-state: paused; transform: translateY(-8px); border-color: rgba(255,193,7,.75); box-shadow: 0 28px 40px -22px rgba(20,30,70,.6); }
.rk-card:hover::before { transform: scale(1.25); }
.rk-card:hover img { transform: scale(1.1); filter: drop-shadow(0 8px 10px rgba(0,0,0,.18)); }

/* owl dots restyled (only inside this section) */
.rk-section .owl-dots { margin-top: 6px; text-align: center; }
.rk-section .owl-dots .owl-dot span { width: 8px; height: 8px; margin: 0 4px; border-radius: 8px; background: #cfd3dc; transition: width .3s ease, background .3s ease; }
.rk-section .owl-dots .owl-dot.active span, .rk-section .owl-dots .owl-dot:hover span { background: #ffc107; }
.rk-section .owl-dots .owl-dot.active span { width: 26px; }

/* footer note */
.rk-note { display: flex; align-items: center; justify-content: center; gap: 10px; margin: 22px 0 0; color: #6a7080; font-size: .9rem; animation: rk-rise .6s .45s cubic-bezier(.2,.7,.2,1) both; }
.rk-note::before, .rk-note::after { content: ""; height: 1px; width: 44px; background: rgba(0,0,0,.18); }

@media (max-width: 575.98px) {
  .rk-card { height: 150px; padding: 10px; border-radius: 14px; }
  .rk-subtitle { font-size: .95rem; }
}
@media (prefers-reduced-motion: reduce) {
  .rk-section *, .rk-section *::before, .rk-section *::after { animation: none !important; transition: none !important; }
}
`;

export default function Rankings() {
  const { rankings } = useContent();
  const items = (rankings.items || []).filter((r) => r.img);
  return (
    <section className="pt-lg-50 pb-lg-50 pt-40 pb-40 bg-white-f1 rk-section" style={{ borderTop: '4px solid gainsboro' }}>
      <style>{css}</style>
      <span className="rk-blob rk-blob--one" aria-hidden="true" />
      <span className="rk-blob rk-blob--two" aria-hidden="true" />

      <div className="container-fluid relative z-index-1">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="mb-lg-50 mb-30 text-center">
              <h2 className="font-weight-700 rk-title">{rankings.title}</h2>
              <span className="rk-rule" aria-hidden="true" />
              <p className="rk-subtitle">
                {rankings.subtitle ||
                  'Our work in teaching, learning and student care has been recognised by respected organisations. Here are some of the honours we are proud to carry.'}
              </p>
            </div>

            {items.length > 0 && (
              <div className="rk-stage">
                <OwlCarousel
                  key={useListKey(items)}
                  className="owl-carousel-05 owl-dots-active"
                  options={{
                    loop: items.length > 5,
                    margin: 10,
                    nav: false,
                    dots: true,
                    responsive: { 0: { items: 2 }, 600: { items: 4 }, 1000: { items: 5 } },
                  }}
                >
                  {items.map((r, i) => (
                    <div className="item" key={`${r.img}-${i}`}>
                      <div className="rk-card">
                        <img src={img(r.img, 400)} alt="Recognitions" />
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
                <p className="rk-note">{rankings.note || 'Swipe or use the dots to see more recognitions'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}