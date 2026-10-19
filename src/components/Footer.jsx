import React from 'react';
import { Link } from 'react-router-dom';
import OrbetexLogo from './OrbetexLogo';
import { siteConfig } from '../config/site.config';
import styles from './Footer.module.css';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>

        {/* Brand column */}
        <div className={styles.brand}>
          <OrbetexLogo variant="footer" size={36} showText={true} />
          <p className={styles.brandDesc}>
            A personal research hub publishing research notes and scientific findings
            in machine learning, NLP, and cognitive science.
          </p>
        </div>

        {/* Navigation columns */}
        <div className={styles.cols}>
          <nav aria-label="Footer pages">
            <h3 className={styles.colTitle}>Pages</h3>
            <ul role="list">
              {[
                { to: '/',         label: 'Home'    },
                { to: '/research', label: 'Research'},
                { to: '/about',    label: 'About'   },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className={styles.footerLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="External links">
            <h3 className={styles.colTitle}>Connect</h3>
            <ul role="list">
              {siteConfig.links.googleScholar && (
                <li><a href={siteConfig.links.googleScholar} className={styles.footerLink} target="_blank" rel="noopener noreferrer">Google Scholar</a></li>
              )}
              {siteConfig.links.github && (
                <li><a href={siteConfig.links.github} className={styles.footerLink} target="_blank" rel="noopener noreferrer">GitHub</a></li>
              )}
              {siteConfig.links.linkedin && (
                <li><a href={siteConfig.links.linkedin} className={styles.footerLink} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              )}
              {siteConfig.email && (
                <li><a href={`mailto:${siteConfig.email}`} className={styles.footerLink}>Email</a></li>
              )}
            </ul>
          </nav>

        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          &copy; {YEAR} {siteConfig.name || 'Orbetex'}. Built with{' '}
          <span aria-label="love">♥</span> using React &amp; Vite.
        </p>

      </div>
    </footer>
  );
}
