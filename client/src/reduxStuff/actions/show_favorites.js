import * as actions from './actionType'

const show_favorites = () =>{
    return {
        type: actions.SHOW_FAVORITES,
    }
}

const hide_favorites = () =>{
    return {
        type: actions.HIDE_FAVORITES,
    }
}

export default show_favorites