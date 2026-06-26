# RelGraphOV Project Page — Design Spec

**Date:** 2026-06-26
**Topic:** Academic project page for the ECCV 2026 paper *RelGraphOV* (camera-ready)
**Status:** Draft for user review

## 1. Goal

A static, single-page academic project website for *RelGraphOV: Beyond Isolated
Objects — Relationship-aware Open Vocabulary Scene Understanding via 3D Scene
Graph Analysis*, deployable to **GitHub Pages** with zero build step.

## 2. Approach

- **Self-contained static site**: one `index.html` + local CSS/JS/assets, no
  backend, no build tooling. Uses the community-standard *Academic Project Page*
  (Bulma) structure so the community finds it familiar and GitHub Pages serves it
  with no configuration.
- **Frameworks via CDN** (Bulma, Font Awesome, Academicons, Google Fonts) loaded
  from jsDelivr/CDN; only `index.css` and `index.js` are local. Avoids vendoring
  large files and keeps the repo small. (Requires network at view time, standard
  for academic pages.)
- **Relative asset paths** so the site works at a repo root or any subpath.
- Lives in a **new, independent GitHub repository** (separate from the LaTeX
  source), Pages served from the repo root (`main` branch).

Alternatives considered (rejected): cloning the full Nerfies repo (carries
unneeded files); a build-tool site such as Astro/Vite (adds a build step that
GitHub Pages would need an Action for — unnecessary for a one-pager).

## 3. Directory Structure

```
relgraphov-projectpage/        # new standalone git repo
  index.html
  README.md                    # how to deploy / update
  static/
    css/
      bulma.min.css
      index.css                # custom overrides
    js/
      index.js                 # carousels / small interactions
    images/                    # PDF figures converted to PNG (web-optimized)
      teaser.png
      pipeline.png
      results_*.png
      query_*.png
    videos/
      relgraphov.mp4           # 30 MB supplementary video (under GitHub 100 MB limit)
    pdfs/
      relgraphov.pdf           # camera-ready PDF (optional local copy)
```

## 4. Page Sections (top → bottom)

1. **Header**: title; author list with superscript affiliations, equal-contribution
   (∗) and corresponding-author (†) marks, ORCID links, and **per-author homepage
   links** (each author name is a hyperlink; href defaults to a clearly-marked
   placeholder for the user to fill or remove per author); affiliation list
   (Zhejiang University, China).
2. **Resource buttons**: **Paper**, **arXiv**, **Code (GitHub)**, **Video**.
   - Paper → local `static/pdfs/relgraphov.pdf` (swap to Springer/arXiv later).
   - arXiv and Code → **placeholder URLs** the user fills in (clearly marked).
   - Video → anchor to the embedded video section.
3. **Teaser**: `teaser_eccv.pdf` → PNG, full-width, with a one-line caption.
4. **Abstract**: verbatim camera-ready abstract.
5. **Video**: HTML5 `<video controls>` embedding the local 30 MB mp4
   (`supp_new/RelGraphOV_video_supp.mp4`).
6. **Method**: `pipeline_new.pdf` → PNG + a 2–3 sentence overview of the pipeline
   (scene-graph construction → VLM annotation → Adaptive Gated Dual-Stream GAT →
   hierarchical contrastive training).
7. **Results**: qualitative comparison figures (`more_comparison`,
   `scannet200_render`, `query_result_1/2`) shown in a JS **carousel** (classic
   academic-template style) with short per-slide captions. (Quantitative tables
   omitted to keep it light; can be added later.)
8. **BibTeX**: copy-friendly `<pre>` block with the ECCV 2026 citation.
9. **Acknowledgements + footer**: NSFC grant note; template credit line
   ("based on the Academic Project Page template"); license note.

## 5. Asset Pipeline

- Convert required PDFs to PNG with `pdftoppm` (already installed), ~150–200 DPI,
  trimmed/optimized to keep each image well under a few hundred KB where possible.
- Copy `supp_new/RelGraphOV_video_supp.mp4` → `static/videos/relgraphov.mp4`.
- Copy the camera-ready PDF → `static/pdfs/relgraphov.pdf`.

## 6. Content Sources (already available)

- Title, authors, ORCIDs, affiliations: from `main.tex`.
- Abstract: from `sections/0_abstract.tex` (camera-ready version).
- Method overview: condensed from `sections/3_methods.tex`.
- Figures: `gfx/figures/*.pdf`.
- Video: `../supp_new/RelGraphOV_video_supp.mp4` (30 MB).

## 7. Placeholders to be filled by the user

- arXiv URL (header button).
- GitHub code repo URL (header button).
- Final Paper link (initially the local PDF; later Springer/arXiv).
- Per-author homepage URLs (fill the ones that have a homepage; remove the link
  wrapper for those that do not).

Version control: the spec and the page live in the **new standalone page repo**
(created at implementation time); nothing is committed into the camera-ready
LaTeX repo.

## 8. Deployment

1. Create a new GitHub repo (e.g., `relgraphov-projectpage`).
2. Push the `relgraphov-projectpage/` contents to `main`.
3. Settings → Pages → Source: `main` / root.
4. Site live at `https://<user>.github.io/relgraphov-projectpage/`.
   `README.md` documents these steps and how to update assets/links.

## 9. Out of Scope (YAGNI)

- No quantitative results tables (can add later).
- No dark mode, no analytics, no comment system.
- No automated PDF→image build; conversion is a one-time scripted step.
