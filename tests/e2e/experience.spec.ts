import { expect, test } from '@playwright/test';

test('un tema guarda el avance y se retoma desde Hoy sin elegirlo de nuevo', async ({page})=>{
  await page.goto('./#/m/am2?examen=final');
  await expect(page.locator('.study-workspace .tblock')).toHaveCount(1);
  await page.getByRole('button',{name:'Marcar como repasado'}).click();
  await expect(page.locator('.lesson-position')).toContainText('1 repasados');
  await page.getByRole('button',{name:'Tema siguiente →'}).click();
  const topic=new URLSearchParams(page.url().split('?').pop()).get('tema');
  await expect(page.locator('.lesson-position')).toContainText('Tema 2 de');
  await page.goto('./#/');
  await page.getByRole('link',{name:'Retomar AM II'}).click();
  await expect(page.locator('.lesson-position')).toContainText('Tema 2 de');
  expect(new URLSearchParams(page.url().split('?').pop()).get('tema')).toBe(topic);
  await page.goto('./#/plan');
  const plan=page.locator('[data-plan-subject="am2"]');
  await expect(plan.locator('.plan-progress')).toContainText('1/');
});

test('la biblioteca filtra y la práctica muestra una pregunta explicada por vez', async ({page})=>{
  await page.goto('./#/estudiar');
  await expect(page.locator('.library-card')).toHaveCount(11);
  await page.getByRole('searchbox',{name:'Buscar materia'}).fill('analisis matematico');
  await expect(page.locator('.library-card')).toHaveCount(1);
  await page.locator('.library-card').click();
  await page.getByRole('button',{name:'Practicar',exact:true}).click();
  await expect(page.locator('.qcard')).toHaveCount(1);
  const firstId=await page.locator('.qcard').getAttribute('data-qid');
  await page.locator('.qcard .opt').first().click();
  await expect(page.locator('.qfeedback')).toContainText('Por qué:');
  await page.getByRole('button',{name:'Siguiente pregunta →'}).click();
  await expect(page.locator('.qcard')).toHaveCount(1);
  await expect(page.locator('.question-position')).toContainText('Pregunta 2 de');
  await expect(page.locator('.question-position')).toBeFocused();
  expect(await page.locator('.qcard').getAttribute('data-qid')).not.toBe(firstId);
  await page.getByRole('button',{name:'Anterior',exact:true}).click();
  await expect(page.locator('.qfeedback')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
});

test('el acceso de teclado al contenido conserva la ruta actual',async({page})=>{
  await page.goto('./#/estudiar');
  await expect(page.getByRole('heading',{name:'Elegí y empezá.'})).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link',{name:'Ir al contenido'})).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await expect(page).toHaveURL(/#\/estudiar$/);
});
