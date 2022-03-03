import { combineReducers } from "redux"
import {
  courseGetReducer,
  courseLoadReducer,
  coursePublishedReducer,
  coursesLoadReducer,
  createCourseReducer,
  enrollmentCheckReducer,
  freeEnrollReducer,
} from "./course/courseReducers"
import { filesCreateReducer } from "./file/fileReducer"

import { profileReducer, newInstructorReducer } from "./user/userReducer"

const reducers = combineReducers({
  profile: profileReducer,
  newInstructor: newInstructorReducer,
  //courses
  createCourse: createCourseReducer,
  coursesLoad: coursesLoadReducer,
  courseLoad: courseLoadReducer,
  coursePublished: coursePublishedReducer,
  courseGet: courseGetReducer,
  enrollmentCheck: enrollmentCheckReducer,
  freeEnroll: freeEnrollReducer,
  //file
  filesCreate: filesCreateReducer,
})

export default reducers
