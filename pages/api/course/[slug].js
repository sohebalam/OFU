import connectDB from "../../../connectDB"
import Course from "../../../models/courseModel"
import isInstructor from "../../../utils/middleware/isInstructor"
import fs from "fs"

connectDB()

export default async (req, res) => {
  const { slug } = req.query

  try {
    const course = await Course.findOne({ slug: slug })
      .populate("instructor", "_id name")
      .exec()

    res.send(course)
  } catch (error) {
    console.log(error)
  }
}
