import connectDB from "../../../connectDB"
import Course from "../../../models/courseModel"
import User from "../../../models/userModel"
import isInstructor from "../../../utils/middleware/isInstructor"
import absoluteUrl from "next-absolute-url"

const stripe = require("stripe")(process.env.STRIPE_SECRET)

connectDB()

export default isInstructor(async (req, res) => {
  //   console.log(req.user)
  try {
    const user = await User.findById(req.user._id).exec()

    const { origin } = absoluteUrl(req)

    const loginLink = await stripe.accounts.createLoginLink(
      user.stripe_seller.id,
      { redirect_url: `${origin}/instructor/revenue` }
    )

    // console.log(loginLink)

    return res.send(loginLink.url)
  } catch (err) {
    console.log("stripe payout settings login link err => , err")
  }
})
