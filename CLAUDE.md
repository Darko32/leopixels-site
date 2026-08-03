# CLAUDE.md

# LeoPixels Website - Project Instructions

## Project Overview

LeoPixels is a premium, modern web design agency website built with Next.js.
Every change should prioritize quality, maintainability, performance, accessibility, and SEO.

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- npm

---

## General Rules

- Always use TypeScript.
- Always use npm as the package manager.
- Follow the existing project structure.
- Keep code clean, readable, and maintainable.
- Prefer reusable components over duplicated code.
- Preserve existing code style and naming conventions.
- Remove unused imports, variables, and dead code.
- Do not modify unrelated files.
- Make the smallest change necessary to complete the task.

---

## Next.js Best Practices

Always prefer built-in Next.js features whenever possible.

- Use `next/image` instead of HTML `<img>`.
- Use `next/link` instead of HTML `<a>` for internal navigation.
- Use `next/font` for fonts.
- Use `next/script` for third-party scripts.
- Prefer Server Components by default.
- Only use Client Components when browser APIs, state, or event handlers are required.
- Follow App Router best practices.
- Keep pages statically rendered whenever possible.
- Optimize images, fonts, metadata, and routing using Next.js features.

---

## React Guidelines

- Prefer functional components.
- Keep components focused on a single responsibility.
- Extract reusable UI into shared components.
- Extract reusable logic into custom hooks when appropriate.
- Avoid unnecessary state.
- Avoid unnecessary re-renders.
- Use React best practices.

---

## Tailwind CSS

- Prefer Tailwind utilities over custom CSS.
- Reuse existing utility patterns.
- Avoid inline styles unless absolutely necessary.
- Keep class names organized and readable.

---

## Performance

Always optimize for performance.

- Minimize client-side JavaScript.
- Lazy load heavy components when appropriate.
- Optimize images.
- Avoid unnecessary network requests.
- Avoid unnecessary rendering.
- Keep bundle size as small as possible.
- Optimize Core Web Vitals.

---

## Accessibility

Accessibility is required.

- Use semantic HTML.
- Provide descriptive alt text.
- Ensure keyboard accessibility.
- Maintain proper heading hierarchy.
- Use ARIA attributes only when necessary.

---

## SEO

Always optimize pages for SEO.

- Use descriptive page titles.
- Add metadata where appropriate.
- Use semantic HTML.
- Optimize heading structure.
- Optimize images.
- Follow Next.js SEO best practices.

---

## Design Rules

Maintain the existing design language unless explicitly instructed otherwise.

- Keep layouts clean and modern.
- Maintain consistent spacing.
- Maintain typography consistency.
- Maintain consistent colors.
- Reuse existing UI components.
- Do not redesign existing sections without approval.
- Mobile-first responsive design

---

## Decision Making

- Never invent APIs.
- Never invent components.
- Never invent file paths.
- Never assume functionality exists.
- Inspect the project before making changes.
- If requirements are ambiguous, ask for clarification instead of guessing.

---

## Before Completing Any Task

Before considering a task complete:

1. Fix TypeScript errors introduced by your changes.
2. Remove unused imports.
3. Run:

```bash
npm run lint
```

if available.

Then run:

```bash
npm run build
```

If a command fails:

- Explain the reason.
- Do not ignore the error.
- Do not claim the task is complete if the project does not build.

---

## Goal

Every solution should be:

- Simple
- Maintainable
- Reusable
- Performant
- Accessible
- SEO-friendly
- Production-ready