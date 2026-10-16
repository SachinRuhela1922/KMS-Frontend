import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext.jsx';
import { Reveal, CountUp } from '../common/Reveal.jsx';
import { img } from '../../lib/media.js';
import { SCHOOL } from '../../data/school/site.js';
import * as D from '../../data/school/home.js';
import s from './SchoolHome.module.css';

// All text below comes from src/data/school/home.js

function Head({ eyebrow, title, text }) {
  return (
    <Reveal className={s.head}>
      {eyebrow && <span className={s.eyebrow}>{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}

export function QuickLinks() {
  return (
    <section className={s.quick}>
      <div className={s.wrap}>
        <Reveal className={s.quickGrid}>
          {D.QUICK_LINKS.map((q) => (
            <Link to={q.href} className={s.qItem} key={q.title}>
              <span className={s.qIcon}><i className={`fa ${q.icon}`} aria-hidden="true"></i></span>
              <span><strong>{q.title}</strong><small>{q.text}</small></span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Notices() {
  const list = [...D.NOTICES, ...D.NOTICES]; // doubled for a seamless loop
  return (
    <div className={s.ticker} aria-label="Notices">
      <span className={s.tLabel}><i className="fa fa-bullhorn"></i> NOTICE</span>
      <div className={s.tTrack}>
        <div className={s.tMove}>{list.map((n, i) => <span key={i}>{n}</span>)}</div>
      </div>
    </div>
  );
}

export function AboutSchool() {
  const { settings } = useContent();
  const a = D.ABOUT;
  const photo = settings.footerBg ? img(settings.footerBg, 1000) : '';
  return (
    <section className={s.sec}>
      <div className={`${s.wrap} ${s.about}`}>
        <Reveal className={s.aboutImg}>
          {photo ? <img src={photo} alt={SCHOOL.name} loading="lazy" /> : null}
          <div className={s.badge}><strong>25+</strong><span>Years of trust</span></div>
        </Reveal>
        <Reveal className={s.aboutText} delay={120}>
          <span className={s.eyebrow}>{a.eyebrow}</span>
          <h2>{a.title}</h2>
          {a.text.map((t) => <p key={t}>{t}</p>)}
          <ul className={s.points}>
            {a.points.map((p) => <li key={p}><i className="fa fa-check-circle"></i>{p}</li>)}
          </ul>
          <div className={s.quoteBox}><p>“{a.quote}”</p><b>— {a.author}</b></div>
          <p style={{ marginTop: 24, marginBottom: 0 }}><Link to="/about-us" className={s.btn}>Know more about us</Link></p>
        </Reveal>
      </div>
    </section>
  );
}

export function StatsBand() {
  const { classes } = useContent();
  // student count = sum of the strength of all classes (Admin -> Classes)
  const total = (classes?.items || []).reduce((n, c) => n + (parseInt(c.strength, 10) || 0), 0);
  return (
    <section className={s.stats}>
      <div className={s.wrap}>
        <div className={s.statGrid}>
          {D.STATS.map((x, i) => (
            <Reveal className={s.stat} delay={i * 100} key={x.label}>
              <i className={`fa ${x.icon}`} aria-hidden="true"></i>
              <strong><CountUp to={x.key === 'students' && total ? total : x.value} suffix={x.suffix} /></strong>
              <span>{x.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section className={`${s.sec} ${s.soft}`}>
      <div className={s.wrap}>
        <Head eyebrow="Why K.M.S" title="Why parents choose our school" text="Good teaching, good values and a safe place to grow — all under one roof." />
        <div className={`${s.grid} ${s.cards3}`}>
          {D.WHY.map((w, i) => (
            <Reveal className={s.card} delay={(i % 3) * 100} key={w.title}>
              <span className={s.cIcon}><i className={`fa ${w.icon}`} aria-hidden="true"></i></span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Facilities() {
  return (
    <section className={s.sec}>
      <div className={s.wrap}>
        <Head eyebrow="Campus" title="Facilities for better learning" text="Everything a child needs to learn, play and stay safe." />
        <div className={`${s.grid} ${s.facGrid}`}>
          {D.FACILITIES.map((f, i) => (
            <Reveal className={s.fac} delay={(i % 4) * 80} key={f.title}>
              <i className={`fa ${f.icon}`} aria-hidden="true"></i>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Toppers() {
  const initials = (n) => n.split(' ').map((w) => w[0]).slice(0, 2).join('');
  return (
    <section className={`${s.sec} ${s.soft}`}>
      <div className={s.wrap}>
        <Head eyebrow="Achievers" title="Our proud toppers" text="Hard work, good guidance and a little extra effort — congratulations to our stars." />
        <div className={`${s.grid} ${s.topGrid}`}>
          {D.TOPPERS.map((t, i) => (
            <Reveal className={s.top} delay={i * 100} key={t.name}>
              <div className={s.avatar}>{initials(t.name)}</div>
              <h3>{t.name}</h3>
              <small>{t.cls}</small>
              <span className={s.score}>{t.score}</span>
              <em>{t.note}</em>
            </Reveal>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 34, marginBottom: 0 }}><Link to="/achievements" className={s.btn}>All achievements</Link></p>
      </div>
    </section>
  );
}

export function NewsEvents() {
  return (
    <section className={s.sec}>
      <div className={s.wrap}>
        <Head eyebrow="Updates" title="Latest news & events" text="What is happening at K.M.S this session." />
        <div className={`${s.grid} ${s.newsGrid}`}>
          {D.NEWS.map((n, i) => (
            <Reveal className={s.news} delay={(i % 3) * 100} key={n.title}>
              <div className={s.date}><strong>{n.day}</strong><span>{n.month}</span></div>
              <div><span className={s.tag}>{n.tag}</span><h3>{n.title}</h3><p>{n.text}</p></div>
            </Reveal>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 34, marginBottom: 0 }}><Link to="/campus-life/events" className={s.btn}>Full events calendar</Link></p>
      </div>
    </section>
  );
}

export function Testimonials() {
  const [i, setI] = useState(0);
  const n = D.TESTIMONIALS.length;
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n, i]);
  return (
    <section className={`${s.sec} ${s.soft}`}>
      <div className={s.wrap}>
        <Head eyebrow="Testimonials" title="What parents say about us" />
        <Reveal className={s.testi}>
          <div className={s.tStage}>
            {D.TESTIMONIALS.map((t, k) => (
              <div className={`${s.tCard} ${k === i ? s.tOn : ''}`} key={t.name} aria-hidden={k !== i}>
                <i className="fa fa-quote-left"></i>
                <p>{t.text}</p>
                <b>{t.name}</b><small>{t.role}</small>
              </div>
            ))}
          </div>
          <div className={s.dots}>
            {D.TESTIMONIALS.map((t, k) => (
              <button type="button" key={t.name} className={k === i ? s.dotOn : ''} onClick={() => setI(k)} aria-label={`Show review ${k + 1}`} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AdmissionCTA() {
  return (
    <section className={s.cta}>
      <div className={s.wrap}>
        <Reveal>
          <h2>Admissions open for {SCHOOL.session}</h2>
          <p>Give your child a strong start. Admission is simple — just four easy steps.</p>
        </Reveal>
        <div className={s.ctaSteps}>
          {D.ADMISSION_STEPS.map((x, k) => (
            <Reveal className={s.ctaStep} delay={k * 100} key={x.title}>
              <b>{k + 1}</b><h3>{x.title}</h3><p>{x.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className={s.ctaBtns}>
          <Link to="/admissions" className={s.btn}>Apply for Admission</Link>
          <a href={`tel:+${SCHOOL.phoneRaw}`} className={`${s.btn} ${s.btnGhost}`}><i className="fa fa-phone"></i> {SCHOOL.phone}</a>
        </Reveal>
      </div>
    </section>
  );
}
