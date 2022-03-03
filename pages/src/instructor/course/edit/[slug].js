import React, { useEffect, useState } from "react"
import UpdateCourse from "../../../../../components/forms/UpdateCourse"
import Resizer from "react-image-file-resizer"
import { useRouter } from "next/router"
// import { List } from "@material-ui/icons"

import {
  courseEdit,
  getlessons,
  imageDelete,
  imageUpload,
  // loadCourse,
} from "../../../../../redux/lesson/lessonActions"
import { useDispatch, useSelector } from "react-redux"
import { wrapper } from "../../../../../redux/store"
import { getSession } from "next-auth/react"
import { loadUser } from "../../../../../redux/user/userAction"
import { makeStyles } from "@mui/styles"
import { parseCookies } from "nookies"
import { loadCourse } from "../../../../../redux/course/courseActions"

const useStyles = makeStyles((theme) => ({
  paper: {
    overflowY: "unset",
  },
  customizedButton: {
    position: "absolute",
    left: "95%",
    top: "-9%",
    backgroundColor: "lightgray",
    color: "primary",
  },
  avcolor: {
    backgroundColor: theme.palette.primary.main,
  },
}))

const EditCourse = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    price: 0,
    uploading: false,
    paid: true,
    category: "",
    loading: false,
    lessons: [],
  })

  const [image, setImage] = useState("")

  const dispatch = useDispatch()

  const [files, setFiles] = useState({})

  const handleChange = (e) => {
    // e.preventDefault()
    // //console.log(e)
    setValues({ ...values, [e.target.name]: e.target.value })

    // //console.log(values[0].title)
  }

  const courseLoad = useSelector((state) => state.courseLoad)
  const { loading, error, course } = courseLoad
  const router = useRouter()

  const { slug } = router.query

  const handleSubmit = async (e) => {
    e.preventDefault()

    // //console.log(image)

    // //console.log(values, image)
    try {
      var strNum = values.price
      strNum = strNum.toString().replace("£", "")

      values.price = parseFloat(strNum)

      dispatch(courseEdit(image, values, slug))
      // //console.log("here", data)
    } catch (err) {}
  }

  const onDropzoneArea = (files) =>
    new Promise((resolve, reject) => {
      let reader = new FileReader()
      let file = files[0]

      if (file) {
        reader.readAsDataURL(file)
      }
      reader.onload = function () {
        // //console.log(reader.result)
      }
      reader.onerror = (error) => reject(error)

      if (file) {
        setValues({ ...values, loading: true })
        Resizer?.imageFileResizer(
          file,
          500,
          300,
          "JPEG",
          100,
          0,
          async (uri) => {
            try {
              setImage(uri)

              setValues({ ...values, loading: false })
            } catch (err) {
              //console.log(err)
              setValues({ ...values, loading: false })
              //console.log("upload failed. Try later")
            }
          }
        )
      }
    })

  const classes = useStyles()

  return (
    <>
      {values && (
        <>
          <div>
            <UpdateCourse
              handleChange={handleChange}
              values={values}
              setValues={setValues}
              handleSubmit={handleSubmit}
              onDropzoneArea={onDropzoneArea}
              slug={slug}
              course={course}
            />
          </div>
        </>
      )}
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

export default EditCourse
