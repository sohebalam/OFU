import connectDB from "../../../connectDB"
import Course from "../../../models/courseModel"
import User from "../../../models/userModel"
import Authenticated from "../../../utils/middleware/isAuth"
const stripe = require("stripe")(process.env.STRIPE_SECRET)
connectDB()

export default Authenticated(async (req, res) => {
  console.log(req.method, req.query.id, req.user._id)

  try {
    const course = await Course.findById(req.query.id).exec()

    // console.log(course._id)
    const user = await User.findById(req?.user?._id.toString()).exec()

    if (!user.stripeSession.id) return res.send(400)

    const session = await stripe.checkout.sessions.retrieve(
      user.stripeSession.id
    )
    console.log("Stripe success", session)
    if (session.payment_status === "paid") {
      await User.findByIdAndUpdate(user._id.toString(), {
        $addToSet: { courses: course._id },
        $set: { stripeSession: {} },
      }).exec()
    }
    return res.json({ success: true, course })
  } catch (error) {
    return console.log("stipe error", error)
  }
})
