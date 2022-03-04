import { Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useDispatch, useSelector } from "react-redux"
import CourseCard from "../../../components/course/CourseCard"
import { studentCourses } from "../../../redux/course/courseActions"
import { wrapper } from "../../../redux/store"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import { getSession, useSession } from "next-auth/react"
import { useEffect } from "react"
const StudentId = () => {
  const dispatch = useDispatch()
  const coursesStudent = useSelector((state) => state.coursesStudent)
  const { loading, error, courses } = coursesStudent

  console.log(courses)
  const { data: session } = useSession()

  const cookies = parseCookies()

  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : cookies?.user

  useEffect(() => {
    dispatch(studentCourses(user))
  }, [])

  const coursesArray = courses?.filter((course) => course?.title)

  const router = useRouter()

  const location = router.asPath.split("/")[3]

  console.log(router.asPath)
  return (
    <>
      <Typography variant="h4">Enrolled Courses</Typography>
      <Grid container>
        {coursesArray &&
          coursesArray?.map((course) => (
            <Grid item key={course?._id} xs={4}>
              <Box
                style={{
                  padding: "0.5rem",
                  paddingLeft: "0",
                  paddingRight: "0",
                }}
              >
                {coursesArray && <CourseCard course={course} />}
              </Box>
            </Grid>
          ))}
      </Grid>
    </>
  )
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req }) => {}
// )

export default StudentId
