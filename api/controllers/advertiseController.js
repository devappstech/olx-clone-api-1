const advertisesModel = require('../models/advertisesModel');

/* Get Recent Advertises */
exports.getRecentAdvertise = (req, res) => {
  advertisesModel.recentAds().then((data) => {
    if (!data || data.length <= 0){
      res.status(404).json({ message: 'No Data Found' });
    } else {
      res.status(200).json({ message: 'Success', data: data });
    }
  })
  .catch(e => res.status(500).json({ message: 'Error Occured!', Stack: e }));
}

/* Create new Advertises */
exports.createAdvertise = (req, res) => {
  res.status(500).json({ message: 'Error' });
}

/* Get single Advertises by ID */
exports.getSingleAdvertise = (req, res) => {
  res.status(500).json({ message: 'Error' });
}

/* Modify single Advertises by ID */
exports.modifySingleAdvertise = (req, res) => {
  res.status(500).json({ message: 'Error' });
}

/* Delete  Advertises by ID */
exports.deleteSingleAdvertise = (req, res) => {
  res.status(500).json({ message: 'Error' });
}

/* Set Advertises Status to sold/unsold */
exports.setAdvertiseStatus = (req, res) => {
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

/* upload single Advertises photos by ID */
exports.uploadAdvertisePhotos = (req, res) => {
  res.status(500).json({ message: 'Error' });
}
