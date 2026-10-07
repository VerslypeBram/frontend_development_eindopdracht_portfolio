---
name: Bram Verslype Portfolio
description: A calm neutral portfolio where one amber accent marks what to read, click and answer.
colors:
  signal-amber: "#f59e0b"
  signal-amber-hover: "#fbbf24"
  amber-ink: "#b45309"
  paper: "#fafafa"
  mist: "#f5f5f5"
  hairline: "#e5e5e5"
  ink: "#171717"
  ink-soft: "#525252"
  night: "#0a0a0a"
  chalk: "#ededed"
  steel: "#d4d4d4"
  status-green: "#10b981"
  status-green-ink: "#065f46"
  status-green-wash: "#ecfdf5"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
  headline:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.375
    letterSpacing: "normal"
  body:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Satoshi, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.05em"
rounded:
  md: "8px"
  lg: "12px"
  xl: "16px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-dark:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-accent:
    backgroundColor: "{colors.signal-amber}"
    textColor: "{colors.night}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-accent-hover:
    backgroundColor: "{colors.signal-amber-hover}"
  tag:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.md}"
    padding: "6px 12px"
  card:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.xl}"
    padding: "32px"
  availability-badge:
    backgroundColor: "{colors.status-green-wash}"
    textColor: "{colors.status-green-ink}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
---

# Design System: Bram Verslype Portfolio

## Overview

**Creative North Star: "The Warm Signal"**

The surfaces are quiet: paper-white and near-black, soft neutral cards, generous space. One amber accent carries every signal: the cursor on the wordmark, the active nav underline, hover borders, the scroll progress line, and the primary call to action on the project page. When something is amber, it is where the visitor should look or act. The system exists to get a visitor to email Bram about an internship, so nothing competes with that signal.

Personality is calm, sharp and personal rather than loud. Interaction shows craft in small, honest ways: a typewriter that writes the name once, a photo that tilts toward the mouse, a ring around the cursor, cards that lift on hover. All of it is decoration on top of a layout that already works without motion, and all of it stops under `prefers-reduced-motion`. The mood was not stated by the user; this North Star is inferred from the incumbent implementation and the amber-on-neutral discipline in it. Revisit it if the identity changes.

**Key Characteristics:**
- Neutral surfaces, one accent: amber, used for signals, never as large fills (except the primary call to action).
- Light and dark themes with equal standing; amber text switches from `amber-ink` (light) to `signal-amber` (dark) to keep contrast.
- Rounded, soft geometry: 8px controls, 16px cards, pills for status.
- Motion confirms and invites; it never carries meaning on its own.
- A faint grain overlay (2.5% opacity) gives the flat surfaces a tactile feel.

## Colors

A neutral ramp with a single warm accent; green appears only to mean "available".

### Primary
- **Signal Amber** (#f59e0b): the accent. Wordmark cursor, active nav underline, scroll progress bar, cursor ring, text selection, hover borders on cards and links, and the filled call-to-action on project pages (with Night text, about 9:1).
- **Signal Amber Hover** (#fbbf24): hover state of the filled amber button, and amber text on dark photo overlays.
- **Amber Ink** (#b45309): amber used as text on light surfaces (eyebrows, "View Project", hero name). Plain Signal Amber fails 4.5:1 on white, so it is never used as small text on light.

### Neutral
- **Paper** (#fafafa): light page background and light-theme foreground for inverted buttons.
- **Mist** (#f5f5f5): alternating section background (About, Projects) and tag fill in light theme.
- **Hairline** (#e5e5e5): borders on cards, tags and controls in light theme.
- **Ink** (#171717): light-theme text and dark-theme alternating section background.
- **Ink Soft** (#525252): body copy and secondary text in light theme.
- **Night** (#0a0a0a): dark page background, dark text on amber.
- **Chalk** (#ededed): dark-theme foreground.
- **Steel** (#d4d4d4): secondary text in dark theme.

### Status
- **Status Green** (#10b981): the pulsing dot in the availability badge.
- **Status Green Ink** (#065f46) on **Status Green Wash** (#ecfdf5): the badge text and fill in light theme; the dark theme uses a translucent green on near-black with light green text.

### Named Rules
**The One Voice Rule.** Amber is the only accent. If a new element wants a second hue, it is a status, not an accent, and it needs a reason.
**The Contrast Pair Rule.** Amber text uses Amber Ink on light and Signal Amber on dark. Never put Signal Amber small text on a light surface.

## Typography

**Display Font:** Space Grotesk (with system sans fallback), for headings, the wordmark and card titles.
**Body Font:** Satoshi (self-hosted, weights 400, 500 and 700), for everything else.

**Character:** Space Grotesk gives headings a slightly technical, geometric voice that matches the terminal-style wordmark; Satoshi stays friendly and neutral underneath. Headings are bold and tight, body is relaxed.

### Hierarchy
- **Display** (700, 2.25rem / 3rem / 3.75rem across breakpoints, leading 1.25): the hero heading ("Hi, I'm …"), project page title up to 3.75rem.
- **Headline** (700, 2.25rem mobile and 3rem from md, tracking -0.025em): section headings.
- **Title** (700, 1.25rem mobile and 1.5rem from md): card and category titles.
- **Body** (400, 1rem and up to 1.125rem, leading 1.625): paragraphs; cards use 0.875rem on mobile. Keep line length near 65ch (`max-w-md` to `max-w-lg` containers).
- **Label** (600, 0.875rem, tracking 0.05em to 0.1em, uppercase): eyebrows above section headings and the hero tagline.

### Named Rules
**The Balanced Heading Rule.** Headings use `text-wrap: balance`; never leave a one-word last line.

## Layout

A single centred column (`max-w-6xl`, 1152px) with 16px side padding on mobile and 24px from md up. The homepage is a stack of full-width sections alternating between the page background and Mist (or Ink in dark theme); each section uses 64px to 96px of vertical padding. Hero is a two-column row from md up (text left, photo right) and a single stacked column on mobile.

Breakpoints are Tailwind defaults (640, 768, 1024); the navigation collapses to a hamburger below 768px and the hero fills exactly the first screen below the sticky header using `min-h-hero` (dvh, minus 4rem or 5rem and the iPhone safe-area inset). The page honors `viewport-fit=cover`: header, scroll progress, footer and project pages add `env(safe-area-inset-*)`.

Spacing rhythm is Tailwind's 4px scale: 8px inside tight groups, 16 to 24px between related blocks, 48 to 64px between a section heading and its content, 96px between sections.

## Elevation & Depth

Hybrid: surfaces are flat and tonal at rest (white or translucent-white cards on Mist or Ink), and depth appears in response to interaction.

### Shadow Vocabulary
- **Card rest** (`shadow-sm`, about `0 1px 2px rgba(0,0,0,.05)`): cards, social links, the scrolled header.
- **Hover lift** (`shadow-lg`): buttons and project-page links on hover, together with a 2px upward move.
- **Control** (`shadow-md`): the project scroller arrows.
- **Image** (`shadow-xl`): hero photo, carousel photos and the project hero image.
- **Glow** (`blur-[100px]` amber at 6 to 8%): a single ambient glow behind the contact section.

### Named Rules
**The Flat-Until-Touched Rule.** Cards rest with only a hairline border and a faint shadow; hover adds a lift (8px for large cards, 2px for buttons) and an amber border. Non-interactive elements such as tags do not react to hover.

## Shapes

Soft and consistent: 8px for controls and tags, 12px for social link cards, 16px for cards and photos, full pills for the availability badge, theme toggle and back link. Borders are 1px hairlines (white at 10% in dark theme). The amber border on hover is the only coloured border.

## Components

### Buttons
- **Shape:** gently curved (8px), padding 12px by 24px, 14px semibold text.
- **Primary:** Ink fill with Paper text in light theme, inverted in dark theme. Hover: 2px lift and a larger shadow (only when motion is allowed).
- **Outline:** transparent with a Steel border and the same lift.
- **Accent:** Signal Amber fill with Night text, used for "View Live" on project pages; hover lightens to Signal Amber Hover.
- **Note:** primary and accent coexist. The homepage uses Ink buttons; the project page's main link is amber.

### Chips (tags)
- **Style:** Mist fill, Hairline border, 8px radius, 14px medium Ink Soft text; translucent white in dark theme.
- **State:** purely informational; no hover or click behaviour.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** white in light theme, white at 5% over the section in dark theme.
- **Border:** 1px Hairline; hover turns it Signal Amber.
- **Internal Padding:** 24px on mobile, 32 to 40px on larger screens.
- **Shadow Strategy:** see Elevation, rest `shadow-sm`.

### Navigation
- **Style:** sticky header, transparent at the top; after scrolling it gains a blurred white (or Night) background at 70 to 95% opacity, a hairline border and a small shadow. The bar is 80px high on desktop and 64px on mobile (plus the safe-area inset).
- **Links:** 16px medium, Ink Soft to Ink on hover; the active section gets a 2px Signal Amber underline that slides between links with a spring.
- **Mobile:** a 44px hamburger opens an animated dropdown with 44px rows; the theme toggle sits next to it.

### Wordmark
Lowercase "bram verslype" in Space Grotesk bold with a small Signal Amber block cursor that blinks four times and rests. It is the product's identity asset and appears in the header and footer.

### Availability badge
A pill in green: pulsing dot (four pulses, then still) and the internship availability text. Green is reserved for this status.

### Cursor ring
On fine-pointer devices without reduced motion, a 28px Signal Amber ring follows the native cursor and grows to 44px over interactive elements. It adds to the native cursor and never hides it.

## Do's and Don'ts

### Do:
- **Do** use Signal Amber for signals only: active state, hover borders, the cursor, the primary call to action.
- **Do** use Amber Ink for amber text on light surfaces and Signal Amber for amber text on dark.
- **Do** keep 44px minimum touch targets and `env(safe-area-inset-*)` on anything fixed or sticky.
- **Do** list transition properties explicitly (`transition-[transform,border-color]`), never `transition-all`.
- **Do** put hover lifts and zooms behind `motion-safe:` and keep every animation finite or pausable.
- **Do** keep text on amber fills dark (Night); it reaches about 9:1.

### Don't:
- **Don't** add a second accent colour; use green only for availability status.
- **Don't** put Signal Amber small text on light backgrounds (below 4.5:1).
- **Don't** make non-interactive elements, such as tags, scale or change colour on hover.
- **Don't** nest cards or stack more than one soft shadow on a surface.
- **Don't** let motion carry meaning on its own; content must read and work with motion switched off.
- **Don't** hide the native cursor or block pinch zoom.
