import PageRenderer from '../../components/common/PageRenderer.jsx';
import styles from './CampusLife.module.css';

// Page: /campus-life
// TEXT / CONTENT: Admin Panel -> Pages -> this page   (default text: src/data/pages/)
// DESIGN: CampusLife.module.css (applies to this page only)
export default function CampusLife() {
  return <PageRenderer id="campus-life" styles={styles} />;
}
