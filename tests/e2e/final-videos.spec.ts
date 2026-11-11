import { expect, test } from '@playwright/test';

test('el final incluye también las clases de parciales que explican sus temas', async ({ page }) => {
  for (const [subject, count] of [['aid', 4], ['itc', 7]] as const) {
    await page.goto(`./#/m/${subject}?examen=final`);
    await expect(page.locator('#int-clase figure.lesson')).toHaveCount(count);
    expect(await page.evaluate(() => document.documentElement.scrollWidth), subject).toBeLessThanOrEqual(page.viewportSize()!.width);
    await page.getByRole('button', { name: 'Videos', exact: true }).click();
    await expect(page.locator('figure.lesson')).toHaveCount(count);
    expect(await page.evaluate(() => document.documentElement.scrollWidth), subject).toBeLessThanOrEqual(page.viewportSize()!.width);
  }
  await page.goto('./#/m/aid?examen=p2');
  await expect(page.locator('#int-clase figure.lesson')).toHaveCount(3);
});
