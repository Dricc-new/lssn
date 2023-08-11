import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
})

// redirect to linkedin to authenticate
export async function redirectLinkedinAuth(action) {
    const res = await axiosInstance.get('/auth/linkedin/' + action)
    window.location.href = res.data.url + '?response_type=code&client_id=' +
        res.data.client_id + '&redirect_uri=http://localhost:5173/callback&state=' +
        res.data.state + '&scope=' + res.data.scope;
}

export const getAccessToken = async (req) => await axiosInstance.post('/auth/linkedin/accessToken',req) 

export async function authLinkedin() {

}
