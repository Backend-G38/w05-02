const catchError = require('../utils/catchError');
const Student = require('../models/Student');
const Course = require('../models/Course');

const getAll = catchError(async (req, res) => {
  const results = await Student.findAll({ include: [Course] });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Student.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Student.findByPk(id, { include: [Course] });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Student.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Student.update(
    req.body,
    { where: { id }, returning: true }
  );
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update
}