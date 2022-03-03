import connectDB from "../../../../../connectDB"
import Course from "../../../../../models/courseModel"
import isInstructor from "../../../../../utils/middleware/isInstructor"
import fs from "fs"
import Authenticated from "../../../../../utils/middleware/isAuth"
import User from "../../../../../models/userModel"

connectDB()

export default Authenticated(async (req, res) => {
  console.log(req.method)

  return

  try {
    // check if course is free or paid
    const course = await Course.findById(req.query.courseId)
      .populate("instructor")
      .exec()
    if (!course.paid) return
    // application fee 30%
    const fee = (course.price * 30) / 100

    // console.log(course.instructor.stripe_account_id)
    const { origin } = absoluteUrl(req)
    // create stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // purchase details
      line_items: [
        {
          name: course.title,
          amount: Math.round(course.price.toFixed(2) * 100),
          currency: "gbp",
          quantity: 1,
        },
      ],
      // charge buyer and transfer remaining balance to seller (after fee)

      payment_intent_data: {
        application_fee_amount: Math.round(fee.toFixed(2) * 100),
        transfer_data: {
          destination: course.instructor.stripe_account_id,
        },
      },
      // redirect url after successful payment

      success_url: `${origin}/stripe/success/${course._id}`,
      cancel_url: `${origin}/stripe/cancel`,
    })
    // console.log("SESSION ID => ", session)

    await User.findByIdAndUpdate(req.user._id, {
      stripeSession: session,
    }).exec()
    res.send(session.id)
  } catch (err) {
    console.log("PAID ENROLLMENT ERR", err)
    return res.status(400).send("Enrollment create failed")
  }
})
