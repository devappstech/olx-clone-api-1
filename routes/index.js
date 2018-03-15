const express = require('express');
// eslint-disable-next-line
const router = express.Router();
const passport = require('passport');
// Controllers
const advertiseController = require('../api/controllers/advertiseController');
const categoriesController = require('../api/controllers/categoriesController');
const statesController = require('../api/controllers/statesController');
const usersController = require('../api/controllers/usersController');
const isAuthTrue = require('../api/middlewares/successAuth');

// eslint-disable-next-line
const passportSetup = require('../api/middlewares/passportSetup');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Index of Express' });
});

/* Adverties Controller Functions */
router.get('/ads', advertiseController.getRecentAdvertise);
router.post('/ads', advertiseController.createAdvertise);
router.get('/ads/:id', advertiseController.getSingleAdvertise);
router.put('/ads/:id', advertiseController.modifySingleAdvertise);
router.delete('/ads/:id', advertiseController.deleteSingleAdvertise);
router.put('/ads/:id/sells', advertiseController.setAdvertiseStatus);
router.get('/ads/search/:keyword', advertiseController.getSearchResult);
router.get('/ads/categories/:categoryId', advertiseController.showAdInCategory);
router.post('/ads/:id/upload', advertiseController.uploadAdvertisePhotos);

/* Categories Controller Functions */
router.get('/categories', categoriesController.readAll);
router.get('/categories/:id', categoriesController.read);

/* States Controller Functions */
router.get('/states', statesController.readAll);
router.get('/states/:id', statesController.read);
router.get('/states/:id/cities', statesController.stateCities)

/* Users Controller Functions */
router.get('/users/profile', isAuthTrue.isAuth, usersController.viewProfile);
router.get('/users/profile/:id', usersController.viewProfile);
router.post('/users/register', usersController.create);
router.put('/users/edit', isAuthTrue.isAuth, usersController.editProfile);
router.post('/users/login', passport.authenticate('local'), usersController.login);
router.get('/users/logout', usersController.logout);
router.get('/users/ads', isAuthTrue.isAuth, usersController.userAdvertise);
router.get('/users/ads/:id', usersController.userAdvertise);
router.put('/users/password/update', isAuthTrue.isAuth, usersController.resetPassword);
router.post('/users/status/email', usersController.isEmailAvailable);
router.get('/users/auth/status', usersController.loginStatus);
router.post('/users/password/forget', usersController.forgetPassword);

module.exports = router;
