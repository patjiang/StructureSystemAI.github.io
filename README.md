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
