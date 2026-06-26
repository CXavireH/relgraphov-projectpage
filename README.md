# RelGraphOV — Project Page

Static project page for the ECCV 2026 paper
**Beyond Isolated Objects: Relationship-aware Open-Vocabulary 3D Scene Understanding via 3D Scene Graph Analysis**.

No build step — plain `index.html` + `static/`. Frameworks (Bulma, Font Awesome,
Academicons, Google Fonts) load from CDN.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a new GitHub repo, e.g. `relgraphov-projectpage`.
2. Push these files to `main`:
   ```bash
   git remote add origin git@github.com:<user>/relgraphov-projectpage.git
   git push -u origin main
   ```
3. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`.
4. Live at `https://<user>.github.io/relgraphov-projectpage/`.

`.nojekyll` is included so GitHub Pages serves `static/` verbatim.

## Things to fill in (placeholders)

Search the repo for `href="#"` and `TODO`:

- **arXiv** button → arXiv URL (`index.html`, resource links).
- **Code** button → GitHub code repo URL (`index.html`, resource links).
- **Paper** button → currently `static/pdfs/relgraphov.pdf` (a stand-in copy).
  Replace that file with the final **camera-ready PDF**, or point the button to the
  Springer/arXiv link.
- **Author homepages** → each author name is `<a href="#">`; replace with the
  author's homepage, or remove the `<a>` wrapper for authors without one.

## Assets

- `static/images/*.png` — figures converted from the paper PDFs (`pdftoppm`, max 1600 px).
- `static/videos/relgraphov.mp4` — 30 MB supplementary video (under GitHub's 100 MB limit).
- `static/pdfs/relgraphov.pdf` — paper PDF (replace with camera-ready).

To regenerate an image from a PDF figure:

```bash
pdftoppm -png -r 150 -singlefile <figure>.pdf static/images/<name>
sips --resampleHeightWidthMax 1600 static/images/<name>.png
```
