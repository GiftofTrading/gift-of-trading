import { config } from 'dotenv';
import mysql from 'mysql2/promise';

config({ path: '.env' });

const db = await mysql.createConnection(process.env.DATABASE_URL);

try {
  console.log("Adding pdfUrl column...");
  await db.execute("ALTER TABLE `blog_posts` ADD COLUMN `pdfUrl` varchar(1000)");
  console.log("pdfUrl added.");
} catch (e) {
  if (e.code === 'ER_DUP_FIELDNAME') {
    console.log("pdfUrl already exists, skipping.");
  } else {
    throw e;
  }
}

try {
  console.log("Adding pdfKey column...");
  await db.execute("ALTER TABLE `blog_posts` ADD COLUMN `pdfKey` varchar(500)");
  console.log("pdfKey added.");
} catch (e) {
  if (e.code === 'ER_DUP_FIELDNAME') {
    console.log("pdfKey already exists, skipping.");
  } else {
    throw e;
  }
}

await db.end();
console.log("Migration complete.");
