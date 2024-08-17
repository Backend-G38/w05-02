const { getAll, create, getOne, remove, update, setStudents } = require('../controllers/course.controllers');
const express = require('express');

const routerCourse = express.Router();

routerCourse.route('/')
  .get(getAll)
  .post(create);

//! /courses/:id/students
routerCourse.route('/:id/students')
  .post(setStudents)

routerCourse.route('/:id')
  .get(getOne)
  .delete(remove)
  .put(update);

module.exports = routerCourse;