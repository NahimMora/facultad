import { DatabaseSync } from 'node:sqlite';
import { describe, expect, it } from 'vitest';
import { SQL_NEVER, SQL_TENS, SQL_UPDATE } from '../../src/content/visual/bd-final';

function fixture() {
  const db = new DatabaseSync(':memory:');
  db.exec(`CREATE TABLE Alumno(legajo INTEGER PRIMARY KEY, nombre TEXT, estado TEXT);
    CREATE TABLE Examen(legajo INTEGER, materia INTEGER, nota INTEGER, fecha TEXT, profesor TEXT);
    INSERT INTO Alumno VALUES (1,'A','activo'),(2,'B','activo'),(3,'C','activo'),(4,'D','activo');
    INSERT INTO Examen VALUES
      (2,1,3,'2024-01-01','OBJETIVO'),
      (3,1,3,'2024-01-01','OBJETIVO'),
      (3,1,6,'2024-02-01','OBJETIVO'),
      (4,1,10,'2024-02-01','OTRO'),
      (4,2,10,'2024-03-01','OTRO');`);
  return db;
}

describe('consultas del final de BD con datos sintéticos aislados', () => {
  it('nunca aprobó incluye ausencia de exámenes y excluye la aprobación posterior', () => {
    const db = fixture();
    try {
      const rows = db.prepare(SQL_NEVER).all({ ':docente': 'OBJETIVO' });
      expect(rows.map((r) => r.nombre).sort()).toEqual(['A', 'B', 'D']);
      expect(db.prepare(SQL_TENS).all().map((r) => r.nombre)).toEqual(['D']);
    } finally { db.close(); }
  });
  it('actualiza por más de diez, con ambos años completos y sin incluir 2025', () => {
    const db = fixture();
    try {
      const insert = db.prepare('INSERT INTO Examen VALUES (?,1,?,?,?)');
      for (let i = 0; i < 10; i++) {
        insert.run(1, 4, '2023-01-01', 'OTRO');
        insert.run(2, 4, '2024-12-31 23:59:59', 'OTRO');
      }
      insert.run(1, 4, '2025-01-01', 'OTRO');
      insert.run(1, 10, '2024-01-01', 'OTRO');
      db.exec(SQL_UPDATE);
      expect(db.prepare('SELECT legajo FROM Alumno WHERE estado=\'baja\'').all().map((r) => r.legajo)).toEqual([2]);
    } finally { db.close(); }
  });
});
