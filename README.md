# Serghei Gomco — portfolio site

Personal portfolio built with **Next.js (App Router)**, TypeScript, Tailwind CSS 4 and MDX.
Every page is static; the only server code is the contact form's server action.

## Run

```bash
nvm use        # Node 22 (Next.js 16 needs Node ≥ 20.9)
npm install
cp .env.example .env.local   # optional: without keys the form runs in dry mode
npm run dev                  # http://localhost:3000
npm run typecheck && npm test && npm run build
```

## Structure

```
app/
  layout.tsx                 fonts, header/footer, default metadata (title template, OG)
  page.tsx                   home: intro, highlights, featured projects
  projects/page.tsx          grid: personal projects + work case studies
  projects/[slug]/page.tsx   case study from MDX (generateStaticParams, dynamicParams = false)
  about/page.tsx             about, experience, skills
  contact/                   page + client form (useActionState) + server action (Resend)
  sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
content/projects/*.mdx       one file per case study; `export const meta = {...}` + Markdown body
lib/projects.ts              slug whitelist + loaders (the only place to register a new case)
lib/contact.ts               form parsing, honeypot and validation (unit-tested)
lib/site.ts                  name, role, public links
```

## Add a case study

1. Create `content/projects/my-case.mdx` with `export const meta = { title, summary, kind, year, stack, links?, featured? }`.
2. Add `"my-case"` to `projectSlugs` in `lib/projects.ts`.

The page, the grid and the sitemap pick it up automatically.

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Absolute URL for canonical links, sitemap and OG |
| `RESEND_API_KEY` | Resend API key (server only) |
| `CONTACT_FROM_EMAIL` | Sender on a domain verified in Resend |
| `CONTACT_TO_EMAIL` | Inbox that receives messages — never hard-coded |

Without the three Resend variables the form validates and logs in development, and shows a friendly error in production.

## Deploy (Vercel)

Import the repo in Vercel, framework preset "Next.js", add the variables above. No custom server, no database.
