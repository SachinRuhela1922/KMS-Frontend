import PageRenderer from '../../components/common/PageRenderer.jsx';
import styles from './CareerEmployability.module.css';

// Page: /career-employability
// TEXT / CONTENT: Admin Panel -> Pages -> this page   (default text: src/data/pages/)
// DESIGN: CareerEmployability.module.css (applies to this page only)
export default function CareerEmployability() {
  return <PageRenderer id="career-employability" styles={styles} />;
}
