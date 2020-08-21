const { Pool } = require("pg")

module.exports = new Pool ({
    user: 'postgres',
    password: "admin",
    port: 5432,
    database: "gymmanager"
})
