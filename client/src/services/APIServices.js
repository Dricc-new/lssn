import axios from "axios";
import { Session } from "../AuthController";

export const APIInstance = axios.create({
    baseURL: 'https://lssn-production.up.railway.app',
    validateStatus: (status) =>{
        if(status == 401) Session.RefreshToken()
        return status < 500
    }
})
