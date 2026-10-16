import PageRenderer from '../../components/common/PageRenderer.jsx';
import SmartLink from '../../components/common/SmartLink.jsx';
import styles from './Admissions.module.css';

// Page: /admissions
// TEXT / CONTENT (title, intro, blocks): Admin Panel -> Pages -> this page  (PageRenderer, unchanged)
// Extra sections below come from the constants in this file. Images are placeholders: replace with school photos.
// DESIGN: Admissions.module.css (applies to this page only)

const U = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const hide = (e) => { e.currentTarget.style.display = 'none'; };

const PATHS = {
  pin: 'M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  file: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6',
  check: 'M20 6 9 17l-5-5',
  award: 'M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.5 13.5 7 22l5-3 5 3-1.5-8.5',
  book: 'M4 19V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zm0 0a2 2 0 0 0 2 2h13',
  image: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M9 9.5h.01',
  users: 'M16 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM21 20v-1a4 4 0 0 0-3-3.9M16 4.1a3.5 3.5 0 0 1 0 6.8',
  home: 'M3 11l9-8 9 8M5 10v10h14V10',
  shield: 'M12 3l8 3v6c0 4.5-3.2 8.2-8 9-4.8-.8-8-4.5-8-9V6z',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
};
const Icon = ({ n }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={PATHS[n]} />
  </svg>
);

const STEPS = [
  ['pin', 'Enquire and visit', 'Meet our teachers, see the classrooms and ask your questions.'],
  ['file', 'Fill the form', 'Complete the admission form for the class you want.'],
  ['check', 'Document check', 'Submit the required documents for verification.'],
  ['award', 'Confirm the seat', 'Finish the formalities and your child is ready to begin.'],
];

const DOCS = [
  ['file', 'Birth certificate', 'Proof of the child\u2019s date of birth.'],
  ['book', 'Previous school record', 'Report card or transfer certificate, if applicable.'],
  ['image', 'Passport-size photographs', 'Recent photographs of the child.'],
  ['users', 'Parent ID proof', 'A valid ID of a parent or guardian.'],
  ['home', 'Address proof', 'Any document showing the family\u2019s address.'],
];

const WHY = [
  ['users', 'Caring teachers', 'Every child gets attention, guidance and encouragement.'],
  ['book', 'Strong academics', 'Clear planning from Play Group to Class 12.'],
  ['shield', 'Safe campus', 'A disciplined and friendly environment for children.'],
  ['award', 'All-round growth', 'Sports, art, music and values alongside studies.'],
];

const PHOTOS = [
  U('photo-1503676260728-1c00da094a0b'),
  U('photo-1577896851231-70ef18881754'),
  U('photo-1427504494785-3a9ca7044f45'),
];

const FAQS = [
  ['When can my child be admitted?', 'Admissions are taken for Play Group to Class 12 as per seat availability. Please contact the school office for the current session.'],
  ['What age is required for each class?', 'The age criteria depend on the class and the school rules. The school office will tell you the exact requirement.'],
  ['Can I visit the school before applying?', 'Yes. Parents are welcome to visit, meet the teachers and see the campus before applying.'],
  ['Are the documents checked on the same day?', 'Documents are verified at the school office. Please bring originals along with copies when you visit.'],
  ['How will I know my admission is confirmed?', 'The school office will confirm once the form, documents and formalities are complete.'],
];

function Before({ s }) {
  return (
    <section className={s.process} aria-label="Admission process">
      <h2 className={s.h2}>Admission in four simple steps</h2>
      <ol className={s.steps}>
        {STEPS.map(([ic, t, d], i) => (
          <li key={t} className={s.step}>
            <span className={s.ico}><Icon n={ic} /></span>
            <small>Step {i + 1}</small>
            <h3>{t}</h3>
            <p>{d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function After({ s }) {
  return (
    <>
      <section className={s.docsSec}>
        <div className={s.wrap}>
          <div className={s.docsText}>
            <h2 className={s.h2}>Documents you may need</h2>
            <p className={s.sub}>Keep these ready when you visit. The school office will confirm the exact list for your child’s class.</p>
            <ul className={s.docs}>
              {DOCS.map(([ic, t, d]) => (
                <li key={t}><span className={s.icoSm}><Icon n={ic} /></span><div><strong>{t}</strong><span>{d}</span></div></li>
              ))}
            </ul>
          </div>
          <div className={s.photos}>
            {PHOTOS.map((src, i) => (<figure key={i}><img src={src} alt="Students at KMS Inter College" loading="lazy" onError={hide} /></figure>))}
          </div>
        </div>
      </section>

      <section className={s.whySec}>
        <div className={s.wrap}>
          <h2 className={s.h2}>Why families join KMS Inter College</h2>
          <div className={s.whyGrid}>
            {WHY.map(([ic, t, d]) => (
              <article key={t} className={s.whyCard}>
                <span className={s.ico}><Icon n={ic} /></span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={s.faqSec}>
        <div className={`${s.wrap} ${s.faqWrap}`}>
          <h2 className={s.h2}>Admission questions, answered</h2>
          <div className={s.faq}>
            {FAQS.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}
          </div>
        </div>
      </section>

      <section className={s.cta}>
        <span className={s.ctaIco}><Icon n="phone" /></span>
        <h2>Ready to begin?</h2>
        <p>Visit the school or get in touch. We will guide you through every step of admission.</p>
        <div className={s.ctaRow}>
          <SmartLink href="/contact" className={s.ctaBtn}>Contact the school</SmartLink>
          <SmartLink href="/classes" className={s.ctaGhost}>Explore classes</SmartLink>
        </div>
      </section>
    </>
  );
}

export default function Admissions() {
  return <PageRenderer id="admissions" styles={styles} before={<Before s={styles} />} after={<After s={styles} />} />;
}