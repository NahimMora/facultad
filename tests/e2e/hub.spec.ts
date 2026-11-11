import { expect, test } from '@playwright/test';

test('Hoy muestra el próximo paso sin formularios y seis candidatas para cursar', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Hoy, un paso a la vez.' })).toBeVisible();
  await expect(page.locator('.next-action a')).toHaveCount(1);
  await expect(page.locator('.dash-stats')).toContainText('10 finales pendientes');
  await expect(page.locator('.current-course')).toHaveCount(2);
  await expect(page.locator('.next-course-list li')).toHaveCount(6);
  await expect(page.locator('input,select')).toHaveCount(0);
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
  await page.getByText('Información del examen y más material', {exact:true}).click();
  await expect(page.locator('#int-formato')).toContainText('unidades 5, 6 y 7');
  await page.getByRole('button', { name: 'Ejercicios', exact:true }).click();
  const ex = page.locator('.exercise').filter({ hasText: '210.100.56.0' });
  await ex.getByRole('button', { name: /Ver paso 1/ }).click();
  await expect(ex.locator('.steps li')).toHaveCount(1);
});

test('materia regularizada: módulos marcables y lista de faltantes', async ({ page }) => {
  await page.goto('./#/m/bd?tab=resumen');
  const btn = page.locator('.mstate').first();
  await expect(btn).toHaveText('Sin ver');
  await btn.click();
  await expect(btn).toHaveText('Visto');
  await page.locator('.tab', { hasText: 'Qué falta' }).click();
  await expect(page.locator('.missing li').first()).toBeVisible();
});

test('ITc: un tema visual con su corto y avance paso a paso', async ({ page }) => {
  await page.goto('./#/m/itc?examen=p2&tema=subnet');
  await expect(page.locator('.study-workspace .tblock')).toHaveCount(1);
  const walk = page.locator('#t-subnet .walk').first();
  await walk.scrollIntoViewIfNeeded();
  await expect(walk.locator('.walk-n')).toHaveText(/^1\//);
  await walk.getByRole('button', { name: 'Paso siguiente' }).click();
  await expect(walk.locator('.walk-n')).toHaveText(/^2\//);
  await expect(page.locator('#t-subnet .short-btn')).toBeVisible();
});
