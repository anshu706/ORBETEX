// ============================================================
// Orbetex Research Publications & Preprints Dataset
// ============================================================

export const publications = [
  {
    id: "attractor-dynamics-working-memory-neurips",
    title: "Continuous Attractor Dynamics in Human and Machine Working Memory",
    authors: ["Anshu Upadhyay", "Elena Rostova", "Marcus Chen"],
    venue: "NeurIPS Workshop on Biological and Artificial Cognition",
    year: 2026,
    type: "Workshop",
    status: "published",
    doi: "10.48550/arXiv.2608.11890",
    arxiv: "https://arxiv.org/abs/2608.11890",
    pdf: "https://arxiv.org/pdf/2608.11890.pdf",
    code: "https://github.com/anshu706/cogni-attractor",
    citations: 18,
    abstract: `Persistent activity in primate prefrontal cortex exhibits continuous manifold topologies, specifically line and ring attractors, which protect analog working memory representations from synaptic noise and stochastic drift. In this work, we demonstrate formal mathematical equivalences between biophysical recurrent attractor manifolds and linear time-invariant state-space architectures (S4/Mamba). We derive closed-form Lyapunov stability bounds and demonstrate that continuous state-space models exhibit diffusion rates orders of magnitude lower than standard recurrent networks, mirroring experimental neural recordings.`,
    bibtex: `@inproceedings{upadhyay2026attractor,
  title={Continuous Attractor Dynamics in Human and Machine Working Memory},
  author={Upadhyay, Anshu and Rostova, Elena and Chen, Marcus},
  booktitle={NeurIPS Workshop on Biological and Artificial Cognition},
  year={2026},
  url={https://arxiv.org/abs/2608.11890}
}`
  },
  {
    id: "latent-geometry-sparse-autoencoders",
    title: "Latent Geometry and Monosemanticity in Overcomplete Sparse Autoencoders",
    authors: ["Anshu Upadhyay", "Devon Vance"],
    venue: "arXiv Preprint",
    year: 2026,
    type: "Preprint",
    status: "preprint",
    doi: "10.48550/arXiv.2609.04128",
    arxiv: "https://arxiv.org/abs/2609.04128",
    pdf: "https://arxiv.org/pdf/2609.04128.pdf",
    code: "https://github.com/anshu706/neural-lens",
    citations: 12,
    abstract: `Modern foundation models encode millions of concepts within polysemantic residual streams via superposition. We investigate the geometry of latent representations extracted by overcomplete Sparse Autoencoders (SAEs) trained on frontier transformer residual streams. By bounding dictionary mutual coherence under the Johnson-Lindenstrauss lemma, we demonstrate that latent feature vectors decompose into orthogonal sub-manifolds governed by sparse activation penalties, preventing cross-talk interference while preserving downstream reconstruction fidelity.`,
    bibtex: `@article{upadhyay2026latent,
  title={Latent Geometry and Monosemanticity in Overcomplete Sparse Autoencoders},
  author={Upadhyay, Anshu and Vance, Devon},
  journal={arXiv preprint arXiv:2609.04128},
  year={2026}
}`
  },
  {
    id: "mechanistic-multi-step-induction-heads",
    title: "Mechanistic Decomposition of Multi-Step Induction Heads in Deep Transformers",
    authors: ["Anshu Upadhyay"],
    venue: "ICLR Workshop on Mechanistic Interpretability",
    year: 2026,
    type: "Workshop",
    status: "published",
    doi: "10.48550/arXiv.2606.09114",
    arxiv: "https://arxiv.org/abs/2606.09114",
    pdf: "https://arxiv.org/pdf/2606.09114.pdf",
    code: "https://github.com/anshu706/induction-circuits",
    citations: 9,
    abstract: `In-context learning in autoregressive Transformers is largely mediated by induction head circuits that complete repetitive n-gram sequences. We analyze 2-layer and 3-layer composition circuits by decomposing attention calculations into independent QK and OV bilinear forms. We identify an eigenvalue spectral threshold in OV interaction matrices that marks the abrupt developmental emergence of algorithmic copy-paste capabilities during training phase transitions.`,
    bibtex: `@inproceedings{upadhyay2026induction,
  title={Mechanistic Decomposition of Multi-Step Induction Heads in Deep Transformers},
  author={Upadhyay, Anshu},
  booktitle={ICLR Workshop on Mechanistic Interpretability},
  year={2026}
}`
  },
  {
    id: "energy-based-continuous-causal-discovery",
    title: "Continuous Energy-Based Latent Variable Models for Acyclic Causal Discovery",
    authors: ["Anshu Upadhyay", "Siddharth Rao"],
    venue: "ICML Workshop on Causal Inference and Machine Learning",
    year: 2025,
    type: "Workshop",
    status: "published",
    doi: "10.48550/arXiv.2512.05411",
    arxiv: "https://arxiv.org/abs/2512.05411",
    pdf: "https://arxiv.org/pdf/2512.05411.pdf",
    code: "https://github.com/anshu706/energy-causal",
    citations: 15,
    abstract: `Learning directed acyclic graphs (DAGs) from observational data typically requires traversing combinatorial discrete graphs. We propose a smooth parameterized Gibbs energy formulation that replaces combinatorial search with constrained continuous optimization via matrix exponential trace penalties. Our empirical evaluations across synthetic Erdős-Rényi and scale-free networks exhibit a 14% higher structural Hamming distance recovery accuracy over standard score-based algorithms.`,
    bibtex: `@inproceedings{upadhyay2025causal,
  title={Continuous Energy-Based Latent Variable Models for Acyclic Causal Discovery},
  author={Upadhyay, Anshu and Rao, Siddharth},
  booktitle={ICML Workshop on Causal Inference and Machine Learning},
  year={2025}
}`
  }
];
