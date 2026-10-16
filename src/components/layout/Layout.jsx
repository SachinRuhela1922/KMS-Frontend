import { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import SearchPopup from './SearchPopup.jsx';
import StickyApplyButton from './StickyApplyButton.jsx';
import Footer from './Footer.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import { useContent } from '../../context/ContentContext.jsx';

function setMeta(name, value) {
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

/**
 * Wraps every public page: Navbar + search popup on top, Footer at the bottom.
 * Pages render inside <Outlet /> (routes: App.jsx + src/pages/routes.jsx).
 */
export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => setSearchOpen((v) => !v);
  const { pathname } = useLocation();
  const { settings } = useContent();

  // go to the top of the page on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // site title / description / favicon come from the admin panel
  useEffect(() => {
    if (settings.siteTitle && pathname === '/') document.title = settings.siteTitle;
    if (settings.siteDescription) setMeta('description', settings.siteDescription);
    if (settings.favicon) {
      let link = document.head.querySelector('link[rel="icon"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = settings.favicon;
    }
  }, [settings.siteTitle, settings.siteDescription, settings.favicon, pathname]);

  return (
    <>
      <Navbar onSearchToggle={toggleSearch} />
      {settings.searchEnabled !== false && <SearchPopup open={searchOpen} onToggle={toggleSearch} />}
      <StickyApplyButton />

      <main style={{ minHeight: '60vh' }}>
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
