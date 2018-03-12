const statesModel = require('../api/models/statesModel');

/*
---------------------------------------------------------
 get All Available States.
---------------------------------------------------------
*/
describe('check for All Available States.', () => {

  it('should return array for existing states from database', () => {
    return statesModel.readAllState()
      .then(data => {
        expect(data).toBeTruthy();
      })
  });

});

/*
---------------------------------------------------------
 get details for given id of State.
---------------------------------------------------------
*/
describe('get details for given id of State.', () => {

  it('should return array for existing state by id from database', () => {
    return statesModel.readState(1)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });

});

/*
---------------------------------------------------------
 get all cities along with state by state id
---------------------------------------------------------
*/
describe('get all cities along with state by state id', () => {

  it('should return array for existing cities of state by id from database', () => {
    return statesModel.readAllStateCities(1)
      .then(data => {
        expect(data).toBeTruthy();
      })
  });

});
