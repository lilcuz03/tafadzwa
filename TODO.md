# TODO - Home page SEO + consistent typography/padding

- [ ] Update `app/page.tsx`
  - [ ] Add proper `export const metadata` (title/description/OG/Twitter)
  - [ ] Improve semantics: wrap in `<main>`, enforce single `h1`, fix heading hierarchy
  - [ ] Standardize padding + font sizes across sections (hero, stats, skills, qualifications, CTA)
  - [ ] Remove/replace any non-standard tailwind classes that likely don’t apply
- [ ] Optionally update `app/layout.tsx`
  - [ ] Replace placeholder metadata defaults with site-relevant title/description
- [ ] Optionally update `app/globals.css`
  - [ ] Align global font-family with Geist fonts used in `app/layout.tsx`
- [ ] Run `npm run lint` and `npm run build`

