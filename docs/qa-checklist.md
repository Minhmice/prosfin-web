# QA Checklist - Phase 7 Release

## Tổng quan

Checklist này dùng để QA trước và sau khi release Phase 7 (Redirects + SEO Hardening).

---

## Pre-Release QA

### 1. Redirect QA (Must-Pass)

#### Test Matrix

**Insights Legacy Routes:**
- [ ] `/research` → `/insights` (301)
- [ ] `/research/anything` → `/insights` (301)
- [ ] `/insights/research` → `/insights` (301)
- [ ] `/knowledge` → `/insights` (301)
- [ ] `/knowledge/anything` → `/insights` (301)
- [ ] `/resources` → `/insights?format=an-pham` (301)
- [ ] `/resources/anything` → `/insights?format=an-pham` (301)
- [ ] `/case-studies` → `/insights?format=case-study` (301)
- [ ] `/case-studies/anything` → `/insights?format=case-study` (301)
- [ ] `/insights/case-studies` → `/insights?format=case-study` (301)

**Services Legacy Routes:**
- [ ] `/services/cleardata` → `/services/ke-toan-thue/prosfin-cleardata` (301)
- [ ] `/services/oneledger` → `/services/kiem-soat-noi-bo/oneledger` (301)

#### Test Methods

**Browser Manual Test:**
1. Open browser DevTools → Network tab
2. Navigate to legacy URL
3. Verify:
   - Status code: 301 (permanent redirect)
   - Location header points to canonical URL
   - Final page loads correctly

**cURL Test:**
```bash
# Test redirect
curl -I https://prosfin.vn/research

# Expected:
# HTTP/1.1 301 Moved Permanently
# Location: /insights
```

#### Anti-Pattern Checks

- [ ] No redirect loops (A → B → A)
- [ ] No redirect chains (A → B → C, should be A → C)
- [ ] No 404s from any nav link (Navbar/Footer/CTA)
- [ ] All redirects are permanent (301, not 302)

---

### 2. SEO QA Checklist

#### Metadata Verification

**Services:**
- [ ] `/services` - Title, description, OG tags correct
- [ ] `/services/[category]` - Title includes category, description correct
- [ ] `/services/[category]/[service]` - Title includes service, description from tagline

**Insights:**
- [ ] `/insights` - Title "Góc nhìn | ProsFIN", description correct
- [ ] `/insights/[slug]` - Title includes insight title, description from summary

**Recruitment:**
- [ ] `/recruitment` - Title "Tuyển dụng | ProsFIN", description correct
- [ ] `/recruitment/brokerage` - Title includes page label
- [ ] `/recruitment/training` - Title includes page label
- [ ] `/recruitment/talent-pool` - Title correct

**Request Proposal:**
- [ ] `/request-proposal` - Title, description, OG tags correct
- [ ] `/request-proposal/thanks` - Has noindex (robots: { index: false })

#### robots.txt

- [ ] `/robots.txt` accessible
- [ ] Contains sitemap URL: `Sitemap: https://prosfin.vn/sitemap.xml`
- [ ] Disallows `/api/`, `/admin/`, `/_next/`, `/request-proposal/thanks`
- [ ] Allows all public routes

**Test:**
```bash
curl https://prosfin.vn/robots.txt
```

#### sitemap.xml

- [ ] `/sitemap.xml` accessible
- [ ] Contains all expected entries:
  - [ ] Home page (`/`)
  - [ ] Services hub (`/services`)
  - [ ] All service categories (`/services/[category]`)
  - [ ] All service detail pages (`/services/[category]/[service]`)
  - [ ] Insights hub (`/insights`)
  - [ ] All insight detail pages (`/insights/[slug]`)
  - [ ] Recruitment hub (`/recruitment`)
  - [ ] Recruitment pages (`/recruitment/brokerage`, `/recruitment/training`, `/recruitment/talent-pool`)
  - [ ] Request proposal (`/request-proposal`)
- [ ] Does NOT contain `/request-proposal/thanks`
- [ ] All URLs are absolute (include domain)
- [ ] lastModified dates are set
- [ ] Priorities are reasonable (1.0 for hubs, 0.8 for categories, 0.6-0.7 for details)

**Test:**
```bash
curl https://prosfin.vn/sitemap.xml
```

#### Canonical URLs

- [ ] All pages have canonical URL set
- [ ] Canonical URLs use absolute URLs (include domain)
- [ ] Canonical URLs match actual page URL (no mismatch)
- [ ] Internal links use canonical paths (not legacy paths)

---

### 3. UX/Accessibility Regression Tests

#### Navigation

- [ ] Navbar keyboard navigation works (Tab, Enter, Escape)
- [ ] Mobile menu opens/closes correctly
- [ ] Mobile menu closes on navigation
- [ ] Focus visible states work
- [ ] No focus trap issues

#### Content Templates

- [ ] Service detail sections spacing consistent
- [ ] Insights filter bar works
- [ ] Insights empty state displays correctly
- [ ] Talent pool filter bar works
- [ ] Talent pool empty state displays correctly

#### Mobile

- [ ] Header menu responsive
- [ ] No horizontal overflow
- [ ] No scroll trap
- [ ] Touch targets adequate size

---

### 4. Performance / Build Checks

#### Build

- [ ] `next build` completes without errors
- [ ] `next lint` passes (no lint errors)
- [ ] `next start` runs successfully

#### Bundle Size

- [ ] No significant bundle size regressions
- [ ] Check with `next build --analyze` (if available)

#### Core Web Vitals (Baseline)

- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] FID (First Input Delay) < 100ms (or INP < 200ms)

---

## Post-Release Monitoring (7-14 days)

### Immediate (24-48h)

- [ ] Monitor 404 rate (logs/analytics)
- [ ] Check redirect hits (analytics)
- [ ] Verify no redirect loops in logs
- [ ] Check Search Console for crawl errors

### Week 1

- [ ] Monitor 404 rate trends
- [ ] Check redirect destination accuracy
- [ ] Review Search Console Coverage report
- [ ] Verify sitemap submission (if using Google Search Console)

### Week 2

- [ ] Continue monitoring 404s
- [ ] Check if redirects are being followed correctly
- [ ] Review any new crawl errors
- [ ] Verify metadata rendering in search results (if indexed)

---

## Staging Rehearsal Checklist

Before production release, test on staging:

- [ ] Deploy staging with redirects ON
- [ ] Deploy staging with sitemap/robots ON
- [ ] Smoke test 20-30 critical URLs:
  - [ ] Top 5 services
  - [ ] Top 5 insights
  - [ ] All recruitment pages
  - [ ] Request proposal form
  - [ ] Legacy routes (research, knowledge, resources, case-studies)
- [ ] Fix any issues found immediately
- [ ] Re-test after fixes

---

## Production Release Checklist

### Pre-Deploy

- [ ] All QA tests passed
- [ ] Staging rehearsal successful
- [ ] Backup current production (if applicable)
- [ ] Notify team of release

### Deploy

- [ ] Deploy production
- [ ] Verify build successful
- [ ] Verify no errors in logs

### Post-Deploy (Immediate)

- [ ] Verify `/robots.txt` accessible
- [ ] Verify `/sitemap.xml` accessible
- [ ] Test 5-10 critical redirects:
  - [ ] `/research` → `/insights`
  - [ ] `/resources` → `/insights?format=an-pham`
  - [ ] `/case-studies` → `/insights?format=case-study`
  - [ ] `/services/cleardata` → `/services/ke-toan-thue/prosfin-cleardata`
  - [ ] `/services/oneledger` → `/services/kiem-soat-noi-bo/oneledger`
- [ ] Submit sitemap in Google Search Console (if using)
- [ ] Monitor error logs for 1 hour

---

## Rollback Plan

If critical issues found:

1. **Redirect issues**: Can be fixed by updating `redirects.ts` and redeploying
2. **Metadata issues**: Can be fixed by updating page metadata and redeploying
3. **Build failures**: Revert to previous commit
4. **404 spikes**: Check redirect rules, verify canonical paths exist

---

## Notes

- Keep redirects active long-term (at least one crawl cycle + bookmarks + backlinks)
- Monitor 404s and redirect hits regularly
- Update redirects if new legacy routes discovered
- Consider structured data (JSON-LD) for future SEO enhancement

