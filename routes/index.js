const express = require('express');
// eslint-disable-next-line
const router = express.Router();

// Controllers
const advertiseController = require('../api/controllers/advertiseController');
const categoriesController = require('../api/controllers/categoriesController');
const statesController = require('../api/controllers/statesController');
const usersController = require('../api/controllers/usersController');

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
router.post('/categories', categoriesController.create);
router.get('/categories/:categoryId', categoriesController.read);
router.put('/categories/:categoryId', categoriesController.update);
router.delete('/categories/:categoryId', categoriesController.delete);

/* States Controller Functions */
router.get('/states', statesController.readAll);
router.post('/states', statesController.create);
router.get('/states/:stateId', statesController.read);
router.put('/states/:stateId', statesController.update);
router.delete('/states/:stateId', statesController.delete);
router.get('/states/:id/cities', statesController.stateCities)

/* Users Controller Functions */
router.get('/users/profile/:id', usersController.viewProfile);
router.post('/users/register', usersController.create);
router.put('/users/edit/:id', usersController.editProfile);

module.exports = router;
