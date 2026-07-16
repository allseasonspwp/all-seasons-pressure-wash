# All Seasons Pressure Wash LLC Website

Static website prepared for GitHub + Cloudflare Pages.

## Cloudflare Pages settings
- Production branch: `main`
- Framework preset: `None`
- Build command: leave blank
- Build output directory: `/`
- Root directory: leave blank

## Important
The quote forms are demonstrations until connected to QuoteIQ, Formspree, or a business email endpoint.

## Version 20 — Trustindex Phase
- Added Trustindex homepage review slider.
- Added Trustindex contact-page review button.
- Added Top Rated badge to website footers.
- Added a dedicated Reviews page.
- Added Reviews to primary navigation.
- Updated sitemap files.


## Version 21 — Production Trustindex Badge
- Replaced the footer-injected badge widget with Trustindex's exact floating certificate embed code.
- Added the certificate loader before the closing `</head>` tag on every HTML page.
- Floating badge configuration: Google / Trusted Site / lower-right / 3-second delay / 90% recommended mobile-friendly size.
- Homepage review slider remains widget `89daccb76e718508e386846d2bc`.
- Contact review button remains widget `76097c376fe38531a026de59284`.
- Floating certificate embed token: `494760976f9d8594f1168cefbc8`.

### Verify after deployment
1. Wait 1–3 minutes for Trustindex CDN propagation.
2. Open the live site in a private browser window.
3. Confirm the floating badge appears after approximately 3 seconds.
4. Test mobile overlap with call/text buttons. If needed, change badge alignment to lower-left or raise its bottom offset in Trustindex.
