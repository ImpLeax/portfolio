# Volodymyr Bondarchuk — Portfolio

A static portfolio for a Junior Python Backend Developer, built for recruiters and potential freelance clients. It presents Python and Django first, followed by practical projects, automation, bots, scraping and supporting frontend skills.

## Stack

- Astro with reusable components and typed content files
- Plain CSS with responsive layouts, a restrained dark theme and reduced-motion support
- Lucide icons rendered as inline SVG; separate GitHub and LinkedIn brand marks
- Locally served Geist variable font, limited to the Latin subset
- A small vanilla JavaScript module for accessible mobile navigation
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

Canonical and Open Graph URLs derive from Astro’s `site` and `base`. `https://impleax.github.io` is the configurable default, not a claim that deployment is already live. Public images, favicon and resume links use the shared `assetPath()` helper, and Astro handles bundled script, CSS and font paths.

For a different account or custom domain, set repository **Settings → Secrets and variables → Actions → Variables**: `SITE_URL` (origin, for example `https://example.com`) and `BASE_PATH` (use `/` for a custom domain). Configure the domain in GitHub Pages as well. Do not put secrets in these public configuration values.

Deployment follows the [official Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/). If your default branch is not `main`, update the workflow trigger.

## Editing content

```text
src/
  components/       Header, Hero, About, Skills, Projects, Services, Education,
                    Contact, Footer and small presentation components
  data/
    profile.ts      Name, contact links and optional resume path
    projects.ts     Descriptions, features, technologies, status and links
    skills.ts       Categorized technology lists
  layouts/          Document metadata, font preload and base layout
  lib/paths.ts      Base-aware public asset URLs
  pages/index.astro Single-page composition
  styles/global.css Design tokens, component styles and responsive breakpoints
public/
  icons/            SVG favicon
  images/           Social sharing card
    projects/       Your project screenshots
  resume/           Your PDF resume
tests/              Browser, link, responsive and accessibility checks
```

- Edit `src/data/profile.ts` to replace any contact placeholders. The supplied email, Telegram, GitHub and LinkedIn are already wired up.
- Edit `src/data/projects.ts` to update projects without changing their layout. Set `github` and optional `demo` to verified HTTPS URLs. Leave unknown links as `null`; no dead placeholder links are rendered.
- Set a project’s optional `status` to `Completed`, `In Development` or another accurate label. Only ByteMarket has an explicitly provided status. The other projects intentionally have no completion claim.
- ByteMarket’s features are labeled as a roadmap. The bots entry is an overview of practical experience, with possible capabilities distinguished from specific delivered features.
- Edit the matching Astro component for About, Education, Services or hero copy. Review the student year and graduation date as they change.
- Change colors, spacing and typography in the custom properties at the top of `src/styles/global.css`.

### Project screenshots

Add an optimized WebP or AVIF to `public/images/projects/`, then set the project’s `screenshot`:

```ts
screenshot: {
  src: 'images/projects/your-project.webp',
  alt: 'Describe the actual interface and relevant visible features',
  width: 1440,
  height: 900,
},
```

Use the image’s real dimensions to prevent layout shifts. Screenshots load lazily. The featured project uses a labeled architecture sketch when there is no screenshot; this is not represented as an image of the actual product.

### Resume

Add or replace `public/resume/resume.pdf`, then set `resume: 'resume/resume.pdf'` in `src/data/profile.ts`. The contact section switches from **Request resume** to **Download resume** automatically. Leave it `null` until a real PDF is available; no fabricated resume is included.

### Social preview and favicon

Replace `public/images/social-card.png` with a 1200 × 630 image when desired. Update its alt text in `src/layouts/Layout.astro` if its content changes. The existing image is a typography-based card using the provided identity and role. Edit `public/icons/favicon.svg` to change the VB monogram.

## Verification

The local production build was reviewed on September 22, 2026. All nine browser tests passed for both the root and `/portfolio/` configurations. Screenshots were reviewed at 1440, 1024, 768 and 390 pixels. The final mobile Lighthouse audit scored **100 Performance, 100 Accessibility, 100 Best Practices and 100 SEO** on localhost. These are local measurements; deployed results depend on hosting, network conditions and future content changes. Automated accessibility checks complement the keyboard and visual review.

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

Before publishing, add verified project repository links and your resume, review the copy, and check the deployed page once on a real phone. No commercial experience, testimonials, usage statistics or unprovided project outcomes are claimed.
