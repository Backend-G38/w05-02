const Course = require("./Course")
const Students = require("./Student")

Course.belongsToMany(Students, { through: "courseStudent" })
Students.belongsToMany(Course, { through: "courseStudent" })