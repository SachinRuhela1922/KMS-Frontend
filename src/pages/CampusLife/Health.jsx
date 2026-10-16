import PageRenderer from '../../components/common/PageRenderer.jsx';
import styles from './Health.module.css';

// Page: /campus-life/health
// TEXT / CONTENT: Admin Panel -> Pages -> this page   (default text: src/data/pages/)
// DESIGN: Health.module.css (applies to this page only)
export default function Health() {
  return <PageRenderer id="campus-life-health" styles={styles} />;
}
