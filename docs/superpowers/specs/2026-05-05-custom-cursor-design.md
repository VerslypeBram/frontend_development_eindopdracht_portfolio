# Custom Cursor — Design Spec
Date: 2026-05-05

## Summary
Replace the default browser cursor with a custom Framer Motion cursor: a small amber dot that tracks the mouse directly, and a larger neutral ring that follows with a spring delay. On hover over any `cursor-pointer` element, the dot disappears and the ring scales up.

## Architecture

### New files (`app/components/common/`)
- **`CursorContext.tsx`** — React context exposing `isHovered: boolean` and `setHovered: (v: boolean) => void`. Wraps the site in `app/(site)/layout.tsx`.
- **`CustomCursor.tsx`** — `'use client'` component rendering two `motion.div`s (dot + ring). Uses `useMotionValue` + `useSpring` for smooth tracking. Hidden on touch devices.
- **`useCursor.ts`** — Hook returning `{ onMouseEnter, onMouseLeave }` handlers that call `setHovered`.

### Modified files
- **`app/(site)/layout.tsx`** — Wrap children with `CursorProvider` and render `<CustomCursor />`.
- **`app/globals.css`** — Add `cursor: none` on `body` scoped to `@media (pointer: fine)`.
- **`app/components/common/Button.tsx`** — Spread `useCursor()` handlers onto the rendered element.
- All other interactive components (`NavBar` links, project cards, etc.) — spread `useCursor()` handlers.

## Cursor Elements

### Dot
- Size: 8×8px
- Color: amber-500 (`#f59e0b`)
- Shape: filled circle (`border-radius: 50%`)
- Tracking: direct (no spring), follows `useMotionValue` instantly
- Hover state: `opacity: 0, scale: 0` (disappears)
- Transition: `duration: 0.15s ease`

### Ring
- Size: 40×40px default, scales to 64px on hover (`scale: 1.6`)
- Border: `2px solid` — `neutral-900` (#171717) in light mode, `white` (#ededed) in dark mode
- Background: transparent
- Tracking: spring with `stiffness: 150, damping: 20`
- Hover state: `scale: 1.6`, `opacity: 0.4`
- Transition: Framer Motion spring

## Shared Properties (both elements)
- `position: fixed`
- `pointer-events: none`
- `z-index: 9999`
- `transform: translate(-50%, -50%)` for cursor-center alignment

## SSR & Touch Safety
- `CustomCursor` returns `null` on server (`typeof window === 'undefined'`).
- On mount, checks `window.matchMedia('(pointer: coarse)')` — if true (touch device), renders nothing.
- `cursor: none` on `body` is scoped to `@media (pointer: fine)` so touch/mobile users see the default cursor.

## Scope
- All elements with `cursor: pointer` computed style are covered via the `useCursor()` hook being added to: `Button`, nav links in `NavBar`, project cards in `ProjectsScroller`/`ProjectsSection`, and any other interactive elements found during implementation.
