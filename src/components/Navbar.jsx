import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import OrbetexLogo from './OrbetexLogo';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { to: '/research', label: 'Research' },
  { to: '/about',    label: 'About'    },
];

export default function Navbar() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [scrolled,    setScrolled]    = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });

    const keyHandler = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', keyHandler);

    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('keydown', keyHandler);
    };
  }, []);

  // Close menu on route change
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <nav className={styles.inner} aria-label="Main navigation">
        <Link to="/" className={styles.brand} onClick={closeMenu} aria-label="Orbetex home">
          <OrbetexLogo variant="primary" size={38} showText={true} />
        </Link>

        {/* Desktop links */}
        <div className={styles.desktopActions}>
          <ul className={styles.navLinks} role="list">
            {NAV_LINKS.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/research/new" className={styles.writeNavBtn}>
            + Write Note
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {NAV_LINKS.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.active : ''}`
                }
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Link to="/research/new" className={styles.mobileWriteBtn} onClick={closeMenu}>
          + Write Research Note
        </Link>
      </div>
    </header>
  );
}
