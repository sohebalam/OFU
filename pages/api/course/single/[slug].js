import connectDB from "../../../../connectDB"
import Course from "../../../../models/courseModel"
import fs from "fs"
import Authenticated from "../../../../utils/middleware/isAuth"
import User from "../../../../models/userModel"

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
