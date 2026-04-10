# The Guardians — Real Estate Landing

Next.js (App Router) + TypeScript + Tailwind CSS v4.

## Run

```bash
cd Guardians
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/` — routes, `layout.tsx`, `globals.css`
- `components/layout`, `components/sections`, `components/common`
- `constants/` — colors, typography, spacing
- `styles/` — shared class patterns (e.g. CTA)
- `hooks/`, `utils/`, `types/`
- `public/images/` — local SVG assets

Remote images use `next/image` with `images.unsplash.com` (see `next.config.ts`).
