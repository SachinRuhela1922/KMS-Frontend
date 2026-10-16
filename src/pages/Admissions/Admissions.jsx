import PageRenderer from '../../components/common/PageRenderer.jsx';
import styles from './Admissions.module.css';

// Page: /admissions
// TEXT / CONTENT: Admin Panel -> Pages -> this page   (default text: src/data/pages/)
// DESIGN: Admissions.module.css (applies to this page only)
export default function Admissions() {
  return <PageRenderer id="admissions" styles={styles} />;
}
