const database = require('../../database/database');

/*
---------------------------------------------------------
  Users Models: createLocalUser - insert new local users
---------------------------------------------------------
*/
exports.createLocalUser = (userName, email, phone) => {

  const registerUserQuery = database.queryBuilder
    .insert()
    .into('users')
    .set('user_name', userName)
    .set('user_email', email)
    .set('user_phone', phone)
    .returning('*')
    .toParam();

  return database.executeQuery(registerUserQuery);
}

/*
---------------------------------------------------------
  Users Models: createLocalUserAuth - insert new local users
  auth
---------------------------------------------------------
*/
exports.createLocalUserAuth = (userid, password) => {

  const registerUserAuthQuery = database.queryBuilder
    .insert()
    .into('auth')
    .set('auth_user_id', userid)
    .set('auth_type', 'Local')
    .set('auth_password', password)
    .returning('*')
    .toParam();

  return database.executeQuery(registerUserAuthQuery);
}

/*
---------------------------------------------------------
  Users Models: findLocalUser - Find and Send users data
  Used for Passportjs
---------------------------------------------------------
*/
exports.findLocalUser = (email) => {

  const findLocalUserQuery = database.queryBuilder
    .select()
    .from('users')
    .field('user_id')
    .field('user_name')
    .field('user_email')
    .field('user_phone')
    .field('auth_type')
    .field('auth_password')
    .join('auth', null, 'auth_user_id = user_id')
    .where('auth_type = ?', 'Local')
    .where('user_email = ?', email)
    .toParam();

  return database.executeQuery(findLocalUserQuery);
}

/*
---------------------------------------------------------
  Users Models: findById - Find user by id for deserialize
  on passportjs
---------------------------------------------------------
*/
exports.findById = (userId, authType) => {

  const findById = database.queryBuilder
    .select()
    .from('users')
    .field('user_id')
    .field('user_name')
    .field('user_email')
    .field('user_phone')
    .field('auth_type')
    .join('auth', null, 'auth_user_id = user_id')
    .where('auth_type = ?', authType)
    .where('user_id = ?', userId)
    .toParam();

  return database.executeQuery(findById);
}

/*
---------------------------------------------------------
  Users Models: findUserProfile - Find and Send users data
---------------------------------------------------------
*/
exports.findUserProfile = (id) => {

  const findUserProfile = database.queryBuilder
    .select()
    .from('users')
    .where('user_id = ?', id)
    .toParam();

  return database.executeQuery(findUserProfile);
}

/*
---------------------------------------------------------
  Users Models: findUserAdvertises - Find all advertises
  submited by user
---------------------------------------------------------
*/
exports.findUserAdvertises = (id) => {

  const findUserAdvertises = database.queryBuilder
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
    .where('users.user_id = ?', id)
    .order('advertise_timestamp', false)
    .toParam();

  return database.executeQuery(findUserAdvertises);
}

/*
---------------------------------------------------------
  Users Models: editUser - Edit users data
---------------------------------------------------------
*/
exports.editUser = (id, userName, email, phone) => {

  const editUser = database.queryBuilder
    .update()
    .table('users')
    .set('user_name', userName)
    .set('user_email', email)
    .set('user_phone', phone)
    .where('user_id = ?', id)
    .toParam();

  return database.executeQuery(editUser);
}

/*
---------------------------------------------------------
  Users Models: resetPassword - Update users password
---------------------------------------------------------
*/
exports.resetPassword = (id, password) => {

  const resetPassword = database.queryBuilder
    .update()
    .table('auth')
    .set('auth_password', password)
    .where('auth_user_id = ?', id)
    .where('auth_type = ?', 'Local')
    .toParam();

  return database.executeQuery(resetPassword);
}
