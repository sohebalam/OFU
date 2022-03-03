import connectDB from "../../../../connectDB"
import Course from "../../../../models/courseModel"
import fs from "fs"
import Authenticated from "../../../../utils/middleware/isAuth"
import User from "../../../../models/userModel"

connectDB()

export default async (req, res) => {
  console.log(req.method)
  const { slug } = req.query

  try {
    const course = await Course.findOne({ slug: slug })
      .populate("instructor", "_id name")
      .exec()

    console.log(course)

    res.send(course)
  } catch (error) {
    console.log(error)
  }
}
