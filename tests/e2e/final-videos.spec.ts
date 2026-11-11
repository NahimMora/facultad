import { expect, test } from '@playwright/test';

test('el final incluye también las clases de parciales que explican sus temas', async ({ page }) => {
  for (const [subject, count] of [['aid', 4], ['itc', 7]] as const) {
    await page.goto(`./#/m/${subject}?examen=final`);
    await page.locator('#int-clase > summary').click();
    await expect(page.locator('#int-clase .class-picker button')).toHaveCount(count);
    await expect(page.locator('#int-clase figure.lesson')).toHaveCount(1);
    const firstSrc=await page.locator('#int-clase video').getAttribute('src');
    await page.locator('#int-clase .class-picker button').last().click();
    await expect(page.locator('#int-clase .class-picker button').last()).toHaveAttribute('aria-pressed','true');
    await expect(page.locator('#int-clase video')).not.toHaveAttribute('src',firstSrc!);
    expect(await page.evaluate(() => document.documentElement.scrollWidth), subject).toBeLessThanOrEqual(page.viewportSize()!.width);
    await page.goto(`./#/m/${subject}?examen=final&tab=videos`);
    await expect(page.locator('figure.lesson')).toHaveCount(count);
    expect(await page.evaluate(() => document.documentElement.scrollWidth), subject).toBeLessThanOrEqual(page.viewportSize()!.width);
  }
  await page.goto('./#/m/aid?examen=p2');
  await page.locator('#int-clase > summary').click();
  await expect(page.locator('#int-clase .class-picker button')).toHaveCount(3);
});
