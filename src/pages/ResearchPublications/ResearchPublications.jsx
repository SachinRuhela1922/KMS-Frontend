import PageRenderer from '../../components/common/PageRenderer.jsx';
import styles from './ResearchPublications.module.css';

// Page: /research-publications
// TEXT / CONTENT: Admin Panel -> Pages -> this page   (default text: src/data/pages/)
// DESIGN: ResearchPublications.module.css (applies to this page only)
export default function ResearchPublications() {
  return <PageRenderer id="research-publications" styles={styles} />;
}
