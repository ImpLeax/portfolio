import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [1440, 1024, 768, 390]) {
  test(`layout, resources and accessibility at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 960 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', (response) => {
      if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    page.on('requestfailed', (request) => errors.push(request.url()));
    await page.goto('./');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('Python Backend');
    await expect(page.locator('.project-card')).toHaveCount(4);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    expect(await page.evaluate(() => document.fonts.check('500 16px "Geist Variable"'))).toBe(true);
    const anchors = await page.locator('a[href^="#"]').evaluateAll((links) =>
      links.map((link) => {
        const href = link.getAttribute('href')!;
        return { href, valid: href.length > 1 && !!document.getElementById(href.slice(1)) };
      }),
    );
    expect(anchors.filter((anchor) => !anchor.valid)).toEqual([]);
    const accessibility = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(accessibility.violations).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath(`portfolio-${width}.png`), fullPage: true });
    await page.screenshot({ path: testInfo.outputPath(`hero-${width}.png`) });
    expect(errors).toEqual([]);
  });
}

test('mobile menu supports keyboard navigation, Escape and section focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  const toggle = page.locator('.menu-toggle');
  await expect(page.getByRole('navigation')).toBeHidden();
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('navigation').getByRole('link', { name: 'About', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(toggle).toBeFocused();
  // Tab through every item and out of the menu; the disclosure must not trap focus.
  for (let i = 0; i < 10; i++) await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'View projects', exact: true })).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.getByRole('navigation').getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(page.locator('#projects')).toBeFocused();
  await expect(page.getByRole('navigation')).toBeHidden();
  await expect(page).toHaveURL(/#projects$/);
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('navigation')).toBeHidden();
});

test('project information is visible without expanding cards', async ({ page }) => {
  await page.goto('./');
  await page.locator('#projects').focus();
  await expect(page.locator('.project-details')).toHaveCount(0);
  const featured = page.locator('.project-featured');
  await expect(featured.locator('.project-tags')).toContainText('WebSockets');
  await expect(featured.locator('.project-tags')).toContainText('Docker');
  await expect(featured.locator('.project-highlights')).toBeVisible();
  await featured.locator('.repository-link').focus();
  await expect(featured.locator('.repository-link')).toBeFocused();
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
});

test('metadata, local assets and provided contact destinations are correct', async ({
  page,
  request,
}) => {
  await page.goto('./');
  const path = `${(process.env.BASE_PATH || '/').replace(/\/$/, '')}/`;
  const site = process.env.SITE_URL || 'https://impleax.github.io';
  await expect(page).toHaveTitle('Volodymyr Bondarchuk — Python Backend Developer');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    new URL(path, site).href,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    new URL(`${path}images/social-card.png`, site).href,
  );
  for (const asset of ['images/social-card.png', 'icons/favicon.svg']) {
    expect((await request.get(`${path}${asset}`)).status()).toBe(200);
  }
  await expect(page.locator('#contact a[href="https://github.com/ImpLeax"]')).toHaveCount(1);
  await expect(page.locator('#contact a[href="https://t.me/impleax"]')).toHaveCount(1);
  await expect(
    page.locator('#contact a[href="https://www.linkedin.com/in/volodymyr-bondarchuk-157392432/"]'),
  ).toHaveCount(1);
  await expect(
    page.locator('#contact a[href="mailto:bondarchukvolodymyr891@gmail.com"]'),
  ).toHaveCount(2);
  await expect(page.locator('.contact-links > a')).toHaveCount(3);
});

test('content and navigation remain available without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.locator('.menu-toggle')).toBeHidden();
  await expect(page.locator('.project-featured .project-tags')).toContainText('WebSockets');
  await expect(page.locator('.project-featured .project-highlights')).toBeVisible();
  await expect(page.locator('.ai-note')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});

test('skip link and reduced motion preferences are respected', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  );
});
