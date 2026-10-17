// Projects Dataset for Orbetex Research Hub
export const projects = [
  {
    id: "neural-lens-interpretability",
    title: "NeuralLens: Mechanistic Feature Visualizer",
    status: "published",
    category: "AI & Interpretability",
    date: "2026",
    summary:
      "Interactive 3D geometry workbench exploring Sparse Autoencoder feature dictionaries, causal activation patching, and polysemantic subspace projections.",
    techStack: ["PyTorch", "WebGL", "React", "TransformerLens", "FastAPI"],
    links: {
      github: "https://github.com/anshu706/neural-lens",
      demo: "https://neurallens.orbetex.dev",
      paper: "/research/sparse-autoencoders-latent-geometry"
    },
    highlights: [
      "Over 120,000 dictionary atoms indexed and browsable in real-time",
      "Interactive activation patching to isolate causal head compositions",
      "Sub-millisecond cosine similarity search across latent topologies"
    ],
    description: `NeuralLens is an open-source mechanistic interpretability suite designed to bridge the gap between high-dimensional neural representations and intuitive human understanding. By training dictionary learning probes on transformer residual streams, NeuralLens isolates monosemantic circuits and maps out feature geometry directly in the browser using custom GPU-accelerated WebGL pipelines.`
  },
  {
    id: "cogni-attractor-sim",
    title: "CogniState: Attractor Dynamics Engine",
    status: "published",
    category: "Cognitive Science & RNNs",
    date: "2026",
    summary:
      "Continuous attractor neural network (CANN) simulator modeling primate prefrontal working memory decay, drift correction, and stochastic perturbation.",
    techStack: ["Python", "JAX", "NumPy", "Matplotlib", "SciPy"],
    links: {
      github: "https://github.com/anshu706/cogni-attractor",
      paper: "/research/cognitive-dynamics-working-memory"
    },
    highlights: [
      "Simulates ring, line, and planar continuous attractors with 10k+ spiking neurons",
      "Exact energy landscape and Lyapunov function tracking",
      "Direct comparison with continuous state-space models (S4/Mamba)"
    ],
    description: `CogniState provides rigorous numerical toolkits for analyzing continuous attractors in neural population recordings and modern state-space architectures. It offers closed-form solutions for diffusion coefficients and automated bifurcation analysis under varying noise regimes.`
  },
  {
    id: "sunlight-adaptive-energy-harvester",
    title: "HelioCharge: Adaptive Solar Energy Harvester",
    status: "in-progress",
    category: "Hardware & Embedded Systems",
    date: "2026",
    summary:
      "Ultra-low-power Maximum Power Point Tracking (MPPT) solar energy harvesting unit with supercapacitor buffering for autonomous field sensors.",
    techStack: ["Embedded C", "KiCad", "STM32", "Altium", "Power Electronics"],
    links: {
      github: "https://github.com/anshu706/helio-charge"
    },
    highlights: [
      "94.2% peak DC-DC buck-boost conversion efficiency across variable illuminance",
      "Cold-start capability down to 250mV ambient indoor irradiance",
      "Integrated dual-stage supercapacitor bank with over-voltage clamping"
    ],
    description: `An embedded power management system engineered for remote ambient IoT and environmental sensor nodes. Combines fractional open-circuit voltage MPPT tracking algorithms with ultra-low quiescent current LDOs to harvest energy even under extreme low-light conditions.`
  },
  {
    id: "wrist-band-mesh-transceiver",
    title: "AuraLink: Sub-GHz Mesh Walkie-Talkie Band",
    status: "in-progress",
    category: "Hardware & Communications",
    date: "2026",
    summary:
      "Compact wearable sub-GHz decentralized voice and telemetry mesh network communicator for off-grid backcountry operations.",
    techStack: ["ESP32-S3", "Semtech LoRa", "Opus Audio Codec", "FreeRTOS"],
    links: {
      github: "https://github.com/anshu706/auralink-mesh"
    },
    highlights: [
      "Multi-hop ad-hoc mesh routing protocol with adaptive TDMA",
      "Near-lossless Opus speech compression at 4.8 kbps",
      "2.4 km line-of-sight range per hop with conformal wrist antenna"
    ],
    description: `A wearable voice and encrypted sensor telemetry communicator operating independently of cellular networks. Leverages custom frequency-hopping spread spectrum (FHSS) techniques on ISM 868/915 MHz bands with ultra-low latency push-to-talk capability.`
  },
  {
    id: "rf-spectrum-acoustic-analyzer",
    title: "SpectraShield: RF & Acoustic Jammer / Analyzer",
    status: "idea",
    category: "Signal Processing & Security",
    date: "2026",
    summary:
      "Targeted software-defined acoustic and RF signal containment unit with real-time directional beamforming and selective cancellation (up to 200m).",
    techStack: ["GNURadio", "SDR (HackRF)", "FPGA (Verilog)", "Phased Array"],
    links: {
      github: "https://github.com/anshu706/spectrashield"
    },
    highlights: [
      "Directional phase-cancellation targeting localized unwanted acoustic peaks",
      "Real-time waterfall spectrogram analysis on edge SDR",
      "Strict regulatory compliance filters for lab testing environments"
    ],
    description: `A signal processing research apparatus exploring acoustic phase cancellation and localized RF attenuation. Designed for acoustic noise neutralization in high-decibel industrial zones and controlled electromagnetic containment experiments.`
  },
  {
    id: "spatial-volumetric-hologram-projector",
    title: "HoloForge: Volumetric Spatial Item Projector",
    status: "idea",
    category: "Optics & Spatial Computing",
    date: "2026",
    summary:
      "Research prototype of a high-speed photophoretic acoustic-trap volumetric display for rendering true 3D tangible interactive models in free space.",
    techStack: ["Ultrasonic Phased Array", "CUDA", "C++20", "Computer Vision"],
    links: {
      github: "https://github.com/anshu706/holoforge"
    },
    highlights: [
      "Acoustic levitation trap operating at 40 kHz with 256 ultrasonic transducers",
      "RGB particle illumination delivering persistence-of-vision volumetric graphics",
      "Interactive gesture tracking via stereo depth infrared sensing"
    ],
    description: `HoloForge explores the frontiers of physical spatial interaction by trapping cellulose or micro-bead particles with acoustic radiation pressure and rapidly scanning them through volumetric trajectories while synchronized RGB lasers modulate illumination.`
  }
];
