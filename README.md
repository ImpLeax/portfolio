# Volodymyr Bondarchuk — Portfolio

A static portfolio for a Junior Python Backend Developer, built for recruiters and potential freelance clients. It presents Python and Django first, followed by practical projects, automation, bots, scraping and supporting frontend skills.

## Stack

- Astro with reusable components and typed content files
- Plain CSS with responsive layouts, restrained dark and light themes and reduced-motion support
- Lucide icons rendered as inline SVG; separate GitHub and LinkedIn brand marks
- Locally served Geist variable font with Latin and Ukrainian Cyrillic subsets
- Small vanilla JavaScript modules for accessible navigation, theme and language preferences
- GitHub Actions and GitHub Pages; no server, database or contact form

Node.js is needed only for development and the build. The published site is static HTML, CSS, font files and a small navigation script.

## Local development

Use Node.js 24 LTS and npm.

```sh
npm install
npm run dev
```

Open the URL printed by Astro, usually `http://localhost:4321/`.

```sh
npm run check     # Astro / TypeScript diagnostics
npm run build     # Check and build the production site into dist/
npm run preview   # Preview the production build locally
npm run format    # Format Astro, CSS, data and documentation
```

The committed `package-lock.json` provides reproducible installs. Use `npm ci` in a clean checkout or CI.

## GitHub Pages deployment

1. Create a public repository named `impleax.github.io` or `portfolio`, and push these files to its `main` branch, including `package-lock.json`.
2. In **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source.
3. The workflow at `.github/workflows/deploy.yml` installs dependencies, runs the production build and deploys the `dist/` artifact. It also supports manual runs from the Actions tab.
4. Wait for a successful deployment. The workflow’s deployment job links to the published site.

The workflow automatically detects the repository name:

| Repository                  | Site                                   | Base path     |
| --------------------------- | -------------------------------------- | ------------- |
| `ImpLeax/impleax.github.io` | `https://impleax.github.io/`           | `/`           |
| `ImpLeax/portfolio`         | `https://impleax.github.io/portfolio/` | `/portfolio/` |

`astro.config.mjs` defaults to the root site for local builds. To change the default for a project repository, change the fallback:

```js
const base = process.env.BASE_PATH || '/portfolio/';
```

Alternatively, supply `BASE_PATH` and `SITE_URL` when building. For a local check of the project path:

```sh
# macOS / Linux
BASE_PATH=/portfolio/ npm run build
BASE_PATH=/portfolio/ npm run preview
```

```powershell
# Windows PowerShell
$env:BASE_PATH = '/portfolio/'
npm run build
npm run preview
# When finished: Remove-Item Env:BASE_PATH
```

Open `http://localhost:4321/portfolio/` in this mode. Keep the same environment settings for build and preview.

Canonical and Open Graph URLs derive from Astro’s `site` and `base`. `https://impleax.github.io` is the configurable default, not a claim that deployment is already live. Public images and favicon links use the shared `assetPath()` helper, and Astro handles bundled script, CSS and font paths.

For a different account or custom domain, set repository **Settings → Secrets and variables → Actions → Variables**: `SITE_URL` (origin, for example `https://example.com`) and `BASE_PATH` (use `/` for a custom domain). Configure the domain in GitHub Pages as well. Do not put secrets in these public configuration values.

Deployment follows the [official Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/). If your default branch is not `main`, update the workflow trigger.

## Editing content

### Language and appearance

The portfolio is statically generated in English at `/` and Ukrainian at `/uk/`. With a repository base, these become `/portfolio/` and `/portfolio/uk/`. `astro.config.mjs` declares `en` as the default locale and `uk` as the second locale; no server-side language detection is needed.

The header has **EN / УК** links and a light/dark theme button. On the root page, an explicit `?lang=en` or `?lang=uk` choice takes priority, followed by a saved choice, then the first supported language in `navigator.languages` (including regional variants such as `uk-UA`). Unsupported preferences fall back to English. Direct `/uk/` links keep their Ukrainian content. Switching languages preserves the current section.

The theme initially follows `prefers-color-scheme`; a manual choice takes priority. Preferences are saved locally as `portfolio:language` and `portfolio:theme`. If browser storage is blocked, the controls still work; explicit language links retain their choice in the URL. A small inline head script applies the theme before styles paint. Both language pages and their navigation work without JavaScript; automatic detection and theme switching require JavaScript.

English copy remains in the components and data files. Ukrainian translations live in `src/i18n/uk.ts`, keyed by the corresponding English copy. When editing translated content or adding a project, add or update its Ukrainian entries too. Missing translations fail the build so they cannot silently ship as mixed-language content. Technology and brand names are preserved. Both pages share `src/components/Portfolio.astro` and use localized titles, descriptions, canonical URLs, `hreflang` links and Open Graph locales. The social preview image remains shared.

Theme palettes are CSS custom properties in `src/styles/global.css`; preference controls and language layout adjustments are in `src/styles/preferences.css`.

```text
src/
  components/       Header, Hero, About, Skills, Projects, Services, Education,
                    Contact, Footer and small presentation components
  data/
    profile.ts      Name and contact links
    projects.ts     Descriptions, features, technologies, status and links
    skills.ts       Categorized technology lists
  layouts/          Document metadata, font preload and base layout
  lib/paths.ts      Base-aware public asset URLs
  i18n/             Ukrainian copy and shared locale helpers
  pages/index.astro English page
  pages/uk/         Ukrainian page
  styles/global.css Design tokens, component styles and responsive breakpoints
public/
  icons/            SVG favicon
  images/           Social sharing card
    projects/       Your project screenshots
tests/              Browser, link, responsive and accessibility checks
```

- Edit `src/data/profile.ts` to replace any contact placeholders. The supplied email, Telegram, GitHub and LinkedIn are already wired up.
- Edit `src/data/projects.ts` to update projects without changing their layout. Set `github` and optional `demo` to verified HTTPS URLs. Leave unknown links as `null`; no dead placeholder links are rendered.
- Edit the matching Astro component for About, Education, Services or hero copy. Review the student year and graduation date as they change.
- Change colors, spacing and typography in the custom properties at the top of `src/styles/global.css`.

### Project screenshots

Project screenshots and repository URLs are configured in `src/data/projects.ts`. Each screenshot has a path, dimensions, and English/Ukrainian labels and alt text. Use only real captures. Add files to `public/images/projects/`:

| Project                     | Expected files                                                  |
| --------------------------- | --------------------------------------------------------------- |
| Featured dating application | `dating-main.webp`, `dating-chat.webp`, `dating-discovery.webp` |
| CRM                         | `crm-dashboard.webp`, `crm-deals.webp`, `crm-products.webp`     |
| Bots                        | `bot-main.webp`, `bot-admin.webp`                               |
| Scraping                    | `scraping-output.webp`, `scraping-browser.webp`                 |

When a file is missing, a neutral frame clearly shows its expected filename. Missing images never generate broken requests. Add the real files and rebuild; no component changes are needed. Update dimensions and bilingual descriptions to match the actual images. AVIF is supported by changing the configured filename. Images preserve their proportions, load lazily, and open at full size when selected.

The featured project displays its main image and two supporting frames. Secondary projects display one primary preview; additional captures appear in an expandable gallery only when their files exist. No generated screenshots, fabricated output or fake conversations are included.

Provided repositories are wired up for Spark, WorkFlowCRM and FixMyRideBot. The bots card also links to AI-Assistant and GateKeeperBot. The scraping repository remains `null` until a verified URL is supplied; no repository control is rendered for it. Contact uses the existing email, GitHub, LinkedIn and Telegram details.

### Visual design and motion

`src/styles/showcase.css` owns the project gallery and card layouts. `src/styles/refinements.css` controls the editorial layout, compact skills, service panels and subtle technical background. Native IntersectionObserver reveals whole sections with a 20px movement; CSS animates the hero connection and desktop hover states. Reduced motion disables these effects. Content remains visible with JavaScript disabled, when printing, and when reached by keyboard or anchor navigation.

### Social preview and favicon

Replace `public/images/social-card.png` with a 1200 × 630 image when desired. Update its alt text in `src/layouts/Layout.astro` if its content changes. The existing image is a typography-based card using the provided identity and role. Edit `public/icons/favicon.svg` to change the VB monogram.

## Verification

The current project-showcase revision passed all 33 browser checks for both `/` and `/portfolio/`, including both languages, both themes, all four viewport widths, section reveals, reduced motion, real repository destinations and missing-image fallbacks. The production build and formatting checks pass. Real project captures have not yet been supplied; the configured screenshot areas intentionally show labeled placeholders.

The initial English-only build was reviewed on September 22, 2026, with a local mobile Lighthouse score of **100 Performance, 100 Accessibility, 100 Best Practices and 100 SEO**. Those measurements predate the language and theme update. The expanded browser suite checks both themes and languages at 1440, 1024, 768 and 390 pixels, including automatic detection, stored preferences, blocked storage and navigation without JavaScript. Automated accessibility checks complement the keyboard and visual review.

Browser tests exercise all four requested widths (1440, 1024, 768 and 390), overflow, internal anchors, resource failures, expandable details, metadata, keyboard navigation, the mobile menu, reduced motion and automated accessibility. Dev-only test dependencies are not shipped to visitors.

```sh
npx playwright install chromium
npm run build
npm test
```

To use an installed Chrome browser instead of downloading Chromium:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'chrome'
npm test
```

The test runner starts `astro preview`. For subpath checks, build with `BASE_PATH=/portfolio/`, keep it set, then run the tests again. Screenshots and test artifacts are saved under the ignored `test-results/` directory. Tests verify the external contact URLs match the provided destinations; they do not assume social networks allow automated requests.

All core content and project details work without JavaScript. Without JavaScript, the mobile navigation stays visible. The enhanced menu supports keyboard activation, Escape, and automatic closing after navigation. New-tab links have accessible labels and `noopener noreferrer`.

Before publishing, add your real project screenshots, review the copy, and check the deployed page once on a real phone. No commercial experience, testimonials, usage statistics or unprovided project outcomes are claimed.
