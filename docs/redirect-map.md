# Redirect Mapping - Legacy Routes to Insights Hub

## Tổng quan

Tài liệu này liệt kê các legacy routes cần redirect về `/insights` hub sau khi Phase 4 hoàn thành.

**Lưu ý:** Redirects sẽ được implement trong Phase 7 (SEO & Redirects) thông qua `next.config.js`.

## Redirect Rules

### 1. Research Routes

```
/research → /insights
/research/* → /insights
/insights/research → /insights
/insights/research/* → /insights
```

**Lý do:** Research content được gộp vào Insights Hub với filter theo topic/format.

### 2. Knowledge Routes

```
/knowledge → /insights
/knowledge/* → /insights
```

**Lý do:** Knowledge base được gộp vào Insights Hub.

### 3. Resources Routes

```
/resources → /insights?format=an-pham
/resources/* → /insights?format=an-pham
```

**Lý do:** Resources (ấn phẩm) được gộp vào Insights Hub với format filter "an-pham".

### 4. Case Studies Routes

```
/case-studies → /insights?format=case-study
/case-studies/* → /insights?format=case-study
/insights/case-studies → /insights?format=case-study
/insights/case-studies/* → /insights?format=case-study
```

**Lý do:** Case studies được gộp vào Insights Hub với format filter "case-study".

## Implementation Notes

### Phase 7 Implementation

Redirects sẽ được implement trong `next.config.js`:

```javascript
async redirects() {
  return [
    // Research
    {
      source: '/research',
      destination: '/insights',
      permanent: true,
    },
    {
      source: '/research/:path*',
      destination: '/insights',
      permanent: true,
    },
    {
      source: '/insights/research',
      destination: '/insights',
      permanent: true,
    },
    {
      source: '/insights/research/:path*',
      destination: '/insights',
      permanent: true,
    },
    // Knowledge
    {
      source: '/knowledge',
      destination: '/insights',
      permanent: true,
    },
    {
      source: '/knowledge/:path*',
      destination: '/insights',
      permanent: true,
    },
    // Resources
    {
      source: '/resources',
      destination: '/insights?format=an-pham',
      permanent: true,
    },
    {
      source: '/resources/:path*',
      destination: '/insights?format=an-pham',
      permanent: true,
    },
    // Case Studies
    {
      source: '/case-studies',
      destination: '/insights?format=case-study',
      permanent: true,
    },
    {
      source: '/case-studies/:path*',
      destination: '/insights?format=case-study',
      permanent: true,
    },
    {
      source: '/insights/case-studies',
      destination: '/insights?format=case-study',
      permanent: true,
    },
    {
      source: '/insights/case-studies/:path*',
      destination: '/insights?format=case-study',
      permanent: true,
    },
  ];
}
```

## Content Migration Status

### Completed (Phase 4)
- ✅ Insights Hub (`/insights`) với filter system
- ✅ Insights detail pages (`/insights/[slug]`)
- ✅ Filter by topic và format
- ✅ Related insights và services

### Pending (Phase 7)
- ⏳ Redirect implementation trong `next.config.js`
- ⏳ SEO metadata updates cho redirects
- ⏳ Analytics tracking cho redirects

## Notes

- Tất cả legacy routes đã được remove khỏi navbar trong Phase 2
- Case studies được gộp vào Insights Hub (không giữ route riêng)
- Redirects là permanent (301) để SEO tốt hơn

