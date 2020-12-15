import * as actions from './actionType'

export const set_token = (token) => {
    return(
        {
            type: actions.SET_TOKEN,
            payload: token
        }
    )
}
export const remove_token = () => {
    return(
        {
            type: actions.REMOVE_TOKEN
        }
    )
}