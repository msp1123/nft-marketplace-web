import { toast } from "react-toastify";
import CONFIG from "../configs/globalConfigs";

export async function HealthCheck() {
    let res = await fetch(`/v1`, { method: 'GET' })
    if (res.status === 500) {
        toast.error('Server is down. Please try again later.')
    }
}

// user based APIs
export async function GetUser(address: string) {
    let res = await fetch(`/v1/user/fetch/${address}`, {
        method: 'GET'
    })
    try {
        var resJson = await res.json();
    } catch (error) {
        toast.error("Something went wrong.")
        return
    }

    if (resJson.success) {
        return resJson.user;
    } else {
        toast.error(resJson.message ?? "Something went wrong.")
    }
}

export async function Login(credentials: Object) {
    let res = await fetch(`/v1/user/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json"
        },
    })
    try {
        var resJson = await res.json();
    } catch (error) {
        toast.error("Something went wrong.")
        return
    }

    if (resJson.success) {
        toast.success(resJson.message)
        localStorage.setItem(CONFIG.authTokenStorageKey, resJson.token)
        return resJson.user;
    } else {
        toast.error(resJson.message ?? "Something went wrong.")
    }
}

// Collection based APIs
export async function VerifyCollectionName(name: string) {
    let res = await fetch(`/v1/collection/verifyName?name=${name}`, {
        method: 'GET'
    })
    try {
        var resJson = await res.json();
    } catch (error) {
        return
    }
    return resJson;
}

export async function CreateNewCollection(body: Object) {
    let authToken = localStorage.getItem(CONFIG.authTokenStorageKey);
    
    let res = await fetch(`/v1/collection/create`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Authorization": authToken!,
            "Content-Type": "application/json"
        },
    })
    if(res.status === 401){
        toast.error("Session expired. Please login.")
        return
    }
    
    try {
        var resJson = await res.json();
    } catch (error) {
        toast.error("Something went wrong.")
        return
    }

    if (resJson.success) {
        toast.success(resJson.message)
        return resJson.collection;
    } else {
        toast.error(resJson.message ?? "Something went wrong.")
    }
}

export async function GetUserCollections(address: string, query: string) {
    let res = await fetch(`/v1/collection/fetchByUser/${address}?${query}`, {
        method: 'GET'
    })
    try {
        var resJson = await res.json();
    } catch (error) {
        toast.error("Something went wrong.")
        return
    }

    if (resJson.success) {
        return resJson.collections;
    } else {
        toast.error(resJson.message ?? "Something went wrong.")
    }
}

// Token based APIs
export async function CreateToken(body: Object) {
    let authToken = localStorage.getItem(CONFIG.authTokenStorageKey);
    
    let res = await fetch(`/v1/token/create`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Authorization": authToken!,
            "Content-Type": "application/json"
        },
    })
    if(res.status === 401){
        toast.error("Session expired. Please login.")
        return
    }
    
    try {
        var resJson = await res.json();
    } catch (error) {
        toast.error("Something went wrong.")
        return
    }

    if (resJson.success) {
        toast.success(resJson.message)
        return resJson.token;
    } else {
        toast.error(resJson.message ?? "Something went wrong.")
    }
}

export async function GetAllTokens(query: string) {
    let res = await fetch(`/v1/token/fetchAll${query}`, {
        method: 'GET'
    })
    try {
        var resJson = await res.json();
    } catch (error) {
        toast.error("Something went wrong.")
        return
    }

    if (resJson.success) {
        return resJson.tokens;
    } else {
        toast.error(resJson.message ?? "Something went wrong.")
    }
}

export async function GetUniqueTokenId(chainId: number, nftAddress: string) {
    let res = await fetch(`/v1/token/getTokenId/${chainId}/${nftAddress}`, {
        method: 'GET'
    })
    try {
        var resJson = await res.json();
    } catch (error) {
        toast.error("Something went wrong.")
        return
    }

    if (resJson.success) {
        return resJson.tokenId;
    } else {
        toast.error(resJson.message ?? "Something went wrong.")
    }
}

// Common APIs
export async function GetSupportedNetworks() {
    let res = await fetch(`/v1/network/supportedNetworks`, {
        method: 'GET'
    })
    try {
        var resJson = await res.json();
    } catch (error) {
        toast.error("Something went wrong.")
        return
    }

    if (resJson.success) {
        return resJson.networks;
    } else {
        toast.error(resJson.message ?? "Something went wrong.")
    }
}

export async function GetNftCategories() {
    let res = await fetch(`/v1/nft/categories`, {
        method: 'GET'
    })
    try {
        var resJson = await res.json();
    } catch (error) {
        toast.error("Something went wrong.")
        return
    }

    if (resJson.success) {
        return resJson.categories;
    } else {
        toast.error(resJson.message ?? "Something went wrong.")
    }
}
