import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { parseCookies } from "nookies"
import { wrapper } from "../redux/store"
import { loadUser } from "../redux/user/userAction"
import CourseCard from "../components/course/CourseCard"
import { publishedCourse } from "../redux/course/courseActions"
import { useSelector } from "react-redux"
import { Paper } from "@mui/material"
import Hero from "../components/layout/Hero"
import { Grid } from "@mui/material"
import { Box } from "@mui/material"

export default function Component() {
  const { data: session } = useSession()
  const coursePublished = useSelector((state) => state.coursePublished)
  const { loading, error, published } = coursePublished

  const courses = published

  return (
    <div>
      <Paper style={{ marginTop: "0.5rem" }}>
        <Hero
          // imgSrc="/home-hero.jpg"
          // imgAlt="satified woman eating in restaurant"
          title="OpenFreeUni"
          subtitle="Learn for Free!"
        />
      </Paper>
      <Grid container>
        {courses &&
          courses?.map((course) => (
            <Grid item key={course._id} xs={4}>
              <Box
                style={{
                  padding: "0.5rem",
                  paddingLeft: "0",
                  paddingRight: "0",
                }}
              >
                <CourseCard course={course} />
              </Box>
            </Grid>
          ))}
      </Grid>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req })
      const cookies = parseCookies()

      // if (cookies.user) {
      //   cookies.user.token = cookies?.token
      // }

      const user = cookies?.user
        ? JSON.parse(cookies.user)
        : session?.user
        ? session?.user
        : req.cookies.user && JSON.parse(req.cookies.user)

      await store.dispatch(publishedCourse(req))

      store.dispatch(loadUser(user?.email, user))

      return {
        props: {
          session,
        },
      }
    }
)
