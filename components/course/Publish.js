import { CircularProgress, Tooltip } from "@material-ui/core"
// import { CheckCircleOutline } from "@material-ui/icons"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import { useEffect, useState } from "react"
import { wrapper } from "../../redux/store"
import { parseCookies } from "nookies"

const Publish = ({ initCourse, slug, lessons }) => {
  // const [state, setState] = useState(false)
  const [course, setCourse] = useState(initCourse)
  const [loading, setLoading] = useState(false)

  const profile = useSelector((state) => state.profile)
  const { dbUser } = profile
  const cookies = parseCookies()
  // //console.log(cookies.token)

  const handlePublish = async (e, courseId) => {
    setLoading(true)
    if (dbUser._id && !/@gmail\.com$/.test(dbUser._id)) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }
      try {
        let answer = window.confirm(
          "One you publish your course, it will be live in the marketplace for users to enroll"
        )
        if (!answer) return

        const { data } = await axios.put(
          `/api/instructor/course/publish/${courseId}`,
          {},
          config
        )
        // toast(" course is live")
        // //console.log(" course is live")
        setCourse(data)
        setLoading(false)
      } catch (error) {
        // toast("Publish failed, course is not live")
      }
    }

    try {
      let answer = window.confirm(
        "One you publish your course, it will be live in the marketplace for users to enroll"
      )
      if (!answer) return

      const { data } = await axios.put(
        `/api/instructor/course/publish/${courseId}`
      )
      // toast(" course is live")
      // //console.log(" course is live")
      setCourse(data)
      setLoading(false)
    } catch (error) {
      // toast("Publish failed, course is not live")
    }
  }

  const handleUnpublish = async (e, courseId) => {
    setLoading(true)

    if (dbUser._id && !/@gmail\.com$/.test(dbUser._id)) {
      try {
        let answer = window.confirm(
          "Once you Un-Publish your course, it will  not be live in the marketplace for users to enroll"
        )
        if (!answer) return

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
        const { data } = await axios.put(
          `/api/instructor/course/publish/unpublish/${courseId}`,
          {},
          config
        )
        // toast(" course is not live")
        // //console.log(" course is not live")
        setCourse(data)
        // setLoading(false)
      } catch (error) {
        // toast("UnPublish failed, course is live")
      }
    }

    try {
      let answer = window.confirm(
        "Once you Un-Publish your course, it will  not be live in the marketplace for users to enroll"
      )
      if (!answer) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }
      const { data } = await axios.put(
        `/api/instructor/course/publish/unpublish/${courseId}`
      )
      // toast(" course is not live")
      //console.log(" course is not live")
      setCourse(data)
      // setLoading(false)
    } catch (error) {
      // toast("UnPublish failed, course is live")
    }
  }

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {lessons && lessons.length < 5 ? (
            <p>At least 5 lessons are required to publish a course</p>
          ) : course.published ? (
            <p>Your course is live in the marketplace</p>
          ) : (
            <p>Your course is ready to be published</p>
          )}

          {course.published ? (
            <Tooltip title="Published">
              <CheckCircleOutlineIcon
                className="h5 pointer text-success"
                onClick={(e) => handleUnpublish(e, course?._id)}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Unpublished">
              <HighlightOffIcon
                className="h5 pointer text-warning"
                onClick={(e) => handlePublish(e, course?._id)}
              />
            </Tooltip>
          )}
        </div>
      )}
    </>
  )
}

export default Publish
