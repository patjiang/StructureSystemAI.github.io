## Content Management Guide

### Assets & Images
* **Location:** Save to `public/uploads/`.
* **Reference:** Use `/uploads/filename.ext` in Markdown.
* **Format:** Use `.webp` or `.jpg` (under 1MB). Square (1:1) ratio for headshots.

---

### News Entries
**Path:** `src/content/news/`
**Filename:** `YYYY-MM-DD-article-name.md`

| Field | Purpose |
| :--- | :--- |
| `title` | Headline (Required) |
| `summary` | 1-2 sentence blurb (Required) |
| `publishedAt` | Date YYYY-MM-DD (Required) |
| `category` | e.g., "Research", "Event" (Optional) |
| `tags` | List format (Optional) |
| `heroImage` | Path to image (Optional) |
| `featured` | Set `true` to highlight at top (Optional) |

**Template:**
```markdown
---
title: "Title"
summary: "Short description."
publishedAt: 2026-03-19
category: "Research"
tags: ["Tag1", "Tag2"]
heroImage: "/uploads/image.png"
heroAlt: "Alt text"
featured: false
---
Article content in Markdown follows here.
```

---

### People Entries
**Path:** `src/content/people/`
**Filename:** `id.md` (must match the `id` field)

| Field | Purpose |
| :--- | :--- |
| `id` | Unique slug/filename (Required) |
| `name` | Full name (Required) |
| `role` | Professional title (Required) |
| `photo` | Path to headshot (Required) |
| `bio` | Full professional biography (Required) |
| `links` | Dictionary of URLs: `email`, `scholar`, `linkedin`, `github` (Optional) |

**Template:**
```markdown
---
id: "name-slug"
name: "Name"
role: "Role"
photo: "/uploads/photo.jpg"
bio: "Professional biography text."
links:
  email: "user@asu.edu"
  scholar: "URL"
  linkedin: "URL"
---
```

---

## Project Entry Guide

### Assets & Media
* **Location:** Save all media to `public/uploads/`.
* **Images:** Use `.webp` or `.jpg` (under 1MB).
* **Videos:** Use `.mp4` (keep files small/compressed).
* **Reference:** Use `/uploads/filename.ext` in the frontmatter.

---

### Project Entries
**Path:** `src/content/projects/`  
**Filename:** `project-name.md`

| Field | Purpose |
| :--- | :--- |
| `title` | Full name of the research project. |
| `status` | `Active` or `Completed`. |
| `phase` | Current stage (e.g., "Data collection", "Modeling"). |
| `summary` | 1-2 paragraph project overview. |
| `thumbnail` | **New:** Path to image (used as card preview or video poster). |
| `video` | **New:** Path to `.mp4` file for the card's media player. |
| `tags` | Array of research areas or technologies. |
| `timeline` | Years of activity (e.g., "2025–2027"). |
| `lead` | Name of the project lead or PI. |
| `team` | Array of objects: `name`, `role`, and `href` (e.g., `people#id`). |
| `updates` | List of recent progress milestones. |
| `share_to_x` | Set `true` or `false`. |

**Template:**
```markdown
---
title: "Project Title"
status: "Active"
phase: "Current Phase"
summary: "Project description goes here."
thumbnail: "/uploads/project-preview.jpg"
video: "/uploads/molecular-simulation.mp4"
tags:
  - "Structural Biology"
  - "MD Simulations"
timeline: "2026–2028"
lead: "Lead Name"
team:
  - name: "Name"
    role: "Role"
    href: "people#slug"
updates:
  - "Recent milestone one"
  - "Recent milestone two"
share_to_x: false
---
```

---

### Implementation Note
* **Thumbnail as Poster:** If you provide both a `video` and a `thumbnail`, the image will serve as the "Poster" (the static frame shown before the video loads or plays).
* **Fallback:** If no video is provided, the template will simply display the `thumbnail` as a static image.

### Publication Entry Guide

### 📚 Publication Entries
**Path:** `src/content/publications/`  
**Filename:** `yyyy-paper-name.md`

| Field | Purpose |
| :--- | :--- |
| `title` | Full title of the paper. |
| `authors` | List of authors (can include bolding for lab members). |
| `year` | Four-digit year (numeric). |
| `venue` | Journal name, Conference, or Preprint server. |
| `type` | e.g., "Journal Article", "Review", "Preprint". |
| `note` | Optional extra info (e.g., "Co-first author"). |
| `link` | URL to the publisher or PDF. |
| `share_to_x`| Default is `true`. |

**Template:**
```markdown
---
title: "Paper Title"
authors: "Author A, Author B, and **Singharoy A.**"
year: 2026
venue: "Nature Communications"
type: "Journal Article"
note: "Selected for Cover"
link: "https://doi.org/..."
share_to_x: true
---
```
