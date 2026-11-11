import { expect, test } from '@playwright/test';

test('Plan ordena las fechas ingresadas y conserva la checklist por tema al recargar', async ({ page }) => {
  await page.goto('./#/plan');
  await expect(page.locator('.plan-card')).toHaveCount(11);
  await expect(page.locator('.plan-card summary .badge', { hasText: 'A confirmar' })).toHaveCount(11);
  const am2 = page.locator('[data-plan-subject="am2"]');
  await am2.locator('summary').click();
  await am2.getByLabel('Fecha del final de AM II').fill('2026-12-18');
  const checkbox = am2.getByRole('checkbox').first();
  await checkbox.check();
  await expect(am2.locator('.plan-progress')).toContainText(/1\/\d+ temas/);
  const bd = page.locator('[data-plan-subject="bd"]');
  await bd.locator('summary').click();
  await bd.getByLabel('Fecha del final de BD').fill('2026-11-30');
  await expect(page.locator('.plan-card').first()).toHaveAttribute('data-plan-subject', 'bd');
  await expect(page.locator('.plan-card').nth(1)).toHaveAttribute('data-plan-subject', 'am2');
  await page.reload();
  await am2.locator('summary').click();
  await expect(am2.getByRole('checkbox').first()).toBeChecked();
  await expect(am2.getByLabel('Fecha del final de AM II')).toHaveValue('2026-12-18');
  await am2.getByRole('checkbox').first().uncheck();
  const link = am2.getByRole('link', { name: /Ver diagramas/ }).first();
  const href = (await link.getAttribute('href'))!;
  const topic = new URLSearchParams(href.split('?')[1]).get('tema');
  await link.click();
  await expect(page).toHaveURL(new RegExp(`tema=${topic}`));
  await expect(page.locator(`[id="${topic}"] .walk`).first()).toBeVisible();
  await page.goto('./#/m/am2?examen=final&tab=resumen');
  await expect(page.locator('.examdate input')).toHaveValue('2026-12-18');
  await page.goto('./#/plan');
  await am2.locator('summary').click();
  await expect(am2.getByRole('checkbox').first()).not.toBeChecked();
});

test('Plan funciona sin almacenamiento y descarta datos guardados corruptos', async ({ page }) => {
  await page.addInitScript(() => {
    try {
      localStorage.setItem('fac-date-am2-final', JSON.stringify({ fecha: 'inventada' }));
      localStorage.setItem('fac-plan-topics-am2', JSON.stringify({ a1: 'true', a2: 1 }));
    } catch { /* el segundo escenario deshabilita el almacenamiento */ }
  });
  await page.goto('./#/plan');
  const am2 = page.locator('[data-plan-subject="am2"]');
  await am2.locator('summary').click();
  await expect(am2.getByLabel('Fecha del final de AM II')).toHaveValue('');
  await expect(am2.getByRole('checkbox').first()).not.toBeChecked();
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Sin almacenamiento'); };
    Storage.prototype.setItem = () => { throw new Error('Sin almacenamiento'); };
  });
  await page.reload();
  await am2.locator('summary').click();
  await am2.getByRole('checkbox').first().check();
  await expect(am2.locator('.plan-progress')).toContainText(/1\/\d+ temas/);
  await am2.getByLabel('Fecha del final de AM II').fill('2026-12-18');
  await expect(page.locator('.plan-card').first()).toHaveAttribute('data-plan-subject', 'am2');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
});

test('el formato del modelo viejo no se anuncia como formato actual confirmado', async ({ page }) => {
  await page.goto('./#/m/am2?examen=final');
  await expect(page.locator('#int-formato')).toContainText('Formato actual: A confirmar.');
  await expect(page.locator('#int-formato .ftag').first()).toHaveText('Modelo anterior');
  await page.goto('./#/plan');
  const itc = page.locator('[data-plan-subject="itc"]');
  await itc.locator('summary').click();
  await expect(itc.locator('.plan-format')).toContainText('Oral.');
});
