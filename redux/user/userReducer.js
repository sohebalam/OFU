import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  REGISTER_INSTRUCTOR_REQUEST,
  REGISTER_INSTRUCTOR_SUCCESS,
  REGISTER_INSTRUCTOR_FAIL,
} from "./userTypes"

export const profileReducer = (state = { dbUser: null }, action) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return { loading: true }
    case LOAD_USER_SUCCESS:
      return { loading: false, dbUser: action.payload }
    case LOAD_USER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const newInstructorReducer = (
  state = { loading: false, user: null },
  action
) => {
  switch (action.type) {
    case REGISTER_INSTRUCTOR_REQUEST:
      return { loading: true }
    case REGISTER_INSTRUCTOR_SUCCESS:
      return { loading: false, success: true, link: action.payload }

    case REGISTER_INSTRUCTOR_FAIL:
      return { loading: false, error: action.payload }
    // case CLEAR_ERRORS:
    //   return { ...state, error: null }
    default:
      return state
  }
}
