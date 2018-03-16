const usersModel = require('../models/usersModel');
const Joi = require('joi');

// schema for user's ID
const validateTokenSchema = Joi.object().keys({
  tokenSyntax: Joi.string().guid()
  .required()
})

// in minutes 4320 min. = 3 days
const maxTimeForLink = 4320;

/*
------------------------------------------------------------------
  User Controller Function to validate User's reset link from email
------------------------------------------------------------------
*/
exports.verifyToken = (req, res, next) => {
  const token = req.params.token;

  const result = Joi.validate({
    tokenSyntax: token
  }, validateTokenSchema);

  if (!result.error){
    usersModel.findByToken(token).then((data) => {
      if (!data || data.length === 0){
        res.status(404).json({
          message: 'Not Found!'
        });

      } else {
        const tokenTimeStamp = new Date(data[0].reset_timestamp);
        const currentTimeStamp = new Date();
        const difference = Math.abs(Math.round(((currentTimeStamp.getTime() - tokenTimeStamp.getTime()) / 1000) / 60));

        if (difference >= maxTimeForLink){
          res.status(400).json({
            message: 'Token Expired!'
          });
        } else {
          next()
        }

      }
    })
    .catch(e => res.status(500).json({
      message: 'Error Occured!',
      Stack: e.stack
    }));
  } else {
    res.status(400).json({
      message: 'Invalid Token'
    })
  }
}
