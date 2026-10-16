import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Static section - nothing to edit in Admin. Change the text below if you ever want to.
const FACTS = ['Play Group to Class 12', 'UP Board syllabus', 'One campus, every stage'];

const STAGES = [
  {
    range: 'Play – UKG', name: 'Pre-Primary', icon: 'fa-paint-brush',
    text: 'Rhymes, colours, stories and play. Little ones learn to love school.',
    chips: ['Rhymes', 'Colours', 'Stories', 'Play'],
    goal: 'Happy first steps in school',
  },
  {
    range: '1 – 5', name: 'Primary', icon: 'fa-pencil',
    text: 'Strong basics in Hindi, English and Maths, with art and games every week.',
    chips: ['Hindi', 'English', 'Maths', 'Art & games'],
    goal: 'Solid reading, writing and number skills',
  },
  {
    range: '6 – 8', name: 'Upper Primary', icon: 'fa-flask',
    text: 'Science, Social Science and Sanskrit begin. Questions are welcome.',
    chips: ['Science', 'Social Science', 'Sanskrit'],
    goal: 'Curiosity and confident thinking',
  },
  {
    range: '9 – 10', name: 'Secondary', icon: 'fa-file-text-o',
    text: 'Regular tests and revision to get ready for the UP Board High School exam.',
    chips: ['Regular tests', 'Revision', 'Exam practice'],
    goal: 'UP Board High School exam',
  },
  {
    range: '11 – 12', name: 'Senior Secondary', icon: 'fa-graduation-cap',
    text: 'Choose Science, Commerce or Arts, then step towards the Intermediate exam.',
    chips: ['Science', 'Commerce', 'Arts'],
    goal: 'UP Board Intermediate exam',
  },
];

const WHY = [
  { icon: 'fa-home', title: 'One familiar campus', text: 'Your child grows up in the same place, with the same friends and a school that feels like home.' },
  { icon: 'fa-book', title: 'One syllabus throughout', text: 'The UP Board syllabus guides every class, so each year builds neatly on the last.' },
  { icon: 'fa-exchange', title: 'Smooth move to the next stage', text: 'No new admissions or fresh starts when your child steps up from one stage to the next.' },
  { icon: 'fa-users', title: 'Teachers who know your child', text: 'Teachers see your child grow over the years and can guide them with care.' },
];

// CSS isi file mein hai (alag .module.css ki zarurat nahi). Sab classes `jr-` se start hoti hain.
const css = `
.jr-section {
  --maroon: #b71a34; --maroon-dark: #8a1228; --maroon-deep: #5c0c1b;
  --gold: #f5b800; --gold-soft: #ffd75e; --ink: #2a0a12;
  --ease: cubic-bezier(.22,.61,.36,1);
  position: relative; overflow: hidden; isolation: isolate; color: var(--ink);
  padding: 90px 20px 100px;
  background: linear-gradient(180deg, #fff 0%, #fdf4f5 100%);
}
.jr-section::before {
  content: ""; position: absolute; inset: 0; z-index: -1;
  background-image: radial-gradient(rgba(183,26,52,.07) 1px, transparent 1px); background-size: 24px 24px;
  -webkit-mask-image: linear-gradient(180deg, #000, transparent 85%); mask-image: linear-gradient(180deg, #000, transparent 85%);
}
.jr-blob { position: absolute; z-index: -1; border-radius: 50%; filter: blur(70px); pointer-events: none; }
.jr-blob--one { width: 360px; height: 360px; top: -140px; left: -100px; background: rgba(245,184,0,.26); animation: jr-float 18s ease-in-out infinite alternate; }
.jr-blob--two { width: 320px; height: 320px; bottom: -140px; right: -100px; background: rgba(183,26,52,.12); animation: jr-float 22s ease-in-out infinite alternate-reverse; }
@keyframes jr-float { to { transform: translate3d(30px, 26px, 0) scale(1.12); } }
@keyframes jr-rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
@keyframes jr-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }

.jr-wrap { position: relative; max-width: 1140px; margin: 0 auto; }

/* ---------- heading ---------- */
.jr-head { max-width: 700px; margin: 0 auto 34px; text-align: center; }
.jr-head h2 { margin: 0 0 12px; font-size: clamp(28px, 4vw, 44px); line-height: 1.12; font-weight: 800; letter-spacing: -.015em; color: var(--maroon-dark); animation: jr-rise .6s var(--ease) both; }
.jr-rule { display: block; width: 84px; height: 4px; margin: 0 auto 16px; border-radius: 4px; background: linear-gradient(90deg, var(--maroon), var(--gold)); animation: jr-grow .8s .2s var(--ease) both; }
.jr-head p { margin: 0; font-size: 18px; line-height: 1.7; color: #5a4a4e; animation: jr-rise .6s .12s var(--ease) both; }

.jr-facts { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin: 0 auto 64px; padding: 0; list-style: none; animation: jr-rise .6s .22s var(--ease) both; }
.jr-facts li {
  display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 999px;
  background: #fff; border: 1px solid rgba(183,26,52,.16); color: var(--maroon-dark); font-size: .92rem; font-weight: 600;
  box-shadow: 0 8px 18px -14px rgba(138,18,40,.6);
}
.jr-facts li::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--gold); }

/* ---------- journey: road + stages ---------- */
.jr-path { list-style: none; margin: 0; padding: 0; position: relative; display: grid; grid-template-columns: repeat(5, 1fr); }
.jr-path::before, .jr-path::after { content: ""; position: absolute; top: 29px; left: 10%; right: 10%; height: 4px; border-radius: 4px; }
.jr-path::before { background: repeating-linear-gradient(90deg, #e2c3c9 0 10px, transparent 10px 18px); }
.jr-path::after { background: linear-gradient(90deg, var(--maroon), var(--gold)); transform: scaleX(0); transform-origin: left; }
.jr-in .jr-path::after { animation: jr-fill-x 3.6s linear .3s forwards; }
@keyframes jr-fill-x { to { transform: scaleX(1); } }
@keyframes jr-fill-y { to { transform: scaleY(1); } }

/* the walker moves along the road, then steps away at the last stop */
.jr-walker {
  position: absolute; z-index: 3; top: 9px; left: calc(10% - 20px); width: 40px; height: 40px; border-radius: 50%;
  display: grid; place-items: center; background: var(--gold); color: var(--maroon-deep); border: 3px solid #fff;
  box-shadow: 0 10px 18px -6px rgba(138,18,40,.55); opacity: 0; pointer-events: none;
}
.jr-in .jr-walker { animation: jr-walk 3.6s linear .3s forwards; }
@keyframes jr-walk {
  0% { left: calc(10% - 20px); opacity: 0; transform: translateY(0); }
  4% { opacity: 1; }
  25% { transform: translateY(-4px); } 50% { transform: translateY(0); } 75% { transform: translateY(-4px); }
  96% { opacity: 1; }
  100% { left: calc(90% - 20px); opacity: 0; transform: translateY(0); }
}
@keyframes jr-walk-y {
  0% { top: 9px; left: 9px; opacity: 0; }
  4% { opacity: 1; }
  96% { opacity: 1; }
  100% { top: calc(100% - 49px); left: 9px; opacity: 0; }
}

.jr-stage { position: relative; display: flex; flex-direction: column; align-items: center; padding: 0 8px; }
.jr-node {
  position: relative; z-index: 2; width: 62px; height: 62px; border-radius: 50%; flex: 0 0 auto;
  display: grid; place-items: center; font-size: 1.35rem;
  background: #fff; border: 3px solid #e2c3c9; color: #c9a9b0;
}
.jr-in .jr-node { animation: jr-light .5s calc(.3s + var(--i) * .9s) forwards; }
@keyframes jr-light {
  to { background: linear-gradient(145deg, var(--maroon), var(--maroon-deep)); border-color: #fff; color: #fff; transform: scale(1.07);
       box-shadow: 0 0 0 7px rgba(183,26,52,.14), 0 14px 22px -10px rgba(138,18,40,.7); }
}
.jr-in .jr-stage:last-child .jr-node { animation-name: jr-light-gold; }
@keyframes jr-light-gold {
  to { background: linear-gradient(145deg, var(--gold-soft), var(--gold)); border-color: #fff; color: var(--maroon-deep); transform: scale(1.1);
       box-shadow: 0 0 0 8px rgba(245,184,0,.25), 0 14px 22px -10px rgba(245,184,0,.8); }
}

.jr-stem { width: 0; height: 26px; border-left: 2px dashed #e2c3c9; }

.jr-card {
  flex: 1; width: 100%; display: flex; flex-direction: column; align-items: center; text-align: center;
  padding: 22px 16px 18px; border-radius: 20px; background: #fff; border: 1px solid rgba(183,26,52,.1);
  box-shadow: 0 18px 34px -26px rgba(138,18,40,.6);
  opacity: .3; transform: translateY(12px);
  transition: translate .4s var(--ease), box-shadow .4s ease, border-color .4s ease;
  position: relative; overflow: hidden;
}
.jr-card::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 5px; background: linear-gradient(90deg, var(--maroon), var(--gold)); transform: scaleX(.25); transform-origin: left; transition: transform .5s ease; }
.jr-in .jr-card { animation: jr-card .6s calc(.3s + var(--i) * .9s) var(--ease) forwards; }
@keyframes jr-card { to { opacity: 1; transform: none; } }
.jr-stage:hover .jr-card { translate: 0 -8px; border-color: rgba(245,184,0,.8); box-shadow: 0 30px 44px -26px rgba(138,18,40,.7); }
.jr-stage:hover .jr-card::before { transform: scaleX(1); }

.jr-range { font-size: 1.55rem; font-weight: 800; line-height: 1.1; color: var(--maroon); letter-spacing: -.01em; }
.jr-name { display: block; margin: 6px 0 10px; font-size: 1.02rem; font-weight: 700; color: var(--ink); }
.jr-card p { margin: 0 0 14px; font-size: .9rem; line-height: 1.6; color: #5a4a4e; }
.jr-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin: 0 0 16px; padding: 0; list-style: none; }
.jr-chips li { padding: 4px 10px; border-radius: 999px; font-size: .76rem; font-weight: 600; color: #8a5a00; background: #fff1d1; }
.jr-goal { margin-top: auto; width: 100%; padding-top: 12px; border-top: 1px dashed rgba(183,26,52,.22); font-size: .82rem; font-weight: 600; color: var(--maroon-dark); }
.jr-goal i { margin-right: 6px; color: var(--gold); }

/* ---------- why one campus ---------- */
.jr-why { margin-top: 86px; }
.jr-why-head { max-width: 620px; margin: 0 auto 30px; text-align: center; }
.jr-why-head h3 { margin: 0 0 8px; font-size: clamp(22px, 2.6vw, 30px); font-weight: 800; color: var(--maroon-dark); letter-spacing: -.01em; }
.jr-why-head p { margin: 0; color: #5a4a4e; line-height: 1.65; }
.jr-why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.jr-why-item {
  padding: 24px 20px; border-radius: 18px; background: #fff; border: 1px solid rgba(183,26,52,.1);
  box-shadow: 0 14px 30px -24px rgba(138,18,40,.55);
  opacity: 0; transition: transform .35s var(--ease), box-shadow .35s ease, border-color .35s ease;
}
.jr-in .jr-why-item { animation: jr-rise .6s calc(.8s + var(--i) * .1s) var(--ease) forwards; }
.jr-why-item:hover { transform: translateY(-6px); border-color: rgba(245,184,0,.8); box-shadow: 0 26px 38px -26px rgba(138,18,40,.65); }
.jr-why-icon { width: 50px; height: 50px; margin-bottom: 14px; border-radius: 14px; display: grid; place-items: center; font-size: 1.2rem; color: var(--maroon); background: #fde8ec; transition: transform .3s ease, background .3s ease, color .3s ease; }
.jr-why-item:hover .jr-why-icon { transform: rotate(-8deg) scale(1.08); background: var(--maroon); color: #fff; }
.jr-why-item h4 { margin: 0 0 6px; font-size: 1.05rem; font-weight: 700; color: var(--ink); }
.jr-why-item p { margin: 0; font-size: .9rem; line-height: 1.6; color: #5a4a4e; }

/* ---------- call to action ---------- */
.jr-cta {
  position: relative; overflow: hidden; isolation: isolate; margin-top: 56px; padding: 40px 44px; border-radius: 26px; color: #fff;
  display: flex; align-items: center; justify-content: space-between; gap: 28px;
  background: radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px) 0 0 / 20px 20px, linear-gradient(145deg, var(--maroon) 0%, var(--maroon-deep) 100%);
  box-shadow: 0 30px 60px -28px rgba(138,18,40,.75);
  opacity: 0; animation: none;
}
.jr-in .jr-cta { animation: jr-rise .7s 1.2s var(--ease) forwards; }
.jr-cta::before { content: ""; position: absolute; z-index: -1; top: -90px; right: -70px; width: 260px; height: 260px; border-radius: 50%; border: 34px solid rgba(255,255,255,.06); animation: jr-spin 50s linear infinite; }
.jr-cta::after { content: ""; position: absolute; z-index: -1; bottom: -120px; left: 18%; width: 260px; height: 260px; border-radius: 50%; background: radial-gradient(circle, rgba(245,184,0,.35), transparent 70%); }
@keyframes jr-spin { to { transform: rotate(360deg); } }
.jr-cta h3 { margin: 0 0 8px; font-size: clamp(22px, 2.6vw, 30px); font-weight: 800; color: #fff; letter-spacing: -.01em; }
.jr-cta p { margin: 0; max-width: 52ch; color: rgba(255,255,255,.82); line-height: 1.65; }
.jr-btn {
  position: relative; overflow: hidden; flex: 0 0 auto; display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 30px; border-radius: 999px; font-weight: 700; color: #3a0a14 !important; text-decoration: none !important;
  background: linear-gradient(180deg, var(--gold-soft), var(--gold)); box-shadow: 0 12px 22px -8px rgba(0,0,0,.5);
  transition: transform .3s var(--ease), box-shadow .3s var(--ease), gap .3s ease;
}
.jr-btn::after { content: ""; position: absolute; top: 0; left: -75%; width: 50%; height: 100%; background: rgba(255,255,255,.55); transform: skewX(-25deg); }
.jr-btn:hover { transform: translateY(-3px); gap: 16px; box-shadow: 0 18px 28px -10px rgba(0,0,0,.6); }
.jr-btn:hover::after { left: 130%; transition: left .7s var(--ease); }
.jr-btn:active { transform: scale(.97); }
.jr-btn:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }

/* ---------- tablet / mobile ---------- */
@media (max-width: 1000px) {
  .jr-why-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 900px) {
  .jr-section { padding: 64px 18px 72px; }
  .jr-head p { font-size: 16px; }
  .jr-facts { margin-bottom: 44px; }
  .jr-path { grid-template-columns: 1fr; row-gap: 20px; }
  .jr-path::before, .jr-path::after { top: 31px; bottom: 31px; left: 29px; right: auto; width: 4px; height: auto; }
  .jr-path::before { background: repeating-linear-gradient(180deg, #e2c3c9 0 10px, transparent 10px 18px); }
  .jr-path::after { background: linear-gradient(180deg, var(--maroon), var(--gold)); transform: scaleY(0); transform-origin: top; }
  .jr-in .jr-path::after { animation-name: jr-fill-y; animation-duration: 4.2s; }
  .jr-in .jr-walker { animation-name: jr-walk-y; animation-duration: 4.2s; }
  .jr-walker { top: 9px; left: 9px; }
  .jr-stage { display: grid; grid-template-columns: 62px 1fr; column-gap: 16px; align-items: start; padding: 0; }
  .jr-stem { display: none; }
  .jr-card { align-items: flex-start; text-align: left; padding: 20px 18px 16px; }
  .jr-chips { justify-content: flex-start; }
  .jr-stage:hover .jr-card { translate: 4px 0; }
  .jr-why { margin-top: 64px; }
  .jr-cta { flex-direction: column; align-items: flex-start; padding: 30px 24px; margin-top: 40px; border-radius: 20px; }
}
@media (max-width: 560px) {
  .jr-why-grid { grid-template-columns: 1fr; }
  .jr-btn { width: 100%; justify-content: center; }
}

@media (prefers-reduced-motion: reduce) {
  .jr-section *, .jr-section *::before, .jr-section *::after { animation: none !important; transition: none !important; }
  .jr-path::after { transform: none; }
  .jr-walker { display: none; }
  .jr-node { background: linear-gradient(145deg, var(--maroon), var(--maroon-deep)); border-color: #fff; color: #fff; }
  .jr-stage:last-child .jr-node { background: linear-gradient(145deg, var(--gold-soft), var(--gold)); color: var(--maroon-deep); }
  .jr-card, .jr-why-item, .jr-cta { opacity: 1; transform: none; }
}
`;

export default function JourneySection() {
  const root = useRef(null);
  const [started, setStarted] = useState(false);

  // start once, when the section scrolls into view
  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) { setStarted(true); return undefined; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={`jr-section ${started ? 'jr-in' : ''}`} ref={root} aria-labelledby="journey-title">
      <style>{css}</style>
      <span className="jr-blob jr-blob--one" aria-hidden="true" />
      <span className="jr-blob jr-blob--two" aria-hidden="true" />

      <div className="jr-wrap">
        <header className="jr-head">
          <h2 id="journey-title">One school for the whole journey</h2>
          <span className="jr-rule" aria-hidden="true" />
          <p>A child can join us in Play Group and finish Class 12 on the same campus, following the UP Board syllabus every step of the way.</p>
        </header>

        <ul className="jr-facts">
          {FACTS.map((f) => <li key={f}>{f}</li>)}
        </ul>

        <ol className="jr-path">
          <li className="jr-walker" aria-hidden="true" role="presentation"><i className="fa fa-child"></i></li>
          {STAGES.map((s, i) => (
            <li className="jr-stage" key={s.name} style={{ '--i': i }}>
              <span className="jr-node" aria-hidden="true"><i className={`fa ${s.icon}`}></i></span>
              <span className="jr-stem" aria-hidden="true" />
              <div className="jr-card">
                <span className="jr-range">{s.range}</span>
                <strong className="jr-name">{s.name}</strong>
                <p>{s.text}</p>
                <ul className="jr-chips">
                  {s.chips.map((c) => <li key={c}>{c}</li>)}
                </ul>
                <span className="jr-goal"><i className="fa fa-flag" aria-hidden="true"></i>{s.goal}</span>
              </div>
            </li>
          ))}
        </ol>

        <div className="jr-why">
          <div className="jr-why-head">
            <h3>Why one campus works</h3>
            <p>Staying in one school gives children the one thing learning needs most: a steady place to grow.</p>
          </div>
          <div className="jr-why-grid">
            {WHY.map((w, i) => (
              <div className="jr-why-item" key={w.title} style={{ '--i': i }}>
                <span className="jr-why-icon" aria-hidden="true"><i className={`fa ${w.icon}`}></i></span>
                <h4>{w.title}</h4>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="jr-cta">
          <div>
            <h3>Not sure which stage fits your child?</h3>
            <p>See what each class covers, from Play Group to Class 12, and how learning grows year by year.</p>
          </div>
          <Link to="/classes" className="jr-btn">
            See every class in detail <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}