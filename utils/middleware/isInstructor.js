import jwt from "jsonwebtoken"
import { getSession } from "next-auth/react"
import User from "../../models/userModel"

const isInstructor = (component) => {
  return async (req, res) => {
    // //console.log("here", req.headers.authorisation)
    const session = await getSession({ req })

    if (session?.user) {
      const suser = await User.findOne({ email: session?.user?.email })

      if (!suser) {
        return res.status(401).json({ error: "you are not authorized" })
      }

      const ObjectId = suser._id

      const user = await User.findById({ _id: ObjectId.toString() }).exec()

      req.user = user

      const isInstructor = req.user && req?.user?.role?.includes("instructor")

      if (!isInstructor) {
        return res.status(401).json({ error: "you are not an instructor" })
      }

      return component(req, res)
    }

    if (req.headers && req.headers.authorization) {
      // //console.log("here")
      // //console.log(req.headers.authorization)
      var token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const ObjectId = decoded.userId
      // //console.log("here")
      const user = await User.findById({ _id: ObjectId.toString() }).exec()

      if (!user) {
        return res.status(401).json({ error: "you are not authorized" })
      }

      req.user = user
      const isInstructor = req.user && req?.user?.role?.includes("instructor")

      if (!isInstructor) {
        return res.status(401).json({ error: "you are not an instructor" })
      }

      //console.log("here")

      return component(req, res)
    }
  }
}

export default isInstructor
