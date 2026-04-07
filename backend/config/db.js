import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Initialize PostgreSQL connection pool
// This assumes DATABASE_URL is set in .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const query = (text, params) => pool.query(text, params);
export const getClient = () => pool.connect();
export default pool;
