import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../config/site.config';
import styles from './About.module.css';

export default function About() {
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>{`About the Researcher & Lab — ${siteConfig.brandName}`}</title>
        <meta
          name="description"
          content={`Biographical background, core research pillars, scientific philosophy, and academic collaborations of ${siteConfig.name} at ${siteConfig.affiliation}.`}
        />
        <meta property="og:title" content={`About ${siteConfig.name} — ${siteConfig.brandName}`} />
        <meta
          property="og:description"
          content={`Biographical background and research agenda of ${siteConfig.name} at ${siteConfig.affiliation}.`}
        />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`${siteConfig.siteUrl}/about`} />
      </Helmet>

      <header className={styles.header}>
        <div className="container">
          <span className={styles.preTitle}>Researcher Dossier</span>
          <h1 className={styles.title}>About the Researcher &amp; Lab</h1>
          <p className={styles.lead}>
            Investigating mathematical mechanics in deep learning systems, continuous cognitive
            attractors, and decentralized physical computing at Orbetex Research Lab.
          </p>
        </div>
      </header>

      <div className="container">
        <div className={styles.layout}>
          {/* Main Dossier Content */}
          <main className={styles.main}>
            {/* Biography */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Biographical Statement</h2>
              <div className={styles.prose}>
                <p>
                  I am <strong>Anshu Upadhyay</strong>, an artificial intelligence researcher and systems engineer.
                  My intellectual agenda centers on demystifying the latent representations of high-dimensional neural
                  networks and building formal bridges between biological cognitive dynamics and contemporary computational architectures.
                </p>
                <p>
                  At <strong>Orbetex Research Lab</strong>, our investigative program focuses on the mechanistic interpretability
                  of foundation models via dictionary learning and sparse autoencoders, continuous attractor manifolds for stable
                  working memory, and the development of energy-autonomous hardware prototypes for decentralized communication.
                </p>
              </div>
            </section>

            {/* Core Research Pillars */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Investigative Pillars</h2>
              <div className={styles.pillarsGrid}>
                <div className={styles.pillarCard}>
                  <div className={styles.pillarNumber}>01</div>
                  <h3 className={styles.pillarTitle}>Mechanistic Interpretability &amp; Sparse Dictionaries</h3>
                  <p className={styles.pillarDesc}>
                    Transformer activation vectors exhibit rampant polysemantic superposition. We apply overcomplete
                    sparse autoencoders (SAEs) and geometric probing to isolate monosemantic circuits, uncovering how concepts
                    decompose into orthogonal sub-manifolds governed by mutual coherence bounds.
                  </p>
                </div>

                <div className={styles.pillarCard}>
                  <div className={styles.pillarNumber}>02</div>
                  <h3 className={styles.pillarTitle}>Continuous Attractors &amp; State-Space Dynamics</h3>
                  <p className={styles.pillarDesc}>
                    Biological working memory in cortical circuits resists thermal and synaptic noise through continuous
                    line and ring attractors. We formalize mathematical equivalences between recurrent cortical attractors
                    and linear time-invariant state-space models (S4/Mamba), analyzing drift correction and diffusion rates.
                  </p>
                </div>

                <div className={styles.pillarCard}>
                  <div className={styles.pillarNumber}>03</div>
                  <h3 className={styles.pillarTitle}>Physical Computing &amp; Autonomous Hardware</h3>
                  <p className={styles.pillarDesc}>
                    Computation does not exist solely in cloud virtualization. We engineer ultra-low-power Maximum Power Point Tracking (MPPT)
                    solar harvesters, software-defined radio (SDR) beamformers, and decentralized mesh protocols capable of long-term
                    autonomous sensor telemetry.
                  </p>
                </div>
              </div>
            </section>

            {/* Research Principles */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Scientific Principles</h2>
              <ul className={styles.principlesList}>
                <li>
                  <strong>Mathematical Falsifiability:</strong> Every empirical intuition must be bounded by closed-form analysis,
                  spectral bounds, or Lyapunov stability criteria before broad extrapolation.
                </li>
                <li>
                  <strong>Radical Openness &amp; Reproducibility:</strong> All experimental scripts, weights, dictionary checkpoints,
                  and board schematics are published under open permissive licenses without paywalls.
                </li>
                <li>
                  <strong>Hardware Grounding:</strong> Software architectures must consider thermodynamic and energetic constraints
                  of physical execution substrates.
                </li>
              </ul>
            </section>

            {/* Laboratory Workbench & Compute Infrastructure */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Laboratory Infrastructure</h2>
              <div className={styles.setupGrid}>
                <div className={styles.setupCard}>
                  <h3 className={styles.setupTitle}>Deep Learning &amp; Simulation</h3>
                  <ul className={styles.setupList}>
                    <li>Multi-GPU workstations with PyTorch, JAX, TransformerLens, and CUDA acceleration</li>
                    <li>Automated SAE training pipelines tracking 100k+ sparse dictionary latent features</li>
                    <li>Numerical dynamical systems simulators for high-dimensional ODE integration</li>
                  </ul>
                </div>

                <div className={styles.setupCard}>
                  <h3 className={styles.setupTitle}>Embedded Hardware &amp; RF</h3>
                  <ul className={styles.setupList}>
                    <li>Digital storage oscilloscopes, logic analyzers, and programmable DC electronic loads</li>
                    <li>HackRF One &amp; RTL-SDR software-defined radio transceivers for ISM spectrum analysis</li>
                    <li>Custom PCB prototyping via KiCad, STM32 ARM Cortex-M microcontrollers, and solar test fixtures</li>
                  </ul>
                </div>
              </div>
            </section>
          </main>

          {/* Quick Info Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <div className={styles.profileHeader}>
                <div className={styles.avatarSquircle}>
                  AU
                </div>
                <div>
                  <h3 className={styles.profileName}>{siteConfig.name}</h3>
                  <span className={styles.profileTitle}>{siteConfig.title}</span>
                </div>
              </div>

              <div className={styles.profileDivider} />

              <dl className={styles.profileMeta}>
                <dt>Affiliation</dt>
                <dd>{siteConfig.affiliation}</dd>
                <dt>Location</dt>
                <dd>{siteConfig.location}</dd>
                <dt>Email</dt>
                <dd><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></dd>
                <dt>ORCID</dt>
                <dd><a href="https://orcid.org/0009-0004-8921-9311" target="_blank" rel="noopener noreferrer">0009-0004-8921-9311</a></dd>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
