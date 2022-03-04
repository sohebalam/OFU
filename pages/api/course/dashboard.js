import connectDB from "../../../connectDB"
import User from "../../../models/userModel"
import Course from "../../../models/courseModel"
import Authenticated from "../../../utils/middleware/isAuth"

connectDB()

export default Authenticated(async (req, res) => {
  try {
    const user = await User.findById(req?.user?._id).exec()
    const courses = await Course.find({ _id: { $in: user.courses } })
      .populate("instructor", "_id name")
      .exec()
    res.json(courses)
  } catch (error) {
    console.log(error)
  }
})
