import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import StatusBadge from '../components/StatusBadge';
import styles from './Projects.module.css';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(projects.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="page-wrapper">
      <header className={styles.header}>
        <div className="container">
          <span className={styles.preTitle}>Prototypes &amp; Systems</span>
          <h1 className={styles.title}>Research Engineering Projects</h1>
          <p className={styles.lead}>
            Open-source toolkits, mechanistic interpretability suites, analog simulators,
            and custom hardware artifacts built to ground theoretical models in empirical reality.
          </p>

          <div className={styles.categoryPills}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.pill} ${selectedCategory === cat ? styles.activePill : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.projectsGrid}>
            {filteredProjects.map(project => (
              <article key={project.id} className={styles.projectCard}>
                <div className={styles.cardTop}>
                  <span className={styles.projectCategory}>{project.category}</span>
                  <div className={styles.statusRow}>
                    <span className={styles.projectDate}>{project.date}</span>
                    <StatusBadge status={project.status} />
                  </div>
                </div>

                <h2 className={styles.projectTitle}>{project.title}</h2>
                <p className={styles.projectSummary}>{project.summary}</p>

                {project.highlights && (
                  <ul className={styles.highlightsList}>
                    {project.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}

                <div className={styles.techStack}>
                  {project.techStack.map(t => (
                    <span key={t} className={styles.techBadge}>{t}</span>
                  ))}
                </div>

                <div className={styles.cardActions}>
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionBtnPrimary}
                    >
                      GitHub Repo
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionBtnSecondary}
                    >
                      Live Prototype
                    </a>
                  )}
                  {project.links.paper && (
                    <Link to={project.links.paper} className={styles.paperLink}>
                      Read Research Note →
                    </Link>
                  )}
                  <button
                    className={styles.detailsBtn}
                    onClick={() => setActiveModalProject(project)}
                  >
                    Architecture Specs
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Architectural Specs Modal */}
      {activeModalProject && (
        <div
          className={styles.modalOverlay}
          onClick={() => setActiveModalProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.modalCategory}>{activeModalProject.category}</span>
                <h3 className={styles.modalTitle}>{activeModalProject.title}</h3>
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setActiveModalProject(null)}
                aria-label="Close dialog"
              >
                ×
              </button>
            </div>

            <div className={styles.modalBody}>
              <h4 className={styles.modalSubheading}>System Architecture &amp; Methodology</h4>
              <p className={styles.modalDescription}>
                {activeModalProject.description || activeModalProject.summary}
              </p>

              <h4 className={styles.modalSubheading}>Key Engineering Innovations</h4>
              <ul className={styles.modalHighlights}>
                {activeModalProject.highlights?.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>

              <h4 className={styles.modalSubheading}>Implementation Stack</h4>
              <div className={styles.modalTechStack}>
                {activeModalProject.techStack.map(t => (
                  <span key={t} className={styles.modalTechBadge}>{t}</span>
                ))}
              </div>
            </div>

            <div className={styles.modalFooter}>
              {activeModalProject.links.github && (
                <a
                  href={activeModalProject.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionBtnPrimary}
                >
                  View Code on GitHub
                </a>
              )}
              <button
                className={styles.actionBtnSecondary}
                onClick={() => setActiveModalProject(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
