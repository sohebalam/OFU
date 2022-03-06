import { useState, useEffect } from "react"
import axios from "axios"
import { Avatar, Button, Grid, Tooltip, Typography } from "@mui/material"
import Link from "next/link"
import { useSelector } from "react-redux"
import { wrapper } from "../../../redux/store"
// import { loadCourses } from "../../../redux/actions/lessonActions"
import Publish from "../../../components/course/Publish"
import { getSession } from "next-auth/react"
import { loadUser } from "../../../redux/user/userAction"
import { parseCookies } from "nookies"
import { loadCourses } from "../../../redux/course/courseActions"
const InstructorIndex = () => {
  const coursesLoad = useSelector((state) => state.coursesLoad)
  const { loading, error, courses } = coursesLoad
  const cookies = parseCookies()
  // //console.log("dashboar", courses)

  return (
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
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req })
      const cookies = parseCookies()

      // const token = cookies?.token ? cookies?.token : req.cookies.token

      const user = cookies?.user
        ? JSON.parse(cookies.user)
        : session?.user
        ? session?.user
        : req?.cookies?.user && JSON.parse(req?.cookies?.user)
      // //console.log("user0", user)
      await store.dispatch(loadUser(user?.email, user))
      await store.dispatch(loadCourses(user))

      return {
        props: {
          session,
        },
      }
    }
)

export default InstructorIndex
