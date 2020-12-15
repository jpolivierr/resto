import * as actions from "./actionType"

export const showcase_option = (showcase, animation) => {
  return {
    type: actions.SHOWCASE_OPTION,
    payload: { showcase, animation },
  }
}
