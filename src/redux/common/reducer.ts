import { Action } from "../helpers";
import { CommonActionTypes } from "./types";

let initialState: any[] = [];

export const commonReducer = (state = initialState, { type, payload }: Action) => {
    switch (type) {
        case CommonActionTypes.SET_SUPPORTED_NETWORKS:
            return {...state, networks: payload };
        default:
            return state;
    }
}
