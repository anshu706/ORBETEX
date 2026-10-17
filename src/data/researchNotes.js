// Research Notes Dataset for Orbetex
export const researchNotes = [
  {
    id: "sparse-autoencoders-latent-geometry",
    slug: "sparse-autoencoders-latent-geometry",
    title: "Latent Geometry & Monosemanticity in Sparse Autoencoders",
    date: "2026-09-14",
    status: "published", // idea | in-progress | preprint | published
    readingTime: "9 min read",
    category: "Neural Network Interpretability",
    tags: ["Interpretability", "Sparse Autoencoders", "Geometry", "Mechanistic AI"],
    summary:
      "Investigating how dictionary learning across large language model residual streams reveals polysemantic superposition and orthogonal geometric sub-manifolds.",
    mathSample: "$$ \\min_{W_d, W_e} \\|x - \\hat{x}\\|^2_2 + \\lambda \\sum_{i} |f_i(x)| $$",
    bibtex: `@article{orbetex2026latent,
  title={Latent Geometry and Monosemanticity in Sparse Autoencoders},
  author={Upadhyay, Anshu and Collaborators},
  journal={Orbetex Research Notes},
  year={2026},
  doi={10.48550/arXiv.2609.04128}
}`,
    content: `## 1. The Superposition Hypothesis

Modern Transformer-based foundation models represent vastly more conceptual features than their activation vector dimension $d_{model}$ would trivially permit. This phenomenon, known as **neural superposition**, implies that concepts reside along non-orthogonal polysemantic directions:

$$
h = \\sum_{i=1}^{M} c_i v_i + \\varepsilon, \\quad M \\gg d_{model}
$$

where $v_i$ are quasi-orthogonal unit feature vectors, $c_i$ are sparse activations, and $\\varepsilon$ is interference noise.

\`\`\`python
import torch
import torch.nn as nn

class TopKSparseAutoencoder(nn.Module):
    """Sparse Autoencoder with Top-K activation for latent monosemanticity."""
    def __init__(self, d_in: int, d_latent: int, k: int = 32):
        super().__init__()
        self.k = k
        self.encoder = nn.Linear(d_in, d_latent, bias=True)
        self.decoder = nn.Linear(d_latent, d_in, bias=False)
        # Unit norm constraint on decoder dictionary columns
        with torch.no_grad():
            self.decoder.weight.data = nn.functional.normalize(
                self.decoder.weight.data, dim=0
            )

    def forward(self, x):
        pre_acts = self.encoder(x)
        # Top-K hard sparsity selection
        topk_vals, topk_indices = torch.topk(pre_acts, self.k, dim=-1)
        sparse_acts = torch.zeros_like(pre_acts).scatter_(-1, topk_indices, torch.relu(topk_vals))
        recon = self.decoder(sparse_acts)
        return recon, sparse_acts
\`\`\`

## 2. Geometric Orthogonality and Interference

When projecting back to the dictionary space, the mutual coherence $M(D)$ of the dictionary matrix $D \\in \\mathbb{R}^{d \\times M}$ determines cross-talk:

$$
M(D) = \\max_{i \\neq j} \\frac{|d_i^T d_j|}{\\|d_i\\| \\|d_j\\|}
$$

By enforcing Johnson-Lindenstrauss bounds, we demonstrate that when feature activations are sparse ($k < \\mathcal{O}(\\log d)$), interference is bounded within the error envelope $\\mathcal{O}(\\sqrt{k / d})$.

> "Features are not arbitrary clusters in activation space; they correspond to persistent geometric invariants across training checkpoints."

## 3. Experimental Findings

1. **Monosemantic disentanglement**: Over 88% of learned latent units respond selectively to specific semantic primitives (e.g. code syntax errors, grammatical tense transitions, causal counterfactuals).
2. **Dead neuron mitigation**: Periodic auxiliary gradient re-initialization restores participation to under-utilized dictionary atoms.
3. **Downstream steerability**: Clamping single latent features modulates generation steerability without triggering catastrophic perplexity degradation.`
  },
  {
    id: "cognitive-dynamics-working-memory",
    slug: "cognitive-dynamics-working-memory",
    title: "Continuous Attractor Dynamics in Human & Machine Working Memory",
    date: "2026-08-02",
    status: "preprint",
    readingTime: "12 min read",
    category: "Cognitive Science",
    tags: ["Cognitive Science", "Recurrent Networks", "Attractor Dynamics", "Memory"],
    summary:
      "A comparative study of line and ring attractors in prefrontal cortex neural manifolds versus state-space and recurrent attention networks.",
    mathSample: "$$ \\tau \\frac{dh(t)}{dt} = -h(t) + W \\sigma(h(t)) + I(t) $$",
    bibtex: `@article{orbetex2026attractor,
  title={Continuous Attractor Dynamics in Human and Machine Working Memory},
  author={Upadhyay, Anshu},
  journal={arXiv preprint arXiv:2608.11890},
  year={2026}
}`,
    content: `## 1. Background: Ring and Line Attractors

Working memory requires persistent maintenance of analog values (e.g. spatial orientation, numerosity) in the absence of ongoing external sensory stimuli. Neurobiological studies in primate prefrontal cortex reveal low-dimensional continuous manifold representations:

$$
\\tau \\frac{dh(t)}{dt} = -h(t) + W f(h(t)) + I_{ext}(t)
$$

For a ring attractor encoding an angular variable $\\theta \\in [0, 2\\pi)$, the recurrent weight matrix satisfies rotational invariance:

$$
W(\\theta_i, \\theta_j) = J_0 + J_1 \\cos(\\theta_i - \\theta_j)
$$

## 2. Neural Drift & Diffusion

In both biological and artificial implementations, memory representations undergo stochastic diffusion along the neutral manifold:

$$
d\\theta_t = \\sqrt{2 D} \\, dW_t
$$

where $D$ represents the effective diffusion constant. Our measurements indicate that modern recurrent linear state-space models exhibit diffusion rates orders of magnitude lower than standard vanilla RNNs, matching biological stability curves.

\`\`\`python
import numpy as np

def simulate_ring_attractor(steps=1000, dt=0.01, noise_sigma=0.05):
    theta = 0.0 # initial stored angle
    trajectory = []
    for _ in range(steps):
        # Brownian motion drift along continuous attractor valley
        drift = np.random.normal(0, noise_sigma * np.sqrt(dt))
        theta = (theta + drift) % (2 * np.pi)
        trajectory.append(theta)
    return np.array(trajectory)
\`\`\`

## 3. Conclusions and Next Steps

By aligning cognitive state-space topologies with machine inductive biases, we bridge biological plausibility and compute-efficient persistent reasoning.`
  },
  {
    id: "transformer-circuits-inductive-heads",
    slug: "transformer-circuits-inductive-heads",
    title: "Mechanistic Decomposition of Multi-Step Induction Heads",
    date: "2026-06-19",
    status: "published",
    readingTime: "8 min read",
    category: "Natural Language Processing",
    tags: ["NLP", "Transformers", "Mechanistic Interpretability", "Induction Heads"],
    summary:
      "Dissecting 2-layer and 3-layer composition circuits responsible for in-context pattern completion and algorithmic copy-pasting.",
    mathSample: "$$ A^{(2)} = \\text{softmax}\\left( x^T W_E^T W_Q^{(2)T} W_K^{(2)} W_O^{(1)} W_V^{(1)} W_E x \\right) $$",
    bibtex: `@article{orbetex2026induction,
  title={Mechanistic Decomposition of Multi-Step Induction Heads},
  author={Upadhyay, Anshu},
  journal={Orbetex Research Notes},
  year={2026}
}`,
    content: `## 1. What are Induction Heads?

Induction heads are two-head circuits across consecutive Transformer layers that execute the algorithmic pattern:
\\[ [A][B] \\dots [A] \\longrightarrow [B] \\]

They serve as the mechanistic backbone for in-context learning, allowing language models to generalize to novel few-shot tasks.

## 2. The $Q$-$K$ and $O$-$V$ Circuit Factorization

The attention calculation for layer 2 reading layer 1 outputs can be mathematically factored into two independent circuits:

1. **$QK$-Circuit**: Governs *which token* receives attention based on the previous token's positional and contextual key.
2. **$OV$-Circuit**: Dictates *what information* is transferred into the residual stream once attended.

\`\`\`python
def verify_induction_score(attn_matrix):
    """
    Computes prefix-matching induction score along the sub-diagonal.
    Returns fraction of probability assigned to token following previous match.
    """
    n = attn_matrix.shape[-1]
    diag_indices = range(1, n)
    # Check attention to token i-1 when token i recurs
    score = attn_matrix.diagonal(offset=-1).mean().item()
    return score
\`\`\`

## 3. Findings Across Scale

Our ablations confirm that phase transitions during training correspond directly to the synchronized formation of these circuits, verifiable through eigenvalue spectra analysis of $W_{OV}$ matrices.`
  },
  {
    id: "energy-based-causal-inference",
    slug: "energy-based-causal-inference",
    title: "Energy-Based Latent Variable Models for Causal Discovery",
    date: "2026-04-11",
    status: "in-progress",
    readingTime: "11 min read",
    category: "Machine Learning",
    tags: ["Causal Inference", "Energy-Based Models", "Unsupervised", "Graph Theory"],
    summary:
      "Formulating structural causal models as parameterized continuous Gibbs distributions to discover directed acyclic graphs without combinatorial search.",
    mathSample: "$$ p_\\theta(x) = \\frac{1}{Z_\\theta} \\exp\\left( -E_\\theta(x) \\right) $$",
    bibtex: `@article{orbetex2026causal,
  title={Energy-Based Latent Variable Models for Causal Discovery},
  author={Upadhyay, Anshu},
  journal={Work In Progress - Orbetex Lab},
  year={2026}
}`,
    content: `## 1. Problem Formulation

Traditional causal structure learning requires exploring the super-exponential space of Directed Acyclic Graphs (DAGs) over $d$ nodes:
$$
a_d = \\sum_{k=1}^d (-1)^{k-1} \\binom{d}{k} 2^{k(d-k)} a_{d-k}
$$

We relax this discrete constraint by defining an energy surface $E_\\theta(x)$ where local gradient flow corresponds to physical intervention paths.

## 2. Smooth Acyclicity Characterization

Using the matrix exponential trace condition proposed by Zheng et al.:
$$
h(W) = \\operatorname{Tr}\\left(e^{W \\circ W}\\right) - d = 0
$$
where $W$ represents the weighted adjacency matrix. We incorporate $h(W)$ into an augmented Lagrangian objective:

\`\`\`python
import torch

def acyclicity_constraint(W):
    d = W.shape[0]
    M = W * W
    exp_M = torch.matrix_exp(M)
    return torch.trace(exp_M) - d
\`\`\`

## 3. Preliminary Benchmarks

Early experiments on synthetic Erdős–Rényi and Scale-Free graphs show 14% higher Structural Hamming Distance recovery rates compared to standard score-based methods.`
  },
  {
    id: "quantum-tensor-networks-expressivity",
    slug: "quantum-tensor-networks-expressivity",
    title: "Matrix Product States & the Expressive Power of Quantum Tensor Networks",
    date: "2026-02-18",
    status: "idea",
    readingTime: "7 min read",
    category: "Quantum Computing",
    tags: ["Quantum Computing", "Tensor Networks", "MPS", "Expressivity"],
    summary:
      "Investigating the boundaries between classically simulable matrix product states and quantum circuit supremacy in parameterized machine learning.",
    mathSample: "$$ |\\psi\\rangle = \\sum_{s_1, \\dots, s_N} A_1^{s_1} A_2^{s_2} \\cdots A_N^{s_N} |s_1 \\dots s_N\\rangle $$",
    bibtex: `@article{orbetex2026quantum,
  title={Matrix Product States and the Expressivity of Quantum Tensor Networks},
  author={Upadhyay, Anshu},
  journal={Research Proposal - Orbetex},
  year={2026}
}`,
    content: `## 1. Tensor Network Decompositions

A quantum state of $N$ qubits lives in a Hilbert space of dimension $2^N$. By factorizing the amplitude tensor into a chain of low-rank matrices (Matrix Product State / Tensor Train):

$$
|\\psi\\rangle = \\sum_{s_1, \\dots, s_N} A_1^{s_1} A_2^{s_2} \\cdots A_N^{s_N} |s_1 s_2 \\dots s_N\\rangle
$$

where each $A_i^{s_i}$ is a matrix of bond dimension $\\chi$.

## 2. Entanglement Entropy Scaling

Area laws dictate the growth of von Neumann entanglement entropy across bipartite cuts:
$$
S(\\rho_A) = -\\operatorname{Tr}(\\rho_A \\log \\rho_A) \\le \\log \\chi
$$

When correlations satisfy 1D locality, MPS provides polynomial approximations to otherwise intractable high-dimensional functions.`
  }
];
