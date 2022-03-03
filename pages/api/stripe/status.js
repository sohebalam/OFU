import connectDB from "../../../connectDB"
import User from "../../../models/userModel"
const stripe = require("stripe")(process.env.STRIPE_SECRET)
// import { AccountStatus } from "../../../controllers/authCont"
// import { getAccountStatus } from "../../../controllers/instructorCont"

connectDB()

export default async (req, res) => {
  // //console.log(req.body)

  try {
    const user = await User.findOne({ email: req.body.email }).exec()

    // //console.log(user)
    const account = await stripe.accounts.retrieve(user.stripe_account_id)
    // //console.log("ACCOUNT => ", account);
    if (!account.charges_enabled) {
      return res.staus(401).send("Unauthorized")
    } else {
      const statusUpdated = await User.findByIdAndUpdate(
        user._id,
        {
          stripe_seller: account,
          $addToSet: { role: "instructor" },
        },
        { new: true }
      )
        .select("-password")
        .exec()
      res.json(statusUpdated)
    }
  } catch (err) {
    //console.log(err)
  }
}
