import PageRenderer from '../../components/common/PageRenderer.jsx';
import styles from './AboutUs.module.css';

// Page: /about-us
// TEXT / CONTENT: Admin Panel -> Pages -> this page   (default text: src/data/pages/)
// DESIGN: AboutUs.module.css (applies to this page only)
export default function AboutUs() {
  return <PageRenderer id="about-us" styles={styles} />;
}
