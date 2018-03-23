const squel = require('squel').useFlavour('postgres');
const { Pool } = require('pg');
const config = require('./config/databaseConfig');

if (process.env.NODE_ENV === 'test'){
  // eslint-disable-next-line
  const dotenv = require('dotenv').config();
  // find ENV and if not found then throw error!
  if (dotenv.error) {
    throw dotenv.error;
  }
}

/*
-----------------------------------------------
  Squel Options for Postgres
-----------------------------------------------
*/
squel.cls.DefaultQueryBuilderOptions.autoQuoteFieldNames = false;
squel.cls.DefaultQueryBuilderOptions.autoQuoteTableNames = true;
squel.cls.DefaultQueryBuilderOptions.autoQuoteAliasNames = true;
squel.cls.DefaultQueryBuilderOptions.nameQuoteCharacter = '"';
squel.cls.DefaultQueryBuilderOptions.tableAliasQuoteCharacter = '"';
squel.cls.DefaultQueryBuilderOptions.fieldAliasQuoteCharacter = '"';

/* pool instance */
let pool;

// Pg Pool instance Defined According to NODE_ENV
if (process.env.NODE_ENV === 'test'){
  pool = new Pool(config.testDatabase);
} else {
  pool = new Pool(config.productionDatabase);
}


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
