import { UserActionTypes } from "./types"

export const setUsers = (users: any) => {
    return {
        type: UserActionTypes.SET_USERS,
        payload: users
    }
}

export const setUser = (user: any) => {
    return {
        type: UserActionTypes.SET_USER,
        payload: user
    }
}
