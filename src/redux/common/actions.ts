import { CommonActionTypes } from "./types"

export const setSupportedNetworks = (networks: any) => {
    return {
        type: CommonActionTypes.SET_SUPPORTED_NETWORKS,
        payload: networks
    }
}
