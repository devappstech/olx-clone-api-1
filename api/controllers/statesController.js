const statesModel = require('../models/statesModel');

const Joi = require('joi');

// schema for State's ID
const validateId = Joi.object().keys({
  stateId: Joi.number().integer()
  .required()
})

/*
----------------------------------------------------
  fetch all states available in database
----------------------------------------------------
*/
exports.readAll = (req, res) => {
  statesModel.readAllState().then((data) => {
    if (!data || data.length <= 0){
      res.status(404).json({ message: 'No Data Found' });
    } else {
      res.status(200).json({ message: 'Success', data: data });
    }
  })
  .catch(e => res.status(500).json({ message: 'Error Occured!', Stack: e }));
}

/*
----------------------------------------------------
  fetch states details by state id
----------------------------------------------------
*/
exports.read = (req, res) => {

  const id = parseInt(req.params.id, 0);

  // eslint-disable-next-line
  const result = Joi.validate({ stateId: id }, validateId);

  if (result.error === null){
    statesModel.readState(id).then((data) => {
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

/*
----------------------------------------------------
  fetch cities along with state by ID
----------------------------------------------------
*/

exports.stateCities = (req, res) => {

  const id = parseInt(req.params.id, 0);

  // eslint-disable-next-line
  const result = Joi.validate({ stateId: id }, validateId);

  if (result.error === null){
    statesModel.readAllStateCities(id).then((data) => {
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
