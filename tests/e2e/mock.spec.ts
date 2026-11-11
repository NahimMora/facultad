import { expect, test } from '@playwright/test';

test('AID: guarda respuestas, corrige al final y permite repasar errores', async ({ page }) => {
  await page.goto('./#/m/aid');
  const mock = page.locator('#int-simulacro');
  await mock.getByRole('spinbutton').fill('3');
  await mock.getByRole('button', { name: 'Empezar simulacro' }).click();
  await expect(mock.locator('.qcard')).toHaveCount(3);
  await mock.locator('.qcard').first().locator('.opt').first().click();
  await expect(mock.locator('.qfeedback')).toHaveCount(0);
  const ids = await mock.locator('.qcard').evaluateAll((els) => els.map((e) => e.getAttribute('data-qid')));
  await page.reload();
  await expect(mock.locator('.opt[aria-pressed=true]')).toHaveCount(1);
  expect(await mock.locator('.qcard').evaluateAll((els) => els.map((e) => e.getAttribute('data-qid')))).toEqual(ids);
  await mock.getByRole('button', { name: 'Terminar y corregir' }).click();
  await expect(mock.locator('.qfeedback')).toHaveCount(3);
  await page.reload();
  await expect(mock.locator('.qfeedback')).toHaveCount(3);
  await mock.getByRole('button', { name: 'Repasar mis errores' }).click();
  await expect(mock.locator('.qfeedback')).toHaveCount(0);
  expect(await mock.locator('.qcard').count()).toBeGreaterThanOrEqual(2);
});

test('cada final tiene simulacro y funciona sin almacenamiento disponible', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Almacenamiento no disponible'); };
    Storage.prototype.setItem = () => { throw new Error('Almacenamiento no disponible'); };
  });
  for (const id of ['aid', 'itc', 'iisw', 'fia', 'sym', 'arq', 'pye', 'bd', 'am2', 'sd1', 'ca']) {
    await page.goto(`./#/m/${id}?examen=final`);
    const mock = page.locator('#int-simulacro');
    await mock.getByRole('spinbutton').fill('1');
    await mock.getByRole('button', { name: 'Empezar simulacro' }).click();
    await expect(mock.locator('.qcard')).toHaveCount(1);
    await mock.getByRole('button', { name: 'Terminar y corregir' }).click();
    await expect(mock.locator('.qfeedback')).toHaveCount(1);
  }
});
