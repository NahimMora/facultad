import { describe, expect, it } from 'vitest';
import { CALENDAR_EXAMS, DAILY_STUDY_HOURS, examStudyUrl } from '../../src/content/examCalendar';
import { adjacentMonth, hasStudyEntry, localISODate, monthCells, validDiary } from '../../src/lib/studyCalendar';

describe('calendario confirmado y registro diario',()=>{
  it('distingue seis finales, cuatro inscriptos, dos pendientes y un recuperatorio sin horario inventado',()=>{
    expect(CALENDAR_EXAMS.filter(e=>e.kind==='final')).toHaveLength(6);
    expect(CALENDAR_EXAMS.filter(e=>e.registration==='registered')).toHaveLength(4);
    expect(CALENDAR_EXAMS.filter(e=>e.registration==='pending').map(e=>[e.subject,e.pendingReason])).toEqual([['am2','Trámite de equivalencias'],['bd','Pago de arancel']]);
    expect(CALENDAR_EXAMS.map(e=>[e.date,e.start,e.end])).toEqual([
      ['2026-11-30',undefined,undefined],['2026-12-02','19:00','21:00'],['2026-12-03','19:00','21:00'],['2026-12-09','18:00','20:00'],['2026-12-11','18:00','20:00'],['2026-12-14','19:00','21:00'],['2026-12-17','19:00','21:00'],
    ]);
    expect(examStudyUrl(CALENDAR_EXAMS[0])).toBe('/m/pye/recuperatorio');
    expect(DAILY_STUDY_HOURS).toBe(4);
  });
  it('alinea meses de lunes a domingo y conserva fechas locales sin UTC',()=>{
    const november=monthCells('2026-11');
    expect(november.slice(0,6)).toEqual(Array(6).fill(null));
    expect(november[6]).toBe('2026-11-01');
    expect(november.filter(Boolean)).toHaveLength(30);
    expect(monthCells('2026-12')[1]).toBe('2026-12-01');
    expect(monthCells('2028-02').filter(Boolean)).toHaveLength(29);
    expect(adjacentMonth('2026-12',1)).toBe('2027-01');
    expect(adjacentMonth('2026-01',-1)).toBe('2025-12');
    expect(localISODate(new Date(2026,10,18,23,59))).toBe('2026-11-18');
  });
  it('valida registros independientes, descarta corrupción y no convierte valores en materias vistas',()=>{
    expect(validDiary({'2026-11-18':{subjects:['am2','am2','desconocida',true],notes:'Integración',hours:2.5},'2026-11-19':{subjects:['pye'],notes:'t y valor p'},'2026-11-31':{subjects:['bd']},inventada:{subjects:['ca']},'2026-11-20':null,'2026-11-21':{subjects:[],notes:4,hours:'4'}})).toEqual({
      '2026-11-18':{subjects:['am2'],notes:'Integración',hours:2.5},'2026-11-19':{subjects:['pye'],notes:'t y valor p'},
    });
    expect(validDiary(null)).toEqual({});expect(validDiary([])).toEqual({});
    expect(hasStudyEntry({subjects:[],notes:'',hours:0})).toBe(false);
    expect(hasStudyEntry({subjects:[],notes:'Hoy descansé.'})).toBe(true);
  });
});
