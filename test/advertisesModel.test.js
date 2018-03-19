const advertisesModel = require('../api/models/advertisesModel');

// Constants
const newAdvertise = {
  userId: 1,
  title: "Lorem Ipsum",
  description: "description is this 1233",
  price: 12345.23,
  condition: "Good",
  categoryId: 1,
  lat: -2.451235,
  long: 6.234516,
  cityId: 1
}

const userAndTheirAdvertiseId = {
  userId: 1,
  advertiseId: 1
}

const advertiseIdAndImagePath = {
  advertiseId: 1,
  imagePath: '/public/images/1/abc.jpg'
}

/*
---------------------------------------------------------
  Advertise Models: createAdvertise - insert new advertise
  as stage1
---------------------------------------------------------
*/
describe('Insert new advertise - stage1', () => {

  it('should return data array with length 1 on insert query execution', () => {
    return advertisesModel.createAdvertise(newAdvertise.userId,
     newAdvertise.title, newAdvertise.description, newAdvertise.price,
      newAdvertise.condition, newAdvertise.categoryId,
       newAdvertise.lat, newAdvertise.long, newAdvertise.cityId, 'stage1')
      .then(data => {
        expect(data).toHaveLength(1);
      })
  });

});

/*
---------------------------------------------------------
  Advertise Models: fetch advertise_id correspond with
  user id
---------------------------------------------------------
*/
describe('fetch advertise_id correspond with user id', () => {

  it('should return data array with length 1 on insert query execution', () => {
    return advertisesModel.usersAdvertise(userAndTheirAdvertiseId.userId, userAndTheirAdvertiseId.advertiseId)
      .then(data => {
        expect(data).toHaveLength(1);
      })
  });

});

/*
---------------------------------------------------------
  Advertise Models: insert images into database
---------------------------------------------------------
*/
describe('fetch advertise_id correspond with user id', () => {

  it('should return data array with length 1 on insert query execution', () => {
    return advertisesModel.insertImages(advertiseIdAndImagePath.advertiseId,
     advertiseIdAndImagePath.imagePath)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });

});
