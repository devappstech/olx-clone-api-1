exports.productionDatabase = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PG_HOST_DATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  idleTimeoutMillis: 500,
  connectionTimeoutMillis: 1000
}

exports.testDatabase = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PG_TEST_DB,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  idleTimeoutMillis: 500,
  connectionTimeoutMillis: 1000
}
