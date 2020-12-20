import * as actions from "../actions/actionType"
import axios from "axios"
const initialState = {
  fav_res: [],
}

const setFavResToDataBase = async (data, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `${token}`,
    },
  }
  const body = JSON.stringify(data)
  try {
    await axios.post("/profile/favorite/", body, config)
  } catch (error) {
    console.log(error)
  }
}

const Fav_res = (state = initialState, action) => {
  let newArray = state.fav_res
  let newState
  switch (action.type) {
    case actions.ADD_FAV_RES_To_DATABASE:
      newArray = state.fav_res
      newState = { ...state, fav_res: newArray.concat(action.payload) }
      setFavResToDataBase(newState, action.token)
      return { ...state, fav_res: newArray.concat(action.payload) }
    case actions.SET_FAV_RES:
      newArray = state.fav_res
      newState = { ...state, fav_res: newArray.concat(action.payload) }
      return { ...state, fav_res: newArray.concat(action.payload) }
    case actions.REMOVE_FAV_RES:
      const updateFavRes = state.fav_res.filter((res) => {
        return res.id !== action.payload
      })
      setFavResToDataBase(updateFavRes, action.token)
      return { ...state, fav_res: updateFavRes }
    case actions.RESET_FAV_RES:
      return { ...state, fav_res: [] }
    default:
      return state
  }
}

export default Fav_res
