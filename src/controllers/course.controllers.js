const catchError = require('../utils/catchError');
const Course = require('../models/Course');
const Student = require('../models/Student');


const getAll = catchError(async (req, res) => {
  const results = await Course.findAll({ include: [Student] });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Course.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Course.findByPk(id, { include: [Student] });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Course.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Course.update(
    req.body,
    { where: { id }, returning: true }
  );
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});


const setStudents = catchError(async (req, res) => {
  //! /courses/:id/students
  const { id } = req.params
  const courses = await Course.findByPk(id)
  if (!courses) return res.sendStatus(404)
  await courses.setStudents(req.body)
  const getStudents = await courses.getStudents()
  return res.json(getStudents)
})

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setStudents
}