import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContent } from './context/ContentContext.jsx';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Classes from './pages/Classes/Classes.jsx';
import NotFound from './pages/NotFound.jsx';
import pageRoutes, { pageId } from './pages/routes.jsx';
// admin panel is loaded only when /admin is opened (keeps the public site bundle small)
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'));

const norm = (p) => (String(p || '').replace(/\/+$/, '') || '/').toLowerCase();

// If the page's link was changed in Admin -> Pages, the old address redirects to the new one.
function PageGate({ path, Component }) {
  const { pageContent } = useContent();
  const target = pageContent?.[pageId(path)]?.path;
  if (typeof target === 'string' && target.startsWith('/') && norm(target) !== norm(path)) {
    return <Navigate to={target} replace />;
  }
  return <Component />;
}

export default function App() {
  return (
    <Routes>
      {/* Admin panel (no site navbar / footer) */}
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<div className="site-loader"><span /></div>}>
            <AdminApp />
          </Suspense>
        }
      />

      {/* Public site */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* Classes: Play Group -> Class 12 (data: Admin -> School -> Classes) */}
        <Route path="/classes" element={<Classes />} />
        <Route path="/classes/:slug" element={<Classes />} />
        {/* Every inner page is its own file - list is in src/pages/routes.jsx */}
        {pageRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<PageGate path={path} Component={Component} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
