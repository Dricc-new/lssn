import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
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

export const Authenticate = async (req) => await axiosInstance.post('/auth/oauth2/linkedin', req)

