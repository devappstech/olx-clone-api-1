const parser = require('../csvparser')

/*
--------------------------------------------------------
Should Parse State CSV
--------------------------------------------------------
*/
test(`Should Parse State CSV`, () => {
  expect.assertions(1);
  return expect(parser.parseStates()).resolves.toMatchSnapshot();
});

/*
--------------------------------------------------------
Should Parse Cities CSV
--------------------------------------------------------
*/
test(`Should Parse Cities CSV`, () => {
  expect.assertions(1);
  return expect(parser.parseCities()).resolves.toMatchSnapshot();
});

/*
--------------------------------------------------------
Should Parse Categories CSV
--------------------------------------------------------
*/
test(`Should Parse Categories CSV`, () => {
  expect.assertions(1);
  return expect(parser.parseCategories()).resolves.toMatchSnapshot();
});

/*
--------------------------------------------------------
Should Parse Users CSV
--------------------------------------------------------
*/
test(`Should Parse Users CSV`, () => {
  expect.assertions(1);
  return expect(parser.parseUsers()).resolves.toMatchSnapshot();
});

/*
--------------------------------------------------------
Should Parse Auth CSV
--------------------------------------------------------
*/
test(`Should Parse Auth CSV`, () => {
  expect.assertions(1);
  return expect(parser.parseAuth()).resolves.toMatchSnapshot();
});

/*
--------------------------------------------------------
Should Parse Advertises CSV
--------------------------------------------------------
*/
test(`Should Parse Advertises CSV`, () => {
  expect.assertions(1);
  return expect(parser.parseAdvertises()).resolves.toMatchSnapshot();
});

/*
--------------------------------------------------------
Should Parse Images  CSV
--------------------------------------------------------
*/
test(`Should Parse Images CSV`, () => {
  expect.assertions(1);
  return expect(parser.parseImages()).resolves.toMatchSnapshot();
});

/*
--------------------------------------------------------
Should Parse Reset Password  CSV
--------------------------------------------------------
*/
test(`Should Parse reset_password CSV`, () => {
  expect.assertions(1);
  return expect(parser.parseResetPassword()).resolves.toMatchSnapshot();
});
