import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import {
  Avatar,
  Tooltip,
  Button,
  Grid,
  Box,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material"
import ReactMarkdown from "react-markdown"
import EditIcon from "@mui/icons-material/Edit"
import PublishIcon from "@mui/icons-material/Publish"
import Dialog from "@mui/material/Dialog"
import CloseIcon from "@mui/icons-material/Close"
import GroupIcon from "@mui/icons-material/Group"
import CourseForm from "../../../../components/forms/FileForm"
import { useSelector, useDispatch } from "react-redux"
import { wrapper } from "../../../../redux/store"
import { loadCourse } from "../../../../redux/course/courseActions"
// import Lessons from "../../../../components/file/DragList"
import Publish from "../../../../components/course/Publish"
import { countStudents } from "../../../../redux/instructor/instrActions"
import { getSession, useSession } from "next-auth/react"
import { loadUser } from "../../../../redux/user/userAction"
import { parseCookies } from "nookies"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
  paper: {
    overflowY: "unset",
  },
  customizedButton: {
    position: "absolute",
    left: "95%",
    top: "-3.5%",
    backgroundColor: "lightgray",
    color: "primary",
  },
  iconColor: {
    color: "green",
  },
  avcolor: {
    backgroundColor: theme.palette.primary.main,
  },
}))

const CourseView = () => {
  const [fileVisible, setFileVisible] = useState(false)
  const [fileCreated, setFileCreated] = useState("")

  const profile = useSelector((state) => state.profile)
  const { dbUser } = profile

  const classes = useStyles()
  const dispatch = useDispatch()
  // const [students, setStudents] = useState(0)

  const router = useRouter()
  const { slug } = router.query

  const courseLoad = useSelector((state) => state.courseLoad)
  const { loading, error: courseError, course } = courseLoad

  const { data: session } = useSession()

  const cookies = parseCookies()

  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : cookies?.user

  const studentCount = useSelector((state) => state.studentCount)
  const { students } = studentCount

  // //console.log(fileCreated)

  useEffect(() => {
    course && dispatch(countStudents(user, course._id))
    // course && studentCount()
  }, [course])

  return (
    <>
      <Grid container>
        {course && (
          <Grid container key={course?._id} style={{ marginTop: "2rem" }}>
            <Grid container>
              <Grid item xs={2}>
                <Avatar
                  style={{ height: "150px", width: "150px" }}
                  src={course.image ? course.image.Location : "/course.jpg"}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h3">{course?.title}</Typography>
                <Typography variant="h4">
                  {course?.lessons && course?.lessons?.length} Lessons
                </Typography>
                <Typography variant="h5">{course?.category}</Typography>
                <Box padding="1rem">
                  <Typography variant="h5">
                    <ReactMarkdown>{course?.description || ""}</ReactMarkdown>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box mt="1rem">
                  <Button
                    variant="outlined"
                    fullWidth={true}
                    color="primary"
                    icon={<PublishIcon />}
                    size="large"
                    onClick={() => setFileVisible(true)}
                  >
                    Add File
                  </Button>
                </Box>
                {/* {fileCreated && <Alert severity="success">{fileCreated}</Alert>} */}
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={2}>
                <div>
                  <Box marginLeft="6rem">
                    <Tooltip
                      // title="Students"
                      title={`${students?.length} Enrolled`}
                      style={{ marginBottom: "0.5rem", marginRight: "1rem" }}
                    >
                      <GroupIcon className={classes.iconColor} />
                    </Tooltip>

                    <Tooltip title="Edit" style={{ marginRight: "1rem" }}>
                      <EditIcon
                        onClick={() =>
                          router.push(`/src/instructor/course/edit/${slug}`)
                        }
                        className="h5 pointer text-warning mr-4"
                      />
                    </Tooltip>

                    <Publish
                      initCourse={course}
                      lessons={course.lessons}
                      slug={slug}
                    />
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Grid>
        )}

        <Dialog
          open={fileVisible}
          onClose={() => setFileVisible(false)}
          footer={null}
          classes={{ paper: classes.paper }}
        >
          <CourseForm
            dbUser={dbUser}
            slug={slug}
            setFileVisible={setFileVisible}
            setFileCreated={setFileCreated}
          />
          <DialogActions>
            <IconButton
              autoFocus
              onClick={() => setFileVisible(false)}
              color="primary"
              className={classes.customizedButton}
            >
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid container style={{ marginTop: "0.5rem" }}>
        {/* <Lessons slug={slug} lessons={course.lessons} /> */}
      </Grid>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params, req } = context
    const session = await getSession({ req })
    const cookies = parseCookies()

    const token = cookies?.token ? cookies?.token : req.cookies.token

    // //console.log(token)

    const user = cookies?.user
      ? JSON.parse(cookies.user)
      : session?.user
      ? session?.user
      : JSON.parse(req.cookies.user)

    await store.dispatch(loadUser(user.email, user))
    await store.dispatch(loadCourse(user, token, req, params.slug))

    return {
      props: {
        session,
      },
    }
  }
)

export default CourseView
