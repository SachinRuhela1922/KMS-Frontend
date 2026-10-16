import { useContent } from '../../context/ContentContext.jsx';
import { img } from '../../lib/media.js';

// CSS isi file mein hai (alag file nahi chahiye). Sab classes `wj-` se start hoti hain.
const css = `
.wj-section { position: relative; overflow: hidden; isolation: isolate; background: linear-gradient(180deg, #fff 0%, #f6f7fb 100%); }
.wj-section::before {
  content: ""; position: absolute; inset: 0; z-index: -1;
  background-image: radial-gradient(rgba(0,0,0,.05) 1px, transparent 1px); background-size: 22px 22px;
  -webkit-mask-image: linear-gradient(180deg, #000, transparent 90%); mask-image: linear-gradient(180deg, #000, transparent 90%);
}
.wj-blob { position: absolute; z-index: -1; border-radius: 50%; filter: blur(70px); pointer-events: none; }
.wj-blob--one { width: 320px; height: 320px; top: -130px; left: -90px; background: rgba(255,193,7,.26); animation: wj-float 16s ease-in-out infinite alternate; }
.wj-blob--two { width: 300px; height: 300px; bottom: -130px; right: -100px; background: rgba(60,80,160,.11); animation: wj-float 20s ease-in-out infinite alternate-reverse; }
@keyframes wj-float { to { transform: translate3d(30px, 24px, 0) scale(1.12); } }
@keyframes wj-rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
@keyframes wj-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }

/* heading */
.wj-head { max-width: 640px; margin: 0 auto 44px; text-align: center; }
.wj-title { margin: 0 0 12px; font-weight: 800; letter-spacing: -.015em; font-size: clamp(26px, 3.4vw, 40px); line-height: 1.15; animation: wj-rise .6s cubic-bezier(.2,.7,.2,1) both; }
.wj-rule { display: block; width: 72px; height: 4px; margin: 0 auto 14px; border-radius: 4px; background: #ffc107; animation: wj-grow .7s .2s cubic-bezier(.2,.7,.2,1) both; }
.wj-subtitle { margin: 0; color: #5b6170; line-height: 1.7; animation: wj-rise .6s .12s cubic-bezier(.2,.7,.2,1) both; }

/* cards */
.wj-col { margin-bottom: 24px; opacity: 0; animation: wj-rise .7s calc(.2s + var(--i, 0) * .12s) cubic-bezier(.2,.7,.2,1) forwards; }
.wj-section .wj-card {
  position: relative; overflow: hidden; isolation: isolate; height: 100%; display: flex; flex-direction: column;
  background: #fff; border-radius: 22px; border: 1px solid rgba(0,0,0,.06);
  box-shadow: 0 18px 36px -26px rgba(20,30,70,.6);
  transition: transform .45s cubic-bezier(.2,.7,.2,1), box-shadow .45s ease, border-color .45s ease;
}
.wj-section .wj-card:hover { transform: translateY(-8px); border-color: rgba(255,193,7,.75); box-shadow: 0 32px 48px -28px rgba(20,30,70,.7); }

/* photo */
.wj-section .wj-card .grid-style-05-thumb { position: relative; overflow: hidden; margin: 0; aspect-ratio: 16 / 10; }
.wj-section .wj-card .grid-style-05-thumb img { display: block; width: 100%; height: 100%; object-fit: cover; transform: scale(1.001); transition: transform 1s cubic-bezier(.2,.7,.2,1); }
.wj-section .wj-card:hover .grid-style-05-thumb img { transform: scale(1.1); }
.wj-section .wj-card .grid-style-05-thumb::before { /* soft fade into the content */
  content: ""; position: absolute; z-index: 1; inset: auto 0 0 0; height: 45%; pointer-events: none;
  background: linear-gradient(to top, rgba(14,8,26,.45), transparent);
}
.wj-section .wj-card .grid-style-05-thumb::after { /* shine on hover */
  content: ""; position: absolute; z-index: 2; top: 0; bottom: 0; left: -70%; width: 40%; pointer-events: none;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,.35), transparent); transform: skewX(-18deg);
}
.wj-section .wj-card:hover .grid-style-05-thumb::after { left: 160%; transition: left .9s ease; }

/* content: reset theme padding, then lay out ourselves */
.wj-section .wj-card .grid-style-05-content {
  position: relative; flex: 1; width: auto; margin: 0; transform: none; background: transparent;
  padding: 44px 26px 28px !important;
}
.wj-section .wj-card .grid-style-05-content::after { /* yellow bar that grows along the bottom */
  content: ""; position: absolute; left: 26px; right: 26px; bottom: 0; height: 4px; border-radius: 4px 4px 0 0;
  background: #ffc107; transform: scaleX(.18); transform-origin: left; transition: transform .55s ease;
}
.wj-section .wj-card:hover .grid-style-05-content::after { transform: scaleX(1); }

/* number badge overlaps the photo edge */
.wj-section .wj-card .grid-style-05-number {
  position: absolute; z-index: 3; top: -30px; left: 26px; right: auto; bottom: auto;
  min-width: 60px; height: 60px; padding: 0 14px; border-radius: 18px; display: grid; place-items: center;
  font-size: 1.35rem; font-weight: 800; line-height: 1; color: #1c1c1c;
  background: linear-gradient(180deg, #ffd75e, #ffc107); box-shadow: 0 14px 22px -10px rgba(0,0,0,.55);
  transition: transform .45s cubic-bezier(.2,1.4,.4,1), border-radius .45s ease;
}
.wj-section .wj-card:hover .grid-style-05-number { transform: translateY(-4px) rotate(-6deg); border-radius: 50%; }

.wj-section .wj-card .grid-style-05-title { margin: 0 0 10px; font-weight: 700; font-size: 1.3rem; line-height: 1.3; color: #1c1c1c; transition: color .3s ease; }
.wj-section .wj-card:hover .grid-style-05-title { color: #9a6b00; }
.wj-section .wj-card .grid-style-05-content p { margin: 0; text-align: left !important; font-size: .96rem; line-height: 1.7; color: #5b6170; }

@media (max-width: 767.98px) {
  .wj-head { margin-bottom: 32px; }
  .wj-section .wj-card { border-radius: 18px; }
  .wj-section .wj-card .grid-style-05-content { padding: 40px 20px 24px !important; }
  .wj-section .wj-card .grid-style-05-number { left: 20px; }
}
@media (prefers-reduced-motion: reduce) {
  .wj-section *, .wj-section *::before, .wj-section *::after { animation: none !important; transition: none !important; opacity: 1 !important; }
}
`;

export default function WhyJGU() {
  const { why } = useContent();
  return (
    <section className="pb-lg-60 pb-40 pt-lg-60 pt-40 wj-section">
      <style>{css}</style>
      <span className="wj-blob wj-blob--one" aria-hidden="true" />
      <span className="wj-blob wj-blob--two" aria-hidden="true" />

      <div className="container-fluid position-relative">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="wj-head">
              <h2 className="wj-title">{why.title || 'Why choose us'}</h2>
              <span className="wj-rule" aria-hidden="true" />
              <p className="wj-subtitle">
                {why.subtitle ||
                  'Here are a few things that set us apart: a caring community, strong teaching and the support every student needs to grow.'}
              </p>
            </div>

            <div className="row">
              {(why.items || []).map((f, i) => (
                <div className="col-md-4 wj-col" key={`${f.no}-${i}`} style={{ '--i': i }}>
                  <div className="grid-style-05 wj-card">
                    <div className="grid-style-05-thumb">
                      <img src={img(f.img || why.image, 900)} width="100%" alt="" />
                    </div>
                    <div className="grid-style-05-content p-lg-30 p-20 pl-lg-20 pr-80">
                      <span className="grid-style-05-number">{f.no}</span>
                      <h4 className="grid-style-05-title">{f.title}</h4>
                      <p className="text-justify">{f.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}