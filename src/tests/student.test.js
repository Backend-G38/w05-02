const request = require("supertest")
const app = require("../app");

let studentId

const student = {
  firstName: "Gabriel",
  lastName: "Martinez",
  birthday: '2022-01-12',
  program: 'ing.software'
}

const BASE_URL = '/api/v1/students'

test("Post '/students' should return status code 201 and res.body.name = student.name", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(student)

  studentId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(student.firstName)
})

test("Get '/students' should return a statusCode 200", async () => {

  const res = await request(app)
    .get(BASE_URL)
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  // expect(res.body).toHaveLength(1)
  expect(res.body).toHaveLength(1)
})


test("GET -> '/students/:id', should return status code 200, res.body to be defined and res.body.name === student.name", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/${studentId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(student.name)
})

test("PUT -> '/students/:id', sholuld return status code 200, res.body.name ==== studentUpdate.name  ", async () => {

  const studentUpdate = {
    firstName: "Gabriel",
    lastName: "Martinez",
  }

  const res = await request(app)
    .put(`${BASE_URL}/${studentId}`)
    .send(studentUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(studentUpdate.firstName)
  expect(res.body.lastName).toBe(studentUpdate.lastName)
})

test("Delete -> 'students/:id', should return status code 204", async () => {

  const res = await request(app)
    .delete(`${BASE_URL}/${studentId}`)

  expect(res.statusCode).toBe(204)
})