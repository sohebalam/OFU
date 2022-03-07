import jwt from "jsonwebtoken"
import { getSession } from "next-auth/react"
import User from "../../models/userModel"

const Authenticated = (component) => {
  return async (req, res) => {
    // //console.log("here", req.headers.authorisation)
    const session = await getSession({ req })

    // //console.log("her", session)
    if (session?.user) {
      const suser = await User.findOne({ email: session?.user?.email })

      if (!suser) {
        return res.status(401).json({ error: "you are not authorized" })
      }

      const ObjectId = suser._id

      const user = await User.findById({ _id: ObjectId.toString() }).exec()

      // //console.log("newuser", user)

      req.user = user

      // return (req.user = user)
      return component(req, res)
    }

    if (req.headers && req.headers.authorization) {
      // //console.log(req.headers.authorization)
      var token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.SECRET)
      const ObjectId = decoded.userId

      const user = await User.findById({ _id: ObjectId.toString() }).exec()
      if (!user) {
        return res.status(401).json({ error: "you are not authorized" })
      }

      req.user = user

      // return (req.user = user)
      return component(req, res)
    }
  }
}

export default Authenticated
