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

const search = {
  category: 'Fashion',
  limit: 10,
  offset: 0,
  searchKeyword: 'lorem',
  minPrice: 0,
  maxPrice: 99999
}

const deleteAdvertise = {
  userId: 1,
  advertiseId: 5
}

const userAndTheirAdvertiseId = {
  userId: 1,
  advertiseId: 1
}

const advertiseIdAndImagePath = {
  advertiseId: 1,
  imagePath: '/public/images/1/abc.jpg'
}

const publishStage = 'published';

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
        expect(data).toBeTruthy();
      })
  });

});

/*
---------------------------------------------------------
  Advertise Models: insert images into database
---------------------------------------------------------
*/
describe('insert new image path of advertise correspond with user id', () => {

  it('should return data array with length 1 on insert query execution', () => {
    return advertisesModel.insertImages(advertiseIdAndImagePath.advertiseId,
     advertiseIdAndImagePath.imagePath)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });

});

/*
---------------------------------------------------------
  Advertise Models: update advertise stage into database
---------------------------------------------------------
*/
describe('update advertise stage to published', () => {

  it('should return data empty array', () => {
    return advertisesModel.updateStage(advertiseIdAndImagePath.advertiseId, publishStage)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });

});

/*
---------------------------------------------------------
  Advertise Models: mark advertise as sold (advertise_sold)
  to be true
---------------------------------------------------------
*/
describe('update advertise_sold to true', () => {

  it('should return data empty array', () => {
    return advertisesModel.adMarkAsSold(advertiseIdAndImagePath.advertiseId)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });

});

/*
---------------------------------------------------------
  Advertise Models: mark advertise as unsold (advertise_sold)
  to be false
---------------------------------------------------------
*/
describe('update advertise_sold to false', () => {

  it('should return data empty array', () => {
    return advertisesModel.adMarkAsUnsold(advertiseIdAndImagePath.advertiseId)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });

});

/*
---------------------------------------------------------
  Advertise Models: fetch recent advertises with limit 10
  and offset 0 (there must be data in database)
---------------------------------------------------------
*/
describe('fetch recent advertises', () => {

  it('should fetch data from query', () => {
    return advertisesModel.recentAds(10, 0)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });
});

/*
---------------------------------------------------------
  Advertise Models: count total published advertises
---------------------------------------------------------
*/
describe('count total published advertises', () => {

  it('should count data element from query', () => {
    return advertisesModel.countRecords()
      .then(data => {
        expect(data).toHaveLength(1);
      })
  });
});

/*
---------------------------------------------------------
  Advertise Models: show single advertise
  with details
---------------------------------------------------------
*/
describe('show single advertise with details', () => {

  it('should return one data element in array', () => {
    return advertisesModel.singleAd(
      advertiseIdAndImagePath.advertiseId)
      .then(data => {
        expect(data).toHaveLength(1);
      })
  });
});

/*
---------------------------------------------------------
  Advertise Models: search keyword in all category
---------------------------------------------------------
*/
describe('search keyword in all category for advertise', () => {

  it('should return data elements in array', () => {
    return advertisesModel.searchResult(search.keyword,
      search.minPrice, search.maxPrice)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });
});

/*
---------------------------------------------------------
  Advertise Models: search keyword in specific category
---------------------------------------------------------
*/
describe('search keyword in specific category for advertise', () => {

  it('should return data elements in array', () => {
    return advertisesModel.categorySearchResult(search.category,
      search.keyword, search.minPrice, search.maxPrice)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });
});

/*
---------------------------------------------------------
  Advertise Models: delete advertise by id
---------------------------------------------------------
*/
describe('delete advertise by id', () => {

  it('should delete and return empty data array', () => {
    return advertisesModel.deleteAdvertise(deleteAdvertise.userId,
     deleteAdvertise.advertiseId)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });
});
