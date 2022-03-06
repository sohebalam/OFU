import connectDB from "../../../connectDB"
import Course from "../../../models/courseModel"
import User from "../../../models/userModel"
import isInstructor from "../../../utils/middleware/isInstructor"

const stripe = require("stripe")(process.env.STRIPE_SECRET)

connectDB()

export default isInstructor(async (req, res) => {
  console.log(req.method, req.user._id.toString())
  try {
    let user = await User.findById(req.user._id.toString()).exec()
    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id,
    })

    // console.log(balance)
    return res.json(balance)
  } catch (err) {
    return console.log(err)
  }
})
