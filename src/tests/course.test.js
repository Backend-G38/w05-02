const request = require("supertest")
const app = require("../app");

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
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  // expect(res.body).toHaveLength(1)
  expect(res.body).toHaveLength(1)
})

test("GET -> '/courses/:id', should return status code 200, res.body to be defined and res.body.name === course.name", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/${courseId}`)

  // console.log(res.body);

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(course.name)

})

test("PUT -> '/courses/:id', sholuld return status code 200, res.body.name ==== courseUpdate.name  ", async () => {

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

test("Delete -> 'courses/:id', should return status code 204", async () => {

  const res = await request(app)
    .delete(`${BASE_URL}/${courseId}`)

  expect(res.statusCode).toBe(204)
})