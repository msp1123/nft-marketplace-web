import { TokenActionTypes } from "./types"

export const setTokens = (tokens: any) => {
    return {
        type: TokenActionTypes.SET_TOKENS,
        payload: tokens
    }
}

export const setToken = (token: any) => {
    return {
        type: TokenActionTypes.SET_TOKEN,
        payload: token
    }
}
 