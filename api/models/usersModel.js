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
exports.findById = (userId) => {

  const findById = database.queryBuilder
    .select()
    .from('users')
    .field('user_id')
    .field('user_name')
    .field('user_email')
    .field('user_phone')
    .field('auth_type')
    .join('auth', null, 'auth_user_id = user_id')
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
exports.findUserAdvertises = (limit, offset, id) => {

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
    .where('users.user_id = ?', id)
    .where('advertise_stage = ?', 'published')
    .group('advertises.advertise_id')
    .group('cities.city_id')
    .group('states.state_id')
    .group('categories.category_id')
    .group('users.user_id')
    .order('advertise_timestamp', false)
    .limit(limit)
    .offset(offset)
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

/*
---------------------------------------------------------
  Users Models: isEmailAvailable - Check new users email
  Available or not
---------------------------------------------------------
*/
exports.isEmailAvailable = (email) => {

  const EmailAvailable = database.queryBuilder
    .select()
    .from('users')
    .where('user_email = ?', email)
    .toParam();

  return database.executeQuery(EmailAvailable);
}

/*
---------------------------------------------------------
  Users Models: countUserAdvertise - Check total logged in
  users advertises.
---------------------------------------------------------
*/
exports.countUserAdvertise = (id) => {

  const countUserAdvertise = database.queryBuilder
    .select()
    .from('advertises')
    .field('COUNT(advertise_user_id)', 'count')
    .where('advertise_user_id = ?', id)
    .where('advertise_stage = ?', 'published')
    .group('advertise_user_id')
    .toParam();

  return database.executeQuery(countUserAdvertise);
}

/*
---------------------------------------------------------
  Users Models: createLocalUserAuth - insert new reset
  password of users auth
---------------------------------------------------------
*/
exports.resetEmailEntry = (email, uuid) => {

  const resetEmailEntry = database.queryBuilder
    .insert()
    .into('reset_password')
    .set('reset_user_email', email)
    .set('reset_token', uuid)
    .returning('*')
    .toParam();

  return database.executeQuery(resetEmailEntry);
}

/*
---------------------------------------------------------
  Users Models: findbyEmail - find user's id by email
---------------------------------------------------------
*/
exports.findIdByEmail = (email) => {

  const findIdByEmail = database.queryBuilder
    .select()
    .from('users')
    .where('user_email = ?', email)
    .toParam();

  return database.executeQuery(findIdByEmail);
}

/*
---------------------------------------------------------
  Users Models: findByToken - find user's id by token
---------------------------------------------------------
*/
exports.findByToken = (token) => {

  const findByToken = database.queryBuilder
    .select()
    .from('reset_password')
    .join('users', null, 'user_email = reset_user_email')
    .where('reset_token = ?', token)
    .toParam();

  return database.executeQuery(findByToken);
}
