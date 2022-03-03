import connectDB from "../../../connectDB"
import User from "../../../models/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

connectDB()

export default async (req, res) => {
  const { email, subscriber } = req.body

  // //console.log(req.body)

  try {
    if (req.method === "POST") {
      const user = await User.findOne({ email })

      user.role = subscriber

      const updatedUser = await user.save()

      res.status(200).json({ message: updatedUser })
    } else {
      return res.status(401).json({ error: "Invalid credentials" })
    }
  } catch (err) {
    //console.log(err)
  }
}
