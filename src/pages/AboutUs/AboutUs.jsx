import PageRenderer from '../../components/common/PageRenderer.jsx';
import SmartLink from '../../components/common/SmartLink.jsx';
import styles from './AboutUs.module.css';

// Page: /about-us
// TEXT / CONTENT (title, intro, blocks): Admin Panel -> Pages -> this page  (PageRenderer, unchanged)
// Extra sections below come from the constants in this file. Images are placeholders: replace with school photos.
// DESIGN: AboutUs.module.css (applies to this page only)

const U = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const hide = (e) => { e.currentTarget.style.display = 'none'; };

const PATHS = {
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01',
  heart: 'M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 0 0 0-7.8z',
  shield: 'M12 3l8 3v6c0 4.5-3.2 8.2-8 9-4.8-.8-8-4.5-8-9V6z',
  users: 'M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM21 20v-1a4 4 0 0 0-3-3.9M16 4.1a3.5 3.5 0 0 1 0 6.8',
  book: 'M4 19V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zm0 0a2 2 0 0 0 2 2h13',
  award: 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.5 13.5 7 22l5-3 5 3-1.5-8.5',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.4c.7.7 1 1.5 1 2.6h6c0-1.1.3-1.9 1-2.6A6 6 0 0 0 12 3z',
  laptop: 'M4 5h16v11H4zM2 20h20',
};
const Icon = ({ n }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={PATHS[n]} />
  </svg>
);

const PILLARS = [
  ['eye', 'Our vision', 'A school where every child learns with joy, grows in character and is ready for the future.'],
  ['target', 'Our mission', 'To give quality education in a safe, disciplined and caring environment from Play Group to Class 12.'],
  ['heart', 'Our belief', 'Every child is special. With the right care and guidance, every child can shine.'],
];

const STAGES = [
  ['Pre-Primary', 'Play Group to UKG', U('photo-1427504494785-3a9ca7044f45', 700)],
  ['Primary', 'Class 1 to 5', U('photo-1503676260728-1c00da094a0b', 700)],
  ['Middle', 'Class 6 to 8', U('photo-1577896851231-70ef18881754', 700)],
  ['Senior', 'Class 9 to 12', U('photo-1523050854058-8df90110c9f1', 700)],
];

const DIFF = [
  ['users', 'Caring teachers', 'Teachers who know every child and support them with patience.'],
  ['book', 'Strong academics', 'Clear planning, regular practice and concept-based learning.'],
  ['laptop', 'Smart learning', 'Digital tools that make lessons clear and interesting.'],
  ['shield', 'Safe campus', 'A disciplined and friendly place where children feel secure.'],
  ['award', 'All-round growth', 'Sports, art, music and events alongside studies.'],
  ['bulb', 'Future ready', 'Career guidance and life skills for the years after school.'],
];

const VALUES = [
  ['Discipline', 'Being on time and following rules.'],
  ['Respect', 'For elders, teachers and friends.'],
  ['Curiosity', 'Asking questions and learning more.'],
  ['Teamwork', 'Working and winning together.'],
  ['Integrity', 'Choosing honesty every time.'],
];

const GALLERY = [
  U('photo-1509062522246-3755977927d7', 1000), U('photo-1580582932707-520aed937b7b', 700), U('photo-1521587760476-6c12a4b040da', 700),
  U('photo-1427504494785-3a9ca7044f45', 700), U('photo-1577896851231-70ef18881754', 1000),
];

function Before({ s }) {
  return (
    <section className={s.pillars} aria-label="Vision and mission">
      <div className={s.pillarGrid}>
        {PILLARS.map(([ic, t, d], i) => (
          <article key={t} className={s.pillar} style={{ '--i': i }}>
            <span className={s.ico}><Icon n={ic} /></span>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function After({ s }) {
  return (
    <>
      <section className={s.storySec}>
        <div className={`${s.wrap} ${s.story}`}>
          <div className={s.storyImg}><img src={U('photo-1509062522246-3755977927d7', 1000)} alt="Teacher with students at KMS Inter College" loading="lazy" onError={hide} /></div>
          <div className={s.storyText}>
            <h2 className={s.h2}>One campus, one complete journey</h2>
            <p>KMS Inter College welcomes children from Play Group and walks with them all the way to the Class 12 board exams.</p>
            <p>Because the whole journey happens in one place, teachers know each child well, friendships last and good habits grow year after year.</p>
            <SmartLink href="/admissions" className={s.btn}>Admission information</SmartLink>
          </div>
        </div>
      </section>

      <section className={s.stageSec}>
        <div className={s.wrap}>
          <h2 className={s.h2}>Four stages, one family</h2>
          <div className={s.stageGrid}>
            {STAGES.map(([t, c, img]) => (
              <article key={t} className={s.stage}>
                <img src={img} alt={t} loading="lazy" onError={hide} />
                <div className={s.stageText}><h3>{t}</h3><span>{c}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={s.diffSec}>
        <div className={s.wrap}>
          <h2 className={s.h2}>What makes us different</h2>
          <div className={s.diff}>
            {DIFF.map(([ic, t, d]) => (
              <article key={t} className={s.dCard}>
                <span className={s.icoSm}><Icon n={ic} /></span>
                <div><h3>{t}</h3><p>{d}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={s.valSec}>
        <div className={s.wrap}>
          <h2 className={s.h2}>Values we live by</h2>
          <dl className={s.values}>
            {VALUES.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
          </dl>
        </div>
      </section>

      <section className={s.galSec}>
        <div className={s.wrap}>
          <h2 className={s.h2}>Life on campus</h2>
          <div className={s.mosaic}>
            {GALLERY.map((src, i) => (<figure key={i}><img src={src} alt="KMS Inter College campus life" loading="lazy" onError={hide} /></figure>))}
          </div>
        </div>
      </section>

      <section className={s.cta}>
        <h2>Come and see KMS Inter College</h2>
        <p>Visit the campus, meet our teachers and see where your child will learn, play and grow.</p>
        <div className={s.ctaRow}>
          <SmartLink href="/contact" className={s.ctaBtn}>Contact the school</SmartLink>
          <SmartLink href="/classes" className={s.ctaGhost}>Explore classes</SmartLink>
        </div>
      </section>
    </>
  );
}

export default function AboutUs() {
  return <PageRenderer id="about-us" styles={styles} before={<Before s={styles} />} after={<After s={styles} />} />;
}