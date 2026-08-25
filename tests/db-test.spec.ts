import { test, expect } from '@playwright/test';
import { Client } from 'pg';
import { newDb } from 'pg-mem';
import * as fs from 'fs';
import * as path from 'path';

async function executeQuery(query: string) {
  if (process.env.CI) {
    const client = new Client({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'testqaUser',
      password: process.env.DB_PASSWORD || 'QAUser',
      database: process.env.DB_NAME || 'pixel_arcade',
    });
    await client.connect();
    const res = await client.query(query);
    await client.end();
    return res.rows;
  } else {
    const db = newDb();
    const sqlPath = path.join(__dirname, '../.github/workflows/setup.sql');
    let sqlScript = fs.readFileSync(sqlPath, 'utf-8');

    // Limpieza de compatibilidad para pg-mem en local
    sqlScript = sqlScript.replace(/INT PRIMARY KEY/g, 'INTEGER PRIMARY KEY');
    
    db.public.none(sqlScript);
    return db.public.many(query);
  }
}

test.describe('Pixel Arcade - Data Integrity Audit Suite', () => {

  test('TC-01: Detectar compras COMPLETED no entregadas en inventario', async () => {
    const rows = await executeQuery(`
      SELECT p.user_id, p.purchase_id, p.item_id
      FROM purchases p
      LEFT JOIN user_inventory i ON p.user_id = i.user_id AND p.item_id = i.item_id
      WHERE p.status = 'COMPLETED' AND i.user_id IS NULL;
    `);

    expect(rows.length).toBe(1);
    expect(Number(rows[0].user_id)).toBe(102);
  });

  test('TC-02: Identificar intentos de pago o cobros duplicados', async () => {
    const rows = await executeQuery(`
      SELECT p.user_id, p.item_id, p.item_name, COUNT(*) AS duplicated_count
      FROM purchases p
      WHERE p.status = 'COMPLETED'
      GROUP BY p.user_id, p.item_id, p.item_name
      HAVING COUNT(*) > 1;
    `);

    expect(rows.length).toBe(1);
    expect(Number(rows[0].user_id)).toBe(104);
  });

  test('TC-03: Validar que no existan ítems huérfanos en el inventario', async () => {
    const rows = await executeQuery(`
      SELECT i.inventory_id, i.user_id, i.item_id
      FROM user_inventory i
      LEFT JOIN purchases p ON i.user_id = p.user_id AND i.item_id = p.item_id
      WHERE p.user_id IS NULL;
    `);

    expect(rows.length).toBe(0);
  });

});