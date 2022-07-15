import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: `http://localhost:3200/v1`
});

export async function Login(data: Object) {
    let res = await api.post(`/user/login`, data)
    if(res.status === 200){
        toast.success(res.data.message)
        return res.data;
    }else{
        toast.error(res.data.message)
    }
}
