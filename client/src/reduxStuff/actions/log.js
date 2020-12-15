import * as actions from "./actionType"

export const logged_in = () => {
  return { type: actions.LOGGED_IN }
}

export const logged_out = () => {
  return { type: actions.LOGGED_OUT }
}
