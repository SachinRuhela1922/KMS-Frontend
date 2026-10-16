import { useState } from 'react';
import PageRenderer from '../../components/common/PageRenderer.jsx';
import SmartLink from '../../components/common/SmartLink.jsx';
import styles from './DiscoverJGU.module.css';

// Page: /discover-jgu
// Admin Panel content (title, intro, hero, blocks) PageRenderer se aata hai. Neeche ka extra content in constants se.
// Images: Unsplash placeholders hain, apni school photos se replace karein.

const U = (id, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const hide = (e) => { e.currentTarget.style.display = 'none'; };

const FACTS = [
  ['Play Group to 12', 'Complete schooling on one campus'],
  ['Caring classrooms', 'Every child is known by name'],
  ['Smart learning', 'Digital tools in the classroom'],
  ['Safe campus', 'Disciplined, friendly environment'],
];

const WHY = [
  ['Strong academics', 'Clear syllabus planning, regular tests and concept-based teaching from Play Group to Class 12.'],
  ['Experienced teachers', 'Caring teachers who understand each child\u2019s pace and give extra support when needed.'],
  ['Smart classes', 'Digital boards and visual lessons that make difficult topics simple to understand.'],
  ['Sports and fitness', 'Daily games, PT and annual sports that build health, stamina and team spirit.'],
  ['Art, music and events', 'Cultural programmes, drawing and music that give every child a stage.'],
  ['Safe, friendly campus', 'Careful supervision and a warm atmosphere so parents can stay stress-free.'],
  ['Regular parent contact', 'Parent-teacher meetings and progress updates keep you involved in your child\u2019s growth.'],
  ['Focus on character', 'Morning assembly, moral values and good habits are part of everyday school life.'],
];

const STAGES = [
  { name: 'Pre-Primary', classes: 'Play Group, Nursery, LKG, UKG', text: 'Learning through play, stories and rhymes. Children learn to love coming to school.', points: ['Phonics, numbers and shapes through activities', 'Rhymes, storytelling and creative play', 'Social skills, sharing and good manners'] },
  { name: 'Primary', classes: 'Class 1 to 5', text: 'A strong base in reading, writing and maths, along with good habits and manners.', points: ['English, Hindi, Maths, EVS and Computers', 'Regular reading and handwriting practice', 'Drawing, music and games every week'] },
  { name: 'Middle', classes: 'Class 6 to 8', text: 'Science, social studies and skill-building that grow curiosity and clear thinking.', points: ['Science, Maths, Social Science and languages', 'Practical work, projects and quizzes', 'Public speaking and group activities'] },
  { name: 'Senior', classes: 'Class 9 to 12', text: 'Board exam preparation, subject guidance and career counselling for a confident future.', points: ['Focused board exam preparation and revision', 'Regular tests and doubt-clearing support', 'Career guidance and stream selection help'] },
];

const DAY = [
  ['Morning assembly', 'Prayer, thought of the day, news and national pledge.'],
  ['Core classes', 'Language, Maths and Science taught with examples and practice.'],
  ['Break and lunch', 'Healthy meals and play time on a supervised campus.'],
  ['Smart class and labs', 'Digital lessons, practicals and computer learning.'],
  ['Activity period', 'Sports, art, music or club activities, depending on the day.'],
  ['Homework and dispersal', 'Clear homework notes and safe, orderly dismissal.'],
];

const ACTIVITIES = [
  ['Sports and games', 'Cricket, football, athletics and yoga.', U('photo-1427504494785-3a9ca7044f45', 700)],
  ['Art and craft', 'Drawing, painting and creative workshops.', U('photo-1503676260728-1c00da094a0b', 700)],
  ['Music and dance', 'Singing, dance and annual functions.', U('photo-1523050854058-8df90110c9f1', 700)],
  ['Science and projects', 'Experiments, exhibitions and model making.', U('photo-1577896851231-70ef18881754', 700)],
];

const GALLERY = [
  U('photo-1509062522246-3755977927d7', 900), U('photo-1580582932707-520aed937b7b', 700), U('photo-1521587760476-6c12a4b040da', 700),
  U('photo-1427504494785-3a9ca7044f45', 700), U('photo-1577896851231-70ef18881754', 900),
];

const VALUES = [
  ['Discipline', 'Being on time and following rules.'],
  ['Respect', 'For elders, teachers and friends.'],
  ['Curiosity', 'Asking questions and learning more.'],
  ['Teamwork', 'Working and winning together.'],
  ['Integrity', 'Choosing honesty every time.'],
];

const ADMISSION = [
  ['Visit the campus', 'Meet our teachers and see the classrooms and facilities.'],
  ['Fill the form', 'Submit the admission form with the required documents.'],
  ['Confirm the seat', 'Complete the formalities and your child is ready to begin.'],
];

const FAQS = [
  ['Which classes does the school offer?', 'KMS Inter College runs classes from Play Group to Class 12 on one campus.'],
  ['How can I take admission for my child?', 'Visit the school office, fill the admission form and submit the required documents. You can also contact us through the Contact page.'],
  ['Which documents are needed for admission?', 'Usually the child\u2019s birth certificate, previous school report card or transfer certificate, passport-size photographs and parent ID proof. The office will confirm the exact list.'],
  ['Can I visit the campus before admission?', 'Yes. Parents are welcome to visit, meet the teachers and see the classrooms before deciding.'],
  ['How do parents stay updated on progress?', 'Through regular tests, report cards and parent-teacher meetings during the year.'],
];

function Stages({ s }) {
  const [i, setI] = useState(0);
  const st = STAGES[i];
  return (
    <div className={s.stages}>
      <div className={s.tabs} role="tablist" aria-label="School stages">
        {STAGES.map((x, k) => (
          <button key={x.name} role="tab" aria-selected={i === k} className={i === k ? s.tabOn : s.tab} onClick={() => setI(k)} type="button">
            <strong>{x.name}</strong><span>{x.classes}</span>
          </button>
        ))}
      </div>
      <div className={s.panel} role="tabpanel">
        <h3>{st.name} <small>{st.classes}</small></h3>
        <p>{st.text}</p>
        <ul>{st.points.map((p) => <li key={p}>{p}</li>)}</ul>
      </div>
    </div>
  );
}

function Before({ s }) {
  return (
    <>
      <section className={s.promise}>
        <div className={s.promiseImg}>
          <img src={U('photo-1509062522246-3755977927d7')} alt="Teacher helping students in class" onError={hide} />
        </div>
        <div className={s.promiseText}>
          <h2 className={s.h2}>Our promise</h2>
          <p>From the first day in Play Group to the Class 12 board exams, every child at KMS Inter College learns, plays and grows in a safe, disciplined and caring environment.</p>
          <p>We build strong academics, good character and confident futures, so your child becomes not just a good student but a good person.</p>
          <div className={s.promiseBtns}>
            <SmartLink href="/contact" className={s.btn}>Book a campus visit</SmartLink>
            <SmartLink href="/contact" className={s.btnGhost}>Talk to us</SmartLink>
          </div>
        </div>
      </section>
      <section className={s.facts} aria-label="At a glance">
        {FACTS.map(([t, d]) => (
          <div className={s.fact} key={t}><strong>{t}</strong><span>{d}</span></div>
        ))}
      </section>
    </>
  );
}

function After({ s }) {
  return (
    <>
      <section className={`${s.sec} ${s.tint}`}>
        <div className={s.wrap}>
          <h2 className={s.h2}>Why parents choose us</h2>
          <p className={s.sub}>Eight reasons families trust KMS Inter College with their children’s future.</p>
          <div className={s.grid}>
            {WHY.map(([t, d]) => (<article className={s.card} key={t}><h3>{t}</h3><p>{d}</p></article>))}
          </div>
        </div>
      </section>

      <section className={s.sec}>
        <div className={s.wrap}>
          <h2 className={s.h2}>The learning journey</h2>
          <p className={s.sub}>Choose a stage to see how we teach at every step.</p>
          <Stages s={s} />
        </div>
      </section>

      <section className={`${s.sec} ${s.tint}`}>
        <div className={s.wrap}>
          <h2 className={s.h2}>A day at KMS Inter College</h2>
          <p className={s.sub}>A balanced routine of study, play and values.</p>
          <ol className={s.day}>
            {DAY.map(([t, d], i) => (<li key={t}><span className={s.no}>{i + 1}</span><div><h3>{t}</h3><p>{d}</p></div></li>))}
          </ol>
        </div>
      </section>

      <section className={s.sec}>
        <div className={s.wrap}>
          <h2 className={s.h2}>Beyond the classroom</h2>
          <p className={s.sub}>Activities that build confidence, talent and friendships.</p>
          <div className={s.facGrid}>
            {ACTIVITIES.map(([t, d, img]) => (
              <article className={s.fac} key={t}>
                <img src={img} alt={t} loading="lazy" onError={hide} />
                <div><h3>{t}</h3><p>{d}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.sec} ${s.tint}`}>
        <div className={s.wrap}>
          <h2 className={s.h2}>Campus gallery</h2>
          <div className={s.mosaic}>
            {GALLERY.map((src, i) => (<figure key={i}><img src={src} alt="KMS Inter College campus life" loading="lazy" onError={hide} /></figure>))}
          </div>
        </div>
      </section>

      <section className={s.sec}>
        <div className={s.wrap}>
          <h2 className={s.h2}>Values we teach every day</h2>
          <dl className={s.values}>
            {VALUES.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
          </dl>
        </div>
      </section>

      <section className={`${s.sec} ${s.tint}`}>
        <div className={`${s.wrap} ${s.twoCol}`}>
          <div>
            <h2 className={s.h2}>Admission in three simple steps</h2>
            <ol className={s.day}>
              {ADMISSION.map(([t, d], i) => (<li key={t}><span className={s.no}>{i + 1}</span><div><h3>{t}</h3><p>{d}</p></div></li>))}
            </ol>
          </div>
          <div>
            <h2 className={s.h2}>Parents often ask</h2>
            <div className={s.faq}>
              {FAQS.map(([q, a]) => (<details key={q}><summary>{q}</summary><p>{a}</p></details>))}
            </div>
          </div>
        </div>
      </section>

      <section className={s.cta}>
        <h2>Admissions open</h2>
        <p>Give your child a bright start. Visit KMS Inter College, meet our teachers and see the campus yourself.</p>
        <div className={s.ctaRow}>
          <SmartLink href="/contact" className={s.ctaBtn}>Book a campus visit</SmartLink>
          <SmartLink href="/contact" className={s.ctaGhost}>Contact the school</SmartLink>
        </div>
      </section>
    </>
  );
}

export default function DiscoverJGU() {
  return <PageRenderer id="discover-jgu" styles={styles} before={<Before s={styles} />} after={<After s={styles} />} />;
}