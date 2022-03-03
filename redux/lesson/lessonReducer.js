import {
  POST_LESSONS_FAIL,
  POST_LESSONS_REQUEST,
  POST_LESSONS_SUCCESS,
} from "./lessonTypes"

export const lessonsPostReducer = (
  state = { loading: false, dblessons: null },
  action
) => {
  switch (action.type) {
    case POST_LESSONS_REQUEST:
      return { loading: true }
    case POST_LESSONS_SUCCESS:
      return { loading: false, dblessons: action.payload }
    case POST_LESSONS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
