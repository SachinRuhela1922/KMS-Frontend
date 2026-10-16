import PageRenderer from '../../components/common/PageRenderer.jsx';
import SmartLink from '../../components/common/SmartLink.jsx';
import styles from './CareerEmployability.module.css';

// Page: /career-employability
// TEXT / CONTENT (title, intro, blocks): Admin Panel -> Pages -> this page  (PageRenderer, unchanged)
// Extra sections below come from the constants in this file. Stream names / careers: apne school ke streams ke hisaab se edit karein.
// Images are placeholders: replace with school photos.
// DESIGN: CareerEmployability.module.css (applies to this page only)

const U = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const hide = (e) => { e.currentTarget.style.display = 'none'; };

const PATHS = {
  compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.5 8.5l-2 5-5 2 2-5z',
  chat: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z',
  laptop: 'M4 5h16v11H4zM2 20h20',
  users: 'M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM21 20v-1a4 4 0 0 0-3-3.9M16 4.1a3.5 3.5 0 0 1 0 6.8',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.4c.7.7 1 1.5 1 2.6h6c0-1.1.3-1.9 1-2.6A6 6 0 0 0 12 3z',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01',
  award: 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.5 13.5 7 22l5-3 5 3-1.5-8.5',
  book: 'M4 19V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zm0 0a2 2 0 0 0 2 2h13',
};
const Icon = ({ n }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={PATHS[n]} />
  </svg>
);

const STREAMS = [
  { name: 'Science (PCM)', subjects: 'Physics, Chemistry, Mathematics', img: U('photo-1577896851231-70ef18881754'), careers: ['Engineering', 'Architecture', 'Defence (NDA)', 'Computer science', 'Pure sciences', 'Aviation'] },
  { name: 'Science (PCB)', subjects: 'Physics, Chemistry, Biology', img: U('photo-1523050854058-8df90110c9f1'), careers: ['Medicine (MBBS)', 'Dentistry', 'Pharmacy', 'Nursing', 'Biotechnology', 'Veterinary science'] },
  { name: 'Commerce', subjects: 'Accountancy, Business Studies, Economics', img: U('photo-1521587760476-6c12a4b040da'), careers: ['Chartered Accountancy', 'Company Secretary', 'Banking', 'B.Com / BBA', 'Finance', 'Entrepreneurship'] },
  { name: 'Arts and Humanities', subjects: 'History, Political Science, Geography, Languages', img: U('photo-1509062522246-3755977927d7'), careers: ['Civil services', 'Teaching', 'Law', 'Journalism', 'Social work', 'Design and media'] },
];

const SKILLS = [
  ['chat', 'Communication', 'Speaking, listening and writing clearly.'],
  ['laptop', 'Computer skills', 'Basic digital skills every workplace needs.'],
  ['users', 'Teamwork', 'Working with others and respecting different views.'],
  ['clock', 'Time management', 'Planning study, work and activities well.'],
  ['bulb', 'Problem solving', 'Thinking clearly when the answer is not obvious.'],
  ['target', 'Confidence', 'Speaking up, presenting and taking responsibility.'],
];

const GUIDE = [
  ['Class 9 and 10', 'Discover', 'Find interests and strengths through activities, aptitude talks and subject exploration.'],
  ['Class 11', 'Choose', 'Pick the right stream with teacher and parent guidance, based on interest and ability.'],
  ['Class 12', 'Prepare', 'Board exam focus, entrance exam awareness and help with applications.'],
  ['After school', 'Move ahead', 'Guidance on courses, colleges and the next steps toward a career.'],
];

const EXAMS = ['JEE', 'NEET', 'CUET', 'NDA', 'CLAT', 'CA Foundation', 'CS Foundation', 'State entrance exams'];

function Before({ s }) {
  return (
    <section className={s.streams} aria-label="Streams and careers">
      <h2 className={s.h2}>Choose your stream, see your future</h2>
      <p className={s.sub}>Every stream opens many doors. Hover over or tap a card to see the careers it can lead to.</p>
      <div className={s.streamGrid}>
        {STREAMS.map((x, i) => (
          <article key={x.name} className={s.stream} tabIndex={0} style={{ '--i': i }}>
            <div className={s.streamImg}><img src={x.img} alt={x.name} loading="lazy" onError={hide} /></div>
            <div className={s.streamBody}>
              <h3>{x.name}</h3>
              <p>{x.subjects}</p>
              <span className={s.hint}>See careers</span>
            </div>
            <div className={s.careers}>
              <strong>{x.name} careers</strong>
              <ul>{x.careers.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function After({ s }) {
  return (
    <>
      <section className={s.skillsSec}>
        <div className={s.wrap}>
          <h2 className={s.h2}>Skills for life and work</h2>
          <p className={s.sub}>Marks matter, but employers and colleges also look for these skills. We build them every day.</p>
          <div className={s.skills}>
            {SKILLS.map(([ic, t, d]) => (
              <article key={t} className={s.skill}>
                <span className={s.ico}><Icon n={ic} /></span>
                <div><h3>{t}</h3><p>{d}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={s.guideSec}>
        <div className={s.wrap}>
          <h2 className={s.h2}>Career guidance, class by class</h2>
          <ol className={s.guide}>
            {GUIDE.map(([c, t, d], i) => (
              <li key={t} className={s.step}>
                <span className={s.no}>{i + 1}</span>
                <small>{c}</small>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={s.examSec}>
        <div className={s.wrap}>
          <h2 className={s.h2}>Exams our students aim for</h2>
          <p className={s.sub}>We guide students about these common national and state level exams and how to prepare.</p>
          <div className={s.chips}>
            {EXAMS.map((e) => <span key={e} className={s.chip}>{e}</span>)}
          </div>
        </div>
      </section>

      <section className={s.cta}>
        <span className={s.ctaIco}><Icon n="compass" /></span>
        <h2>Not sure which path is right?</h2>
        <p>Talk to our teachers. We will help your child choose a stream and a career that fits their interests.</p>
        <div className={s.ctaRow}>
          <SmartLink href="/contact" className={s.ctaBtn}>Talk to us</SmartLink>
          <SmartLink href="/classes" className={s.ctaGhost}>View classes and streams</SmartLink>
        </div>
      </section>
    </>
  );
}

export default function CareerEmployability() {
  return <PageRenderer id="career-employability" styles={styles} before={<Before s={styles} />} after={<After s={styles} />} />;
}