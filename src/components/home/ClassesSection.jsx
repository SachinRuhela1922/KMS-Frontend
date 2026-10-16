import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext.jsx';
import ClassPicker from '../classes/ClassPicker.jsx';
import { groupByStage, classPath } from '../../lib/classes.js';
import styles from './ClassesSection.module.css';

// Home page section: dropdown of all classes + stage cards (Play Group -> Class 12)
export default function ClassesSection() {
  const { classes } = useContent();
  const items = classes?.items || [];
  if (!items.length) return null;
  return (
    <section className={styles.section} id="classes">
      <div className="container">
        <div className={styles.head}>
          <span className={styles.badge}>{classes.board} · Session {classes.session}</span>
          <h2>{classes.title}</h2>
          <p>{classes.intro}</p>
        </div>
        <ClassPicker items={items} placeholder={classes.placeholder} />
        <div className={styles.grid}>
          {groupByStage(items).map((g) => (
            <div className={styles.card} key={g.stage}>
              <h3>{g.stage}</h3>
              <ul>
                {g.list.map((c) => (
                  <li key={c.slug}>
                    <Link to={classPath(c)}>
                      {c.name}
                      <small>{c.strength} students</small>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.cta}>
          <Link to="/classes" className={styles.btn}>View all class details</Link>
        </div>
      </div>
    </section>
  );
}
