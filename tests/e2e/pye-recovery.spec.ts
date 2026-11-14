import { expect, test } from '@playwright/test';
import { TASK_BY_ID } from '../../src/content/recovery/pyeTasks';

test('PyE: aprender, escribir, retomar borrador, recibir corrección y guardar el avance',async({page})=>{
  await page.goto('./#/m/pye');
  await page.getByRole('link',{name:/Preparar el recuperatorio/}).click();
  await expect(page.getByRole('heading',{name:'Recuperatorio PyE',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Empezar por chi² y la conclusión'}).click();
  await expect(page.locator('.recovery-tutor .walk')).toBeVisible();
  await page.locator('.recovery-tutor .walk').getByRole('button',{name:'Paso siguiente',exact:true}).click();
  await expect(page.locator('.walk-n')).toHaveText('2/4');
  await page.getByRole('button',{name:'Practicar esta habilidad sin modelo'}).click();
  const id=await page.locator('[data-task]').getAttribute('data-task');
  const task=TASK_BY_ID.get(id!)!;
  await page.locator('[data-answer="a"]').fill(task.parts[0].model);
  await page.reload();
  await expect(page.locator('[data-answer="a"]')).toHaveValue(task.parts[0].model);
  await page.getByRole('button',{name:'Consultar teoría (el borrador sigue guardado)'}).click();
  await expect(page.locator('.recovery-tutor')).toBeVisible();
  await page.getByRole('button',{name:'Retomar borrador guardado'}).click();
  await expect(page.locator('[data-answer="a"]')).toHaveValue(task.parts[0].model);
  for(const part of task.parts)await page.locator(`[data-answer="${part.id}"]`).fill(part.model);
  await page.getByRole('button',{name:'Entregar y corregir',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Resultado estimado: 10/10',exact:true})).toBeVisible();
  await expect(page.locator('.recovery-feedback')).toHaveCount(3);
  await page.getByRole('button',{name:'Ver historial',exact:true}).click();
  await expect(page.locator('.recovery-history li')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('.recovery-history li')).toHaveCount(1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
  await page.locator('.recovery-history button').first().click();
  await expect(page.getByRole('button',{name:'Practicar Chi² y conclusión',exact:true})).toHaveCount(2);
  await page.getByRole('button',{name:'Practicar Chi² y conclusión',exact:true}).first().click();
  await expect(page.locator('[data-task]')).toHaveCount(1);
  await expect(page.locator('[data-task]')).not.toHaveAttribute('data-task',id!);
});

test('el simulacro se entrega al vencer el tiempo, sin pistas y con omisiones en cero',async({page})=>{
  await page.clock.install();
  await page.goto('./#/m/pye/recuperatorio?vista=simulacro');
  await page.getByLabel('Límite de práctica en minutos (opcional)').fill('1');
  await page.getByRole('button',{name:'Empezar simulacro escrito'}).click();
  await expect(page.locator('[data-task]')).toHaveCount(5);
  await expect(page.getByRole('button',{name:'Pistas de desarrollo'})).toHaveCount(0);
  await expect(page.getByText('Comparar con la respuesta modelo',{exact:true})).toHaveCount(0);
  await page.locator('textarea').first().fill('No rechazo H0.');
  await page.clock.fastForward(61_000);
  await expect(page.getByRole('heading',{name:'Resultado estimado: 0/100',exact:true})).toBeVisible();
  await expect(page.locator('.recovery-result')).toContainText('12 subítems vacíos');
  await page.getByRole('button',{name:'Ver historial',exact:true}).click();
  await expect(page.locator('.recovery-history li')).toHaveCount(1);
});

test('el parcial reconstruido conserva los comentarios y la discrepancia alfa sin revelar modelos en examen',async({page})=>{
  await page.goto('./#/m/pye/recuperatorio?vista=parcial');
  await expect(page.locator('.recovery-original')).toHaveCount(5);
  const regression=page.locator('.recovery-original').first();
  await regression.locator('summary').click();
  await expect(regression).toContainText('5,1809');
  const one=page.locator('.recovery-original').nth(3);
  await one.locator('summary').click();
  await expect(one).toContainText('4%');await expect(one).toContainText('5%');
  await page.getByRole('button',{name:'Rehacer las cinco consignas'}).click();
  await expect(page.locator('.recovery-session [data-task]')).toHaveCount(5);
  await expect(page.locator('.recovery-session .recovery-model')).toHaveCount(0);
  await expect(page.locator('[data-task="original-una"] table tbody tr')).toHaveCount(4);
  await page.getByRole('button',{name:'Entregar y corregir',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Resultado estimado: 0/100',exact:true})).toBeVisible();
});

test('funciona sin almacenamiento, tolera borradores corruptos y mantiene los controles móviles dentro del ancho',async({page})=>{
  await page.addInitScript(()=>{
    localStorage.setItem('fac-pye-recovery-v1','{"active":{"taskIds":["inventado"]},"history":[null]}');
    Storage.prototype.setItem=()=>{throw new Error('Sin almacenamiento');};
  });
  await page.goto('./#/m/pye/recuperatorio?vista=practica&habilidad=una-media');
  await page.getByRole('button',{name:'Empezar ejercicio nuevo'}).click();
  await expect(page.locator('.recovery-warning').first()).toContainText('no pudo guardar');
  await page.locator('textarea').first().fill('mu1=5,9. Porque son dos parámetros y la media muestral es otra población.');
  await page.getByRole('button',{name:'Entregar y corregir',exact:true}).click();
  await expect(page.locator('.recovery-result')).toContainText('Sin responder.');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
});
