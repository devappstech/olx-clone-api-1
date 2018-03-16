const database = require('../../database/database');


/*
---------------------------------------------------------
  Advertise Models: createAdvertise - create partial
  advertise by just text information
---------------------------------------------------------
*/
// exports.createAdvertise = () => {

// }


/*
---------------------------------------------------------
  Advertise Models: recentAds - show recent advertise
  according to pagination
---------------------------------------------------------
*/
exports.recentAds = (limit, offset) => {

  const QueryRecentAds = database.queryBuilder
  .select()
  .from('advertises')
  .field('advertises.advertise_id')
  .field('advertises.advertise_title')
  .field('advertises.advertise_description')
  .field('advertises.advertise_price')
  .field('advertises.advertise_condition')
  .field('advertises.advertise_timestamp')
  .field('cities.city_name')
  .field('states.state_name')
  .field('images.image_path')
  .field('categories.category_name')
  .field('users.user_name')
  .field('users.user_phone')
  .join('users', null, 'advertises.advertise_user_id = users.user_id')
  .join('cities', null, 'advertises.advertise_city_id = cities.city_id')
  .join('states', null, 'cities.city_state_id = states.state_id')
  .join('categories', null, 'categories.category_id = advertises.advertise_category_id')
  .join('images', null, 'images.image_advertise_id = advertises.advertise_id')
  .order('advertise_timestamp', false)
  .limit(limit)
  .offset(offset)
  .toParam();

  return database.executeQuery(QueryRecentAds);
}

exports.countRecords = () => {
  const countQueryRecentAds = database.queryBuilder
  .select()
  .from('advertises')
  .field('count(advertise_id)', 'count')
  .toParam();

  return database.executeQuery(countQueryRecentAds);
}

/*
---------------------------------------------------------
  Advertise Models: singleAd - show single advertise
  with details
---------------------------------------------------------
*/
exports.singleAd = (advertiseID) => {
  const QuerySingleAds = database.queryBuilder
  .select()
  .from('advertises')
  .field('advertises.advertise_id')
  .field('advertises.advertise_title')
  .field('advertises.advertise_description')
  .field('advertises.advertise_price')
  .field('advertises.advertise_condition')
  .field('advertises.advertise_timestamp')
  .field('cities.city_name')
  .field('states.state_name')
  .field('images.image_path')
  .field('categories.category_name')
  .field('users.user_name')
  .field('users.user_phone')
  .join('users', null, 'advertises.advertise_user_id = users.user_id')
  .join('cities', null, 'advertises.advertise_city_id = cities.city_id')
  .join('states', null, 'cities.city_state_id = states.state_id')
  .join('categories', null, 'categories.category_id = advertises.advertise_category_id')
  .left_join('images', null, 'images.image_advertise_id = advertises.advertise_id')
  .where('advertises.advertise_id = ?', advertiseID)
  .toParam();

  return database.executeQuery(QuerySingleAds);
}

/*
---------------------------------------------------------
  Advertise Models: searchResult - search advertises in
  all category
---------------------------------------------------------
*/
exports.searchResult = (limit, offset, searchKeyword, minPrice, maxPrice) => {
  const QuerySearchResult = database.queryBuilder
  .select()
  .from('advertises')
  .field('advertises.advertise_id')
  .field('advertises.advertise_title')
  .field('advertises.advertise_description')
  .field('advertises.advertise_price')
  .field('advertises.advertise_condition')
  .field('advertises.advertise_timestamp')
  .field('cities.city_name')
  .field('states.state_name')
  .field('images.image_path')
  .field('categories.category_name')
  .field('users.user_name')
  .field('users.user_phone')
  .join('users', null, 'advertises.advertise_user_id = users.user_id')
  .join('cities', null, 'advertises.advertise_city_id = cities.city_id')
  .join('states', null, 'cities.city_state_id = states.state_id')
  .join('categories', null, 'categories.category_id = advertises.advertise_category_id')
  .join('images', null, 'images.image_advertise_id = advertises.advertise_id')
  .where(database.queryBuilder.expr()
    .and('advertise_title ilike ?', '%' + searchKeyword + '%')
    .or('advertise_description ilike ?', '%' + searchKeyword + '%'))
  .where('advertise_price >= ?', minPrice)
  .where('advertise_price <= ?', maxPrice)
  .order('advertise_timestamp', false)
  .limit(limit)
  .offset(offset)
  .toParam();

  return database.executeQuery(QuerySearchResult);
}

exports.deleteAdvertise = (id, userId) => {
  const deleteAdvertiseQuery = database.queryBuilder
  .delete()
  .from('advertises')
  .where('advertise_id = ?', id)
  .where('advertise_user_id = ?', userId)
  .toParam();

  return database.executeQuery(deleteAdvertiseQuery);
}
