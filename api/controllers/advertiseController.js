const advertisesModel = require('../models/advertisesModel');

const Joi = require('joi');

// schema for Advertise's ID
const validateId = Joi.object().keys({
  advertiseId: Joi.number().integer()
  .required()
})

// For Pagination
const itemperPage = 10;

/* Get Recent Advertises */
exports.getRecentAdvertise = (req, res) => {

  let page;
  if (parseInt(req.query.page, 0)){
    page = parseInt(req.query.page, 0);
  } else {
    page = 1;
  }

  const from = advertisesModel.calculatePagination(itemperPage, page).from;
  const to = advertisesModel.calculatePagination(itemperPage, page).to;

  advertisesModel.recentAds(from, to).then((data) => {
    if (!data || data.length <= 0){
      res.status(404).json({ message: 'No Data Found' });
    } else {
      res.status(200).json({ message: 'Success', length: data.length, data: data });
    }
  })
  .catch(e => res.status(500).json({ message: 'Error Occured!', Stack: e }));
}

/* Create new Advertises */
// exports.createAdvertise = (req, res) => {
//   res.status(500).json({ message: 'Error' });
// }

/* Get single Advertises by ID */
exports.getSingleAdvertise = (req, res) => {

  const id = parseInt(req.params.id, 0);

  // eslint-disable-next-line
  const result = Joi.validate({ advertiseId: id }, validateId);

  if (result.error === null){
    advertisesModel.singleAd(id).then((data) => {
      if (!data || data.length <= 0){
        res.status(404).json({ message: 'Not Found!' });
      } else {
        res.status(200).json({ message: 'Success', data: data });
      }
    })
    .catch(e => res.status(500).json({ message: 'Error Occured!', Stack: e }));
  } else {
    res.status(400).json({ message: 'Invalid Data!' });
  }
}

/* Modify single Advertises by ID */
exports.modifySingleAdvertise = (req, res) => {
  res.status(500).json({ message: 'Error' });
}

/* Delete  Advertises by ID */
exports.deleteSingleAdvertise = (req, res) => {
  res.status(500).json({ message: 'Error' });
}

/* Get Advertises based on search / filer */
exports.getSearchResult = (req, res) => {
  res.status(500).json({ message: 'Error' });
}

/* Get Advertises in partiular category */
exports.showAdInCategory = (req, res) => {
  res.status(500).json({ message: 'Error' });
}
