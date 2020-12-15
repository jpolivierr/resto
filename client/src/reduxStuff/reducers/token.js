import * as actions from '../actions/actionType'
const initialState = {
    token: false
}

const token= (state=initialState, action)=>{
    switch(action.type){
        case actions.SET_TOKEN :
            return {...state, token: action.payload}
        case actions.REMOVE_TOKEN:
            return {...state, token: false}
            default:
                return state
    }
}

export default token