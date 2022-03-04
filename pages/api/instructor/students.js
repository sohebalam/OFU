import connectDB from "../../../connectDB"
import Course from "../../../models/courseModel"
import User from "../../../models/userModel"
import isInstructor from "../../../utils/middleware/isInstructor"

connectDB()

export default isInstructor(async (req, res) => {
  try {
    const users = await User.find({ courses: req.body.courseId })
      .select("_id")
      .exec()
    res.json(users)
  } catch (err) {
    console.log(err)
  }
})
