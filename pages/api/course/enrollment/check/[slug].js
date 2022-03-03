import connectDB from "../../../../../connectDB"
import Course from "../../../../../models/courseModel"
import isInstructor from "../../../../../utils/middleware/isInstructor"
import fs from "fs"
import Authenticated from "../../../../../utils/middleware/isAuth"
import User from "../../../../../models/userModel"

connectDB()

export default Authenticated(async (req, res) => {
  // console.log(req.method, req?.user)
  const { slug } = req.query
  try {
    const user = await User.findById(req?.user._id).exec()

    let ids = []

    let length = user.courses && user.courses.length

    for (let i = 0; i < length; i++) {
      ids.push(user.courses[i].toString())
    }

    const course = await Course.findOne({ slug: slug })

    const courseId = course._id

    return res.json({
      status: ids.includes(courseId),
      course: course,
    })
  } catch (error) {
    console.log(error)
  }
})
