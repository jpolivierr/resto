import * as actions from "../actions/actionType"

const initialState = false

const show_favorites = (state = initialState, action) => {
  switch (action.type) {
    case actions.HIDE_FAVORITES:
     return state = false
    case actions.SHOW_FAVORITES:
      if(state === true){
        return state = false
      }else{
        return state = true
      }
    
    default:
     return state
  }
}

export default show_favorites
