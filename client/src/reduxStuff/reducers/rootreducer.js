import {combineReducers} from 'redux'
import modal from './modal'
import showcase from './showcases'
import result from './results'
import loading from './loading'
import fav_res from './fav_res'
import log from './log'
import token from './token'
import show_favorites from './show_favorites'
export default combineReducers(
    {
       modal,
       showcase,
       result,
       loading,
       fav_res,
       log,
       token,
       show_favorites
    }
)
    
