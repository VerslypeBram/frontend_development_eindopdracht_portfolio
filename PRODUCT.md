# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: anyone evaluating Bram Verslype as a developer. All four audiences are confirmed and none outranks the others:
- companies and recruiters looking for a web development intern (Bram seeks an internship from 15 February to 4 June 2027 in the Kortrijk area);
- teachers and assessors at Howest, because the site is also the Front-End Development final assignment;
- potential clients with a project in mind (the contact section invites this);
- other developers and Bram's network.

The job: decide quickly whether Bram is worth contacting, then verify it through real projects.

## Product Purpose

Personal portfolio of Bram Verslype, a Multimedia & Creative Technology student (Next Web Developer track) at Howest, Kortrijk. It presents who he is, his skills and his projects (React, Next.js, IoT).

Success: within about 30 seconds a visitor knows who Bram is and emails him about an internship. Downloading the CV is the secondary action. Projects are the evidence behind that decision.

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
- Internship availability is shown through an availability badge fed by the CMS.
- Deliberately limited motion: everything must degrade under `prefers-reduced-motion`.

## Brand Commitments

- Wordmark: "bram verslype" in lowercase with an amber terminal cursor that blinks briefly and rests.
- Amber is the established accent color. Space Grotesk (headings) and Satoshi (body) are in use.
- These are recorded as existing facts, not as decisions about a future visual direction.

## Evidence on Hand

- Real projects, skills and photos live in Sanity and Cloudinary; the repo does not list them.
- The README documents the technical highlights. No testimonials, client names, or metrics exist in the repo; do not fabricate any.

## Product Principles

1. Lead with contact: the internship email is the primary outcome and must stay one obvious action away.
2. Projects are the proof: claims about skill should always be backed by a project a visitor can open.
3. Content lives in the CMS: nothing editorial is hard-coded, so Bram can update the site without a deploy.
4. Accessible by default: WCAG AA contrast, 44px touch targets, keyboard and reduced-motion support are part of the product, not polish.
5. Stay truthful about availability: the internship dates and location shown must match what Bram confirms.

## Accessibility & Inclusion

Colour contrast aimed at WCAG AA, skip link, semantic heading order, 44px touch targets, a pausable photo carousel, and full `prefers-reduced-motion` support (no typewriter, tilt, autoplay or cursor ring). The custom cursor ring is an addition to the native cursor and never replaces it.
