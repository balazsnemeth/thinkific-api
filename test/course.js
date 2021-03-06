import test from 'ava';
import 'babel-core/register';
import sampleOpts from './test-helper';
import errors from 'request-promise/errors';

import sinon from 'sinon';

import Thinkific from '../src/lib/';



/* Currently we are not able to create courses from API
  Expect the have a course with this name and id */
const courseName = 'API Test course';
const courseId = 143649;

test('Should loop at course list', async (t) => {
  const thinkific = new Thinkific(sampleOpts);

  let courses = await thinkific.courses.getList();
  do {
    courses.items.forEach(c => {
      //do something with course c
    }, this);

    //get next page
    courses = await courses.getNext();
  } while (courses);
  // done looping at courses
});

test('Should get a course by its id', async (t) => {
  const thinkific = new Thinkific(sampleOpts);

  var get = sinon.stub(thinkific, '_get');

  let course = await thinkific.courses.getById(courseId);

  t.true(get.calledWithExactly(`courses/${courseId}`));
});

test('Should get assertion for course not found', async (t) => {
  const thinkific = new Thinkific(sampleOpts);
  //Mock _get function to raise error
  thinkific._get = function(uri){
    if(uri !== 'courses/10000')
      return Promise.resolve();

    var error = {statusCode: 404};
    return Promise.reject(error);
  }

  const error = await t.throws(thinkific.courses.getById(10000));
  t.is(error.statusCode, 404);
});

test('Should get a course by its name', async (t) => {
  const thinkific = new Thinkific(sampleOpts);
  let course = await thinkific.courses.find('name', courseName);
  t.is(course.id, courseId);
});