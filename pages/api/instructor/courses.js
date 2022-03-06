import connectDB from "../../../connectDB"
import Course from "../../../models/courseModel"
import isInstructor from "../../../utils/middleware/isInstructor"

connectDB()

export default isInstructor(async (req, res) => {
  console.log(req.method, req.user._id)
  try {
    const courses = await Course.find({ instructor: req.user._id })
      .sort({ createdAt: -1 })
      .exec()
    return res.json(courses)
  } catch (err) {
    //console.log(err)
  }
})
