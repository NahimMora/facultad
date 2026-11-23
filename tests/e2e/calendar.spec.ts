import { expect, test } from '@playwright/test';

test('calendario: fechas exactas y registro diario de materias que persiste al cambiar día y recargar',async({page})=>{
  await page.clock.install({time:new Date('2026-11-18T12:00:00-03:00')});
  await page.goto('./#/calendario');
  await expect(page.getByRole('heading',{name:'Tu calendario de estudio',exact:true})).toBeVisible();
  expect(await page.locator('.calendar-day').first().evaluate(e=>e.getBoundingClientRect().width)).toBeGreaterThanOrEqual(44);
  await expect(page.locator('.calendar-agenda [data-calendar-exam]')).toHaveCount(7);
  await expect(page.locator('.calendar-agenda .calendar-registered')).toHaveCount(4);
  await expect(page.locator('.calendar-agenda .calendar-pending')).toHaveCount(2);
  await expect(page.locator('.calendar-agenda [data-calendar-exam="pye-recu-2026"]')).toContainText('Horario no informado');
  await expect(page.locator('.calendar-agenda [data-calendar-exam="am2-final-2026"]')).toContainText('18:00 a 20:00');
  await expect(page.locator('.calendar-agenda [data-calendar-exam="am2-final-2026"]')).toContainText('equivalencias');
  await page.locator('[data-day="2026-11-18"]').click();
  const journal=page.locator('.calendar-journal');
  await journal.getByRole('checkbox',{name:'Análisis Matemático II',exact:true}).check();
  await journal.getByRole('checkbox',{name:'Probabilidad y Estadística',exact:true}).check();
  await journal.getByLabel('Temas o ejercicios que repasaste').fill('Integración por partes y prueba t.');
  await journal.getByLabel('Horas estudiadas en total (opcional)').fill('3.5');
  await expect(journal.getByRole('status')).toContainText('Guardado');
  await page.locator('[data-day="2026-11-19"]').click();
  await expect(journal.getByRole('checkbox',{name:'Análisis Matemático II',exact:true})).not.toBeChecked();
  await journal.getByRole('checkbox',{name:'Base de Datos',exact:true}).check();
  await page.reload();
  await page.locator('[data-day="2026-11-18"]').click();
  await expect(journal.getByRole('checkbox',{name:'Análisis Matemático II',exact:true})).toBeChecked();
  await expect(journal.getByRole('checkbox',{name:'Probabilidad y Estadística',exact:true})).toBeChecked();
  await expect(journal.getByLabel('Temas o ejercicios que repasaste')).toHaveValue('Integración por partes y prueba t.');
  await expect(journal.getByLabel('Horas estudiadas en total (opcional)')).toHaveValue('3.5');
  await expect(page.locator('[data-day="2026-11-18"]')).toContainText('✓');
  await journal.getByRole('button',{name:'Vaciar registro de este día'}).click();
  await expect(journal.getByRole('checkbox',{name:'Análisis Matemático II',exact:true})).not.toBeChecked();
  await journal.getByRole('button',{name:'Restaurar registro del 18/11/2026'}).click();
  await expect(journal.getByRole('checkbox',{name:'Análisis Matemático II',exact:true})).toBeChecked();
  await page.getByRole('button',{name:'Mes siguiente'}).click();
  await page.locator('[data-day="2026-12-02"]').click();
  await expect(journal.locator('[data-calendar-exam="sym-final-2026"]')).toContainText('19:00 a 21:00');
  await expect(journal.getByRole('checkbox',{name:'Sistemas y Métodos',exact:true})).not.toBeChecked();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
});

test('el calendario tolera datos inválidos, avisa si no puede guardar y abre el recuperatorio correcto',async({page})=>{
  await page.addInitScript(()=>{
    localStorage.setItem('fac-study-calendar-v1',JSON.stringify({'2026-11-18':{subjects:'pye',notes:8}}));
    Storage.prototype.setItem=()=>{throw new Error('No disponible');};
  });
  await page.clock.install({time:new Date('2026-11-18T12:00:00-03:00')});
  await page.goto('./#/calendario');
  const journal=page.locator('.calendar-journal');
  await expect(journal.getByRole('checkbox',{name:'Probabilidad y Estadística',exact:true})).not.toBeChecked();
  await journal.getByRole('checkbox',{name:'Probabilidad y Estadística',exact:true}).check();
  await expect(journal.getByRole('status')).toContainText('No se pudo guardar');
  await page.locator('[data-day="2026-11-30"]').click();
  await expect(journal.getByRole('status')).toContainText('No se pudo guardar');
  await journal.getByRole('link',{name:'Estudiar PyE →',exact:true}).click();
  await expect(page).toHaveURL(/#\/m\/pye\/recuperatorio$/);
  await expect(page.getByRole('heading',{name:'Entrenador de escritura',exact:true})).toBeVisible();
});
