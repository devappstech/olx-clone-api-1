const database = require('../../database/database');

exports.readAllCategories = () => {
  const QueryReadAllCategories = database.queryBuilder
  .select()
  .from('categories')
  .toParam();

  return database.executeQuery(QueryReadAllCategories);
}

exports.readCategory = (id) => {
  const QueryReadAllCategories = database.queryBuilder
  .select()
  .from('categories')
  .where('category_id = ?', id)
  .toParam();

  return database.executeQuery(QueryReadAllCategories);
}
