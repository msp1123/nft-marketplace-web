import { UserModel } from "../../models/user";
import { Action } from "../helpers";
import { UserActionTypes } from "./types";

let initialState: UserModel[] = [];

export const userReducer = (state = initialState, { type, payload }: Action) => {
    switch (type) {
        case UserActionTypes.SET_USERS:
            return {...state, users: payload };
        case UserActionTypes.SET_USER:
            return {...state, user: payload };
        default:
            return state;
    }
}
