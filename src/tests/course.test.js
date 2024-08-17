require('../models')

const request = require("supertest")
const app = require("../app");
const Student = require('../models/Student');

let courseId

const course = {
  name: "algebra",
  credits: 10,
}

const BASE_URL = '/api/v1/courses'

test("Post '/courses' should return status code 201 and res.body.name = course.name", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(course)

  courseId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(course.name)
})

test("Get '/courses' should return a statusCode 200", async () => {

  const res = await request(app)
    .get(BASE_URL)

  // console.log(res.body);

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  // expect(res.body).toHaveLength(1)
  expect(res.body).toHaveLength(1)

  expect(res.body[0].students).toBeDefined()
  expect(res.body[0].students).toHaveLength(0)
})

test("GET -> '/courses/:id', should return status code 200, res.body to be defined and res.body.name === course.name", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/${courseId}`)

  console.log(res.body);

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(course.name)

  expect(res.body.students).toBeDefined()
  expect(res.body.students).toHaveLength(0)

})

test("PUT -> '/courses/:id', should return status code 200, res.body.name ==== courseUpdate.name  ", async () => {

  const courseUpdate = {
    name: "analisis",
    credits: 3,
  }
  const res = await request(app)
    .put(`${BASE_URL}/${courseId}`)
    .send(courseUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(courseUpdate.name)
  expect(res.body.credits).toBe(courseUpdate.credits)
})

test("POST -> /BASE_URL/:id/students, should return code 200, and res.body.length === 1 ", async () => {
  const student = {
    firstName: 'Jairo',
    lastName: 'Rincon',
    birthday: '2024-08-15',
    program: 'ing. software'
  }
  const createStudents = await Student.create(student)
  const res = await request(app)
    .post(`${BASE_URL}/${courseId}/students`)
    .send([createStudents.id])
  // console.log(res.body);
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBeDefined()
  expect(res.body[0].id).toBe(createStudents.id)
  await createStudents.destroy()
})

test("Delete -> 'courses/:id', should return status code 204", async () => {

  const res = await request(app)
    .delete(`${BASE_URL}/${courseId}`)

  expect(res.statusCode).toBe(204)
})

