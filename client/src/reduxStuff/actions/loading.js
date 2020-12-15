import * as actions from './actionType'

const loading = (state) => {
    return({
        type: actions.LOADING,
        payload: state
    })
}

export default loading