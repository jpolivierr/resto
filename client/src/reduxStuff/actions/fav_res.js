import * as actions from './actionType'

export const set_fav_res = (restaurant)=>{
    return(
        {
            type: actions.SET_FAV_RES,
            payload: restaurant
        }
    )
}

export const remove_fav_res = (resId)=>{
    return(
        {
            type: actions.REMOVE_FAV_RES,
            payload: resId
        }
    )
}


export const add_fav_res_to_database = (resId)=>{
    return(
        {
            type: actions.ADD_FAV_RES_To_DATABASE,
            payload: resId
        }
    )
}
export const reset_fav_res= ()=>{
    return(
        {
            type: actions.RESET_FAV_RES,
        }
    )
}