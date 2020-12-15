import * as actions from "../actions/actionType"
import cuisines from '../../component/advanceSearch/cuisine'

const initialState = {
  cuisine: [...cuisines],
  Results: []
}

const results = (state = initialState, action) => {
  switch (action.type) {
    case actions.PUSH_RESULT:
      return { ...state, Results: action.payload }
    default:
      return state
  }
}

export default results
