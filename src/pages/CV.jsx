import React from 'react';
import { Helmet } from 'react-helmet-async';
import { cvData } from '../data/cvData';
import { publications } from '../data/publications';
import { siteConfig } from '../config/site.config';
import styles from './CV.module.css';

export default function CV() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>{`Curriculum Vitae — ${cvData.personal.name} | ${siteConfig.brandName}`}</title>
        <meta
          name="description"
          content={`Academic curriculum vitae of ${cvData.personal.name}, AI Researcher & Systems Engineer. Education, appointments, publications, grants, and technical competencies.`}
        />
        <meta property="og:title" content={`Curriculum Vitae — ${cvData.personal.name}`} />
        <meta
          property="og:description"
          content={`Academic CV of ${cvData.personal.name}, AI Researcher & Systems Engineer.`}
        />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`${siteConfig.siteUrl}/cv`} />
      </Helmet>

      <div className={styles.actionBar}>
        <div className="container">
          <div className={styles.actionInner}>
            <span className={styles.actionStatus}>Curriculum Vitae — Last Updated October 2026</span>
            <button className={styles.printBtn} onClick={handlePrint}>
              ⎙ Print / Save as PDF
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <main className={styles.cvDocument} id="cv-content">
          {/* Header */}
          <header className={styles.cvHeader}>
            <h1 className={styles.name}>{cvData.personal.name}</h1>
            <p className={styles.titleAffiliation}>
              {cvData.personal.title} · {cvData.personal.institution}
            </p>
            <div className={styles.contactRow}>
              <span>Email: <a href={`mailto:${cvData.personal.email}`}>{cvData.personal.email}</a></span>
              <span>•</span>
              <span>GitHub: <a href={cvData.personal.github} target="_blank" rel="noopener noreferrer">github.com/anshu706</a></span>
              <span>•</span>
              <span>ORCID: <a href="https://orcid.org/0009-0004-8921-9311" target="_blank" rel="noopener noreferrer">{cvData.personal.orcid}</a></span>
              <span>•</span>
              <span>Scholar: <a href={cvData.personal.scholar} target="_blank" rel="noopener noreferrer">Google Scholar</a></span>
            </div>
          </header>

          {/* Education */}
          <section className={styles.cvSection}>
            <h2 className={styles.sectionHeading}>Education</h2>
            <div className={styles.entriesList}>
              {cvData.education.map((edu, idx) => (
                <div key={idx} className={styles.entry}>
                  <div className={styles.entryHeader}>
                    <h3 className={styles.entryTitle}>{edu.degree}</h3>
                    <span className={styles.entryPeriod}>{edu.year}</span>
                  </div>
                  <div className={styles.entrySub}>{edu.institution}</div>
                  <p className={styles.entryDetails}>{edu.details}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className={styles.cvSection}>
            <h2 className={styles.sectionHeading}>Research &amp; Professional Appointments</h2>
            <div className={styles.entriesList}>
              {cvData.experience.map((exp, idx) => (
                <div key={idx} className={styles.entry}>
                  <div className={styles.entryHeader}>
                    <h3 className={styles.entryTitle}>{exp.role}</h3>
                    <span className={styles.entryPeriod}>{exp.period}</span>
                  </div>
                  <div className={styles.entrySub}>{exp.organization}</div>
                  <p className={styles.entryDetails}>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Publications */}
          <section className={styles.cvSection}>
            <h2 className={styles.sectionHeading}>Peer-Reviewed Publications &amp; Preprints</h2>
            {publications.length > 0 ? (
              <ol className={styles.pubsNumberedList}>
                {publications.map((pub, idx) => (
                  <li key={pub.id || idx} className={styles.pubEntry}>
                    <span className={styles.pubAuthors}>
                      {pub.authors.map((a, i) => (
                        <strong key={a} className={a.includes('Anshu Upadhyay') ? styles.selfAuthor : ''}>
                          {a}{i < pub.authors.length - 1 ? ', ' : ''}
                        </strong>
                      ))}
                    </span>
                    {' '}({pub.year}). &ldquo;{pub.title}&rdquo;. In <em>{pub.venue}</em>.
                    {pub.doi && ` DOI: ${pub.doi}.`}
                    {pub.citations > 0 && ` [Citations: ${pub.citations}]`}
                  </li>
                ))}
              </ol>
            ) : (
              <p className={styles.entryDetails} style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                Manuscripts currently in preparation. Forthcoming publications will be cataloged here.
              </p>
            )}
          </section>

          {/* Honors & Awards */}
          <section className={styles.cvSection}>
            <h2 className={styles.sectionHeading}>Honors, Fellowships &amp; Awards</h2>
            <div className={styles.entriesList}>
              {cvData.honorsAndAwards.map((award, idx) => (
                <div key={idx} className={styles.entry}>
                  <div className={styles.entryHeader}>
                    <h3 className={styles.entryTitle}>{award.title}</h3>
                    <span className={styles.entryPeriod}>{award.year}</span>
                  </div>
                  <div className={styles.entrySub}>{award.organization}</div>
                  {award.note && <p className={styles.entryDetails}>{award.note}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* Grants */}
          {cvData.grants && (
            <section className={styles.cvSection}>
              <h2 className={styles.sectionHeading}>Research Grants &amp; Sponsored Funding</h2>
              <div className={styles.entriesList}>
                {cvData.grants.map((grant, idx) => (
                  <div key={idx} className={styles.entry}>
                    <div className={styles.entryHeader}>
                      <h3 className={styles.entryTitle}>{grant.title} ({grant.amount})</h3>
                      <span className={styles.entryPeriod}>{grant.period}</span>
                    </div>
                    <div className={styles.entrySub}>{grant.funder} — Role: {grant.role}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Teaching */}
          {cvData.teaching && (
            <section className={styles.cvSection}>
              <h2 className={styles.sectionHeading}>Teaching &amp; Mentorship</h2>
              <div className={styles.entriesList}>
                {cvData.teaching.map((t, idx) => (
                  <div key={idx} className={styles.entry}>
                    <div className={styles.entryHeader}>
                      <h3 className={styles.entryTitle}>{t.course}</h3>
                      <span className={styles.entryPeriod}>{t.term}</span>
                    </div>
                    <div className={styles.entrySub}>{t.role}</div>
                    <p className={styles.entryDetails}>{t.duties}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technical Skills */}
          <section className={styles.cvSection}>
            <h2 className={styles.sectionHeading}>Technical &amp; Scientific Competencies</h2>
            <div className={styles.skillsGrid}>
              <div>
                <strong>Languages:</strong> {cvData.skills.languages.join(', ')}
              </div>
              <div>
                <strong>Frameworks &amp; Toolkits:</strong> {cvData.skills.frameworks.join(', ')}
              </div>
              <div>
                <strong>Hardware &amp; Instruments:</strong> {cvData.skills.hardware.join(', ')}
              </div>
              <div>
                <strong>Theoretical Domains:</strong> {cvData.skills.domains.join(', ')}
              </div>
            </div>
          </section>

          {/* Service */}
          {cvData.service && (
            <section className={styles.cvSection}>
              <h2 className={styles.sectionHeading}>Academic &amp; Community Service</h2>
              <ul className={styles.serviceList}>
                {cvData.service.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
