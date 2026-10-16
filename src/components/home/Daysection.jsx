import { useEffect, useRef, useState } from 'react';

// Static section - nothing to edit in Admin. Change the text below if you want to.
// `icon` = SVG path(s) drawn inside the circle.
const MOMENTS = [
  { part: 'Morning', title: 'Morning assembly', text: 'Prayer, pledge and the thought of the day.',
    icon: ['M3 18h18', 'M6 18a6 6 0 0 1 12 0', 'M12 5v3', 'M4.9 9.9l1.8 1.8', 'M19.1 9.9l-1.8 1.8'] },
  { part: 'Mid-morning', title: 'Classroom learning', text: 'Lessons with subject teachers, step by step.',
    icon: ['M2 5.5C4.5 4.5 8 4.5 12 6.5c4-2 7.5-2 10-1V19c-2.5-1-6-1-10 1-4-2-7.5-2-10-1z', 'M12 6.5V20'] },
  { part: 'Midday', title: 'Break time', text: 'Lunch, fresh air and time with friends.',
    icon: ['M5 9h11v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V9z', 'M16 10h2a2.5 2.5 0 0 1 0 5h-2', 'M8 3v3', 'M12 3v3'] },
  { part: 'Afternoon', title: 'Activities & sports', text: 'Games, art, music and practical work.',
    icon: ['M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0', 'M3 12h18', 'M12 3c3 3 3 15 0 18', 'M12 3c-3 3-3 15 0 18'] },
  { part: 'Closing', title: 'Last bell', text: 'Revision notes and homework before heading home.',
    icon: ['M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z', 'M10 21h4'] },
];

// CSS lives in this file (no separate .css / .module.css needed). All classes start with `ds-`.
const css = `
.ds-section {
  --gold: #f9ad31; --gold-soft: #ffd27a; --deep: #3a0812;
  position: relative; overflow: hidden; isolation: isolate; color: #fff;
  padding: 90px 20px 100px;
  background:
    radial-gradient(900px 420px at 85% -10%, rgba(249,173,49,.20), transparent 60%),
    linear-gradient(160deg, #5c1022 0%, #3a0812 70%);
}
.ds-section::before { /* faint dot texture */
  content: ""; position: absolute; inset: 0; z-index: -1; opacity: .5;
  background-image: radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px); background-size: 24px 24px;
}

/* the one memorable thing: a glowing sun with slowly turning rays */
.ds-sun { position: absolute; z-index: -1; top: -120px; right: -100px; width: 360px; height: 360px; pointer-events: none; }
.ds-sun::before {
  content: ""; position: absolute; inset: 70px; border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, #ffe2a0, var(--gold) 70%);
  box-shadow: 0 0 80px 30px rgba(249,173,49,.35);
}
.ds-sun::after {
  content: ""; position: absolute; inset: 0; border-radius: 50%;
  background: repeating-conic-gradient(rgba(249,173,49,.35) 0 3deg, transparent 3deg 15deg);
  -webkit-mask-image: radial-gradient(circle, transparent 38%, #000 40%, transparent 70%);
          mask-image: radial-gradient(circle, transparent 38%, #000 40%, transparent 70%);
  animation: ds-spin 70s linear infinite;
}
@keyframes ds-spin { to { transform: rotate(360deg); } }

.ds-wrap { position: relative; max-width: 1140px; margin: 0 auto; }
.ds-head { max-width: 640px; margin: 0 auto 64px; text-align: center; }
.ds-head h2 { margin: 0 0 14px; font-size: clamp(28px, 4vw, 44px); line-height: 1.12; font-weight: 700; letter-spacing: -.015em; color: #fff; }
.ds-head p { margin: 0; font-size: 18px; line-height: 1.65; color: rgba(255,255,255,.78); }

/* ---------- timeline ---------- */
.ds-track { list-style: none; margin: 0; padding: 0; position: relative; display: grid; grid-template-columns: repeat(5, 1fr); }
.ds-track::before, .ds-track::after { content: ""; position: absolute; top: 27px; left: 10%; right: 10%; height: 3px; border-radius: 3px; }
.ds-track::before { background: rgba(255,255,255,.16); }
.ds-track::after { background: linear-gradient(90deg, var(--gold), var(--gold-soft)); transform: scaleX(0); transform-origin: left; }
.ds-in .ds-track::after { animation: ds-fill-x 3.2s linear .3s forwards; }
@keyframes ds-fill-x { to { transform: scaleX(1); } }
@keyframes ds-fill-y { to { transform: scaleY(1); } }

.ds-step { position: relative; display: flex; flex-direction: column; align-items: center; padding: 0 9px; }
.ds-node {
  position: relative; z-index: 1; width: 56px; height: 56px; border-radius: 50%;
  display: grid; place-items: center; flex: 0 0 auto;
  background: #4a0b18; border: 2px solid rgba(255,255,255,.25); color: rgba(255,255,255,.55);
}
.ds-node svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.ds-in .ds-node { animation: ds-light .5s calc(.3s + var(--i) * .8s) forwards; }
@keyframes ds-light {
  to { background: var(--gold); border-color: #ffe5ae; color: var(--deep); transform: scale(1.07);
       box-shadow: 0 0 0 8px rgba(249,173,49,.18), 0 12px 24px -8px rgba(249,173,49,.7); }
}

.ds-card {
  flex: 1; width: 100%; margin-top: 24px; padding: 20px 16px 22px; text-align: center;
  border-radius: 16px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12);
  opacity: .35; transform: translateY(10px);
  transition: translate .3s ease, background .3s ease, border-color .3s ease;
}
.ds-in .ds-card { animation: ds-card .6s calc(.3s + var(--i) * .8s) cubic-bezier(.2,.7,.2,1) forwards; }
@keyframes ds-card { to { opacity: 1; transform: none; } }
.ds-step:hover .ds-card { translate: 0 -6px; background: rgba(255,255,255,.1); border-color: rgba(249,173,49,.55); }

.ds-part { display: inline-block; margin-bottom: 10px; padding: 3px 11px; border-radius: 999px; font-size: 12.5px; color: var(--gold-soft); background: rgba(249,173,49,.16); }
.ds-card h3 { margin: 0 0 6px; font-size: 18px; font-weight: 700; color: #fff; }
.ds-card p { margin: 0; font-size: 14.5px; line-height: 1.6; color: rgba(255,255,255,.78); }

/* ---------- mobile: vertical timeline ---------- */
@media (max-width: 860px) {
  .ds-section { padding: 64px 18px 72px; }
  .ds-head { margin-bottom: 44px; }
  .ds-head p { font-size: 16px; }
  .ds-sun { width: 260px; height: 260px; top: -90px; right: -90px; }
  .ds-sun::before { inset: 52px; }
  .ds-track { grid-template-columns: 1fr; row-gap: 18px; }
  .ds-track::before, .ds-track::after { top: 28px; bottom: 28px; left: 27px; right: auto; width: 3px; height: auto; }
  .ds-track::after { transform: scaleY(0); transform-origin: top; }
  .ds-in .ds-track::after { animation-name: ds-fill-y; animation-duration: 3.6s; }
  .ds-step { display: grid; grid-template-columns: 56px 1fr; column-gap: 16px; align-items: start; padding: 0; }
  .ds-card { margin-top: 0; text-align: left; padding: 16px 16px 18px; }
  .ds-step:hover .ds-card { translate: 4px 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ds-sun::after { animation: none; }
  .ds-track::after { transform: none !important; animation: none !important; }
  .ds-node, .ds-card { animation: none !important; transition: none !important; }
  .ds-node { background: var(--gold); border-color: #ffe5ae; color: var(--deep); }
  .ds-card { opacity: 1; transform: none; }
}
`;

export default function DaySection() {
  const root = useRef(null);
  const [started, setStarted] = useState(false);

  // start the animation once the section scrolls into view
  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) { setStarted(true); return undefined; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={`ds-section ${started ? 'ds-in' : ''}`} ref={root} aria-labelledby="day-title">
      <style>{css}</style>
      <span className="ds-sun" aria-hidden="true" />

      <div className="ds-wrap">
        <header className="ds-head">
          <h2 id="day-title">A day at K.M.S Inter College</h2>
          <p>From the morning prayer to the last bell, every part of the school day has a purpose.</p>
        </header>

        <ol className="ds-track">
          {MOMENTS.map((m, i) => (
            <li className="ds-step" key={m.title} style={{ '--i': i }}>
              <span className="ds-node" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  {m.icon.map((d) => <path key={d} d={d} />)}
                </svg>
              </span>
              <div className="ds-card">
                <span className="ds-part">{m.part}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}