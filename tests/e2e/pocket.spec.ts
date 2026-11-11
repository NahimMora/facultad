import { expect, test } from '@playwright/test';

test('los once machetes entran completos a 390 px sin tapar la última fila', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const id of ['aid', 'itc', 'iisw', 'fia', 'arq', 'pye', 'bd', 'sym', 'sd1', 'ca', 'am2']) {
    for(const mode of ['tab=machete','modo=machete']) {
    await page.goto(`./#/m/${id}?${mode}&examen=final`);
    const cheat = page.locator('.cheat');
    await expect(cheat.locator('dt')).toHaveCount(7);
    const bounds = await cheat.evaluate((el) => ({
      bottom: el.getBoundingClientRect().bottom,
      nav: document.querySelector('.bottomnav')!.getBoundingClientRect().top,
      width: document.documentElement.scrollWidth,
      viewport: innerWidth,
    }));
    expect(bounds.bottom, id).toBeLessThan(bounds.nav);
    expect(bounds.width, id).toBeLessThanOrEqual(bounds.viewport);
    }
  }
});
