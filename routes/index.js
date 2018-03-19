const express = require('express');
// eslint-disable-next-line
const router = express.Router();
const passport = require('passport');

/* GET Default Express page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Index of Express' });
});

// Controllers
const advertiseController = require('../api/controllers/advertiseController');
const categoriesController = require('../api/controllers/categoriesController');
const statesController = require('../api/controllers/statesController');
const usersController = require('../api/controllers/usersController');

//Middlewares
// eslint-disable-next-line
const passportSetup = require('../api/middlewares/passportSetup');
const isAuthTrue = require('../api/middlewares/successAuth');
const validateLink = require('../api/middlewares/validateLink');

/* Adverties Controller Functions */
router.get('/ads', advertiseController.getRecentAdvertise);
router.post('/ads', isAuthTrue.isAuth, advertiseController.createAdvertise); //stage1
router.post('/ads/:id/upload', isAuthTrue.isAuth, advertiseController.uploadAdvertiseImages); //stage2
router.put('/ads/:id/publish', isAuthTrue.isAuth, advertiseController.publishAdvertise); //published
router.get('/ads/:id', advertiseController.getSingleAdvertise);
//router.put('/ads/:id', advertiseController.modifySingleAdvertise);
router.delete('/ads/:id', isAuthTrue.isAuth, advertiseController.deleteSingleAdvertise);
router.put('/ads/:id/sold', isAuthTrue.isAuth, advertiseController.markAsSold);
router.put('/ads/:id/sell', isAuthTrue.isAuth, advertiseController.markAsUnsold);
router.get('/ads/results/:term', advertiseController.searchAll);
router.get('/ads/:categorName/:term', advertiseController.searchInCategory);

/* Categories Controller Functions */
router.get('/categories', categoriesController.readAll);
router.get('/categories/:id', categoriesController.read);

/* States Controller Functions */
router.get('/states', statesController.readAll);
router.get('/states/:id', statesController.read);
router.get('/states/:id/cities', statesController.stateCities);

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
router.get('/users/password/reset/:token', validateLink.verifyToken, usersController.sucessToken);
router.post('/users/password/reset/:token', validateLink.verifyToken, usersController.setNewPassword);

module.exports = router;
