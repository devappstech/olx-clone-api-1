const database = require('../../database/database');

exports.calculatePagination = (itemsPerPage, currentPage) =>{
  return ({
    per_page: itemsPerPage,
    current_page: currentPage,
    from: ((currentPage - 1) * itemsPerPage) + 1,
    to: currentPage * itemsPerPage
  })
}

exports.recentAds = (from, to) => {


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
  .limit(to)
  .offset(from)
  .toParam();

  return database.executeQuery(QueryRecentAds);
}

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

  //console.log("QuerySingleAds", QuerySingleAds);
  return database.executeQuery(QuerySingleAds);
}

exports.searchResult = (searchKeyword) => {
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
  .left_join('images', null, 'images.image_advertise_id = advertises.advertise_id')
  .where(database.queryBuilder.expr()
    .and('advertise_title ilike ?', '%' + searchKeyword + '%')
    .or('advertise_description ilike ?', '%' + searchKeyword + '%'))
  .order('advertise_timestamp', false)
  .toParam();

  return database.executeQuery(QuerySearchResult);
}
