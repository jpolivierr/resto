import * as actions from "./actionType"

export const modalon = (formType) => {
  return {
    type: actions.MODALON,
    payload: {
      modaltype: formType,
    },
  }
}

export const modaloff = () => {
  return {
    type: actions.MODALOFF,
  }
}

export const out_with_animation = () => {
  return {
    type: actions.OUT_WITH_ANIMATION,
  }
}
