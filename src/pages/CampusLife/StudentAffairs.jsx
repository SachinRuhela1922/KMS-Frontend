import PageRenderer from '../../components/common/PageRenderer.jsx';
import styles from './StudentAffairs.module.css';

// Page: /campus-life/student-affairs
// TEXT / CONTENT: Admin Panel -> Pages -> this page   (default text: src/data/pages/)
// DESIGN: StudentAffairs.module.css (applies to this page only)
export default function StudentAffairs() {
  return <PageRenderer id="campus-life-student-affairs" styles={styles} />;
}
