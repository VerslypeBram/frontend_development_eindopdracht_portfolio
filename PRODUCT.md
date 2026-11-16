# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: anyone evaluating Bram Verslype as a developer. All audiences are confirmed and none outranks the others:
- teachers and assessors at Howest, because the site is also the Front-End Development final assignment;
- potential clients with a project in mind;
- future employers and recruiters (Bram already has an internship arranged, so the site no longer asks for one);
- other developers and Bram's network.

The job: understand who Bram is, then verify it through real projects. Contact is welcome but is not the conversion the site pushes.

## Product Purpose

Personal portfolio of Bram Verslype, a Multimedia & Creative Technology student (Next Web Developer track) at Howest, Kortrijk. It presents who he is, his skills and his projects (React, Next.js, IoT).

Primary goal: showcase and network. Success: within about 30 seconds a visitor knows who Bram is, and the projects convince them of his skill. Opening a project is the main action; emailing him or downloading the CV is available but never pushed. Projects are the evidence.

## Positioning

Undecided. The existing site copy says "Design-minded developer focused on building beautiful, interactive digital experiences" and the meta description names React, Next.js and IoT, but Bram has not confirmed which of these is the distinguishing claim. Do not invent one.

## Operating Context

- Live at www.bramverslype.be (the apex domain redirects to www), deployed on Vercel.
- Editors (Bram) change all content in an embedded Sanity Studio at `/studio`; a Sanity webhook calls `/api/revalidate`, and draft mode previews unpublished changes.
- One-page homepage (hero, about, skills, projects, contact) plus a case page per project at `/projects/[slug]`.
- Content language is English. The `docs/` folder holds CMS research notes in Dutch.

## Capabilities and Constraints

- Stack in place: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, `next-themes` (light and dark), Sanity v5, Cloudinary for images, Zod-validated env variables.
- All texts, projects, skills, tags, nav links and social links come from Sanity; `app/lib/constants.ts` holds fallbacks that must stay in sync with the CMS.
- Contact: email address, optional CV download, GitHub and LinkedIn.
- The availability badge is optional and fed by the CMS (Site Settings → Availability). It is empty by default and hidden when empty; use it only for a status Bram confirms.
- Contact heading and text, the SEO description and the link-preview tagline are CMS fields too, with fallbacks in `app/lib/constants.ts`.
- Deliberately limited motion: everything must degrade under `prefers-reduced-motion`.

## Brand Commitments

- Wordmark: "bram verslype" in lowercase with an amber terminal cursor that blinks briefly and rests.
- Amber is the established accent color. Space Grotesk (headings) and Satoshi (body) are in use.
- These are recorded as existing facts, not as decisions about a future visual direction.

## Evidence on Hand

- Real projects, skills and photos live in Sanity and Cloudinary; the repo does not list them.
- The README documents the technical highlights. No testimonials, client names, or metrics exist in the repo; do not fabricate any.

## Product Principles

1. Lead with the work: a visitor should reach a real project within one or two actions. Contact stays one visible step away without being pushed.
2. Projects are the proof: claims about skill should always be backed by a project a visitor can open.
3. Content lives in the CMS: nothing editorial is hard-coded, so Bram can update the site without a deploy.
4. Accessible by default: WCAG AA contrast, 44px touch targets, keyboard and reduced-motion support are part of the product, not polish.
5. Stay truthful about availability: any status shown in the badge must match what Bram confirms, and it stays hidden otherwise.

## Accessibility & Inclusion

Colour contrast aimed at WCAG AA, skip link, semantic heading order, 44px touch targets, a pausable photo carousel, and full `prefers-reduced-motion` support (no typewriter, tilt, autoplay or cursor ring). The custom cursor ring is an addition to the native cursor and never replaces it.
