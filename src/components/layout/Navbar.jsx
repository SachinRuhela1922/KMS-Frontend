import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useContent } from '../../context/ContentContext.jsx';
import { img, isInternal } from '../../lib/media.js';
import styles from './navbar.module.css';

const cx = (...names) => names.filter(Boolean).join(' ');
const linkClass = (base) => ({ isActive }) => cx(base, isActive && styles.active);

// internal path -> router NavLink (active state), external URL -> normal <a>
function ItemLink({ to, className, plainClass, children }) {
  if (isInternal(to)) {
    return (
      <NavLink to={to} className={className} end={to === '/'}>
        {children}
      </NavLink>
    );
  }
  return (
    <a href={to} className={plainClass} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function MenuItem({ item, expanded, onToggle }) {
  const hasDropdown = !!(item.children && item.children.length);

  return (
    <li className={cx(styles.item, hasDropdown && styles.hasDropdown, expanded && styles.expanded)}>
      <ItemLink to={item.path} className={linkClass(styles.link)} plainClass={styles.link}>
        {item.label}
      </ItemLink>

      {hasDropdown && (
        <>
          {/* + / - toggle, visible only on mobile */}
          <button type="button" className={styles.caret} onClick={onToggle} aria-label={`Toggle ${item.label} menu`}>
            {expanded ? '−' : '+'}
          </button>

          <ul className={styles.dropdown}>
            {item.children.map((child, i) => (
              <li key={`${child.path}-${i}`}>
                <ItemLink to={child.path} className={linkClass(styles.dropdownLink)} plainClass={styles.dropdownLink}>
                  {child.label}
                </ItemLink>
              </li>
            ))}
          </ul>
        </>
      )}
    </li>
  );
}

export default function Navbar({ onSearchToggle }) {
  const { pathname } = useLocation();
  const { settings, navMenu } = useContent();
  const isHome = pathname === '/';

  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(null); // label of the open mobile accordion
  const [scrolled, setScrolled] = useState(false);

  // red background after scrolling (home page only)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close the mobile menu whenever the page changes
  useEffect(() => {
    setMenuOpen(false);
    setExpanded(null);
  }, [pathname]);

  const headerClass = cx(styles.header, !isHome && styles.inner, isHome && scrolled && styles.scrolled);

  return (
    <header className={headerClass}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>
          <img src={img(isHome ? settings.logoWhite : settings.logoBlue)} alt={settings.logoAlt || 'Logo'} />
        </Link>

        <nav className={cx(styles.nav, menuOpen && styles.navOpen)}>
          <ul className={styles.menu}>
            {navMenu.map((item, idx) => (
              <MenuItem
                key={`${item.path}-${idx}`}
                item={item}
                expanded={expanded === item.label}
                onToggle={() => setExpanded(expanded === item.label ? null : item.label)}
              />
            ))}
          </ul>

          {settings.applyLabel && (
            <a href={settings.applyUrl} target="_blank" rel="noopener noreferrer" className={styles.apply}>
              {settings.applyLabel}
            </a>
          )}
        </nav>

        <div className={styles.actions}>
          {settings.searchEnabled !== false && (
            <button type="button" className={styles.searchBtn} onClick={onSearchToggle} aria-label="Search">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          )}
          <button
            type="button"
            className={cx(styles.burger, menuOpen && styles.burgerOpen)}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
