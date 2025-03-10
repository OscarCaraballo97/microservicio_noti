const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'notificaciones',
  password: process.env.DB_PASSWORD || 'arigatoDios',
  port: process.env.DB_PORT || 5432,
});