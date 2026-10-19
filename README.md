# Weekndr.

A responsive React + Vite + Tailwind CSS travel prototype for students in Paris. Node.js 22+ recommended (validated with Node 24). No API keys, accounts, or backend required.

## Local preview

```sh
cd Weekndr
npm install
npm run dev
```

Open http://localhost:5173. From an existing checkout, `npm ci` reproduces the lockfile. In restricted environments with an unwritable home cache, append `--cache /tmp/weekndr-npm-cache` to npm installation commands.

```sh
npm test
npm run build
npm run preview
```

Production preview: http://localhost:4173. Browser tests:

```sh
npx playwright install chromium
npm run test:e2e
```

This cloud machine already has Chromium. Run `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e` to use it without downloading a browser. For a writable browser-download cache, prefix both Playwright commands with `PLAYWRIGHT_BROWSERS_PATH=/tmp/weekndr-browsers`. The current cloud network blocks external photos until `images.unsplash.com` is allowed; the image fallback is tested. The environment draft includes that domain for review.

## Vercel deployment (manual, requires your approval)

Nothing has been published or connected. First commit these files and push to your GitHub repository and intended branch. In Vercel, choose **Add New → Project**, import `meichunou/Weekndr`, and select that branch. Use **Vite**, repository root as Root Directory, **npm run build** as Build Command, and **dist** as Output Directory. Select Node.js 24.x (or a supported Node 22+). No environment variables are required. Review settings, then select **Deploy** when you authorize publication. Vercel supplies the public URL after successful deployment. No SPA rewrite is required: the app uses a single page with anchors and query parameters.

## What works and what is simulated

- Functional three-question quiz, back navigation, loading state, recommendation, budget breakdown, email validation, optional unchecked marketing consent, itinerary unlock, and reset.
- Matching is deterministic, not AI: budget compatibility first, transport second, vibe third. Travel/budget mismatches are disclosed. Eight sample destinations, two days and one hostel night; estimates are not live fares or booking offers.
- Email exists only in React memory, cleared by reset/reload. No email is sent, stored in a CRM, or submitted to any service. Marketing consent is a demo event, not a subscription. No booking, price alerts, AI API, or backend exists.
- `?demo=analytics` or the footer's **Demo analytics** button shows browser-local event counts. localStorage stores event names/timestamps only, capped at 10,000. These are not real visitor totals or qualified production leads. Reloads count as page views; repeat quiz starts can inflate ratios. Clear metrics in the privacy disclosure. Blocked storage does not prevent the quiz from working.
- Fonts are bundled. Destination photos are external Unsplash requests, with graceful image fallbacks. They reveal normal request metadata to the image provider; no email or quiz answers are sent. Imagery is illustrative and not a live destination feed.
- Future AI could replace `recommend` in `src/data.js` with verified transport/availability retrieval and generated itineraries. Production email delivery, consent retention, analytics, privacy compliance, and live pricing require separate approved integrations.

## Files

`src/main.jsx`: React page, quiz, gate, itinerary, demo metrics. `src/data.js`: destination fixtures and replaceable matcher. `src/style.css`: responsive design and Tailwind import. `tests/`: matcher and validation tests. `e2e/`: desktop/mobile browser tests. `vite.config.js` and `playwright.config.js`: build and test configuration.
