const advertisesModel = require('../models/advertisesModel');
const Joi = require('joi');
const slug = require('slug');

/* Default Filters */
const defaultMinPrice = 1;
const defaultMaxPrice = 999999999;

// schema for Advertise's ID
const validateId = Joi.object().keys({
  advertiseId: Joi.number().integer()
  .required()
})

// const newAdvertiseValidation = Joi.object().keys({
//   advertiseId: Joi.number().integer()
//   .required()
// })

/*
---------------------------------------------------------
  create new advertise
---------------------------------------------------------
*/
exports.createAdvertise = () => {

}

/*
---------------------------------------------------------
  show recent advertise according to pagination
---------------------------------------------------------
*/
exports.getRecentAdvertise = (req, res) => {

  // Pagination
  let page = parseInt(req.query.page, 0);
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  let limit = parseInt(req.query.limit, 0);
  if (isNaN(limit)) {
    limit = 10;
  } else if (limit < 1) {
    limit = 1;
  }

  let offset = (page - 1) * limit;
  let advertiseData;
  let count;

  const recentAdvertise = advertisesModel.recentAds(limit, offset).then((data) => {
    if (!data){
      res.status(404).json({ message: 'No Data Found' });
    } else {
      advertiseData = data;
    }
  })
  .catch(e => res.status(500).json({
    message: 'Error Occured!',
    Stack: e
  }));

  const advertiseCount = advertisesModel.countRecords()
  .then((data) => {
    if (!data) {
      res.status(404).json({
        message: 'Not Found!'
      });
    } else {
      count = parseInt(data[0].count, 0);
    }
  })
  .catch(e => res.status(500).json({
    message: 'Error Occured!',
    Stack: e.stack
  }));

  Promise.all([recentAdvertise, advertiseCount]).then((values) => {
    console.log(values);
    res.status(200).json({
      message: 'Success',
      metadata: {
        currentPage: page,
        limit: limit,
        displaing: advertiseData.length,
        total: count,
        last_page: Math.ceil(count / limit)
      },
      data: advertiseData
    });
  })
  .catch(e => res.status(500).json({
    message: 'Error Occured!',
    Stack: e.stack
  }));


}

/*
---------------------------------------------------------
  show single advertise with details
---------------------------------------------------------
*/
exports.getSingleAdvertise = (req, res) => {

  const id = parseInt(req.params.id, 0);

  const result = Joi.validate({
    advertiseId: id
  }, validateId);

  if (!result.error){
    advertisesModel.singleAd(id).then((data) => {
      if (!data || data.length <= 0){
        res.status(404).json({
          message: 'Not Found!'
        });
      } else {
        res.status(200).json({
          message: 'Success', data: data
        });
      }
    })
    .catch(e => res.status(500).json({
      message: 'Error Occured!', Stack: e
    }));
  } else {
    res.status(400).json({
      message: 'Invalid Data!'
    });
  }
}

/*
---------------------------------------------------------
  search advertises in all categories
---------------------------------------------------------
*/
exports.searchAll = (req, res) => {

  // Pagination
  let page = parseInt(req.query.page, 0);
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  let limit = parseInt(req.query.limit, 0);
  if (isNaN(limit)) {
    limit = 10;
  } else if (limit < 1) {
    limit = 1;
  }

  let offset = (page - 1) * limit;

  const term = slug(req.params.term, ' ');

  const filterArray = [
    parseInt(req.query.minPrice, 0) || defaultMinPrice,
    parseInt(req.query.maxPrice, 0) || defaultMaxPrice
  ]

  advertisesModel.searchResult(limit, offset, term, ...filterArray)
  .then((data) => {
    if (!data || data.length <= 0){
      res.status(404).json({
        message: 'Not Found!'
      });
    } else {
      const filteredData = data.filter((item) => {
        const condition = req.query.condition;
        const city = req.query.city;
        if (condition || city){
          if (item.advertise_condition === condition || item.city_name === city){
            return true;
          } else {
            return false;
          }
        } else {
          return data;
        }

      })
      res.status(200).json({
        message: 'Success',
        length: filteredData.length,
        data: filteredData
      });
    }
  })
  .catch(e => res.status(500).json({
    message: 'Error Occured!', Stack: e
  }));
}

/*
---------------------------------------------------------
  search advertises in specific category
---------------------------------------------------------
*/
exports.searchInCategory = (req, res) => {
  res.status(500).json({ message: 'Error' });
}

/* Create new Advertises */
// exports.createAdvertise = (req, res) => {
//   res.status(500).json({ message: 'Error' });
// }

/* Modify single Advertises by ID */
exports.modifySingleAdvertise = (req, res) => {
  res.status(500).json({ message: 'Error' });
}

/* Delete  Advertises by ID */
exports.deleteSingleAdvertise = (req, res) => {

  const id = parseInt(req.params.id, 0);
  const userId = parseInt(req.session.passport.user.user_id, 0);

  const result = Joi.validate({ advertiseId: id }, validateId);

  if (result.error === null){
    advertisesModel.deleteAdvertise(id, userId).then((data) => {
      if (!data){
        res.status(404).json({
          message: 'Not Found!'
        });
      } else {
        res.status(200).json({
          message: 'Success', data: data
        });
      }
    })
    .catch(e => res.status(500).json({
      message: 'Error Occured!', Stack: e
    }));
  } else {
    res.status(400).json({
      message: 'Invalid Data!'
    });
  }
}
