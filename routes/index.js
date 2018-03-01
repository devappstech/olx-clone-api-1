const express = require('express');
// eslint-disable-next-line
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Index of Express' });
});

module.exports = router;
