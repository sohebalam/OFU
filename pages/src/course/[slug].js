import { useEffect, useState } from "react"
import axios from "axios"
// import PreviewModal from "../../components/modal/PreviewModal"
import SingleCourseJumbotron from "../../../components/course/CourseJumbotron"
import LessonList from "../../../components/course/LessonList"
import { useRouter } from "next/router"
// import { Context } from "../../context"
// import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import { useSession, signIn, signOut, getSession } from "next-auth/react"

import { freeEnroll, paidEnroll } from "../../../redux/course/courseActions"
import { wrapper } from "../../../redux/store"
import { CircularProgress } from "@mui/material"

import { getCourse } from "../../../redux/course/courseActions"

const Course = () => {
  const { data: session } = useSession()
  const [showModal, setShowModal] = useState(false)
  const [preview, setPreview] = useState("")
  // const [loading, setLoading] = useState(false)
  // const [enrolled, setEnrolled] = useState({})
  const router = useRouter()

  const dispatch = useDispatch()

  const profile = useSelector((state) => state.profile)
  const { error, dbUser } = profile

  // const enrollmentCheck = useSelector((state) => state.enrollmentCheck)
  // const { loading: enrollLoad, error: enrollError, enrolled } = enrollmentCheck

  const user = dbUser || session?.user

  const courseGet = useSelector((state) => state.courseGet)
  const { loading, error: courseError, course } = courseGet

  // console.log("course", course)

  const enrollmentCheck = useSelector((state) => state.enrollmentCheck)
  const { loading: enrollLoad, error: enrollError, enrolled } = enrollmentCheck

  // console.log(enrolled?.staus)

  const handelPaidEnroll = async () => {
    try {
      if (!user) {
        router.push("/user/login")
      }
      // if (enrolled.status) {
      //   return router.push(`/src/course/${enrolled.course.slug}`)
      // }

      dispatch(paidEnroll(user, course))
    } catch (error) {
      // toast("Enrollment failed please try again")
      //console.log(error)
    }
  }
  const handelFreeEnroll = async (e) => {
    e.preventDefault()
    console.log("paid", user)
    console.log("free")

    try {
      // if (!user) {
      //   router.push("/user/login")
      // }
      // if (enrolled.status) {
      //   return router.push(`/src/course/${enrolled.course.slug}`)
      // }

      dispatch(freeEnroll(user, course))

      // toast(data.message)
      return router.push(`/src/course/${course.slug}`)
    } catch (error) {
      // toast("Enrollment failed, try again4")
      //console.log(error)
    }
  }

  return (
    <>
      {course && (
        <SingleCourseJumbotron
          course={course}
          showModal={showModal}
          setShowModal={setShowModal}
          preview={preview}
          setPreview={setPreview}
          user={user}
          loading={loading}
          handelPaidEnroll={handelPaidEnroll}
          handelFreeEnroll={handelFreeEnroll}
          lessons={course?.lessons}
        />
      )}

      <LessonList lessons={course?.lessons} />
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params, req } = context

    // const { slug } = params

    await store.dispatch(getCourse(req, params.slug))
  }
)

export default Course
