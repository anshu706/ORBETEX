import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { researchNotes } from '../data/researchNotes';
import StatusBadge from '../components/StatusBadge';
import TagChip from '../components/TagChip';
import styles from './Research.module.css';

export default function Research() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  
  const currentCategory = searchParams.get('category') || 'All';
  const currentStatus = searchParams.get('status') || 'All';
  const currentTag = searchParams.get('tag') || null;

  // Extract unique categories & tags
  const categories = useMemo(() => {
    const set = new Set(researchNotes.map(n => n.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, []);

  const allTags = useMemo(() => {
    const map = new Map();
    researchNotes.forEach(n => {
      n.tags?.forEach(t => map.set(t, (map.get(t) || 0) + 1));
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, []);

  // Filtered notes
  const filteredNotes = useMemo(() => {
    return researchNotes.filter(n => {
      // Category match
      if (currentCategory !== 'All' && n.category !== currentCategory) return false;
      // Status match
      if (currentStatus !== 'All' && n.status !== currentStatus) return false;
      // Tag match
      if (currentTag && !n.tags?.includes(currentTag)) return false;
      // Search text match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = n.title.toLowerCase().includes(q);
        const matchesSummary = n.summary.toLowerCase().includes(q);
        const matchesTags = n.tags?.some(t => t.toLowerCase().includes(q));
        const matchesCat = n.category?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary && !matchesTags && !matchesCat) return false;
      }
      return true;
    });
  }, [currentCategory, currentStatus, currentTag, searchQuery]);

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'All') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="page-wrapper">
      <header className={styles.header}>
        <div className="container">
          <span className={styles.preTitle}>Scientific Notebook</span>
          <h1 className={styles.title}>Research Notes &amp; Findings</h1>
          <p className={styles.lead}>
            Working notes, mathematical formulations, reproducibility scripts, and empirical observations
            from ongoing laboratory experiments in neural interpretability, cognitive dynamics, and physical systems.
          </p>

          {/* Search bar */}
          <div className={styles.searchWrapper}>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search working notes by keyword, math theorem, or tag..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search research notes"
            />
            {searchQuery && (
              <button
                className={styles.clearSearchBtn}
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </header>

      <section className={styles.contentSection}>
        <div className="container">
          {/* Filter bars */}
          <div className={styles.filtersBar}>
            {/* Category tabs */}
            <div className={styles.categoryPills}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`${styles.filterPill} ${currentCategory === cat ? styles.activePill : ''}`}
                  onClick={() => updateFilter('category', cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Status dropdown & active tag indicator */}
            <div className={styles.secondaryFilters}>
              <div className={styles.statusSelectWrapper}>
                <label htmlFor="status-select" className={styles.statusLabel}>Status:</label>
                <select
                  id="status-select"
                  className={styles.statusSelect}
                  value={currentStatus}
                  onChange={e => updateFilter('status', e.target.value)}
                >
                  <option value="All">All Stages</option>
                  <option value="published">Published</option>
                  <option value="preprint">Preprint</option>
                  <option value="in-progress">In Progress</option>
                  <option value="idea">Idea</option>
                </select>
              </div>

              {currentTag && (
                <div className={styles.activeTagPill}>
                  <span>Tag: <strong>#{currentTag}</strong></span>
                  <button onClick={() => updateFilter('tag', null)} aria-label="Remove tag filter">×</button>
                </div>
              )}
            </div>
          </div>

          {/* Tag cloud bar */}
          <div className={styles.tagCloudBar}>
            <span className={styles.tagCloudLabel}>Popular Tags:</span>
            <div className={styles.tagChips}>
              {allTags.slice(0, 10).map(([tag, count]) => (
                <button
                  key={tag}
                  className={`${styles.tagButton} ${currentTag === tag ? styles.activeTagButton : ''}`}
                  onClick={() => updateFilter('tag', currentTag === tag ? null : tag)}
                >
                  #{tag} <span className={styles.tagCount}>({count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Results count & clear */}
          <div className={styles.resultsMeta}>
            <span>Showing <strong>{filteredNotes.length}</strong> of {researchNotes.length} research notes</span>
            {(currentCategory !== 'All' || currentStatus !== 'All' || currentTag || searchQuery) && (
              <button className={styles.resetBtn} onClick={clearAllFilters}>
                Reset all filters
              </button>
            )}
          </div>

          {/* Notes Grid */}
          {filteredNotes.length > 0 ? (
            <div className={styles.notesGrid}>
              {filteredNotes.map(note => (
                <article key={note.id} className={styles.noteCard}>
                  <div className={styles.cardHeader}>
                    <StatusBadge status={note.status} />
                    <span className={styles.cardMeta}>{note.readingTime} · {note.date}</span>
                  </div>

                  <span className={styles.noteCategory}>{note.category}</span>

                  <h2 className={styles.noteTitle}>
                    <Link to={`/research/${note.slug}`}>{note.title}</Link>
                  </h2>

                  <p className={styles.noteSummary}>{note.summary}</p>

                  {note.mathSample && (
                    <div className={styles.mathBlock}>
                      <code>{note.mathSample}</code>
                    </div>
                  )}

                  <div className={styles.cardFooter}>
                    <div className={styles.tagsContainer}>
                      {note.tags.map(tag => (
                        <TagChip
                          key={tag}
                          tag={tag}
                          onClick={() => updateFilter('tag', tag)}
                        />
                      ))}
                    </div>
                    <Link to={`/research/${note.slug}`} className={styles.readBtn}>
                      Read Full Note →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3>No research notes match your criteria</h3>
              <p>Try clearing your active filters or searching for broader terms.</p>
              <button className={styles.clearFiltersBtn} onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
