import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

const auth = useAuthStore()

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
})

// redirect to linkedin to authenticate
export async function redirectLinkedinAuth(action) {
    try {
        const res = await axiosInstance.get('/auth/oauth2/linkedin/' + action)
        window.location.href = res.data
    } catch (err) {
        console.log(err)
    }
}

export const Authenticate = async (req) => await axiosInstance.post('/auth/oauth2/linkedin', req, {
    headers: {
        'Content-Type': 'application/json'
    }
})

export const getProfile = async () => await axiosInstance.post('/auth/profile', null, {
    headers: { Authorization: `Bearer ${auth.accessToken}` }
})
