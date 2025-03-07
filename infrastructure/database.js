const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',      
    host: 'localhost',     
    database: 'notificaciones', 
    password: 'arigatoDios',  
    port: 5432             
});

module.exports = pool;
