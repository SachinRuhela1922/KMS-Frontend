import PageRenderer from '../../components/common/PageRenderer.jsx';
import styles from './GlobalLibrary.module.css';

// Page: /campus-life/global-library
// TEXT / CONTENT: Admin Panel -> Pages -> this page   (default text: src/data/pages/)
// DESIGN: GlobalLibrary.module.css (applies to this page only)
export default function GlobalLibrary() {
  return <PageRenderer id="campus-life-global-library" styles={styles} />;
}
