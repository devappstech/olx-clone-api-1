const squel = require('squel').useFlavour('postgres');
const { Pool } = require('pg');

/*
-----------------------------------------------
  Squel Options for Postgres
-----------------------------------------------
*/
squel.cls.DefaultQueryBuilderOptions.autoQuoteFieldNames = true;
squel.cls.DefaultQueryBuilderOptions.autoQuoteTableNames = true;
squel.cls.DefaultQueryBuilderOptions.autoQuoteAliasNames = true;
squel.cls.DefaultQueryBuilderOptions.nameQuoteCharacter = '"';
squel.cls.DefaultQueryBuilderOptions.tableAliasQuoteCharacter = '"';
squel.cls.DefaultQueryBuilderOptions.fieldAliasQuoteCharacter = '"';

// Pg Pool instance
const pool = new Pool({

  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'database99',
  password: process.env.PGPASSWORD || '123456',
  port: process.env.PGPORT || 5432,
  idleTimeoutMillis: 500,
  connectionTimeoutMillis: 1000

});

/*
-----------------------------------------------
  to Check Connection of database
-----------------------------------------------
*/
exports.isConnected = () => {
  return pool.connect()
    .then(client => {
      return client.query('select 1')
        .then(() => {
          client.release();
          return ({
            success: 'successfully connected to database!'
          });
        })
        .catch(e => {
          client.release();
          return e;
        })
    });
}

/*
-----------------------------------------------
  Execute Queries
-----------------------------------------------
*/
exports.executeQuery = (query) => {
  return pool.connect()
    .then(client => {
      return client.query(query.text, query.values)
        .then(res => {
          client.release();
          return res.rows;
        })
        .catch(() => {
          client.release();
        })
    })
}

exports.queryBuilder = squel;
