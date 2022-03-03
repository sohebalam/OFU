import connectDB from "../../../../../connectDB"
import Course from "../../../../../models/courseModel"
import isInstructor from "../../../../../utils/middleware/isInstructor"
import fs from "fs"
import Authenticated from "../../../../../utils/middleware/isAuth"
import User from "../../../../../models/userModel"

connectDB()

export default Authenticated(async (req, res) => {
  //   const { slug } = req.query

  try {
    const course = await Course.findById(req.query.courseId).exec()
    if (course.paid) return
    const result = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { courses: course._id },
      },
      { new: true }
    ).exec()

    return res.json({ message: "You have enrolled", course: course })
  } catch (error) {
    console.log(error)
    return res.status(400).send("Enrollment create failed")
  }
})
