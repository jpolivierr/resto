import * as actions from "../actions/actionType"

const initialState = {
  modaltype: "",
  OUT_WITH_ANIMATION: false
}

function Modal(state = initialState, action){
  switch (action.type) {
    case actions.MODALON:
      return { ...state, ...action.payload}
    case actions.MODALOFF:
      return { ...state, modaltype: '' }
    case actions.OUT_WITH_ANIMATION:
      return { ...state, OUT_WITH_ANIMATION: true }
    default:
      return state
  }
}

export default Modal
