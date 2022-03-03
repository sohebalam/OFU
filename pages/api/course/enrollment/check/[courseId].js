import connectDB from "../../../../../connectDB"
import Course from "../../../../../models/courseModel"
import isInstructor from "../../../../../utils/middleware/isInstructor"
import fs from "fs"
import Authenticated from "../../../../../utils/middleware/isAuth"
import User from "../../../../../models/userModel"

connectDB()

export default Authenticated(async (req, res) => {
  const { courseId } = req.query
  // console.log(courseId, "courseId")
  try {
    const user = await User.findById(req?.user._id).exec()

    let ids = []

    let length = user.courses && user.courses.length

    for (let i = 0; i < length; i++) {
      ids.push(user.courses[i].toString())
    }

    const course = await Course.findById({ _id: courseId })

    // const courseId = course?._id

    // console.log(ids.includes(courseId))

    return res.status(200).json({
      status: ids.includes(courseId),
      course: course,
    })
  } catch (error) {
    return console.log(error)
  }
})
