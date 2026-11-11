import { expect, test } from '@playwright/test';
test('Mi carrera permite consultar sin formularios y actualizar una materia por vez', async ({page})=>{
  await page.goto('./#/carrera');
  await expect(page.locator('[data-course]')).toHaveCount(10);
  await expect(page.locator('select,input')).toHaveCount(0);
  const english=page.locator('[data-course="ingles1"]');
  await expect(english).toContainText('Regularizada');
  await english.getByRole('button',{name:/Actualizar estado/}).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('dialog').getByRole('button',{name:/Aprobada con final/}).click();
  await expect(page.locator('.change-feedback')).toContainText('Inglés I: Aprobada con final');
  await expect(english).toHaveCount(0);
  await page.reload();
  await page.getByRole('button',{name:/Aprobadas 5/}).click();
  await expect(page.locator('[data-course]')).toHaveCount(5);
  await expect(english).toContainText('Aprobada con final');
  await page.getByRole('button',{name:/Plan completo/}).click();
  await expect(page.locator('[data-course]')).toHaveCount(55);
  await expect(page.locator('[data-course="am1"]')).toContainText('Aprobada con final');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
});
test('Carrera permite editar sin almacenamiento y cerrar el diálogo con Escape', async ({page})=>{
  await page.addInitScript(()=>{
    Storage.prototype.getItem=()=>{throw new Error('No disponible');};
    Storage.prototype.setItem=()=>{throw new Error('No disponible');};
  });
  await page.goto('./#/carrera?estado=sin-cursar');
  const eda=page.locator('[data-course="eda"]');
  await eda.getByRole('button',{name:/Actualizar estado/}).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await eda.getByRole('button',{name:/Actualizar estado/}).click();
  await page.getByRole('dialog').getByRole('button',{name:'Cursando La estás cursando ahora.'}).click();
  await expect(eda).toHaveCount(0);
  await page.getByRole('button',{name:/Cursando 3/}).click();
  await expect(eda).toContainText('Cursando');
});

test('aprobar una previa actualiza las cadenas y los finales pendientes', async ({page})=>{
  await page.clock.install({time:new Date('2026-11-20T10:00:00-03:00')});
  await page.goto('./#/m/am2?examen=final');
  await expect(page.locator('.study-workspace .tblock')).toHaveCount(1);
  await page.goto('./#/carrera');
  await page.locator('[data-course="am2"]').getByRole('button',{name:/Actualizar estado/}).click();
  await page.getByRole('dialog').getByRole('button',{name:/Aprobada con final/}).click();
  await page.goto('./#/');
  await expect(page.locator('.next-action')).toContainText('Empezá por una previa pendiente');
  await expect(page.getByRole('link',{name:'Estudiar BD',exact:true})).toBeVisible();
  const am2=page.locator('.chain-card').first();
  await expect(am2.locator('.small-state')).toHaveText('Final aprobado');
  await expect(am2.locator('.chain-targets small')).toHaveText(['Previa aprobada','Previa aprobada']);
  await page.goto('./#/plan');
  await expect(page.locator('[data-plan-subject="am2"]')).toHaveCount(0);
  await expect(page.locator('.plan-card')).toHaveCount(10);
});
