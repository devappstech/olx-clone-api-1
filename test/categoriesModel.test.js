const categoriesModel = require('../api/models/categoriesModel');

/*
---------------------------------------------------------
 get All Available Categories.
---------------------------------------------------------
*/
describe('get All Available Categories.', () => {

  it('should return array for existing Categories from database', () => {
    return categoriesModel.readAllCategories()
      .then(data => {
        expect(data).toBeTruthy();
      })
  });

});

/*
---------------------------------------------------------
 get details for given id of category.
---------------------------------------------------------
*/
describe('get details for given id of category.', () => {

  it('should return array for existing category by id from database', () => {
    return categoriesModel.readCategory(1)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });

});
