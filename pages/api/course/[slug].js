import connectDB from "../../../connectDB"
import Course from "../../../models/courseModel"
import isInstructor from "../../../utils/middleware/isInstructor"
import fs from "fs"

connectDB()

export default async (req, res) => {
  try {
    const all = await Course.find({ published: true })
      .populate("instructor", "_id name")
      .exec()
    res.json(all)
  } catch (error) {
    console.log(error)
  }
}
