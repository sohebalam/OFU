import connectDB from "../../../../connectDB"
import cloudinary from "../../../../utils/cloudinary"
import Course from "../../../../models/courseModel"
import slugify from "slugify"
import isInstructor from "../../../../utils/middleware/isInstructor"

connectDB()

export default isInstructor(async (req, res) => {
  try {
    const fileStr = req.body.image
    const result = await cloudinary.uploader.upload(fileStr, {
      folder: "ofu2",
    })
    const alreadyExist = await Course.findOne({
      slug: slugify(req.body.title.toLowerCase()),
    })
    if (alreadyExist) return res.status(400).send("Title is taken")

    let imagesLinks = []

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    })

    req.body.images = imagesLinks

    const course = await new Course({
      slug: slugify(req.body.title),
      instructor: req.user._id,
      ...req.body,
    }).save()

    await youtube(course)

    res.status(200).json({
      success: true,
      course,
    })
  } catch (err) {
    //console.log(err)
  }
})

const youtube = async (course) => {
  try {
    const YOUTUBE_PLAYLIST_ITEMS_API =
      "https://www.googleapis.com/youtube/v3/playlistItems"

    const playlistId = course?.playlistId

    const response = await fetch(
      `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`
    )

    const data = await response?.json()

    const videos = data.items?.map((item) => ({
      playlistId: item.snippet.playlistId,
      videoId: item.snippet.resourceId.videoId,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
    }))

    const newList = await Course.findByIdAndUpdate(
      { _id: course?._id },

      { $addToSet: { lessons: videos } }
    )
    return newList
  } catch (error) {
    //console.log(error)
  }
}
