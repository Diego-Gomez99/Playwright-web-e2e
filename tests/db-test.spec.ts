import {test, expect} from '@playwright/test';
import {Client} from 'pg';

test('Database connection test', async ({ page }) => {
  // Create a new PostgreSQL client
  const client = new Client({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432, // default PostgreSQL port
  });   

  await client.connect();

  // Validate create a new user in the database
  await page.goto('https://mi-app.com/registro');
  await page.fill('#email', 'test_qa@example.com');
  await page.click('#btn-registrar');

  // Consult the database to check if the user was created
    const res = await client.query('SELECT * FROM users WHERE email = $1', ['test_qa@example.com']);

    // assert the return data is not empty
    expect(res.rows.length).toBeGreaterThan(0);
    expect(res.rows[0].email).toBe('tes_qa@example.com');

    // Close the database connection
    await client.end();
}); 
