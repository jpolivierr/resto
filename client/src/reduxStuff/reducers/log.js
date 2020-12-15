import * as actions from "../actions/actionType"
const initialState = {
  loggedIn: false,
}

const log = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGGED_IN:
      return { ...state, loggedIn: true }
    case actions.LOGGED_OUT:
      return { ...state, loggedIn: false }
    default:
      return state
  }
}

export default log
