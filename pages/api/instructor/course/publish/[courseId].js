import connectDB from "../../../../../connectDB"
import Course from "../../../../../models/courseModel"
import isInstructor from "../../../../../utils/middleware/isInstructor"
import fs from "fs"

connectDB()

export default isInstructor(async (req, res) => {
  try {
    const { courseId } = req.query
    const course = await Course.findById(courseId).select("instructor").exec()
    // //console.log(req.user._id.toString(), course.instructor._id.toString())
    if (req.user._id.toString() !== course.instructor._id.toString()) {
      return res.status(400).json({ message: "Unathorized" })
    }

    const updated = await Course.findByIdAndUpdate(
      courseId,
      { published: true },
      { new: true }
    ).exec()

    res.json(updated)
  } catch (error) {
    //console.log(error)
    return res.status(400).send("Publish course failed")
  }
})
