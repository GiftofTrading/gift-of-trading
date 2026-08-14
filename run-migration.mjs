import mysql from 'mysql2/promise';
import fs from 'fs';

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

// Parse the URL to extract components
const url = new URL(dbUrl);
const conn = await mysql.createConnection({
  host: url.hostname,
  port: parseInt(url.port || '3306'),
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  ssl: { rejectUnauthorized: true },
});

console.log('[Migration] Connected to database');

const sqlFile = fs.readFileSync('./drizzle/0000_tricky_sentinel.sql', 'utf8');
const statements = sqlFile.split('--> statement-breakpoint').map(s => s.trim()).filter(s => s.length > 0);

for (const stmt of statements) {
  try {
    await conn.execute(stmt);
    console.log('[Migration] OK:', stmt.substring(0, 60) + '...');
  } catch (err) {
    if (err.code === 'ER_TABLE_EXISTS_ERROR') {
      console.log('[Migration] Table already exists, skipping:', stmt.substring(0, 60));
    } else {
      console.error('[Migration] Error:', err.message);
    }
  }
}

await conn.end();
console.log('[Migration] Done!');
