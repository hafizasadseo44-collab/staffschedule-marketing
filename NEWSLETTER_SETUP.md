# Newsletter & Email Marketing System — Setup Guide

This document walks you through everything you need to do to take the new
newsletter system live. Everything has been built and committed — you just need
to wire up a few environment variables and the Resend account.

---

## 1. What was built

### Database
- Extended `Subscriber` model with `name`, `status`, granular preferences
  (productUpdates, schedulingTips, industryInsights, featureReleases,
  announcements, weeklyDigest), source tracking, tags, engagement counters,
  and unsubscribe tokens.
- New `Campaign` model — full lifecycle (DRAFT → SCHEDULED → SENDING → SENT /
  FAILED), per-campaign stats, source references back to blog posts.
- New `EmailEvent` model — per-recipient event log (SENT, OPEN, CLICK,
  UNSUBSCRIBE, BOUNCE, COMPLAINT) for analytics.
- New `EmailTemplate` model — reusable custom HTML templates.
- `lib/db-init.ts` migrates existing live databases idempotently — no manual
  SQL needed on Hostinger.

### Emails (React Email)
- `emails/WelcomeEmail.tsx` — premium hero, quick wins, popular reads, social.
- `emails/BlogPostEmail.tsx` — auto-generated for blog/news/guide posts.
- `emails/WeeklyDigestEmail.tsx` — featured article + more + guides + product
  updates, in a single beautifully designed Monday-morning email.
- `emails/ProductUpdateEmail.tsx` — feature releases / announcements.
- `emails/components/EmailLayout.tsx` — shared branded layout (logo, footer,
  unsubscribe, preferences).
- `emails/components/Button.tsx` — gradient CTA buttons.

### Public-facing
- `components/newsletter/NewsletterForm.tsx` — 5 variants:
  - `card` (standalone hero card)
  - `inline` (footer/sidebar)
  - `minimal` (zero-chrome)
  - `split` (2-col with marketing copy)
  - `dark` (dark gradient hero)
- All variants have honeypot anti-bot, optional name field, rate limiting,
  source-page attribution, and tag support.
- `app/preferences/page.tsx` — premium token-protected preferences page.
- `app/unsubscribe/page.tsx` — redirects to the branded confirmation page.

### APIs
- `POST /api/subscribe` — rate-limited (5/min/IP), honeypot-protected,
  disposable-domain blocked, sends welcome email immediately.
- `GET/POST /api/unsubscribe` — supports both legacy email links and new
  token links, plus RFC 8058 one-click.
- `GET/PUT /api/newsletter/preferences` — token-based preference management.
- `GET /api/admin/marketing/overview` — KPIs, growth chart, recent activity.
- `GET /api/admin/subscribers` — search/filter/export CSV.
- `PATCH/DELETE /api/admin/subscribers/[id]` — edit status + tags, delete.
- `GET/POST /api/admin/campaigns` — list/create.
- `GET/PUT/DELETE /api/admin/campaigns/[id]` — read/update/remove.
- `POST /api/admin/campaigns/[id]/send` — send a stored campaign.
- `POST /api/admin/campaigns/from-blog` — auto-generate from a blog post.
- `POST /api/admin/digest/send` — manually trigger weekly digest now.
- `GET /api/admin/templates` — built-in + custom templates.
- `GET /api/admin/analytics` — 7/30/90-day analytics with time series.
- `GET /api/email/track/open/[id].gif` — 1x1 pixel opens tracking.
- `GET /api/email/track/click/[id]` — click tracking + safe redirect.
- `GET/POST /api/cron/weekly-digest?secret=...` — cron-protected weekly digest.

### Admin Dashboard
A new "Marketing" sidebar group has been added with 5 views:
- **Overview** — KPI tiles, 30-day subscriber growth chart, recent activity.
- **Subscribers** — search, filter by status / tag, inline tag editing,
  status switching, CSV export, pagination.
- **Campaigns** — list with live stats, send-from-blog quick action, weekly
  digest trigger, create-from-scratch with HTML editor and preference targeting.
- **Templates** — built-in template gallery + custom template management.
- **Email Analytics** — 7/30/90d toggle, KPIs, engagement timeseries, top
  campaigns, top signup sources.

### Site wiring
- Footer newsletter form upgraded to use the new system.
- Blog post pages now include a premium "split" newsletter CTA before related
  posts.
- Blog editor (`/admin/blog-editor/[id]`) now has a one-click "Send
  Newsletter" button (visible only on published posts) that auto-generates and
  sends a beautiful branded campaign.

### Security
- Rate limiting (`lib/rate-limit.ts`) — 5 subscribes/min/IP.
- Honeypot field in all subscribe forms.
- Disposable email domain blocking.
- Email validation (RFC-shape regex).
- Open-redirect protection on click tracker.
- All admin endpoints require a valid `admin_token` JWT cookie.
- Cron endpoint protected by `CRON_SECRET` env var.

---

## 2. What I need from you

### A. Resend account (free tier is fine to start — 3,000 emails/mo, 100/day)
1. Sign up at https://resend.com.
2. **Create an API key**: Dashboard → API Keys → "Create API Key" →
   permission level "Sending access". Copy the key (`re_...`).
3. **Add and verify your domain**: Dashboard → Domains → "Add Domain" →
   `staffschedule.io`. Resend will give you 4 DNS records:
   - 1× MX record (`feedback-smtp.us-east-1.amazonses.com`, priority 10)
   - 2× TXT records (SPF + DKIM, the long `k1._domainkey...` one)
   - 1× DMARC record (optional but recommended)
4. **Add them in Hostinger DNS Zone Editor** (hPanel → Domains → DNS Zone)
   exactly as shown. Resend usually verifies within 5–10 minutes.
5. **Verify "Verified" status** in Resend before going live.
6. **Set up the 3 mailbox addresses** in Hostinger Email (hPanel → Emails):
   - `hello@staffschedule.io` — your main inbox, you check this daily
   - `newsletter@staffschedule.io` — can forward to `hello@` (it's a sender-only address)
   - `noreply@staffschedule.io` — can forward to `/dev/null` or `hello@`
   Verifying the domain on Resend covers ALL three @staffschedule.io addresses
   as senders — you don't need to add them individually in Resend.

### B. Environment variables to set on Hostinger
Open Hostinger hPanel → your Node.js app → Environment Variables. Add:

```bash
# ─── Email — REQUIRED for the system to actually send mail ───
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 3 dedicated business email senders (must all exist as forwarding inboxes
# at your domain, or the whole domain must be Resend-verified):
RESEND_FROM_HELLO=StaffSchedule.io <hello@staffschedule.io>
RESEND_FROM_NEWSLETTER=StaffSchedule.io Team <newsletter@staffschedule.io>
RESEND_FROM_NOREPLY=StaffSchedule.io <noreply@staffschedule.io>

# Reply-To addresses — route replies to a human inbox
RESEND_REPLY_TO_NEWSLETTER=hello@staffschedule.io
RESEND_REPLY_TO_NOREPLY=hello@staffschedule.io

# Where contact form submissions are routed
CONTACT_INBOX=hello@staffschedule.io

# Public site URL — used in all email links (unsubscribe, tracking, CTAs)
NEXT_PUBLIC_SITE_URL=https://staffschedule.io

# Cron protection — required for the weekly digest endpoint
CRON_SECRET=<generate a random 32-char hex string — see below>

# Existing vars you should already have set:
DATABASE_URL=file:./prod.db
JWT_SECRET=<your existing strong random string>
ADMIN_EMAIL=hafizasadullahseo@gmail.com
ADMIN_PASSWORD=<your existing admin password>
```

#### Which sender is used for what?

| Sender | Purpose | Used by |
|---|---|---|
| `hello@` | Two-way conversations | Contact form auto-reply (the user receives this from hello@; if they hit Reply, it goes to hello@) |
| `newsletter@` | Broadcast marketing | Blog newsletter, weekly digest, product updates, custom campaigns. Reply-To set to `hello@` |
| `noreply@` | Automated/transactional | Welcome email, contact form notification (the one you receive). Reply-To set to the submitter so you can reply directly |

To generate `CRON_SECRET` on Windows (in PowerShell):
```powershell
-join ((48..57) + (97..102) | Get-Random -Count 32 | % {[char]$_})
```

Or on Linux/Mac:
```bash
openssl rand -hex 16
```

### C. Set up the weekly digest cron (optional but recommended)
The weekly digest does NOT auto-fire — you need an external cron service to
hit the endpoint. Use the free **cron-job.org**:

1. Sign up at https://cron-job.org (free).
2. Create a new cron job:
   - **Title**: StaffSchedule Weekly Digest
   - **URL**: `https://staffschedule.io/api/cron/weekly-digest?secret=YOUR_CRON_SECRET`
   - **Schedule**: Every Monday at 09:00 UTC (or whenever you want)
   - **Notifications**: Enable failure emails to yourself
3. Save and enable.

You can also trigger the digest manually anytime from the admin dashboard:
**Campaigns → Send Weekly Digest** button.

---

## 3. Landing in Gmail's Primary Inbox (not Promotions)

Gmail uses an algorithm to categorize incoming mail into Primary / Promotions
/ Social tabs. It looks at **visual signals** (gradient banners, big CTAs,
multiple columns), **language** (marketing words, urgency), and **sender
reputation**. Out of the box, marketing-style emails land in Promotions.

The system is already optimized for Primary on welcome emails:
- Welcome uses a plain-text-style template (no hero banner, no big buttons)
- Sent from a personal-looking address: `Hafiz from StaffSchedule.io <hello@>`
- No tracking pixel (strong promo signal)
- Conversational subject: "Quick hello, {firstName}"
- Asks the reader to drag the email to Primary

For broadcast newsletters, Promotions placement is acceptable (and even
expected — that's where users look for newsletters they subscribed to). To
maximize Primary placement, use the subject-line analyzer that appears
under the Subject field in the Create Campaign form. Aim for "Likely Primary"
(green pill) before sending.

### Additional steps to improve overall deliverability

1. **Add a DMARC DNS record** at Hostinger (if not done yet):

   | Type | Name | Value |
   |---|---|---|
   | TXT | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:hello@staffschedule.io; pct=100; adkim=s; aspf=s;` |

2. **Warm up the sender** — for the first 2 weeks, send to fewer than
   100 subscribers per day so Gmail builds trust in the sender reputation.

3. **Ask new subscribers to add `hello@staffschedule.io` to their contacts** —
   the welcome email already does this implicitly with the "drag to Primary"
   instruction.

4. **Avoid Promotions trigger words** in subject lines — the analyzer in
   the admin will flag them in real time.

5. **Monitor open rates** in **Marketing → Email Analytics**. If open rate
   drops below 15%, your sender reputation is suffering — review subject
   lines and reduce send frequency.

### D. Test before going live
1. Visit `/admin` and log in.
2. Click **Marketing → Subscribers**. The dashboard should load.
3. Open an incognito tab and visit your site.
4. Subscribe with a real email address through the footer.
5. Within ~5 seconds you should receive the beautifully designed welcome
   email (from `noreply@staffschedule.io`, Reply-To `hello@`).
6. Click "Manage preferences" in the email — verify the preferences page loads.
7. Click "Unsubscribe" — verify the branded confirmation page.
8. Re-subscribe and confirm you receive the welcome email again.
9. Visit `/contact`, submit the demo form. You should receive:
   - An auto-reply from `hello@` to the email you submitted
   - A notification in your `hello@` inbox with all the form details
10. Publish a blog post (or use an existing one) → click the new
    **Send Newsletter** button in the editor → verify the campaign goes out
    (from `newsletter@`) and appears in **Marketing → Campaigns** with stats
    updating as people open/click.

### E. Database deployment notes
- The schema migration is **automatic** — `lib/db-init.ts` runs on first API
  hit after deploy and adds the new columns + tables to the live SQLite
  database without you touching the server.
- No data loss — all existing subscribers are preserved and their `active`
  flag is mapped to `status: ACTIVE`.
- If you ever want to start fresh, just delete `prod.db` and let `db-init`
  recreate everything.

---

## 3. Files you should NOT need to touch

But know they exist if you want to customize:

- **Templates**: `emails/*.tsx` — change copy, colors, layouts here.
- **Brand colors**: `emails/components/EmailLayout.tsx` — `BRAND` constant.
- **Rate limit**: `lib/rate-limit.ts` — currently 5 subscribes/min/IP.
- **Disposable domains**: `app/api/subscribe/route.ts` — `DISPOSABLE_DOMAINS`.
- **Batch size**: `lib/email-service.ts` — `BATCH_SIZE` (default 50, Resend max).

---

## 4. Future enhancements (architecture is ready for)

The system was built so you can add these without rebuilding:

- **Segments**: filter subscribers by tag, source, engagement — already
  supported in `resolveAudience()`.
- **Drip campaigns**: trigger emails N days after subscription — add a cron
  endpoint that queries Subscribers and uses `sendCampaignBatch()`.
- **A/B testing**: store two `contentHtml` versions on a Campaign, split
  recipients, compare `totalOpened/totalClicked`.
- **Resend webhooks**: hook Resend bounce/complaint events into
  `/api/email/webhook/resend` and call `db.subscriber.update` with
  `status: 'BOUNCED'` / `'COMPLAINED'`.
- **Lead magnets**: add a `magnetSlug` field to Subscriber and a delivery
  email template; trigger from form submission.

---

## 5. Quick checklist (tick these off)

- [ ] Resend account created
- [ ] API key generated
- [ ] Domain `staffschedule.io` added + DNS records pasted into Hostinger
- [ ] Domain shows "Verified" in Resend dashboard
- [ ] `hello@`, `newsletter@`, `noreply@` mailboxes set up in Hostinger Email
- [ ] All 9 env vars set on Hostinger (RESEND_API_KEY, RESEND_FROM_HELLO,
      RESEND_FROM_NEWSLETTER, RESEND_FROM_NOREPLY, RESEND_REPLY_TO_NEWSLETTER,
      RESEND_REPLY_TO_NOREPLY, CONTACT_INBOX, NEXT_PUBLIC_SITE_URL, CRON_SECRET)
- [ ] App redeployed on Hostinger (git push)
- [ ] Test subscribe → received welcome email (from noreply@)
- [ ] Test unsubscribe → branded confirmation page
- [ ] Test preferences page (link from welcome email)
- [ ] Test contact form → received both auto-reply AND inbox notification
- [ ] Admin dashboard `/admin` → Marketing tab loads
- [ ] Sent test campaign from a blog post (from newsletter@)
- [ ] cron-job.org set up for weekly digest (optional)

That's it. Everything else is wired in and ready to go.
