import { test, expect } from '@playwright/test';

test('showcase links only to the supplied repositories and labels missing captures', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./?lang=en');
  const repositories = await page
    .locator('#projects a[href*="github.com/ImpLeax/"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  expect(repositories.sort()).toEqual(
    [
      'https://github.com/ImpLeax/Spark',
      'https://github.com/ImpLeax/WorkFlowCRM',
      'https://github.com/ImpLeax/FixMyRideBot',
      'https://github.com/ImpLeax/AI-Assistant',
      'https://github.com/ImpLeax/GateKeeperBot',
    ].sort(),
  );
  const scraping = page.getByRole('article', { name: 'Web Scraping & Automation', exact: true });
  await expect(scraping.locator('.repository-link')).toHaveCount(0);
  const featured = page.locator('.project-featured');
  await expect(featured.locator('.screenshot-frame')).toHaveCount(3);
  for (const frame of await page.locator('.screenshot-frame').all()) {
    if (await frame.locator('img').count()) {
      await expect(frame.locator('img')).toHaveAttribute('loading', 'lazy');
      await expect(frame.locator('img')).toHaveAttribute('alt', /.+/);
    } else {
      await expect(frame).toContainText('Screenshot to be added');
      await expect(frame.locator('code')).toContainText(/\.(webp|avif)$/);
    }
  }
  const projectTop = await page
    .locator('#projects')
    .evaluate((element) => element.getBoundingClientRect().top);
  const skillTop = await page
    .locator('#skills')
    .evaluate((element) => element.getBoundingClientRect().top);
  expect(projectTop).toBeLessThan(skillTop);
  await expect(page.locator('.contact-links > a')).toHaveCount(3);
});

test('section reveal works on scroll and keyboard focus, and reduced motion disables effects', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('./?lang=en');
  const education = page.locator('#education');
  await expect(education).toHaveClass(/reveal-pending/);
  await education.evaluate((element) => element.scrollIntoView({ behavior: 'instant' }));
  await expect(education).not.toHaveClass(/reveal-pending/);
  await expect(education).toHaveCSS('opacity', '1');
  await page.reload();
  await page.locator('#projects').focus();
  await expect(page.locator('#projects')).not.toHaveClass(/reveal-pending/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.reveal-pending')).toHaveCount(0);
  expect(
    await page
      .locator('.diagram-connector')
      .evaluate((element) => getComputedStyle(element, '::after').animationName),
  ).toBe('none');
  await expect(page.locator('.project-featured')).toHaveCSS('transform', 'none');
});
