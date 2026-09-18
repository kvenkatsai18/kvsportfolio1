# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A single-page personal portfolio site for Venkat Sai Kolli, built as static HTML/CSS/JS with no build step, package manager, or framework. There is no `package.json`, no bundler, and no test suite.

## Development

There are no build/lint/test commands — this is plain static HTML/CSS/JS served as-is.

- Preview locally by opening `index.html` directly in a browser, or serving the directory (e.g. `python3 -m http.server`) so relative fetches (like the testimonials endpoint) behave the same as in production.
- Deployment is simply publishing/uploading the static files (`index.html`, `styles.css`, `script.js`, images) — check `git log` / host config if a specific deploy target is in use.

## Architecture

The entire site is one page (`index.html`) composed of `<section>` blocks in scroll order (nav anchors match section `id`s): `hero`, `about`, `projects`, `publications`, `testimonials`, `podcast`, `speaking`, `media`, `work` (collaborate), `contact`. Nav links, active-section highlighting, and scroll-reveal animations all key off these section IDs, so renaming an `id` requires updating the corresponding nav `<a href="#...">` and any JS selectors together.

**Design system** — plain, clean, professional: a single sans-serif font (Geist) throughout, no serif/display font, on a light indigo-on-warm-paper palette (`--accent: #2855c5` etc., defined once in `:root` in `styles.css`). Standard equal-column card grids for projects/publications/podcast/speaking/work (no asymmetric "bento" layouts), a plain light-card horizontal testimonial carousel with dot pagination (not an inverted dark panel), and a simple slide-down mobile nav dropdown (not a full-screen overlay). Motion is deliberately restrained: a subtle fade/slide-up `.reveal` on scroll, gentle hover lift/shadow on cards, a thin scroll-progress bar, and a back-to-top button — no custom cursor, no cursor-follow spotlights, no "magnetic" hover-toward-cursor buttons, no marquees, no giant background watermarks. See `[[portfolio-design-preference]]` before adding any new visual flourish.

**`script.js`** — all page behavior, DOMContentLoaded-scoped, no external JS dependencies:
- Mobile nav toggle (simple dropdown under the header).
- Active-link/scroll-progress tracking based on section positions; starts with no link active until the user scrolls past the hero (don't reintroduce a truthy fallback here — it previously mis-highlighted "About" while still in the hero).
- Generic `.reveal` → `IntersectionObserver` scroll-reveal animation (staggered by sibling index) — add the `reveal` class to any new element that should animate in on scroll.
- Testimonials: fetched from `window.TESTIMONIALS_ENDPOINT` (a deployed Google Apps Script web app URL, set in `testimonials-config.js`), with a fallback fetch to a local `testimonials.json` if the remote call fails. Rendered as a horizontally-scrollable card track (`#testimonialTrack`) with prev/next buttons and dot pagination (`#testimonialDots`, only shown when there's more than one approved testimonial). Uses `window.TESTIMONIAL_PHOTOS[name]` to attach a photo when available.
- Contact form: client-side only — `submit` shows a success message and resets the form, but does **not** send the data anywhere. If wiring real submission is requested, this handler is the integration point.

**`testimonials-config.js`** — small config file holding the Google Apps Script endpoint URL and the `TESTIMONIAL_PHOTOS` name→image map. Update this file (not `script.js`) to change the testimonials data source or add a photo for an approved testimonial.

**`google-apps-script.gs`** — the backend, deployed separately as a Google Apps Script web app (not part of this repo's build). It reads Google Form responses from a linked Sheet (`Full Name`, `Designation`, `LinkedIn Profile Link`, `Comment`, `Approved` columns), filters rows where `Approved` = "yes", and returns them as JSON — this is what `TESTIMONIALS_ENDPOINT` serves. Changing testimonial fields/columns requires updating this script (and redeploying it) in tandem with the sheet headers and `script.js`'s rendering logic.

**`styles.css`** — single stylesheet, CSS custom properties defined in `:root` (colors, spacing, radii, shadows, one shared `--ease`) at the top, followed by one block per page section in the same order as `index.html`. Reuse existing `--space-*`, `--radius-*`, and color variables rather than hardcoding new values. Note: if a `position: fixed` element is ever added inside `.site-header`, remember `.site-header` has a `backdrop-filter`, which makes it a CSS containing block for fixed descendants — size such elements with explicit `width/height` (e.g. `100vw`/`100vh`) rather than `inset: 0`, which would collapse them to the header's own height instead of the viewport.

## Content notes

- Images referenced from `index.html`/`testimonials-config.js` live at the repo root (`ProfilePic.jpeg`, `Thumbnail.png`, `wnky.jpeg`) and under `images/` (testimonial photos). Some project/podcast thumbnails are hotlinked to external CDNs rather than stored locally.
- Bio/project/publication content in `index.html` reflects real, current facts about the site owner (roles, ventures, publications, press) — verify with the user before changing factual claims rather than inferring updates.
