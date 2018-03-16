exports.productionDatabase = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  idleTimeoutMillis: 500,
  connectionTimeoutMillis: 1000
}

exports.testDatabase = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGTESTDB,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  idleTimeoutMillis: 500,
  connectionTimeoutMillis: 1000
}
