const database = require('../database/database');

/* I/Os */
const queryInput = {
  text: 'SELECT DISTINCT user FROM information_schema.usage_privileges;',
  values: []
}

/*
--------------------------------------------------------
Should be Success Message for Database Connection
--------------------------------------------------------
*/
test(`Should be Success Message for Database Connection`, () => {
  expect.assertions(1);
  return expect(database.isConnected()).resolves.toMatchSnapshot();
});

/*
--------------------------------------------------------
Should Do Query Execution in Database
--------------------------------------------------------
*/
test(`Should Do Query Execution in Database`, () => {
  expect.assertions(1);
  return expect(database.executeQuery(queryInput)).resolves.toMatchSnapshot();
});
