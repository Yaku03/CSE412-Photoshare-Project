const Pool  = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "cse412",
    port: 5432,
})

module.exports = pool;