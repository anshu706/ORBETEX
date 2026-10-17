import React, { useState } from 'react';
import { siteConfig } from '../config/site.config';
import styles from './Contact.module.css';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Research Collaboration',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
  };

  return (
    <div className="page-wrapper">
      <header className={styles.header}>
        <div className="container">
          <span className={styles.preTitle}>Communications</span>
          <h1 className={styles.title}>Contact &amp; Inquiries</h1>
          <p className={styles.lead}>
            Get in touch for academic collaborations, research discussions, paper reproduction questions,
            speaking engagements, or open-source hardware queries.
          </p>
        </div>
      </header>

      <div className="container">
        <div className={styles.layout}>
          {/* Contact Methods */}
          <div className={styles.infoCol}>
            <div className={styles.emailCard}>
              <span className={styles.cardLabel}>Direct Inquiries</span>
              <h2 className={styles.emailAddress}>{siteConfig.email}</h2>
              <div className={styles.emailActions}>
                <a href={`mailto:${siteConfig.email}`} className={styles.primaryBtn}>
                  Compose Email ↗
                </a>
                <button className={styles.secondaryBtn} onClick={handleCopyEmail}>
                  {copiedEmail ? '✓ Copied Address' : 'Copy Email'}
                </button>
              </div>
            </div>

            <div className={styles.channelsCard}>
              <h3 className={styles.channelsTitle}>Scholarly &amp; Developer Profiles</h3>
              <ul className={styles.channelsList}>
                <li>
                  <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                    <span className={styles.channelName}>GitHub</span>
                    <span className={styles.channelHandle}>@anshu706</span>
                  </a>
                </li>
                <li>
                  <a href={siteConfig.links.orcid} target="_blank" rel="noopener noreferrer">
                    <span className={styles.channelName}>ORCID</span>
                    <span className={styles.channelHandle}>0009-0004-8921-9311</span>
                  </a>
                </li>
                <li>
                  <a href={siteConfig.links.googleScholar} target="_blank" rel="noopener noreferrer">
                    <span className={styles.channelName}>Google Scholar</span>
                    <span className={styles.channelHandle}>Anshu Upadhyay</span>
                  </a>
                </li>
                <li>
                  <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
                    <span className={styles.channelName}>LinkedIn</span>
                    <span className={styles.channelHandle}>anshu-upadhyay</span>
                  </a>
                </li>
                <li>
                  <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer">
                    <span className={styles.channelName}>X (Twitter)</span>
                    <span className={styles.channelHandle}>@anshu_orbetex</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.noticeCard}>
              <h4 className={styles.noticeTitle}>Collaboration Guidelines</h4>
              <p className={styles.noticeText}>
                When inquiring about research collaborations or citing preprints, please include
                the specific manuscript DOI/slug and your institution. Code pull requests and reproduction
                issues are best opened directly on corresponding GitHub repositories.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Send a Dispatch</h2>
              <p className={styles.formSubtitle}>
                Inquiries are delivered directly to the research lab correspondence queue.
              </p>

              {submitted ? (
                <div className={styles.successBox}>
                  <div className={styles.successIcon}>✓</div>
                  <h3>Message Dispatched Successfully</h3>
                  <p>
                    Thank you for reaching out. We will review your correspondence and respond to{' '}
                    <strong>{formState.email}</strong> shortly.
                  </p>
                  <button
                    className={styles.resetFormBtn}
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', email: '', subject: 'Research Collaboration', message: '' });
                    }}
                  >
                    Send Another Dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Full Name / Institution *</label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. Dr. Jane Doe (University / Lab)"
                      className={styles.input}
                      value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="name@institution.edu"
                      className={styles.input}
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.label}>Subject / Inquiry Category</label>
                    <select
                      id="subject"
                      className={styles.select}
                      value={formState.subject}
                      onChange={e => setFormState({ ...formState, subject: e.target.value })}
                    >
                      <option value="Research Collaboration">Research Collaboration</option>
                      <option value="Paper Reproduction / Mathematical Critique">Paper Reproduction / Mathematical Critique</option>
                      <option value="Open Source Code & Hardware">Open Source Code &amp; Hardware</option>
                      <option value="Speaker / Seminar Invitation">Speaker / Seminar Invitation</option>
                      <option value="General Academic Inquiry">General Academic Inquiry</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>Message / Research Context *</label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      placeholder="Detail your inquiry, theoretical question, or proposed collaborative project..."
                      className={styles.textarea}
                      value={formState.message}
                      onChange={e => setFormState({ ...formState, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
