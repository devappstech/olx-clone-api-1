const database = require('../../database/database');

/*
---------------------------------------------------------
  Advertise Models: createAdvertise - create partial
  advertise by just text information
---------------------------------------------------------
*/
exports.createAdvertise = (userId, title, description, price, condition, categoryId, lat, long, cityId, stage) => {

  const createAdvertiseQuery = database.queryBuilder
  .insert()
  .into('advertises')
  .set('advertise_user_id', userId)
  .set('advertise_title', title)
  .set('advertise_description', description)
  .set('advertise_price', price)
  .set('advertise_condition', condition)
  .set('advertise_category_id', categoryId)
  .set('advertise_latitude', lat)
  .set('advertise_longitude', long)
  .set('advertise_city_id', cityId)
  .set('advertise_stage', stage)
  .returning('*')
  .toParam();

  return database.executeQuery(createAdvertiseQuery);
}

/*
---------------------------------------------------------
  Advertise Models: fetch advertise_id correspond with
  user id
---------------------------------------------------------
*/

exports.usersAdvertise = (userId, advertiseId) => {
  const usersAdvertiseQuery = database.queryBuilder
  .select()
  .from('advertises')
  .field('advertises.advertise_id')
  .field('users.user_id')
  .join('users', null, 'users.user_id = advertises.advertise_user_id')
  .where('users.user_id = ?', userId)
  .where('advertises.advertise_id = ?', advertiseId)
  .toParam();

  return database.executeQuery(usersAdvertiseQuery);
}

/*
---------------------------------------------------------
  Advertise Models: insert images into database
---------------------------------------------------------
*/

exports.insertImages = (advertiseId, imagePath) => {
  const insertImagesQuery = database.queryBuilder
  .insert()
  .into('images')
  .set('image_advertise_id', advertiseId)
  .set('image_path', imagePath)
  .toParam();

  return database.executeQuery(insertImagesQuery);
}

/*
---------------------------------------------------------
  Advertise Models: update Advertise Stage
---------------------------------------------------------
*/

exports.updateStage = (advertiseId, stage) => {
  const updateStageQuery = database.queryBuilder
  .update()
  .table('advertises')
  .set('advertise_stage', stage)
  .where('advertise_id = ?', advertiseId)
  .toParam();

  return database.executeQuery(updateStageQuery);
}


/*
---------------------------------------------------------
  Advertise Models: mark Advertise as Sold
---------------------------------------------------------
*/

exports.adMarkAsSold = (advertiseId) => {
  const adMarkAsSold = database.queryBuilder
  .update()
  .table('advertises')
  .set('advertise_sold', true)
  .where('advertise_id = ?', advertiseId)
  .toParam();

  return database.executeQuery(adMarkAsSold);
}

/*
---------------------------------------------------------
  Advertise Models: mark Advertise as unsold or continue
  selling
---------------------------------------------------------
*/

exports.adMarkAsUnsold = (advertiseId) => {
  const adMarkAsUnsold = database.queryBuilder
  .update()
  .table('advertises')
  .set('advertise_sold', false)
  .where('advertise_id = ?', advertiseId)
  .toParam();

  return database.executeQuery(adMarkAsUnsold);
}

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
  .field(database.queryBuilder.str('json_agg(images.image_path)'), 'images')
  .field('categories.category_name')
  .field('users.user_name')
  .field('users.user_phone')
  .field('users.user_id')
  .field('users.user_email')
  .field('advertises.advertise_sold')
  .join('users', null, 'advertises.advertise_user_id = users.user_id')
  .join('cities', null, 'advertises.advertise_city_id = cities.city_id')
  .join('states', null, 'cities.city_state_id = states.state_id')
  .join('categories', null, 'categories.category_id = advertises.advertise_category_id')
  .join('images', null, 'images.image_advertise_id = advertises.advertise_id')
  .where('advertise_stage = ?', 'published')
  .where('advertise_sold = ?', false)
  .group('advertises.advertise_id')
  .group('cities.city_id')
  .group('states.state_id')
  .group('categories.category_id')
  .group('users.user_id')
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
  .where('advertise_stage = ?', 'published')
  .where('advertise_sold = ?', false)
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
  .field(database.queryBuilder.str('json_agg(images.image_path)'), 'images')
  .field('categories.category_name')
  .field('users.user_name')
  .field('users.user_phone')
  .field('users.user_id')
  .field('users.user_email')
  .field('advertises.advertise_sold')
  .join('users', null, 'advertises.advertise_user_id = users.user_id')
  .join('cities', null, 'advertises.advertise_city_id = cities.city_id')
  .join('states', null, 'cities.city_state_id = states.state_id')
  .join('categories', null, 'categories.category_id = advertises.advertise_category_id')
  .join('images', null, 'images.image_advertise_id = advertises.advertise_id')
  .where('advertises.advertise_id = ?', advertiseID)
  .where('advertise_stage = ?', 'published')
  .group('advertises.advertise_id')
  .group('cities.city_id')
  .group('states.state_id')
  .group('categories.category_id')
  .group('users.user_id')
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
  .field(database.queryBuilder.str('json_agg(images.image_path)'), 'images')
  .field('categories.category_name')
  .field('users.user_name')
  .field('users.user_phone')
  .field('users.user_id')
  .field('users.user_email')
  .field('advertises.advertise_sold')
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
  .where('advertise_stage = ?', 'published')
  .where('advertise_sold = ?', false)
  .group('advertises.advertise_id')
  .group('cities.city_id')
  .group('states.state_id')
  .group('categories.category_id')
  .group('users.user_id')
  .order('advertise_timestamp', false)
  .limit(limit)
  .offset(offset)
  .toParam();

  return database.executeQuery(QuerySearchResult);
}

/*
---------------------------------------------------------
  Advertise Models: categorySearchResult - search
  advertises in all specific category
---------------------------------------------------------
*/
exports.categorySearchResult = (limit, offset, categoryName, searchKeyword, minPrice, maxPrice) => {

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
  .field(database.queryBuilder.str('json_agg(images.image_path)'), 'images')
  .field('categories.category_name')
  .field('users.user_name')
  .field('users.user_phone')
  .field('users.user_id')
  .field('users.user_email')
  .field('advertises.advertise_sold')
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
  .where('advertise_stage = ?', 'published')
  .where('advertise_sold = ?', false)
  .where('categories.category_name = ?', categoryName)
  .group('advertises.advertise_id')
  .group('cities.city_id')
  .group('states.state_id')
  .group('categories.category_id')
  .group('users.user_id')
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
