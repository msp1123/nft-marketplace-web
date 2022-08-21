import { TokenModel } from "../../models/token";
import { Action } from "../helpers";
import { TokenActionTypes } from "./types";

let initialState: TokenModel[] = [];

export const tokenReducer = (state = initialState, { type, payload }: Action) => {
    switch (type) {
        case TokenActionTypes.SET_TOKENS:
            return {...state, tokens: payload };
        case TokenActionTypes.SET_TOKEN:
            return state;
        default:
            return state;
    }
}
