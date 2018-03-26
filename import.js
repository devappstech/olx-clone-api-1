const dotenv = require('dotenv');
const result = dotenv.config()
const database = require('./database/database');
const parsedData = require('./csvparser')

// find ENV and if not found then throw error!
if (result.error) {
  throw result.error;
}

/*
-----------------------------------------------
  Seed States Csv data to database
-----------------------------------------------
*/
exports.insertStates = () => {
  return parsedData.parseStates().then((data) => {
    return Promise.all(data.map((item) => {
      let query = database.queryBuilder
     .insert()
     .into('states')
     .set('state_name', item.toString())
     .toParam();

      return database.executeQuery(query);
    }));
  });
}

/*
-----------------------------------------------
  Seed Cities Csv data to database
-----------------------------------------------
*/
exports.insertCities = () => {
  return parsedData.parseCities().then((data) => {
    return Promise.all(data.map((item) => {
      let query = database.queryBuilder
     .insert()
     .into('cities')
     .set('city_state_id', parseInt(item.cityStateId, 0))
     .set('city_name', item.cityName.toString())
     .toParam();

      return database.executeQuery(query);
    }));
  });
}

/*
-----------------------------------------------
  Seed Categories Csv data to database
-----------------------------------------------
*/
exports.insertCategories = () => {
  return parsedData.parseCategories().then((data) => {
    return Promise.all(data.map((item) => {
      let query = database.queryBuilder
     .insert()
     .into('categories')
     .set('category_name', item.toString())
     .toParam();

      return database.executeQuery(query);
    }));
  });
}

/*
-----------------------------------------------
  Seed Users Csv data to database
-----------------------------------------------
*/
exports.insertUsers = () => {
  return parsedData.parseUsers().then((data) => {
    return Promise.all(data.map((item) => {
      let query = database.queryBuilder
     .insert()
     .into('users')
     .set('user_phone', parseInt(item.userPhoneNumber, 0))
     .set('user_name', item.userName.toString())
     .set('user_email', item.userEmail.toString())
     .toParam();

      return database.executeQuery(query);
    }));
  });
}

/*
-----------------------------------------------
  Seed Auth Csv data to database
-----------------------------------------------
*/
exports.insertAuth = () => {
  return parsedData.parseAuth().then((data) => {
    return Promise.all(data.map((item) => {
      let query = database.queryBuilder
     .insert()
     .into('auth')
     .set('auth_user_id', parseInt(item.authUserId, 0))
     .set('auth_type', item.authType.toString())
     .set('auth_password', item.authPassword.toString() || null)
     .toParam();

      return database.executeQuery(query);
    }));
  });
}

/*
-----------------------------------------------
  Seed Advertises Csv data to database
-----------------------------------------------
*/
exports.insertAdvertises = () => {
  return parsedData.parseAdvertises().then((data) => {
    return Promise.all(data.map((item) => {
      let query = database.queryBuilder
     .insert()
     .into('advertises')
     .set('advertise_user_id', parseInt(item.advertiseUserId, 0))
     .set('advertise_title', item.advertiseTitle.toString())
     .set('advertise_description', item.advertiseDescription.toString())
     .set('advertise_price', parseFloat(item.advertisePrice))
     .set('advertise_condition', item.advertiseCondition.toString())
     .set('advertise_category_id', parseInt(item.advertiseCategoryId, 0))
     .set('advertise_latitude', parseFloat(item.advertiseLatitude) || null)
     .set('advertise_longitude', parseFloat(item.advertiseLongitude) || null)
     .set('advertise_timestamp', item.advertiseTimestamp)
     .set('advertise_sold', item.advertiseSold)
     .set('advertise_city_id', parseInt(item.advertiseCityId, 0))
     .set('advertise_stage', item.advertiseStage.toString())
     .toParam();

      return database.executeQuery(query);
    }));
  });
}

/*
-----------------------------------------------
  Seed Images Csv data to database
-----------------------------------------------
*/
exports.insertImages = () => {
  return parsedData.parseImages().then((data) => {
    return Promise.all(data.map((item) => {
      let query = database.queryBuilder
     .insert()
     .into('images')
     .set('image_advertise_id', parseInt(item.imageAdvertiseId, 0))
     .set('image_path', item.imagePath.toString())
     .toParam();

      return database.executeQuery(query);
    }));
  });
}

/*
-----------------------------------------------
  Seed reset_password Csv data to database
-----------------------------------------------
*/
exports.insertResetPassword = () => {
  return parsedData.parseResetPassword().then((data) => {
    return Promise.all(data.map((item) => {
      let query = database.queryBuilder
     .insert()
     .into('reset_password')
     .set('reset_id', parseInt(item.resetId, 0))
     .set('reset_user_email', item.resetUserEmail.toString())
     .set('reset_token', item.resetToken.toString())
     .set('reset_timestamp', item.resetTimestamp)
     .toParam();

      return database.executeQuery(query);
    }));
  });
}

/*
----------------------------------------------------
  Execution Of Seeding Start From States then Cities,
  Categories, Users, Auth, Advertises and Images.
  Respectivly.
----------------------------------------------------
*/
if (!(process.env.NODE_ENV === 'test')){

  this.insertStates()
  .then(() => {
    console.log('Done States');
    return this.insertCities();
  })
  .then(() => {
    console.log('Done Cities');
    return this.insertCategories();
  })
  .then(() => {
    console.log('Done categories');
    return this.insertUsers();
  })
  .then(() => {
    console.log('Done Users');
    return this.insertAuth();
  })
  .then(() => {
    console.log('Done Auth');
    return this.insertAdvertises();
  })
  .then(() => {
    console.log('Done advertises');
    return this.insertResetPassword();
  })
  .then(() => {
    console.log('Done reset password table');
    return this.insertImages();
  })
  .then(() => {
    console.log('Done Images');
    console.log('---------\nAll CSV Data Seeded!\n---------');
  })
  .catch(error => console.log('Error: Some Error Occoured During Importing Data.\n', error));

}
