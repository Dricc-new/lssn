import axios from "axios";
import { Session } from "../AuthController";

export const APIInstance = axios.create({
    baseURL: 'http://localhost:3000',
    validateStatus: (status) =>{
        if(status == 401) Session.RefreshToken()
        return status < 500
    }
})
