const categoriesModel = require('../models/categoriesModel');

const Joi = require('joi');

// schema for State's ID
const validateId = Joi.object().keys({
  categoryId: Joi.number().integer()
  .required()
})

/* fetch all categories */
exports.readAll = (req, res) => {

  categoriesModel.readAllCategories().then((data) => {
    if (!data || data.length <= 0){
      res.status(404).json({ message: 'No Data Found' });
    } else {
      res.status(200).json({ message: 'Success', data: data });
    }
  })
  .catch(e => res.status(500).json({ message: 'Error Occured!', Stack: e }));
}

/* fetch single categories */
exports.read = (req, res) => {

  const id = parseInt(req.params.id, 0);

  // eslint-disable-next-line
  const result = Joi.validate({ categoryId: id }, validateId);

  if (result.error === null){
    categoriesModel.readCategory(id).then((data) => {
      if (!data || data.length <= 0){
        res.status(404).json({ message: 'No Data Found' });
      } else {
        res.status(200).json({ message: 'Success', data: data });
      }
    })
    .catch(e => res.status(500).json({ message: 'Error Occured!', Stack: e }));
  } else {
    res.status(400).json({ message: 'Invalid Data!' });
  }
}
