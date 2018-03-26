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

exports.testCiDatabase = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  idleTimeoutMillis: 500,
  connectionTimeoutMillis: 1000
}
