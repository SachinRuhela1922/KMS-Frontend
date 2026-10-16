import { Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '../context/ContentContext.jsx';
import PageRenderer from '../components/common/PageRenderer.jsx';
import { pageComponents } from './routes.jsx';
import styles from './AboutUs/AboutUs.module.css';

const norm = (p) => (String(p || '').replace(/\/+$/, '') || '/').toLowerCase();

export default function NotFound() {
  const { pathname } = useLocation();
  const { customPages, pageContent } = useContent();

  // a ready-made page whose link was changed in Admin -> Pages (keeps its own design)
  const id = Object.keys(pageContent || {}).find((k) => norm(pageContent[k]?.path) === norm(pathname));
  const Page = id ? pageComponents[id] : null;
  if (Page) {
    return (
      <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
        <Page />
      </Suspense>
    );
  }

  // pages created from Admin Panel -> New Pages
  const custom = (customPages || []).find((p) => norm(p.path) === norm(pathname));
  if (custom) return <PageRenderer data={custom} styles={styles} />;

  return (
    <section className="container py-5 text-center">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">Go to Home</Link>
    </section>
  );
}
