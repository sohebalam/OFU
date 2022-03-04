import { Grid } from "@material-ui/core"
import VideoDetail from "../../../../components/videos/VideoDetail"
import { useEffect, useState } from "react"
import VideoList from "../../../../components/videos/VideoList"
import { getStudentCourses } from "../../../../redux/course/courseActions"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import { Box } from "@mui/system"
import { loadUser } from "../../../../redux/user/userAction"
import { getSession, useSession } from "next-auth/react"
import { wrapper } from "../../../../redux/store"
import { parseCookies } from "nookies"

const SingleCourse = () => {
  const [selectedVideo] = useState({})
  const singleCourse = useSelector((state) => state.singleCourse)
  const { loading, error: courseError, course } = singleCourse

  const { data: session } = useSession()

  const dispatch = useDispatch()

  const videos = course?.lessons
  const cookies = parseCookies()
  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : ""
  // const { items } = data
  const router = useRouter()

  const { query } = router

  useEffect(() => {
    // setVideos(items)
    dispatch(loadUser(user?.email, user))
    dispatch(getStudentCourses(user, query?.slug))
  }, [])

  return (
    <Box style={{ marginBottom: "11rem" }}>
      <Grid
        container
        justifyContent="center"
        style={{ marginBottom: "1rem", marginTop: "0.75rem" }}
      >
        <Grid item xs={8}>
          <VideoDetail />
        </Grid>
        <Grid item xs={4}>
          <VideoList videos={videos} />
        </Grid>
      </Grid>
    </Box>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params, req } = context
    const session = await getSession({ req })

    // console.log("cookies", cookies)
    // console.log("user", user)
    // console.log("session", session)
    // await store.dispatch(loadUser(user?.email, user))

    // await store.dispatch(getStudentCourses(user, params.slug))

    return {
      props: {
        session,
      },
    }
  }
)

export default SingleCourse
