import connectDB from "../../../../connectDB"
import cloudinary from "../../../../utils/cloudinary"
import Course from "../../../../models/courseModel"
import slugify from "slugify"
import isInstructor from "../../../../utils/middleware/isInstructor"

connectDB()

export default isInstructor(async (req, res) => {
  //console.log(req.method)
  const { slug } = req.query

  try {
    const course = await Course.findOne({ slug: slug })
      .populate("instructor", "_id name")
      .exec()

    res.send(course)
  } catch (error) {
    //console.log(error)
  }
})
