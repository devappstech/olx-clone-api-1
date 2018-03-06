const usersModel = require('../models/usersModel');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/*
------------------------------------------------------------------
  User Schemas to Validate data
------------------------------------------------------------------
*/

// schema for user's registration
const validateNewUser = Joi.object().keys({
  newUserName: Joi.string()
  .required(),
  userEmail: Joi.string().email()
  .required(),
  userPhone: Joi.number().integer().min(10)
  .required(),
  userPassword: Joi.string()
  .required()
})

// schema for user's registration
const validateUser = Joi.object().keys({
  newUserName: Joi.string()
  .required(),
  userEmail: Joi.string().email()
  .required(),
  userPhone: Joi.number().integer().min(10)
  .required()
})

// schema for user's ID
const validateUsersId = Joi.object().keys({
  userId: Joi.number().integer()
  .required()
})

// schema for user's ID
const validateUsersPassword = Joi.object().keys({
  userPassword: Joi.string()
  .required()
})

/*
------------------------------------------------------------------
  User Controller Function For Register New Users
------------------------------------------------------------------
*/

exports.create = (req, res) => {

  const userName = req.body.username;
  const email = req.body.email;
  const phone = parseInt(req.body.phone, 0);
  const password = req.body.password

  // eslint-disable-next-line
  const result = Joi.validate({ newUserName: userName, userEmail: email, userPassword: password, userPhone: phone }, validateNewUser);

  if (result.error === null) {
    bcrypt.hash(password, saltRounds).then(function(hash) {
      usersModel.createLocalUser(userName, email, phone)
      .then(data => usersModel.createLocalUserAuth(data[0].user_id, hash))
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: 'Not Found!' });
        } else {
          res.status(201).json({ message: 'Success', data: data });
        }

      })
      .catch(e => res.status(500).json({ message: 'Error Occured!', Stack: e.stack }));
    })
    .catch(e => res.status(500).json({ message: 'Error Occured!', Stack: e.stack }));
  } else {
    res.status(400).json({ message: 'Invalid Data!' });
  }

}

/*
------------------------------------------------------------------
  User Controller Function to View Users profile
------------------------------------------------------------------
*/
exports.viewProfile = (req, res) => {

  let id;
  if (!req.params.id){
    id = parseInt(req.session.passport.user, 0);
  } else {
    id = parseInt(req.params.id, 0);
  }

  // eslint-disable-next-line
  const result = Joi.validate({ userId: id }, validateUsersId);

  if (result.error === null){
    usersModel.findUserProfile(id)
    .then((data) => {
      if (!data || data.length === 0) {
        res.status(404).json({ message: 'Not Found!' });
      } else {
        res.status(200).json({ message: 'Success', data: data });
      }

    })
    .catch(e => res.status(500).json({ message: 'Error Occured!', Stack: e.stack }));
  } else {
    res.status(400).json({ message: 'Invalid Data!' });
  }
}

/*
------------------------------------------------------------------
  User Controller Function to Edit Users profile
------------------------------------------------------------------
*/
exports.editProfile = (req, res) => {

  let id = parseInt(req.session.passport.user, 0);

  const userName = req.body.username;
  const email = req.body.email;
  const phone = parseInt(req.body.phone, 0);

  // eslint-disable-next-line
  const result = Joi.validate({ newUserName: userName, userEmail: email, userPhone: phone }, validateUser);
  // eslint-disable-next-line
  const resultId = Joi.validate({ userId: id }, validateUsersId);

  console.log(result, resultId)
  if (result.error === null && resultId.error === null){
    usersModel.editUser(id, userName, email, phone)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'Not Found!' });
      } else {
        res.status(200).json({ message: 'Success', data: data });
      }

    })
    .catch(e => res.status(500).json({ message: 'Error Occured!', Stack: e.stack }));
  } else {
    res.status(400).json({ message: 'Invalid Data!' });
  }
}

/*
------------------------------------------------------------------
  User Controller Function to View Users profile
------------------------------------------------------------------
*/
exports.userAdvertise = (req, res) => {

  let id;
  if (!req.params.id){
    id = parseInt(req.session.passport.user, 0);
  } else {
    id = parseInt(req.params.id, 0);
  }

  // eslint-disable-next-line
  const result = Joi.validate({ userId: id }, validateUsersId);

  if (result.error === null){
    usersModel.findUserAdvertises(id)
    .then((data) => {
      if (!data && data.length === 0) {
        res.status(404).json({ message: 'Not Found!' });
      } else {
        res.status(200).json({ message: 'Success', data: data });
      }

    })
    .catch(e => res.status(500).json({ message: 'Error Occured!', Stack: e.stack }));
  } else {
    res.status(406).json({ message: 'Invalid Data!' });
  }
}

/*
------------------------------------------------------------------
  User Controller Function to Fetch Users profile from session
------------------------------------------------------------------
*/
exports.login = (req, res) => {

  const id = req.user;
  // eslint-disable-next-line
  const result = Joi.validate({ userId: id }, validateUsersId);

  if (result.error === null){
    usersModel.findUserProfile(id)
    .then((data) => {
      if (!data && data.length === 0) {
        res.status(404).json({ message: 'Not Found!' });
      } else {
        res.status(200).json({ message: 'Success', Auth: req.isAuthenticated(), data: data });
      }
    })
    .catch(e => res.status(500).json({ message: 'Error Occured!', Stack: e.stack }));
  } else {
    res.status(400).json({ message: 'Invalid Data!' });
  }
}

/*
------------------------------------------------------------------
  User Controller Function to Logout Users
------------------------------------------------------------------
*/
exports.logout = (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "Success" });
}

/*
------------------------------------------------------------------
  User Controller Function to reset Users password
------------------------------------------------------------------
*/
exports.resetPassword = (req, res) => {

  let id = parseInt(req.session.passport.user, 0);

  const password = req.body.password;

  // eslint-disable-next-line
  const result = Joi.validate({ userPassword: password }, validateUsersPassword);
  // eslint-disable-next-line
  const resultId = Joi.validate({ userId: id }, validateUsersId);

  console.log(result, resultId)
  if (result.error === null && resultId.error === null){
    bcrypt.hash(password, saltRounds).then(function(hash) {
      usersModel.resetPassword(id, hash)
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: 'Not Found!' });
        } else {
          res.status(200).json({ message: 'Success', data: data });
        }

      })
      .catch(e => res.status(500).json({ message: 'Error Occured!', Stack: e.stack }));
    })
    .catch(e => res.status(500).json({ message: 'Error Occured!', Stack: e.stack }));
  } else {
    res.status(400).json({ message: 'Invalid Data!' });
  }
}
