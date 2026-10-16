import { useContent } from '../../context/ContentContext.jsx';
import { img } from '../../lib/media.js';

// Optional: tour.points se override ho sakta hai.
const DEFAULT_POINTS = ['See classrooms and facilities', 'Meet our teachers', 'Ask all your questions'];

// CSS isi file mein hai, isliye purana '../../assets/css/tour-box.css' import hata diya hai.
// Sab classes `tb-` se start hoti hain.
const css = `
.tb-box {
  position: relative; overflow: hidden; isolation: isolate; color: #fff;
  padding: 24px 22px 22px; border-radius: 18px;
  box-shadow: 0 22px 40px -26px rgba(20,30,70,.7);
  animation: tb-rise .7s cubic-bezier(.2,.7,.2,1) both;
}
.tb-box::before { /* dot texture */
  content: ""; position: absolute; inset: 0; z-index: -1; opacity: .7;
  background-image: radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px); background-size: 20px 20px;
}
.tb-box::after { /* big ring in the corner */
  content: ""; position: absolute; z-index: -1; right: -70px; top: -70px; width: 210px; height: 210px; border-radius: 50%;
  border: 30px solid rgba(255,255,255,.06); animation: tb-spin 50s linear infinite;
}
.tb-glow { position: absolute; z-index: -1; left: -60px; bottom: -80px; width: 220px; height: 220px; border-radius: 50%; background: rgba(255,193,7,.28); filter: blur(60px); pointer-events: none; }
@keyframes tb-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
@keyframes tb-spin { to { transform: rotate(360deg); } }
@keyframes tb-scan { 0% { top: 6%; opacity: 0; } 12% { opacity: 1; } 88% { opacity: 1; } 100% { top: 94%; opacity: 0; } }
@keyframes tb-pulse { 0% { box-shadow: 0 0 0 0 rgba(255,193,7,.6); } 70%, 100% { box-shadow: 0 0 0 12px rgba(255,193,7,0); } }

/* intro */
.tb-intro { display: flex; align-items: flex-start; gap: 14px; }
.tb-icon {
  flex: 0 0 auto; width: 48px; height: 48px; border-radius: 14px; display: grid; place-items: center; font-size: 1.25rem;
  color: #1c1c1c; background: linear-gradient(180deg, #ffd75e, #ffc107); box-shadow: 0 12px 20px -10px rgba(0,0,0,.6);
}
.tb-label { margin: 2px 0 6px; font-size: 1.15rem; font-weight: 700; line-height: 1.3; color: #fff; }
.tb-text { margin: 0; font-size: .92rem; line-height: 1.6; color: rgba(255,255,255,.82); }

.tb-points { list-style: none; margin: 16px 0 0; padding: 0; display: grid; gap: 8px; }
.tb-points li { display: flex; align-items: center; gap: 10px; font-size: .9rem; color: rgba(255,255,255,.92); }
.tb-points li i { flex: 0 0 auto; width: 20px; height: 20px; border-radius: 50%; display: grid; place-items: center; font-size: .65rem; color: #1c1c1c; background: #ffc107; }

/* action area: button + or + QR */
.tb-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 18px; margin-top: 22px; padding-top: 20px; border-top: 1px dashed rgba(255,255,255,.25); }
.tb-left { flex: 1 1 170px; min-width: 0; text-align: center; }
.tb-btn {
  position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; gap: 10px; width: 100%;
  padding: 13px 20px; border-radius: 999px; font-weight: 700; color: #1c1c1c !important; text-decoration: none !important;
  background: linear-gradient(180deg, #ffd75e, #ffc107); box-shadow: 0 12px 22px -8px rgba(0,0,0,.55);
  animation: tb-pulse 2.2s ease-out infinite;
  transition: transform .3s cubic-bezier(.2,.7,.2,1), gap .3s ease, box-shadow .3s ease;
}
.tb-btn::after { content: ""; position: absolute; top: 0; left: -75%; width: 50%; height: 100%; background: rgba(255,255,255,.55); transform: skewX(-25deg); }
.tb-btn:hover { transform: translateY(-3px); gap: 16px; box-shadow: 0 18px 28px -10px rgba(0,0,0,.65); animation: none; }
.tb-btn:hover::after { left: 130%; transition: left .7s ease; }
.tb-btn:active { transform: scale(.97); }
.tb-btn:focus-visible, .tb-qrlink:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }

.tb-or { display: flex; align-items: center; gap: 12px; margin: 14px 0 0; color: rgba(255,255,255,.75); font-size: .85rem; }
.tb-or::before, .tb-or::after { content: ""; flex: 1; height: 1px; background: rgba(255,255,255,.25); }

/* QR card with scanner frame */
.tb-qr {
  flex: 0 0 auto; width: 176px; margin: 0 auto; padding: 14px; text-align: center; border-radius: 18px; background: #fff; color: #1c1c1c;
  box-shadow: 0 20px 32px -18px rgba(0,0,0,.7);
  transition: transform .4s cubic-bezier(.2,.7,.2,1), box-shadow .4s ease;
}
.tb-qr:hover { transform: translateY(-5px) rotate(-1.2deg); box-shadow: 0 28px 40px -18px rgba(0,0,0,.8); }
.tb-qr-title { margin: 0 0 10px; font-size: .92rem; font-weight: 700; line-height: 1.3; color: #1c1c1c; }
.tb-qrlink { position: relative; display: block; padding: 8px; border-radius: 12px; overflow: hidden; background: #f6f7fb; }
.tb-qrlink img { display: block; width: 100%; height: auto; border-radius: 6px; }
.tb-qrlink::before { /* corner brackets */
  content: ""; position: absolute; inset: 3px; pointer-events: none; border-radius: 10px;
  --c: #e0a800;
  background:
    linear-gradient(var(--c), var(--c)) top left / 18px 3px no-repeat, linear-gradient(var(--c), var(--c)) top left / 3px 18px no-repeat,
    linear-gradient(var(--c), var(--c)) top right / 18px 3px no-repeat, linear-gradient(var(--c), var(--c)) top right / 3px 18px no-repeat,
    linear-gradient(var(--c), var(--c)) bottom left / 18px 3px no-repeat, linear-gradient(var(--c), var(--c)) bottom left / 3px 18px no-repeat,
    linear-gradient(var(--c), var(--c)) bottom right / 18px 3px no-repeat, linear-gradient(var(--c), var(--c)) bottom right / 3px 18px no-repeat;
}
.tb-qrlink::after { /* moving scan line */
  content: ""; position: absolute; left: 6px; right: 6px; top: 6%; height: 3px; border-radius: 3px; pointer-events: none;
  background: linear-gradient(90deg, transparent, #ffc107, transparent); box-shadow: 0 0 12px 2px rgba(255,193,7,.7);
  animation: tb-scan 2.8s ease-in-out infinite;
}
.tb-qr-text { margin: 10px 0 0; font-size: .8rem; line-height: 1.45; color: #5b6170; }

@media (max-width: 420px) {
  .tb-box { padding: 20px 16px 18px; }
  .tb-left, .tb-qr { flex-basis: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .tb-box, .tb-box *, .tb-box::after, .tb-qrlink::after { animation: none !important; transition: none !important; }
  .tb-qrlink::after { display: none; }
}
`;

// "Schedule a Tour" + QR code card (inside View Our Programmes)
export default function TourBox() {
  const { tour: t } = useContent();
  const points = t.points || DEFAULT_POINTS;
  return (
    <div className="tb-box theme-bg-01">
      <style>{css}</style>
      <span className="tb-glow" aria-hidden="true" />

      {/* Intro */}
      <div className="tb-intro">
        <span className="tb-icon" aria-hidden="true">
          <i className="fa fa-calendar"></i>
        </span>
        <div>
          <h6 className="tb-label">{t.label}</h6>
          <p className="tb-text">{t.text}</p>
        </div>
      </div>

      {points.length > 0 && (
        <ul className="tb-points">
          {points.map((p) => (
            <li key={p}>
              <i className="fa fa-check" aria-hidden="true"></i>
              {p}
            </li>
          ))}
        </ul>
      )}

      {/* Button + QR */}
      <div className="tb-actions">
        <div className="tb-left">
          <a href={t.formUrl} target="_blank" rel="noopener noreferrer" className="tb-btn">
            {t.buttonLabel}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
          <div className="tb-or">
            <span>{t.orText}</span>
          </div>
        </div>

        <div className="tb-qr">
          <h5 className="tb-qr-title">{t.qrTitle}</h5>
          <a href={t.formUrl} target="_blank" rel="noopener noreferrer" className="tb-qrlink">
            {t.qrImg && <img src={img(t.qrImg, 600)} alt="QR Code" className="img-fluid" />}
          </a>
          <p className="tb-qr-text">{t.qrText}</p>
        </div>
      </div>
    </div>
  );
}