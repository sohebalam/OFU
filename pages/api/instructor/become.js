import connectDB from "../../../connectDB"
import User from "../../../models/userModel"
import absoluteUrl from "next-absolute-url"
import queryString from "query-string"
const stripe = require("stripe")(process.env.STRIPE_SECRET)
connectDB()

export default async (req, res) => {
  // //console.log(req.body)
  try {
    // 1. find user from db
    const user = await User.findOne({ email: req.body.email }).exec()
    // //console.log(user)
    // 2. if user dont have stripe_account_id yet, then create new
    if (!user.stripe_account_id) {
      // const account = await stripe.accounts.create({ type: "standard" })
      const account = await stripe.accounts.create({ type: "express" })
      // //console.log("ACCOUNT => ", account.id)
      user.stripe_account_id = account.id
      user.save()
    }
    const { origin } = absoluteUrl(req)
    // 3. create account link based on account id (for frontend to complete onboarding)
    let accountLink = await stripe.accountLinks.create({
      account: user.stripe_account_id,
      // refresh_url: process.env.NEXT_PUBLIC_STRIPE_REDIRECT_URL,
      // return_url: process.env.NEXT_PUBLIC_STRIPE_REDIRECT_URL,
      refresh_url: `${origin}/stripe/callback`,
      return_url: `${origin}/stripe/callback`,
      type: "account_onboarding",
    })
    // //console.log(accountLink)
    // 4. pre-fill any info such as email (optional), then send url resposne to frontend
    accountLink = Object.assign(accountLink, {
      "stripe_user[email]": user.email,
    })
    // 5. then send the account link as response to fronend
    res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`)
  } catch (err) {
    //console.log("MAKE INSTRUCTOR ERR ", err)
  }
}
