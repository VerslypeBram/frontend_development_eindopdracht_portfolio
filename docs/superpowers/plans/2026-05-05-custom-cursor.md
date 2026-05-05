# Custom Cursor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the default browser cursor with a Framer Motion dot + ring cursor that animates on hover over interactive elements.

**Architecture:** A React context (`CursorContext`) tracks hover state. A `CustomCursor` client component renders two `motion.div`s (amber dot + neutral ring) that follow the mouse via `useMotionValue`/`useSpring`. A `useCursor` hook exposes hover handlers that existing interactive components spread onto their root elements.

**Tech Stack:** Next.js 15 App Router, Framer Motion, Tailwind CSS v4, TypeScript

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `app/components/common/CursorContext.tsx` | Context + provider for `isHovered` state |
| Create | `app/components/common/CustomCursor.tsx` | Renders dot + ring, handles mouse tracking |
| Create | `app/components/common/useCursor.ts` | Hook returning `onMouseEnter`/`onMouseLeave` handlers |
| Modify | `app/(site)/layout.tsx` | Wrap with `CursorProvider`, render `<CustomCursor />` |
| Modify | `app/globals.css` | Add `cursor: none` scoped to `@media (pointer: fine)` |
| Modify | `app/components/common/Button.tsx` | Spread `useCursor()` handlers |
| Modify | `app/components/common/NavBar.tsx` | Spread `useCursor()` on nav links + ThemeToggle wrapper |
| Modify | `app/components/feature/ProjectsScroller.tsx` | Spread `useCursor()` on `ProjectCard` + scroll buttons |
| Modify | `app/components/feature/ContactSection.tsx` | Spread `useCursor()` on social icon links |

---

## Task 1: Create CursorContext

**Files:**
- Create: `app/components/common/CursorContext.tsx`

- [ ] **Step 1: Create the file**

```tsx
'use client';

import { createContext, useContext, useState } from 'react';

type CursorContextType = {
  isHovered: boolean;
  setHovered: (v: boolean) => void;
};

const CursorContext = createContext<CursorContextType>({
  isHovered: false,
  setHovered: () => {},
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [isHovered, setHovered] = useState(false);
  return (
    <CursorContext.Provider value={{ isHovered, setHovered }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursorContext() {
  return useContext(CursorContext);
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors related to `CursorContext.tsx`

- [ ] **Step 3: Commit**

```bash
git add app/components/common/CursorContext.tsx
git commit -m "feat: add CursorContext for hover state"
```

---

## Task 2: Create useCursor hook

**Files:**
- Create: `app/components/common/useCursor.ts`

- [ ] **Step 1: Create the file**

```ts
import { useCursorContext } from './CursorContext';

export function useCursor() {
  const { setHovered } = useCursorContext();
  return {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add app/components/common/useCursor.ts
git commit -m "feat: add useCursor hook"
```

---

## Task 3: Create CustomCursor component

**Files:**
- Create: `app/components/common/CustomCursor.tsx`

- [ ] **Step 1: Create the file**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useCursorContext } from './CursorContext';

export default function CustomCursor() {
  const { isHovered } = useCursorContext();
  const [isTouch, setIsTouch] = useState(true); // default true = hidden until confirmed pointer device

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <>
      {/* Dot — follows mouse directly */}
      <motion.div
        className="pointer-events-none fixed z-[9999] h-2 w-2 rounded-full bg-amber-500"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={isHovered ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring — follows with spring delay */}
      <motion.div
        className="pointer-events-none fixed z-[9999] h-10 w-10 rounded-full border-2 border-neutral-900 dark:border-white"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={isHovered ? { scale: 1.6, opacity: 0.4 } : { scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add app/components/common/CustomCursor.tsx
git commit -m "feat: add CustomCursor component"
```

---

## Task 4: Wire CursorProvider and CustomCursor into layout

**Files:**
- Modify: `app/(site)/layout.tsx`

- [ ] **Step 1: Update layout.tsx**

Replace the entire file content with:

```tsx
import { Suspense } from 'react';
import NavBar from '../components/common/NavBar';
import Footer from '../components/common/Footer';
import { ThemeProvider } from '../components/common/ThemeProvider';
import { CursorProvider } from '../components/common/CursorContext';
import CustomCursor from '../components/common/CustomCursor';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <CursorProvider>
        <CustomCursor />
        <NavBar />
        <main id="main" className="flex-1">{children}</main>
        <Suspense>
          <Footer />
        </Suspense>
      </CursorProvider>
    </ThemeProvider>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add app/(site)/layout.tsx
git commit -m "feat: wire CursorProvider and CustomCursor into site layout"
```

---

## Task 5: Hide default cursor via CSS

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add cursor:none rule**

Append to `app/globals.css`:

```css
@media (pointer: fine) {
  * {
    cursor: none !important;
  }
}
```

- [ ] **Step 2: Verify dev server shows no default cursor on desktop**

Run: `npm run dev`
Open http://localhost:3000 in a desktop browser. The default arrow cursor should be gone and replaced by the custom cursor.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: hide default cursor on pointer-fine devices"
```

---

## Task 6: Add useCursor to Button

**Files:**
- Modify: `app/components/common/Button.tsx`

- [ ] **Step 1: Update Button.tsx**

Replace the entire file content with:

```tsx
import Link from 'next/link';
import { useCursor } from './useCursor';

type BaseProps = {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
  className?: string;
};

type ButtonAsLink = BaseProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantClasses: Record<NonNullable<BaseProps['variant']>, string> = {
  primary: 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900',
  outline: 'border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white',
};

const base = 'group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5';

export default function Button({ variant = 'primary', children, className = '', href, onClick, type = 'button' }: ButtonProps) {
  const cursorHandlers = useCursor();
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...cursorHandlers}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...cursorHandlers}>
      {children}
    </button>
  );
}
```

Note: `Button` is not a `'use client'` component yet — adding `useCursor` (which calls a context) requires adding `'use client'` at the top.

- [ ] **Step 2: Add 'use client' directive**

The file now uses a hook with React context. Add `'use client';` as the very first line of `app/components/common/Button.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { useCursor } from './useCursor';
// ... rest of file unchanged
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add app/components/common/Button.tsx
git commit -m "feat: add cursor hover handlers to Button"
```

---

## Task 7: Add useCursor to NavBar links

**Files:**
- Modify: `app/components/common/NavBar.tsx`

- [ ] **Step 1: Import useCursor and apply to nav links**

In `app/components/common/NavBar.tsx`, add the import and apply handlers to each `<Link>` in the nav and the logo link. The file is already `'use client'`.

Replace the imports block (top of file, after `'use client'`):

```tsx
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from './useCursor';
```

Inside the component, before the return statement, add:

```tsx
const cursorHandlers = useCursor();
```

Apply `{...cursorHandlers}` to the logo `<Link>`:

```tsx
<Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-2xl font-bold font-heading text-neutral-900 dark:text-white tracking-tight" {...cursorHandlers}>
  Bram Verslype
</Link>
```

Apply `{...cursorHandlers}` to the nav item `<Link>`:

```tsx
<Link href={`#${id}`} className={`transition-colors ${isActive ? 'text-neutral-900 dark:text-white' : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'}`} {...cursorHandlers}>
  {label}
</Link>
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add app/components/common/NavBar.tsx
git commit -m "feat: add cursor hover handlers to NavBar links"
```

---

## Task 8: Add useCursor to ProjectCard and scroll buttons

**Files:**
- Modify: `app/components/feature/ProjectsScroller.tsx`

- [ ] **Step 1: Import useCursor**

`ProjectsScroller.tsx` is already `'use client'`. Add to the import block:

```tsx
import { useCursor } from '@/app/components/common/useCursor';
```

- [ ] **Step 2: Apply handlers to ProjectCard**

Inside `ProjectCard`, add:

```tsx
const cursorHandlers = useCursor();
```

Spread onto the root `<motion.div>`:

```tsx
<motion.div
  ref={cardRef}
  custom={index}
  variants={cardVariants}
  initial="hidden"
  animate={isInView ? 'show' : 'hidden'}
  whileHover={{ y: -8 }}
  className="flex w-[calc(100vw-3rem)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-[border-color] duration-300 hover:border-amber-500 sm:w-80 md:w-96 dark:border-white/10 dark:bg-white/5 dark:hover:border-amber-500"
  {...cursorHandlers}
>
```

- [ ] **Step 3: Apply handlers to scroll buttons**

Inside `ProjectsScroller`, add:

```tsx
const cursorHandlers = useCursor();
```

Spread onto both `<button>` elements (the left and right scroll buttons):

```tsx
<button
  onClick={() => scroll('left')}
  aria-label="Scroll left"
  className="absolute top-1/2 left-4 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-md transition-colors hover:border-amber-500 md:flex dark:border-white/10 dark:bg-neutral-800 dark:text-white dark:hover:border-amber-500"
  {...cursorHandlers}
>
```

```tsx
<button
  onClick={() => scroll('right')}
  aria-label="Scroll right"
  className="absolute top-1/2 right-4 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-md transition-colors hover:border-amber-500 md:flex dark:border-white/10 dark:bg-neutral-800 dark:text-white dark:hover:border-amber-500"
  {...cursorHandlers}
>
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add app/components/feature/ProjectsScroller.tsx
git commit -m "feat: add cursor hover handlers to ProjectCard and scroll buttons"
```

---

## Task 9: Add useCursor to ContactSection social links

**Files:**
- Modify: `app/components/feature/ContactSection.tsx`

- [ ] **Step 1: Make ContactSection a client component and add useCursor**

`ContactSection.tsx` currently has no `'use client'` directive. Add it as the first line, then import `useCursor`:

```tsx
'use client';

import { Mail } from 'lucide-react';
import { Icon } from '@iconify/react';
import Button from '@/app/components/common/Button';
import FadeIn from '@/app/components/common/FadeIn';
import { useCursor } from '@/app/components/common/useCursor';
```

Inside the component, add:

```tsx
const cursorHandlers = useCursor();
```

Spread onto both social icon `<a>` elements:

```tsx
<a href="https://github.com/VerslypeBram" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-11 h-11 flex items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:border-amber-500 dark:hover:border-amber-500 hover:-translate-y-1 transition-all duration-300" {...cursorHandlers}>
  <Icon icon="simple-icons:github" width={18} height={18} />
</a>
<a href="https://linkedin.com/in/bram-verslype" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-11 h-11 flex items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:border-amber-500 dark:hover:border-amber-500 hover:-translate-y-1 transition-all duration-300" {...cursorHandlers}>
  <Icon icon="simple-icons:linkedin" width={18} height={18} />
</a>
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add app/components/feature/ContactSection.tsx
git commit -m "feat: add cursor hover handlers to ContactSection social links"
```

---

## Task 10: Final visual verification

- [ ] **Step 1: Run dev server**

Run: `npm run dev`
Open http://localhost:3000

- [ ] **Step 2: Verify default cursor is hidden**

Move the mouse anywhere on the page — the browser's default arrow cursor must not be visible.

- [ ] **Step 3: Verify dot + ring appear**

The amber dot should track the mouse position exactly. The ring should follow with a slight spring delay.

- [ ] **Step 4: Verify hover on Button**

Hover over "View My Work" or "About Me" buttons in the hero section — the dot must disappear and the ring must scale up and become semi-transparent.

- [ ] **Step 5: Verify hover on nav links**

Hover over "About Me", "Expertise", "My Work", "Contact" in the navbar — same merge animation.

- [ ] **Step 6: Verify hover on project cards**

Hover over a project card — dot disappears, ring scales.

- [ ] **Step 7: Verify touch devices unaffected**

If available, test on a mobile device or use Chrome DevTools device emulation — the custom cursor must not appear and the default cursor behavior must be intact.

- [ ] **Step 8: Verify dark mode**

Toggle dark mode — the ring border must switch from `neutral-900` to `white`.

- [ ] **Step 9: Final commit**

```bash
git add .
git commit -m "feat: custom Framer Motion cursor complete"
```
