import { useState, useEffect } from "react"
import axios from "axios"
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { wrapper } from "../../../redux/store"
// import { loadCourses } from "../../../redux/actions/lessonActions"
import Publish from "../../../components/course/Publish"
import { getSession, useSession } from "next-auth/react"
import { loadUser } from "../../../redux/user/userAction"
import { parseCookies } from "nookies"
import { loadCourses } from "../../../redux/course/courseActions"
const InstructorIndex = () => {
  const coursesLoad = useSelector((state) => state.coursesLoad)
  const { loading, error, courses } = coursesLoad

  console.log(courses)
  const cookies = parseCookies()

  const dispatch = useDispatch()

  const { data: session } = useSession()

  // console.log(session)

  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : ""

  useEffect(() => {
    dispatch(loadUser(user?.email, user))
    dispatch(loadCourses(user))
  }, [])

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <h1 className="jumbotron text-center square">Instructor Dashboard</h1>
          {courses &&
            courses.map((course) => (
              <Grid container key={course._id}>
                <Grid item xs={3}>
                  <Avatar
                    style={{ height: "100px", width: "100px" }}
                    src={course?.images ? course.images[0]?.url : "/course.jpg"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Link href={`/src/instructor/course/${course.slug}`}>
                    <a>
                      <Button style={{ underline: true }}>
                        <Typography variant="h5">{course?.title}</Typography>
                      </Button>
                    </a>
                  </Link>
                  <p>{course.lessons?.length}</p>
                </Grid>
                <Grid item xs={3}>
                  <Publish
                    initCourse={course}
                    slug={course.slug}
                    lessons={course.lessons}
                  />
                </Grid>
              </Grid>
            ))}
        </>
      )}
    </>
  )
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req }) => {
//       const session = await getSession({ req })

//       console.log(session)

//       return {
//         props: {
//           session,
//         },
//       }
//     }
// )

export default InstructorIndex
