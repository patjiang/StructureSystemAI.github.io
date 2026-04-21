# TODO Deadline April 30th:
- Add Alumni section to People page
- Add Site map to Home page
- Add Academic/Research/Industry Split to site Mape
- Add Projects to Projects content page by april 2
- Add Collaborator Page
- Add Ramon to 

- Pictures go in public/uploads

## Research page:
- Need overhaul -- immunology over ageing
- Add Therapuetics Discovery under overall Research page
- Add small section on applied AI
- Add Network of Optimized Dynamic Energy Signatures (no DARPA Logo)
 
- Innovations: 1) Integrated Modelling (With MD) 2) Human-Computer Interface 3) Applied Deep learning in Biology
- Integrated Modelling (Atomistic molecular dynamics simulations that explicitly represent proteins, membranes, water, and interacting environments. Neural network potential-based flexible fitting for integrating imaging and structural data with simulation. Information-theoretic and geometric machine learning approaches to visualize cooperativity in molecular ensembles. ManifoldEM for learning continuous conformational transformations from single-particle images. High-performance computing and remote visualization workflows that scale across thousands of GPU and CPU nodes. Whole-cell-scale chemically accurate simulations involving hundreds of millions of interacting particles.)
- Multiscale Modelling (Brownian Dynamics, Quantum Work)
- Applied Deep learning in Biology (RL, BioT, HLA-Inception) (Drug Discovery)
- Human-Computer Interface

## Academic Page


## Add software page:
- Add link to HLA-Inception [here](https://www.strsysbiolab.academy/software/hla)
- Add links to other github repositories


## Systems Structural Biology Group Website

This repository contains the source code and content for the lab website, built using the Astro framework.

### Website Organization

The site is organized into a modular structure where code and content are strictly separated:

  * **src/content/**: Contains Markdown files that drive the data-heavy portions of the site. This includes people profiles, news articles, research projects, and publications.
  * **src/pages/**: Defines the website routes and layouts.
  * **src/layouts/**: Stores the global page wrappers and reusable UI shells.
  * **src/lib/**: Contains utility scripts, including path normalization and base URL handling.
  * **public/uploads/**: The central directory for all images, headshots, and media assets referenced in Markdown files.

### Contributing Content

To add or update news, people, projects, or publications, refer to the detailed instructions in the content guide:

[View Content Addition Guide](src/content/README.md)

### Development

The configuration for the Astro site, including base paths and deployment settings, is located in **astro.config.mjs**. Node.js dependencies are managed via **package.json**.
