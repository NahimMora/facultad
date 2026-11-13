import { expect, test } from '@playwright/test';

test('AIyD: autoevaluaciones separadas, filtro, explicación y avance persistido', async ({ page }) => {
  await page.goto('./#/m/aid?examen=p2');
  await page.getByRole('button', { name: 'Autoevaluaciones · 46 preguntas del parcial' }).click();
  await expect(page.getByRole('heading', { name: 'Solo autoevaluaciones' })).toBeVisible();
  await expect(page.locator('.quiz-bar')).toContainText('46 en total');
  await expect(page.locator('.qcard')).toHaveAttribute('data-qid', 'aid-auto-m8-1');
  await page.locator('.qcard .opt').filter({ hasText: 'Todas las respuestas anteriores son correctas.' }).click();
  await expect(page.locator('.qscore')).toContainText('Correcta');
  await expect(page.locator('.qfeedback')).toContainText('autoevaluación de la cátedra');
  await expect(page.locator('.qfeedback .walk').first()).toBeVisible();
  await page.reload();
  await expect(page.locator('.question-position')).toContainText('Pregunta 2 de 46');
  await page.getByRole('button', { name: 'Anterior', exact: true }).click();
  await expect(page.locator('.qscore')).toContainText('Correcta');
  for (const [module, count] of [[8, 18], [9, 9], [10, 10], [11, 4], [12, 5]]) {
    await page.getByRole('button', { name: `Módulo ${module} (${count})`, exact: true }).click();
    await expect(page.locator('.quiz-bar')).toContainText(`${count} en total`);
    await expect(page.locator('.qcard')).toHaveCount(1);
    await expect(page.locator('.qcard')).toHaveAttribute('data-qid', new RegExp(`^aid-auto-m${module}-`));
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
  }
  await page.getByRole('button', { name: 'Practicar', exact: true }).click();
  await expect(page.locator('.quiz-bar')).toContainText('bien de 0');
  await expect(page.locator('.qcard')).not.toHaveAttribute('data-qid', /^aid-auto-/);
  await page.goto('./#/m/aid?examen=p1');
  await expect(page.locator('.study-workspace .tblock')).toBeVisible();
  await expect(page.locator('.self-assessments-entry')).toHaveCount(0);
});

test('las autoevaluaciones funcionan sin localStorage', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('No disponible'); };
    Storage.prototype.setItem = () => { throw new Error('No disponible'); };
  });
  await page.goto('./#/m/aid?examen=p2&modo=autoevaluaciones');
  await page.locator('.qcard .opt').first().click();
  await expect(page.locator('.qfeedback')).toBeVisible();
  await page.getByRole('button', { name: 'Siguiente pregunta →' }).click();
  await expect(page.locator('.question-position')).toHaveText('Pregunta 2 de 46');
});
