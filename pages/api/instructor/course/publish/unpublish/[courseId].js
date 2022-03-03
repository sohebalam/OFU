import connectDB from "../../../../../../connectDB"
import Course from "../../../../../../models/courseModel"
import isInstructor from "../../../../../../utils/middleware/isInstructor"

connectDB()

export default isInstructor(async (req, res) => {
  //console.log(req.method, req.user)
  try {
    const { courseId } = req.query
    const course = await Course.findById(courseId).select("instructor").exec()

    // //console.log(req.method, req.user?._id, course.instructor._id)

    if (req.user?._id?.toString() !== course?.instructor._id.toString()) {
      return res.status(400).json({ message: "Unathorized" })
    }
    const updated = await Course.findByIdAndUpdate(
      courseId,
      { published: false },
      { new: true }
    ).exec()

    return res.json(updated)
  } catch (error) {
    //console.log(error)
    return res.status(400).send("Un-ublish course failed")
  }
})
