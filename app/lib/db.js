import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL ?? process.env.ATABASE_URL;

const globalForPool = globalThis;

if (!connectionString) {
  // Defer throwing until the connection is actually used.
  console.warn('[database] DATABASE_URL environment variable is not set.');
}

const pool =
  globalForPool.__db_pool ??
  (connectionString
    ? new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false }
      })
    : null);

if (pool && !globalForPool.__db_pool) {
  globalForPool.__db_pool = pool;
}

let initialized = globalForPool.__db_initialized ?? false;

export async function ensureReady() {
  if (initialized) {
    return;
  }

  if (!connectionString) {
    throw new Error(
      'DATABASE_URL environment variable is required to use the blog database.'
    );
  }

  if (!pool) {
    throw new Error('Database pool could not be initialized.');
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id BIGSERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  initialized = true;
  globalForPool.__db_initialized = true;
}

export { pool };
