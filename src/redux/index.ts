import {combineReducers} from "redux"
import { commonReducer } from "./common/reducer"
import { tokenReducer } from "./tokens/reducer"
import { userReducer } from "./users/reducer"

export const reducers = combineReducers({
    allUsers: userReducer,
    allTokens: tokenReducer,
    commonInfo: commonReducer
})
