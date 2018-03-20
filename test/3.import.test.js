const seed = require('../import');

/*
--------------------------------------------------------
Should import State CSV Data to Database
--------------------------------------------------------
*/
test(`Should Seed Data from State CSV to Database`, () => {
  expect.assertions(1);
  return expect(seed.insertStates()).resolves.toMatchSnapshot();
});

/*
--------------------------------------------------------
Should import Cities CSV Data to Database
--------------------------------------------------------
*/
test(`Should Seed Data from Cities CSV to Database`, () => {
  expect.assertions(1);
  return expect(seed.insertCities()).resolves.toMatchSnapshot();
});

/*
--------------------------------------------------------
Should import Categories CSV Data to Database
--------------------------------------------------------
*/
test(`Should Seed Data from Categories CSV to Database`, () => {
  expect.assertions(1);
  return expect(seed.insertCategories()).resolves.toMatchSnapshot();
});

/*
--------------------------------------------------------
Should import Users CSV Data to Database
--------------------------------------------------------
*/
test(`Should Seed Data from Users CSV to Database`, () => {
  expect.assertions(1);
  return expect(seed.insertUsers()).resolves.toMatchSnapshot();
});

/*
--------------------------------------------------------
Should import Auth CSV Data to Database
--------------------------------------------------------
*/
test(`Should Seed Data from Auth CSV to Database`, () => {
  expect.assertions(1);
  return expect(seed.insertAuth()).resolves.toMatchSnapshot();
});

/*
--------------------------------------------------------
Should import Advertises CSV Data to Database
--------------------------------------------------------
*/
test(`Should Seed Data from Advertises CSV to Database`, () => {
  expect.assertions(1);
  return expect(seed.insertAdvertises()).resolves.toMatchSnapshot();
});

/*
--------------------------------------------------------
Should import Images CSV Data to Database
--------------------------------------------------------
*/
test(`Should Seed Data from Images CSV to Database`, () => {
  expect.assertions(1);
  return expect(seed.insertImages()).resolves.toMatchSnapshot();
});

/*
--------------------------------------------------------
Should import reset_password CSV Data to Database
--------------------------------------------------------
*/
test(`Should Seed Data from reset_password CSV to Database`, () => {
  expect.assertions(1);
  return expect(seed.insertResetPassword()).resolves.toMatchSnapshot();
});

