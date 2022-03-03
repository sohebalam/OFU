import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  REGISTER_INSTRUCTOR_REQUEST,
  REGISTER_INSTRUCTOR_SUCCESS,
  REGISTER_INSTRUCTOR_FAIL,
} from "./userTypes"
import axios from "axios"

export const loadUser = (email, user) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post(`/api/user/profile`, { email }, config)

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data || user,
    })
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const regInstructor = (email) => async (dispatch) => {
  // //console.log("In Action", email)
  try {
    dispatch({ type: REGISTER_INSTRUCTOR_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post(
      `/api/instructor/become`,
      { email },
      config
    )

    // //console.log(data)

    dispatch({
      type: REGISTER_INSTRUCTOR_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: REGISTER_INSTRUCTOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
