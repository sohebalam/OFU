import { combineReducers } from "redux"
import {
  courseGetReducer,
  courseLoadReducer,
  coursePublishedReducer,
  coursesLoadReducer,
  coursesStudentReducer,
  createCourseReducer,
  enrollmentCheckReducer,
  freeEnrollReducer,
  singleCourseReducer,
} from "./course/courseReducers"
import { filesCreateReducer } from "./file/fileReducer"
import {
  accountBalanceReducer,
  studentCountReducer,
} from "./instructor/instrReducer"
import { selectVideoReducer } from "./lesson/lessonReducer"

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
  singleCourse: singleCourseReducer,
  coursesStudent: coursesStudentReducer,
  //instructor
  studentCount: studentCountReducer,
  accountBalance: accountBalanceReducer,

  //file-lessons
  selectVideo: selectVideoReducer,
  filesCreate: filesCreateReducer,
})

export default reducers
