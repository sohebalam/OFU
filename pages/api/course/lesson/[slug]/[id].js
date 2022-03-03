import connectDB from "../../../../../connectDB"
import Course from "../../../../../models/courseModel"
import fs from "fs"
import Authenticated from "../../../../../utils/middleware/isAuth"
import User from "../../../../../models/userModel"

connectDB()

export default async (req, res) => {
  // console.log(req.method)
  // console.log("here")

  const { slug, id } = req.query

  const [{ lessons }] = await Course.find({ slug })
  // const ytList = await YTList.find({ slug }, { lessons })
  // const ytList = await YTList.find({ slug }, [lessons])

  var newArray = lessons.filter((lesson) => {
    if (lesson._id.toString() === id) {
      return lesson
    }
  })
  const [lesson] = newArray

  try {
    // const filePath = `${process.cwd()}\\public\\${file.name}`

    const fileBuffer = fs.createReadStream(lesson.file_path)

    await new Promise(function (resolve) {
      res.setHeader("Content-Type", lesson.file_mimetype)
      fileBuffer.pipe(res)
      fileBuffer.on("end", resolve)
      fileBuffer.on("error", function (err) {
        if (err.code === "ENOENT") {
          res.status(400).json({
            error: true,
            message: "Sorry we could not find the file you requested!",
          })
          res.end()
        } else {
          res
            .status(500)
            .json({ error: true, message: "Sorry, something went wrong!" })
          res.end()
        }
      })
    })
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.")
  }
}
