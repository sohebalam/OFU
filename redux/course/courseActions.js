import axios from "axios"
import {
  CHECK_ENROLL_FAIL,
  CHECK_ENROLL_REQUEST,
  CHECK_ENROLL_SUCCESS,
  CREATE_COURSE_FAIL,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
  FREE_ENROLL_FAIL,
  FREE_ENROLL_REQUEST,
  FREE_ENROLL_SUCCESS,
  GET_COURSE_FAIL,
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
  LOAD_COURSES_FAIL,
  LOAD_COURSES_REQUEST,
  LOAD_COURSES_SUCCESS,
  LOAD_COURSE_FAIL,
  LOAD_COURSE_REQUEST,
  LOAD_COURSE_SUCCESS,
  PAID_ENROLL_FAIL,
  PAID_ENROLL_REQUEST,
  PAID_ENROLL_SUCCESS,
  PUBLISHED_COURSES_FAIL,
  PUBLISHED_COURSES_REQUEST,
  PUBLISHED_COURSES_SUCCESS,
  SINGLE_COURSE_FAIL,
  SINGLE_COURSE_REQUEST,
  SINGLE_COURSE_SUCCESS,
  STUDENT_COURSES_FAIL,
  STUDENT_COURSES_REQUEST,
  STUDENT_COURSES_SUCCESS,
} from "./courseTypes"
import absoluteUrl from "next-absolute-url"
import { parseCookies } from "nookies"
import { loadStripe } from "@stripe/stripe-js"

const cookies = parseCookies()

export const courseCreate = (image, values, user) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COURSE_REQUEST })

    var strNum = values.price
    strNum = strNum.toString().replace("£", "")
    values.price = parseFloat(strNum)

    // //console.log("action", user, cookies.token)

    if (user._id && !/@gmail\.com$/.test(user._id)) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }

      const { data } = await axios.post(
        "/api/instructor/course/create",
        {
          image,
          ...values,
        },
        config
      )
      dispatch({
        type: CREATE_COURSE_SUCCESS,
        payload: data,
      })
    } else {
      const { data } = await axios.post("/api/instructor/course/create", {
        image,
        ...values,
      })
      dispatch({
        type: CREATE_COURSE_SUCCESS,
        payload: data,
      })
    }
  } catch (error) {
    dispatch({
      type: CREATE_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const loadCourses = (user) => async (dispatch) => {
  console.log("load action", user)
  try {
    // const { origin } = absoluteUrl(req)

    // //console.log("orginin", origin)
    dispatch({ type: LOAD_COURSES_REQUEST })

    if (user._id) {
      // //console.log("load actiondscasd", user, token)

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }

      // //console.log("config", config)
      const { data } = await axios.post(`/api/instructor/courses`, {}, config)
      console.log("data", data)

      dispatch({
        type: LOAD_COURSES_SUCCESS,
        payload: data,
      })
    }

    const { data } = await axios.post(`/api/instructor/courses`)
    console.log("data", data)
    dispatch({
      type: LOAD_COURSES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: LOAD_COURSES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const loadCourse = (user, token, req, slug) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_COURSE_REQUEST })

    const { origin } = absoluteUrl(req)

    if (user._id) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.get(
        `${origin}/api/instructor/course/${slug}`,
        config
      )
      // //console.log("data", data)

      dispatch({
        type: LOAD_COURSE_SUCCESS,
        payload: data,
      })
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.get(`${origin}/api/course/${slug}`, config)
      dispatch({
        type: LOAD_COURSE_SUCCESS,
        payload: data,
      })
    }
  } catch (error) {
    dispatch({
      type: LOAD_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const publishedCourse = (req) => async (dispatch) => {
  try {
    dispatch({ type: PUBLISHED_COURSES_REQUEST })

    const { origin } = absoluteUrl(req)

    const { data } = await axios.get(`${origin}/api/course/all`)

    dispatch({
      type: PUBLISHED_COURSES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PUBLISHED_COURSES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCourse = (req, slug) => async (dispatch) => {
  // //console.log("action", slug)

  try {
    dispatch({ type: GET_COURSE_REQUEST })

    const { origin } = absoluteUrl(req)

    // //console.log("actiodsn", slug)
    const { data } = await axios.get(`${origin}/api/course/${slug}`)
    // //console.log("data", data)
    dispatch({
      type: GET_COURSE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const checkEnrollment = (user, course) => async (dispatch) => {
  // console.log("action", user)
  try {
    dispatch({ type: CHECK_ENROLL_REQUEST })

    if (user._id && !/@gmail\.com$/.test(user._id)) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }
      console.log("actionzcdf", course._id)
      const { data } = await axios.post(
        `/api/course/enrollment/check/${course?._id}`,
        {},
        config
      )

      dispatch({
        type: CHECK_ENROLL_SUCCESS,
        payload: data,
      })
    }

    const { data } = await axios.get(
      `/api/course/enrollment/check/${course?._id}`
    )

    dispatch({
      type: CHECK_ENROLL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CHECK_ENROLL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const freeEnroll = (user, course) => async (dispatch) => {
  try {
    dispatch({ type: FREE_ENROLL_REQUEST })

    if (user._id && !/@gmail\.com$/.test(user._id)) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }

      const { data } = await axios.post(
        `/api/course/enrollment/free/${course._id}`,
        {},
        config
      )

      dispatch({
        type: FREE_ENROLL_SUCCESS,
        payload: data,
      })
    }

    const { data } = await axios.post(
      `/api/course/enrollment/free/${course._id}`
    )

    dispatch({
      type: FREE_ENROLL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: FREE_ENROLL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const paidEnroll = (user, course) => async (dispatch) => {
  try {
    dispatch({ type: PAID_ENROLL_REQUEST })

    // console.log(cookies.token)

    if (user._id && !/@gmail\.com$/.test(user._id)) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }

      const { data } = await axios.post(
        `/api/course/enrollment/paid/${course?._id}`,
        {},
        config
      )

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
      stripe.redirectToCheckout({ sessionId: data })

      dispatch({
        type: PAID_ENROLL_SUCCESS,
        payload: data,
      })
    }

    const { data } = await axios.post(
      `/api/course/enrollment/paid/${course?._id}`
    )
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
    stripe.redirectToCheckout({ sessionId: data })
  } catch (error) {
    dispatch({
      type: PAID_ENROLL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getStudentCourses = (user, slug) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_COURSE_REQUEST })

    if (user._id && !/@gmail\.com$/.test(user._id)) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }

      const { data } = await axios.post(
        `/api/course/single/${slug}`,
        {},
        config
      )

      dispatch({
        type: SINGLE_COURSE_SUCCESS,
        payload: data,
      })
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    }

    const { data } = await axios.post(`/api/course/single/${slug}`, {}, config)

    dispatch({
      type: SINGLE_COURSE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: SINGLE_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const studentCourses = (user) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_COURSES_REQUEST })

    if (user._id && !/@gmail\.com$/.test(user._id)) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }

      const { data } = await axios.post(`/api/course/dashboard`, {}, config)

      dispatch({
        type: STUDENT_COURSES_SUCCESS,
        payload: data,
      })
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    }

    const { data } = await axios.post(`/api/course/dashboard`, {}, config)

    dispatch({
      type: STUDENT_COURSES_SUCCESS,
      payload: data,
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: SINGLE_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
