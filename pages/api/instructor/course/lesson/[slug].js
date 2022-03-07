import connectDB from "../../../../../connectDB"
import Course from "../../../../../models/courseModel"
import isInstructor from "../../../../../utils/middleware/isInstructor"
import fs from "fs"

connectDB()

export default isInstructor(async (req, res) => {
  if (req.method === "POST") {
    // //console.log(req.method)

    // //console.log(req.user._id.toString())

    // //console.log(JSON.parse(req.body))

    const { slug } = req.query

    const nonObjlessons = Object.values(JSON.parse(req.body))

    const lessons = nonObjlessons.map((item) => ({
      title: item.title || "",
      description: item.description || "",
      media: "lesson",
      playlistId: item.playlistId || "",
      videoId: item.videoId || "",
      thumbnailUrl: item.thumbnailUrl || "",
      channelTitle: item.channelTitle || "",
      file_path: item.file_path || "",
      file_mimetype: item.file_mimetype || "",
      name: item.name || "",
    }))

    const updated = await Course.findOneAndUpdate(
      { slug },
      {
        lessons: lessons,
      },
      {
        new: true,
      }
    ).exec()

    return res.json(updated)
  }
  if (req.method === "PUT") {
    const { slug } = req.query

    // //console.log(`${process.cwd()}\\public\\${req.body.item.name}`)

    await fs.unlinkSync(req.body.item.file_path)

    const updated = await Course.findOneAndUpdate(
      { slug: slug },
      {
        $pull: { lessons: { _id: req.body.item._id } },

        new: true,
      }
    ).exec()
    return res.json(updated)
  }
})
