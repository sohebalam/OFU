import {
  ACCOUNT_BAL_FAIL,
  ACCOUNT_BAL_REQUEST,
  ACCOUNT_BAL_SUCCESS,
  STUDENT_COUNT_FAIL,
  STUDENT_COUNT_REQUEST,
  STUDENT_COUNT_SUCCESS,
} from "./instrTypes"

export const studentCountReducer = (
  state = { loading: false, students: 0 },
  action
) => {
  switch (action.type) {
    case STUDENT_COUNT_REQUEST:
      return { loading: true }
    case STUDENT_COUNT_SUCCESS:
      return { loading: false, students: action.payload }
    case STUDENT_COUNT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const accountBalanceReducer = (
  state = { loading: false, balance: 0 },
  action
) => {
  switch (action.type) {
    case ACCOUNT_BAL_REQUEST:
      return { loading: true }
    case ACCOUNT_BAL_SUCCESS:
      return { loading: false, balance: action.payload }
    case ACCOUNT_BAL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
