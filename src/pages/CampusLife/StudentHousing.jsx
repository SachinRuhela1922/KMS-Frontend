import PageRenderer from '../../components/common/PageRenderer.jsx';
import styles from './StudentHousing.module.css';

// Page: /campus-life/student-housing
// TEXT / CONTENT: Admin Panel -> Pages -> this page   (default text: src/data/pages/)
// DESIGN: StudentHousing.module.css (applies to this page only)
export default function StudentHousing() {
  return <PageRenderer id="campus-life-student-housing" styles={styles} />;
}
