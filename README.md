# Bram Verslype — Portfolio

[![Live site](https://img.shields.io/badge/live-bramverslype.be-f59e0b?style=for-the-badge)](https://www.bramverslype.be)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-deployed-black?style=for-the-badge&logo=vercel)](https://www.bramverslype.be)

My personal portfolio: a CMS-driven Next.js site where I showcase my projects as a
Multimedia & Creative Technology student (Next Web Developer track) at Howest.

**Live:** [www.bramverslype.be](https://www.bramverslype.be)

![Preview of the portfolio](https://www.bramverslype.be/opengraph-image)

## Tech stack

| Area      | Choice                                                                 |
| :-------- | :--------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router, React Server Components), React 19             |
| Language  | TypeScript, env variables validated with Zod                           |
| Styling   | Tailwind CSS v4, dark mode with `next-themes`, Framer Motion           |
| CMS       | Sanity v5 with the Studio embedded at `/studio`                        |
| Images    | Cloudinary, served through `next/image` (AVIF/WebP, blur placeholders) |
| Hosting   | Vercel                                                                 |
| Tooling   | ESLint, Prettier, Husky + lint-staged                                  |

## Highlights

- **Content without redeploys.** All texts, projects, skills and links live in Sanity.
  Data is fetched in Server Components with `sanityFetch` and cache tags; a Sanity
  webhook calls `/api/revalidate`, so edits appear on the site within seconds.
- **Streaming UI.** Every homepage section is its own `<Suspense>` boundary with a
  skeleton, so a slow query never blocks the rest of the page.
- **Project case pages.** Statically generated per slug (`generateStaticParams`),
  with their own metadata, Open Graph image and a real 404 for unknown slugs.
- **SEO.** Generated `sitemap.xml` (including CMS projects), `robots.txt`, canonical
  URLs, a title template and an Open Graph image rendered with `next/og`.
- **Accessibility.** Semantic heading order, skip link, colour contrast aimed at WCAG AA,
  44 px touch targets, a pausable photo carousel and full support for
  `prefers-reduced-motion` (no typewriter, tilt, autoplay or cursor ring).
- **Performance.** Self-hosted fonts via `next/font`, icons rendered as inline SVG
  on the server, the LCP image visible from the first paint, and responsive
  image `sizes` everywhere.
- **Draft mode.** Editors can preview unpublished changes through `/api/draft`.

## Project structure

```text
app/
├── (site)/                 # One-page homepage: hero, about, skills, projects, contact
├── (project)/projects/     # Project case pages (/projects/[slug])
├── api/                    # Draft mode + revalidation webhook
├── components/
│   ├── common/             # Reusable UI (Button, SectionHeading, Tag, NavBar, ...)
│   └── feature/            # Homepage sections
├── lib/                    # Site settings, constants, helpers
├── studio/                 # Embedded Sanity Studio
├── sitemap.ts, robots.ts, opengraph-image.tsx, icon.tsx
sanity/
├── schemaTypes/            # Content model (project, hero, aboutMe, skills, tag, siteSettings)
└── lib/                    # Sanity client + live content
docs/                       # CMS research (in Dutch) and screenshots
```

## Getting started

Requirements: Node.js 24 (see `.nvmrc`), npm and a Sanity project.

```bash
git clone https://github.com/VerslypeBram/frontend_development_eindopdracht_portfolio.git
cd frontend_development_eindopdracht_portfolio
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

- Site: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

| Variable                         | Where to find it                                                     |
| :------------------------------- | :------------------------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Sanity dashboard → Project settings                                  |
| `NEXT_PUBLIC_SANITY_DATASET`     | Usually `production`                                                 |
| `NEXT_PUBLIC_SANITY_API_VERSION` | A date, e.g. `2026-04-10`                                            |
| `SANITY_API_READ_TOKEN`          | Sanity dashboard → API → Tokens (Viewer)                             |
| `SANITY_REVALIDATE_SECRET`       | Generate one, e.g. `openssl rand -hex 32` (required for the webhook) |
| `SANITY_PREVIEW_SECRET`          | Generate one, e.g. `openssl rand -hex 32`                            |

## Deployment (Vercel)

1. Import the repository in Vercel and add all variables from `.env.example`.
2. In Sanity → API → Webhooks, add a webhook to `https://<domain>/api/revalidate`
   (method `POST`, header `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`,
   projection `{_type}`). Without the secret the endpoint rejects every request.
3. For draft previews, use
   `https://<domain>/api/draft?secret=<SANITY_PREVIEW_SECRET>&slug={slug}`.

## Background

This site started as the final assignment for the Front-End Development course,
where I compared Sanity, Contentful and Strapi and built a proof of concept.
That research (in Dutch) is in [docs/cms-onderzoek.md](docs/cms-onderzoek.md).

## Contact

- GitHub: [@VerslypeBram](https://github.com/VerslypeBram)
- LinkedIn: [Bram Verslype](https://www.linkedin.com/in/bram-verslype-b27460408/)
- Website: [bramverslype.be](https://www.bramverslype.be/#contact)
