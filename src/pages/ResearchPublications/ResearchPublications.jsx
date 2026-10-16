import PageRenderer from '../../components/common/PageRenderer.jsx';
import SmartLink from '../../components/common/SmartLink.jsx';
import styles from './ResearchPublications.module.css';

// Page: /research-publications
// TEXT / CONTENT (title, intro, blocks): Admin Panel -> Pages -> this page  (PageRenderer, unchanged)
// Extra sections below come from the constants in this file. Images are placeholders: replace with school photos.
// DESIGN: ResearchPublications.module.css (applies to this page only)

const U = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const hide = (e) => { e.currentTarget.style.display = 'none'; };

const PATHS = {
  flask: 'M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3M7.5 15h9',
  pen: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
  book: 'M4 19V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zm0 0a2 2 0 0 0 2 2h13',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.4c.7.7 1 1.5 1 2.6h6c0-1.1.3-1.9 1-2.6A6 6 0 0 0 12 3z',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  users: 'M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM21 20v-1a4 4 0 0 0-3-3.9M16 4.1a3.5 3.5 0 0 1 0 6.8',
  share: 'M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13',
  award: 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.5 13.5 7 22l5-3 5 3-1.5-8.5',
};
const Icon = ({ n }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={PATHS[n]} />
  </svg>
);

const FOCUS = [
  ['flask', 'Science and projects', 'Experiments, working models and exhibitions for every class.'],
  ['pen', 'Writing and magazine', 'Stories, poems and articles by students and teachers.'],
  ['book', 'Reading culture', 'Library time and reading habits from Play Group to Class 12.'],
  ['bulb', 'Ideas and innovation', 'Quizzes, debates and problem-solving that build thinking skills.'],
];

const AREAS = [
  ['Science exhibitions', 'Students present working models and simple experiments to classmates, teachers and parents.', U('photo-1577896851231-70ef18881754')],
  ['School magazine', 'A yearly collection of student writing, drawings and school moments.', U('photo-1521587760476-6c12a4b040da')],
  ['Class projects', 'Hands-on projects on environment, history, maths and daily life.', U('photo-1503676260728-1c00da094a0b')],
  ['Reading club', 'Story hours and book talks that make reading enjoyable.', U('photo-1509062522246-3755977927d7')],
];

const FLOW = [
  ['search', 'Choose a topic', 'Students pick a question they are curious about, with guidance from the teacher.'],
  ['book', 'Learn and explore', 'They read, observe, collect information and try things out.'],
  ['pen', 'Create and present', 'The work becomes a model, chart, report or presentation.'],
  ['share', 'Share and celebrate', 'Work is shown at school events and appreciated by everyone.'],
];

const SHARE = [
  ['users', 'Annual day and events'],
  ['award', 'Class and school exhibitions'],
  ['pen', 'School magazine'],
  ['share', 'Morning assembly'],
];

function Before({ s }) {
  return (
    <section className={s.focus} aria-label="Focus areas">
      <h2 className={s.h2}>Learning beyond the textbook</h2>
      <p className={s.sub}>At KMS Inter College, children from Play Group to Class 12 are encouraged to ask questions, explore ideas and share their work.</p>
      <div className={s.focusGrid}>
        {FOCUS.map(([ic, t, d], i) => (
          <article key={t} className={s.fCard} style={{ '--i': i }}>
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
      <section className={s.areasSec}>
        <div className={s.wrap}>
          <h2 className={s.h2}>Where student work shines</h2>
          <div className={s.areas}>
            {AREAS.map(([t, d, img], i) => (
              <article key={t} className={s.area} style={{ '--i': i }}>
                <div className={s.areaImg}><img src={img} alt={t} loading="lazy" onError={hide} /></div>
                <div className={s.areaBody}><h3>{t}</h3><p>{d}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={s.flowSec}>
        <div className={s.wrap}>
          <h2 className={s.h2}>How a student project grows</h2>
          <ol className={s.flow}>
            {FLOW.map(([ic, t, d], i) => (
              <li key={t} className={s.flowItem}>
                <span className={s.flowNo}>{i + 1}</span>
                <span className={s.icoSm}><Icon n={ic} /></span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={s.shareSec}>
        <div className={s.wrap}>
          <h2 className={s.h2}>Where we share it</h2>
          <div className={s.shareRow}>
            {SHARE.map(([ic, t]) => (
              <div key={t} className={s.shareTile}><span className={s.icoSm}><Icon n={ic} /></span><strong>{t}</strong></div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.cta}>
        <h2>Curious about student work at our school?</h2>
        <p>Visit the campus, meet our teachers and see how children learn by doing.</p>
        <div className={s.ctaRow}>
          <SmartLink href="/contact" className={s.ctaBtn}>Contact the school</SmartLink>
          <SmartLink href="/admissions" className={s.ctaGhost}>Admissions</SmartLink>
        </div>
      </section>
    </>
  );
}

export default function ResearchPublications() {
  return <PageRenderer id="research-publications" styles={styles} before={<Before s={styles} />} after={<After s={styles} />} />;
}