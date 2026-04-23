# Task: Email System & Hostinger Deployment

## Hostinger Deployment Compatibility
- [x] Remove binary database files from Git tracking (`prisma/dev.db`, `prisma/dummy.db`)
- [x] Convert `next.config.ts` to universally compatible `next.config.js` (CommonJS)
- [x] Add `.nvmrc` with Node 20
- [x] Create `.env.example` with all production keys
- [x] Clean repository of all junk files and local-only scripts
- [x] Commit and Push clean structure to GitHub

## Email Subscription System
- [x] Add `Subscriber` model to Prisma schema
- [x] Synchronize database schema (`npx prisma db push`)
- [x] Implement API: `/api/subscribe` (Upsert logic + normalization)
- [x] Implement API: `/api/unsubscribe` (Branded landing page)
- [x] Create reusable `SubscribeForm` component (Premium Framer Motion UI)
- [x] Create `lib/email.ts` with Resend batch sending & Premium HTML template
- [x] Integrate `SubscribeForm` into:
    - [x] Global Footer (`PremiumFooter.tsx`)
    - [x] Blog Page (`BlogClientPage.tsx`)
    - [x] Guides Page (`GuidesClient.tsx`)
    - [x] News Detail Page (`app/news/[slug]/page.tsx`)
- [x] Implement automated triggers:
    - [x] Blog/News Create (`app/api/posts/route.ts`)
    - [x] Blog/News Update/Publish (`app/api/posts/[id]/route.ts`)
    - [x] Guide Create (`app/api/guides/route.ts`)
    - [x] Guide Update/Publish (`app/api/guides/[id]/route.ts`)

## Final Verification
- [ ] Run `npm run build` to ensure zero compilation errors
- [ ] Push all integration changes to GitHub
- [ ] Final handoff to USER for Hostinger deployment
