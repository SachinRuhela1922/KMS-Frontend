import PageRenderer from '../../components/common/PageRenderer.jsx';
import styles from './StudentLife.module.css';

// Page: /campus-life/student-life
// TEXT / CONTENT: Admin Panel -> Pages -> this page   (default text: src/data/pages/)
// DESIGN: StudentLife.module.css (applies to this page only)
export default function StudentLife() {
  return <PageRenderer id="campus-life-student-life" styles={styles} />;
}
