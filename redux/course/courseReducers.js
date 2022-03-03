import {
  CHECK_ENROLL_FAIL,
  CHECK_ENROLL_REQUEST,
  CHECK_ENROLL_SUCCESS,
  CREATE_COURSE_FAIL,
  CREATE_COURSE_REQUEST,
  CREATE_COURSE_SUCCESS,
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
} from "./courseTypes"

export const createCourseReducer = (
  state = { loading: false, course: null },
  action
) => {
  switch (action.type) {
    case CREATE_COURSE_REQUEST:
      return { loading: true }
    case CREATE_COURSE_SUCCESS:
      return { loading: false, course: action.payload }
    case CREATE_COURSE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const coursesLoadReducer = (
  state = { loading: false, course: null },
  action
) => {
  switch (action.type) {
    case LOAD_COURSES_REQUEST:
      return { loading: true }
    case LOAD_COURSES_SUCCESS:
      return { loading: false, courses: action.payload }
    case LOAD_COURSES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const courseLoadReducer = (
  state = { loading: false, course: null },
  action
) => {
  switch (action.type) {
    case LOAD_COURSE_REQUEST:
      return { loading: true }
    case LOAD_COURSE_SUCCESS:
      return { loading: false, course: action.payload }
    case LOAD_COURSE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const coursePublishedReducer = (
  state = { loading: false, published: null },
  action
) => {
  switch (action.type) {
    case PUBLISHED_COURSES_REQUEST:
      return { loading: true }
    case PUBLISHED_COURSES_SUCCESS:
      return { loading: false, published: action.payload }
    case PUBLISHED_COURSES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const courseGetReducer = (
  state = { loading: false, course: null },
  action
) => {
  switch (action.type) {
    case GET_COURSE_REQUEST:
      return { loading: true }
    case GET_COURSE_SUCCESS:
      return { loading: false, course: action.payload }
    case GET_COURSE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const enrollmentCheckReducer = (
  state = { loading: false, enrollment: false },
  action
) => {
  switch (action.type) {
    case CHECK_ENROLL_REQUEST:
      return { loading: true }
    case CHECK_ENROLL_SUCCESS:
      return { loading: false, enrolled: action.payload }
    case CHECK_ENROLL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const paidEnrollReducer = (
  state = { loading: false, paid: null },
  action
) => {
  switch (action.type) {
    case PAID_ENROLL_REQUEST:
      return { loading: true }
    case PAID_ENROLL_SUCCESS:
      return { loading: false, paid: action.payload }
    case PAID_ENROLL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const freeEnrollReducer = (
  state = { loading: false, free: null },
  action
) => {
  switch (action.type) {
    case PAID_ENROLL_REQUEST:
      return { loading: true }
    case PAID_ENROLL_SUCCESS:
      return { loading: false, free: action.payload }
    case PAID_ENROLL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const singleCourseReducer = (
  state = { loading: false, course: {} },
  action
) => {
  switch (action.type) {
    case SINGLE_COURSE_REQUEST:
      return { loading: true }
    case SINGLE_COURSE_SUCCESS:
      return { loading: false, course: action.payload }
    case SINGLE_COURSE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
