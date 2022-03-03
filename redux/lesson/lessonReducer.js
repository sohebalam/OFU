import {
  POST_LESSONS_FAIL,
  POST_LESSONS_REQUEST,
  POST_LESSONS_SUCCESS,
  SELECT_VIDEO_FAIL,
  SELECT_VIDEO_REQUEST,
  SELECT_VIDEO_SUCCESS,
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

export const selectVideoReducer = (
  state = { loading: false, video: null },
  action
) => {
  switch (action.type) {
    case SELECT_VIDEO_REQUEST:
      return { loading: true }
    case SELECT_VIDEO_SUCCESS:
      return { loading: false, video: action.payload }
    case SELECT_VIDEO_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
