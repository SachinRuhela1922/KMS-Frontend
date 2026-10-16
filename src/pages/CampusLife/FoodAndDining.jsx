import PageRenderer from '../../components/common/PageRenderer.jsx';
import styles from './FoodAndDining.module.css';

// Page: /campus-life/food-and-dining
// TEXT / CONTENT: Admin Panel -> Pages -> this page   (default text: src/data/pages/)
// DESIGN: FoodAndDining.module.css (applies to this page only)
export default function FoodAndDining() {
  return <PageRenderer id="campus-life-food-and-dining" styles={styles} />;
}
