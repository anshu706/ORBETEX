# Orbetex Media Assets Directory

Place your research images, diagrams, animations, and videos directly into this directory (`public/media/`).

## How to Reference Files in Your Research Notes

Any file placed in `public/media/` is automatically served at `/media/<filename>` in your browser.

### 1. Images & Figures
Place `network-diagram.png` in `public/media/network-diagram.png`.
In your research note markdown, write:
```markdown
![Figure 1: Neural network architecture and layer composition](/media/network-diagram.png)
```

### 2. Video Demonstrations (MP4, WebM, OGG)
Place `attractor-dynamics.mp4` in `public/media/attractor-dynamics.mp4`.
In your research note markdown, write:
```markdown
![Simulation of Continuous Attractor Trajectories](/media/attractor-dynamics.mp4)
```
Or use the HTML5 video tag:
```html
<video src="/media/attractor-dynamics.mp4" controls width="100%"></video>
```

### 3. YouTube or Vimeo Videos
You can also embed YouTube videos directly in markdown:
```markdown
![Mechanistic Interpretability Lecture](https://www.youtube.com/watch?v=dQw4w9WgXcQ)
```
Or via an iframe:
```html
<iframe width="100%" height="450" src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe>
```

### 4. Interactive LaTeX Equations
Write inline math using `$E = mc^2$` and block display equations using:
```markdown
$$
\mathcal{L}_{\text{total}} = \|x - \hat{x}\|_2^2 + \lambda \sum_{i} |f_i(x)|
$$
```
