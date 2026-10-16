import { useContent } from '../../context/ContentContext.jsx';

// CSS isi file mein hai (alag file ki zarurat nahi). Sab classes `gl-` se start hoti hain.
const css = `
.gl-section { position: relative; overflow: hidden; isolation: isolate; }
.gl-section::before {
  content: ""; position: absolute; z-index: -1; inset: 0;
  background-image: radial-gradient(rgba(0,0,0,.05) 1px, transparent 1px);
  background-size: 22px 22px;
}
.gl-blob { position: absolute; z-index: -1; width: 300px; height: 300px; border-radius: 50%; filter: blur(70px); pointer-events: none; }
.gl-blob--one { top: -120px; left: -80px; background: rgba(255,193,7,.22); animation: gl-float 16s ease-in-out infinite alternate; }
.gl-blob--two { bottom: -140px; right: -90px; background: rgba(60,80,160,.10); animation: gl-float 20s ease-in-out infinite alternate-reverse; }
@keyframes gl-float { to { transform: translate3d(30px, 24px, 0) scale(1.12); } }
@keyframes gl-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@keyframes gl-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }

/* heading */
.gl-title { letter-spacing: -.015em; margin-bottom: 12px; animation: gl-rise .6s cubic-bezier(.2,.7,.2,1) both; }
.gl-rule { display: block; width: 72px; height: 4px; margin: 0 auto 14px; border-radius: 4px; background: #ffc107; animation: gl-grow .7s .2s cubic-bezier(.2,.7,.2,1) both; }
.gl-subtitle { max-width: 56ch; margin: 0 auto; color: #5b6170; animation: gl-rise .6s .12s cubic-bezier(.2,.7,.2,1) both; }

/* stat cards */
.gl-item { padding: 8px; }
.gl-card {
  position: relative; overflow: hidden; height: 100%;
  background: #fff; border-radius: 18px; padding: 26px 22px 22px;
  border: 1px solid rgba(0,0,0,.06);
  box-shadow: 0 14px 30px -22px rgba(20,30,70,.5);
  opacity: 0; animation: gl-rise .6s calc(.2s + var(--i, 0) * .09s) cubic-bezier(.2,.7,.2,1) forwards;
  transition: transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s ease;
}
/* yellow bar at the top, grows on hover */
.gl-card::before {
  content: ""; position: absolute; left: 22px; top: 0; height: 4px; width: 44px;
  border-radius: 0 0 4px 4px; background: #ffc107; transition: width .4s ease;
}
/* soft ring in the corner */
.gl-card::after {
  content: ""; position: absolute; right: -40px; bottom: -40px; width: 130px; height: 130px;
  border-radius: 50%; border: 20px solid rgba(255,193,7,.14);
  transition: transform .6s cubic-bezier(.2,.7,.2,1);
}
.gl-card:hover { transform: translateY(-8px); box-shadow: 0 28px 40px -24px rgba(20,30,70,.55); }
.gl-card:hover::before { width: calc(100% - 44px); }
.gl-card:hover::after { transform: scale(1.5) rotate(40deg); }

.gl-value { position: relative; z-index: 1; line-height: 1.05; margin: 6px 0 10px !important; transition: transform .35s ease; }
.gl-card:hover .gl-value { transform: translateX(4px); }
.gl-label { position: relative; z-index: 1; color: #4a5060; font-size: .96rem; line-height: 1.45; }

@media (max-width: 575.98px) {
  .gl-card { padding: 20px 16px 18px; border-radius: 14px; }
  .gl-item { padding: 5px; }
  .gl-label { font-size: .88rem; }
}
@media (prefers-reduced-motion: reduce) {
  .gl-section *, .gl-section *::before, .gl-section *::after { animation: none !important; transition: none !important; opacity: 1 !important; }
}
`;

export default function Glance() {
  const { glance } = useContent();
  return (
    <section className="pb-lg-30 pt-lg-60 pb-10 pt-30 bg-white-f1 gl-section">
      <style>{css}</style>
      <span className="gl-blob gl-blob--one" aria-hidden="true" />
      <span className="gl-blob gl-blob--two" aria-hidden="true" />

      <div className="container-fluid position-relative">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="text-center mb-lg-30 mb-20">
              <h2 className="font-weight-700 gl-title">{glance.title}</h2>
              <span className="gl-rule" aria-hidden="true" />
              {glance.subtitle && <p className="gl-subtitle">{glance.subtitle}</p>}
            </div>
            <div>
              <div className="row justify-content-center">
                {(glance.stats || []).map((s, i) => (
                  <div className="col-md-3 col-6 col-xl gl-item" key={`${s.label}-${i}`} style={{ '--i': i }}>
                    <div className="gl-card">
                      <h2 className="mb-2 font-weight-700 font-48 theme-color-01 text-64 gl-value">{s.value}</h2>
                      <p className="m-0 gl-label">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}