import {test, expect} from '@playwright/test';
import {Client} from 'pg';

test('Database connection test', async () => {
  // Create a new PostgreSQL client
 const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'testqaUser',
    password: process.env.DB_PASSWORD || 'QAUser',
    database: process.env.DB_NAME || 'pixel_arcade',
  });   

  await client.connect();

  // Consult the database to check if the user was created
    const res = await client.query('SELECT * FROM users WHERE user_id = 101');
    expect(res.rows[0].username).toBe('ShadowNinja');

    // Close the database connection
    await client.end();
}); 
