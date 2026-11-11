import { expect, test } from '@playwright/test';
test('Carrera muestra el plan completo y conserva cambios de estado', async ({page})=>{
  await page.goto('./#/carrera');
  await expect(page.locator('[data-course]')).toHaveCount(55);
  await expect(page.getByLabel('Estado de Análisis Matemático I',{exact:true})).toHaveValue('aprobada');
  const english=page.getByLabel('Estado de Inglés I',{exact:true});
  await expect(english).toHaveValue('regularizada');
  await english.selectOption('aprobada');
  await page.reload();
  await expect(english).toHaveValue('aprobada');
  await page.getByLabel('Mostrar',{exact:true}).selectOption('aprobada');
  await expect(page.locator('[data-course]')).toHaveCount(5);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
});
test('Carrera permite editar aunque el almacenamiento no esté disponible', async ({page})=>{
  await page.addInitScript(()=>{
    Storage.prototype.getItem=()=>{throw new Error('No disponible');};
    Storage.prototype.setItem=()=>{throw new Error('No disponible');};
  });
  await page.goto('./#/carrera');
  const eda=page.getByLabel('Estado de Estructuras de Datos y Algoritmos',{exact:true});
  await expect(eda).toHaveValue('sin-cursar');
  await eda.selectOption('cursando');
  await expect(eda).toHaveValue('cursando');
});
