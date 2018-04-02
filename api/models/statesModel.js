const database = require('../../database/database');

exports.readState = (id) => {
  const QueryReadState = database.queryBuilder
  .select()
  .from('states')
  .where('state_id = ?', id)
  .toParam();

  return database.executeQuery(QueryReadState);
}

exports.readAllState = () => {
  const QueryReadAllState = database.queryBuilder
  .select()
  .from('states')
  .toParam();

  return database.executeQuery(QueryReadAllState);
}

exports.readAllStateCities = (id) => {
  const QueryReadAllStateCities = database.queryBuilder
  .select()
  .from('cities')
  .join('states', null, 'cities.city_state_id = states.state_id')
  .where('states.state_id = ?', id)
  .toParam();

  return database.executeQuery(QueryReadAllStateCities);
}
