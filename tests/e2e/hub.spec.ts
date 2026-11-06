import { expect, test } from '@playwright/test';

test('inicio: 2 materias en curso y 9 finales', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Mi carrera' })).toBeVisible();
  await expect(page.locator('[data-testid^="now-"]')).toHaveCount(2);
  await expect(page.locator('[data-testid^="fin-"]')).toHaveCount(9);
  await expect(page.getByTestId('now-aid')).toContainText('Contenido listo');
});

test('AID: cuestionario del 2º parcial con corrección inmediata', async ({ page }) => {
  await page.goto('./#/m/aid?tab=practica');
  await expect(page.getByRole('heading', { name: /Análisis de la Información/ })).toBeVisible();
  const first = page.locator('.qcard').first();
  await expect(first).toBeVisible();
  await first.locator('.opt').first().click();
  await expect(first.locator('.qfeedback')).toContainText('Por qué');
  await expect(page.locator('.quiz-bar')).toContainText('de 1');
});

test('ITc: ejercicio de subnetting paso a paso y formato confirmado', async ({ page }) => {
  await page.goto('./#/m/itc');
  await expect(page.locator('.format')).toContainText('unidades 5, 6 y 7');
  await page.getByRole('button', { name: 'Ejercicios' }).click();
  const ex = page.locator('.exercise').filter({ hasText: '210.100.56.0' });
  await ex.getByRole('button', { name: /Ver paso 1/ }).click();
  await expect(ex.locator('.steps li')).toHaveCount(1);
});

test('materia regularizada: módulos marcables y lista de faltantes', async ({ page }) => {
  await page.goto('./#/m/bd');
  const btn = page.locator('.mstate').first();
  await expect(btn).toHaveText('Sin ver');
  await btn.click();
  await expect(btn).toHaveText('Visto');
  await page.locator('.tab', { hasText: 'Qué falta' }).click();
  await expect(page.locator('.missing li').first()).toBeVisible();
});
