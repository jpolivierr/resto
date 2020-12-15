import * as actions from '../actions/actionType'

const initialState = {
    showcase: 1,
    animation: false
}

 const Showcase =(state = initialState, action)=>{
    switch(action.type){
        case actions.SHOWCASE_OPTION :
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default Showcase