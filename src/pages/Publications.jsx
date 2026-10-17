import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { publications } from '../data/publications';
import BibtexModal from '../components/BibtexModal';
import styles from './Publications.module.css';

export default function Publications() {
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedAbstracts, setExpandedAbstracts] = useState({});
  const [modalBibtex, setModalBibtex] = useState(null);

  // Extract years & types
  const years = useMemo(() => {
    if (publications.length === 0) return ['All'];
    const set = new Set(publications.map(p => p.year.toString()));
    return ['All', ...Array.from(set).sort((a, b) => b - a)];
  }, []);

  const types = useMemo(() => {
    if (publications.length === 0) return ['All'];
    const set = new Set(publications.map(p => p.type).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered publications
  const filteredPubs = useMemo(() => {
    return publications.filter(p => {
      if (selectedYear !== 'All' && p.year.toString() !== selectedYear) return false;
      if (selectedType !== 'All' && p.type !== selectedType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesVenue = p.venue.toLowerCase().includes(q);
        const matchesAuthor = p.authors.some(a => a.toLowerCase().includes(q));
        const matchesAbstract = p.abstract?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesVenue && !matchesAuthor && !matchesAbstract) return false;
      }
      return true;
    });
  }, [selectedYear, selectedType, searchQuery]);

  const toggleAbstract = (id) => {
    setExpandedAbstracts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const totalCitations = publications.reduce((acc, p) => acc + (p.citations || 0), 0);

  const exportAllBibtex = () => {
    const all = publications.map(p => p.bibtex).filter(Boolean).join('\n\n');
    navigator.clipboard.writeText(all);
    alert('All publication BibTeX entries copied to clipboard!');
  };

  return (
    <div className="page-wrapper">
      <header className={styles.header}>
        <div className="container">
          <span className={styles.preTitle}>Scholarly Contributions</span>
          <h1 className={styles.title}>Publications &amp; Preprints</h1>
          <p className={styles.lead}>
            Peer-reviewed conference proceedings, journal articles, workshop papers, and technical manuscripts
            documenting scientific findings in machine learning, cognitive dynamics, and physical systems.
          </p>

          {/* Metrics ribbon (rendered when publications exist) */}
          {publications.length > 0 && (
            <div className={styles.metricsRibbon}>
              <div className={styles.metricItem}>
                <span className={styles.metricVal}>{publications.length}</span>
                <span className={styles.metricDesc}>Total Publications</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.metricItem}>
                <span className={styles.metricVal}>{totalCitations}+</span>
                <span className={styles.metricDesc}>Citations</span>
              </div>
              <div className={styles.metricDivider} />
              <div className={styles.exportWrapper}>
                <button className={styles.exportBtn} onClick={exportAllBibtex}>
                  Export All BibTeX (.bib)
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <section className={styles.contentSection}>
        <div className="container">
          {publications.length === 0 ? (
            <div className={styles.emptyState}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>📄</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
                No Publications Uploaded Yet
              </h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '540px', margin: '0 auto var(--space-6)', lineHeight: 1.7 }}>
                Personal researches, manuscripts, and preprints are currently being prepared.
                Once you add your papers to <code>src/data/publications.js</code>, they will appear here with automated BibTeX citation tools, metrics, and abstract viewers.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
                <Link
                  to="/research"
                  style={{
                    display: 'inline-block',
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    padding: '10px 22px',
                    borderRadius: 'var(--radius-full)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  Explore Research Notes →
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Controls bar */}
              <div className={styles.controlsBar}>
                <div className={styles.searchBox}>
                  <input
                    type="search"
                    className={styles.searchInput}
                    placeholder="Filter by title, author, venue, or keyword..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    aria-label="Filter publications"
                  />
                </div>

                <div className={styles.filterGroup}>
                  <div className={styles.filterItem}>
                    <label htmlFor="pub-type" className={styles.filterLabel}>Type:</label>
                    <select
                      id="pub-type"
                      className={styles.select}
                      value={selectedType}
                      onChange={e => setSelectedType(e.target.value)}
                    >
                      {types.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.filterItem}>
                    <label htmlFor="pub-year" className={styles.filterLabel}>Year:</label>
                    <select
                      id="pub-year"
                      className={styles.select}
                      value={selectedYear}
                      onChange={e => setSelectedYear(e.target.value)}
                    >
                      {years.map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Publications List */}
              <div className={styles.pubsList}>
                {filteredPubs.map(pub => {
                  const isExpanded = !!expandedAbstracts[pub.id];

                  return (
                    <article key={pub.id} className={styles.pubCard}>
                      <div className={styles.pubSide}>
                        <span className={styles.pubYear}>{pub.year}</span>
                        <span className={styles.pubTypeBadge}>{pub.type}</span>
                      </div>

                      <div className={styles.pubMain}>
                        <div className={styles.venueRow}>
                          <span className={styles.venueName}>{pub.venue}</span>
                          {pub.citations > 0 && (
                            <span className={styles.citationsBadge}>{pub.citations} citations</span>
                          )}
                        </div>

                        <h2 className={styles.pubTitle}>{pub.title}</h2>

                        <p className={styles.authorsRow}>
                          {pub.authors.map((a, i) => (
                            <span key={a} className={a.includes('Anshu Upadhyay') ? styles.highlightAuthor : ''}>
                              {a}{i < pub.authors.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </p>

                        {pub.abstract && (
                          <div className={styles.abstractWrapper}>
                            <p className={styles.abstractText}>
                              {isExpanded ? pub.abstract : `${pub.abstract.slice(0, 220)}...`}
                            </p>
                            <button
                              className={styles.expandAbstractBtn}
                              onClick={() => toggleAbstract(pub.id)}
                            >
                              {isExpanded ? 'Hide Abstract ▲' : 'Read Abstract ▼'}
                            </button>
                          </div>
                        )}

                        <div className={styles.pubFooter}>
                          <div className={styles.linksGroup}>
                            {pub.arxiv && (
                              <a href={pub.arxiv} target="_blank" rel="noopener noreferrer" className={styles.metaLink}>
                                arXiv
                              </a>
                            )}
                            {pub.doi && (
                              <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className={styles.metaLink}>
                                DOI
                              </a>
                            )}
                            {pub.code && (
                              <a href={pub.code} target="_blank" rel="noopener noreferrer" className={styles.metaLink}>
                                Source Code
                              </a>
                            )}
                          </div>

                          {pub.bibtex && (
                            <button
                              className={styles.citeButton}
                              onClick={() => setModalBibtex({ title: pub.title, bibtex: pub.bibtex })}
                            >
                              Cite (BibTeX)
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {filteredPubs.length === 0 && (
                <div className={styles.emptyState}>
                  <p>No publications found matching your search criteria.</p>
                  <button
                    className={styles.clearBtn}
                    onClick={() => {
                      setSelectedYear('All');
                      setSelectedType('All');
                      setSearchQuery('');
                    }}
                  >
                    Reset Search
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* BibTeX citation modal */}
      {modalBibtex && (
        <BibtexModal
          isOpen={true}
          onClose={() => setModalBibtex(null)}
          title={modalBibtex.title}
          bibtex={modalBibtex.bibtex}
        />
      )}
    </div>
  );
}
