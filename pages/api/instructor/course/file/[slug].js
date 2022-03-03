import connectDB from "../../../../../connectDB"
import cloudinary from "../../../../../utils/cloudinary"
import Course from "../../../../../models/courseModel"
import slugify from "slugify"
import isInstructor from "../../../../../utils/middleware/isInstructor"

// import Completed from "../models/completeModel"
import formidable from "formidable"
import fs from "fs"

connectDB()

export const config = {
  api: {
    bodyParser: false,
  },
}

export default isInstructor(async (req, res) => {
  const slug = req.query.slug
  // //console.log("slug", slug)
  // //console.log(req.method)
  const course = await Course.findOne({ slug: slug })

  // //console.log(course)

  const form = new formidable.IncomingForm()
  form.parse(req, async function (err, fields, files) {
    const slug = req.query.slug
    // //console.log(files.file, fields, slug)

    await saveFile(files.file, fields, slug, course)
    // return res.status(201).json({ message: "uploaded file" })
  })
  return
})

const saveFile = async (file, fields, slug, course) => {
  const { title, description } = fields
  // //console.log("sdssda", slug, course)
  // //console.log(file.filepath, title, description)
  // (`${process.cwd()}\\public\\public\\${req.body.item.name}`
  const data = fs.readFileSync(file.filepath)
  fs.writeFileSync(
    `${process.cwd()}\\public\\files\\${file.originalFilename}`,
    data
  )
  await fs.unlinkSync(file.filepath)

  try {
    // //console.log(file.path, file.type, title, description)

    const files = {
      media: "file",
      title,
      name: file.originalFilename,
      description,
      file_path: `${process.cwd()}\\public\\files\\${file.originalFilename}`,
      file_mimetype: file.mimetype,
    }

    // //console.log("files", files)
    // var courseFiles = Course.findById({ _id: course?._id })

    // await courseFiles?.lessons?.map((lesson) => {
    //   if (lesson.file_path === files.file_path)
    //     return res.status(403).json({ message: "files exists" })
    // })

    var newList = await Course.findByIdAndUpdate(
      { _id: course?._id },

      { $push: { lessons: files } }
    )

    //console.log("dssds", newList)

    // res.send(newList)
  } catch (error) {
    //console.log(error)
    // post(req, res)
    // res.status(400).send("Error while uploading file. Try again later.")
  }

  return
}
