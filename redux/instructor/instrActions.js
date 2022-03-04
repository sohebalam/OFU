import {
  ACCOUNT_BAL_FAIL,
  ACCOUNT_BAL_REQUEST,
  ACCOUNT_BAL_SUCCESS,
  STUDENT_COUNT_FAIL,
  STUDENT_COUNT_REQUEST,
  STUDENT_COUNT_SUCCESS,
} from "./instrTypes"

import { parseCookies } from "nookies"
import axios from "axios"

const cookies = parseCookies()

export const countStudents = (user, courseId) => async (dispatch) => {
  console.log("action", user, courseId)
  console.log(courseId)
  try {
    dispatch({ type: STUDENT_COUNT_REQUEST })

    if (user._id && !/@gmail\.com$/.test(user._id)) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }

      console.log("courseId", courseId)

      const { data } = await axios.post(
        `/api/instructor/students`,
        {
          courseId: courseId,
        },
        config
      )
      dispatch({
        type: STUDENT_COUNT_SUCCESS,
        payload: data,
      })
    }

    const { data } = await axios.post(`/api/instructor/students`, {
      courseId: courseId,
    })

    dispatch({
      type: STUDENT_COUNT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STUDENT_COUNT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const sendBalanceRequest = (user) => async (dispatch) => {
  console.log("action", user)
  try {
    dispatch({ type: ACCOUNT_BAL_REQUEST })

    if (user._id && !/@gmail\.com$/.test(user._id)) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }

      const { data } = await axios.get("/api/instructor/balance", config)
      dispatch({
        type: ACCOUNT_BAL_SUCCESS,
        payload: data,
      })
    }

    const { data } = await axios.get("/api/instructor/balance")
    dispatch({
      type: ACCOUNT_BAL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ACCOUNT_BAL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
