import connectDB from "../../../connectDB"
import Course from "../../../models/courseModel"
import isInstructor from "../../../utils/middleware/isInstructor"

connectDB()

export default isInstructor(async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id })
      .sort({ createdAt: -1 })
      .exec()
    res.json(courses)
  } catch (err) {
    //console.log(err)
  }
})
