import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Ukrainian mobile menu uses localized labels and restores section focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('uk/');
  await page.getByRole('button', { name: 'Відкрити меню' }).click();
  await expect(page.getByRole('button', { name: 'Закрити меню' })).toBeVisible();
  await page.getByRole('navigation').getByRole('link', { name: 'Проєкти', exact: true }).click();
  await expect(page.locator('#projects')).toBeFocused();
  await expect(page.getByRole('navigation')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Відкрити меню' })).toBeVisible();
});

for (const locale of ['en', 'uk'] as const) {
  for (const theme of ['light', 'dark'] as const) {
    for (const width of [1440, 1024, 768, 390]) {
      test(`${locale}, ${theme}, ${width}px: responsive and accessible`, async ({
        page,
      }, testInfo) => {
        await page.setViewportSize({ width, height: 960 });
        await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
        const errors: string[] = [];
        page.on('pageerror', (error) => errors.push(error.message));
        page.on('requestfailed', (request) => errors.push(request.url()));
        page.on('response', (response) => {
          if (response.status() >= 400) errors.push(response.url());
        });
        await page.goto(locale === 'uk' ? 'uk/' : './?lang=en');
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator('html')).toHaveAttribute('lang', locale);
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        await expect(page.locator('.project-card')).toHaveCount(4);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true,
        );
        if (locale === 'uk') {
          await expect(page.locator('h1')).toContainText('Розробник');
          await expect(page.locator('#about')).toContainText('КПІ ім. Ігоря Сікорського');
          await expect(page.locator('#education')).toContainText('Студент 3-го курсу');
          expect(
            await page.evaluate(() => document.fonts.check('500 16px "Geist Variable"', 'Україна')),
          ).toBe(true);
        }
        await page.screenshot({
          path: testInfo.outputPath(`${locale}-${theme}-${width}.png`),
          fullPage: true,
        });
        await page.screenshot({ path: testInfo.outputPath('hero.png') });
        await page
          .locator('.project-details')
          .evaluateAll((nodes) => nodes.forEach((node) => node.setAttribute('open', '')));
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true,
        );
        const result = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        expect(result.violations).toEqual([]);
        expect(errors).toEqual([]);
      });
    }
  }
}

test('browser language priority, regional variants and unsupported fallback', async ({
  browser,
  baseURL,
}) => {
  for (const [languages, expected] of [
    [['uk-UA', 'en-US'], 'uk'],
    [['en-GB', 'uk-UA'], 'en'],
    [['fr-FR', 'uk-UA', 'en'], 'uk'],
    [['de-DE', 'fr'], 'en'],
  ] as const) {
    const context = await browser.newContext();
    await context.addInitScript(
      (values) => Object.defineProperty(navigator, 'languages', { get: () => values }),
      languages,
    );
    const page = await context.newPage();
    await page.goto(`${baseURL}#projects`);
    await expect(page.locator('html')).toHaveAttribute('lang', expected);
    await expect(page).toHaveURL(/#projects$/);
    await context.close();
  }
});

test('manual language wins, survives reload and preserves the current section', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ locale: 'uk-UA' });
  const page = await context.newPage();
  await page.goto(`${baseURL}#projects`);
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk');
  await page.getByRole('link', { name: 'English', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveURL(/\?lang=en#projects$/);
  await page.goto(baseURL!);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('link', { name: 'Українська', exact: true }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk');
  await page.goto(baseURL!);
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk');
  await context.close();
});

test('theme follows device preference until manually chosen, including across languages', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const toggle = page.getByRole('button', { name: 'Switch to light theme' });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByRole('button', { name: 'Switch to dark theme' })).toBeFocused();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('link', { name: 'Українська' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Увімкнути темну тему' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('blocked browser storage does not break theme or explicit language switching', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ locale: 'uk-UA' });
  await context.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Blocked', 'SecurityError');
      },
    });
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(baseURL!);
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk');
  await page.getByRole('link', { name: 'English' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  const before = await page.locator('html').getAttribute('data-theme');
  await page.locator('.theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute(
    'data-theme',
    before === 'dark' ? 'light' : 'dark',
  );
  expect(errors).toEqual([]);
  await context.close();
});

test('localized content, metadata and language links work without JavaScript', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(`${baseURL}uk/`);
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk');
  await expect(page).toHaveTitle('Volodymyr Bondarchuk — Python Backend Розробник');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/uk\/$/);
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'uk_UA');
  await expect(page.locator('link[hreflang="uk"]')).toHaveAttribute('href', /\/uk\/$/);
  await expect(page.locator('.theme-toggle')).toBeHidden();
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.getByRole('link', { name: 'English' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await context.close();
});
