import * as actions from "./actionType"

const push_result = (result) => {
  return {
    type: actions.PUSH_RESULT,
    payload: result,
  }
}

export default push_result
