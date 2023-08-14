import { APIInstance } from "./services/APIServices";
import axios from 'axios';

// redirect to linkedin to authenticate
export async function redirectLinkedinAuth(action) {
    try {
        const res = await APIInstance.get('/auth/oauth2/linkedin/' + action)
        window.location.href = res.data
    } catch (err) {
        console.log(err)
    }
}

export class Session {
    static session = null

    // Get authenticated user profile
    static async getProfile() {
        try {
            // Pass the request to the API
            const { name, email, picture } = (await APIInstance.post('/auth/profile', null, {
                headers: { Authorization: `Bearer ${this.session.getItem('accessToken')}` }
            })).data

            // Save profile
            this.session.setItem('name', name)
            this.session.setItem('email', email)
            this.session.setItem('picture', picture)

            // Return profile 
            return { name, email, picture }
        } catch (err) {
            return err
        }
    }

    // Mount session on page load
    static init() {
        if (localStorage.getItem('accessToken')) {
            this.session = localStorage
        } else if (sessionStorage.getItem('accessToken')) {
            this.session = sessionStorage
        }
    }

    // Turn remember me on or off
    static rememberMe(r = true) {
        if (r) sessionStorage.setItem('rememberMe', 'true')
        else sessionStorage.removeItem('rememberMe')
    }

    // Log in
    static async login(accessToken, refreshToken) {
        // If rememberMe is active, save the session to localStorage; otherwise store it in sessionStorage
        this.session = sessionStorage.getItem('rememberMe') ? localStorage : sessionStorage

        // Save access token and refresh token
        this.session.setItem('accessToken', accessToken)
        this.session.setItem('refreshToken', refreshToken)
        this.session.setItem('rememberMe',sessionStorage.getItem('rememberMe'))

        // Load user profile
        await this.getProfile()
    }

    // Authenticate with linkedin
    static async AuthWithLinkedinStrategy(code, state) {
        // Pass the request to the API
        const { accessToken, refreshToken } = (await APIInstance.post('/auth/oauth2/linkedin', { code, state }, {
            headers: { 'Content-Type': 'application/json' }
        })).data

        // We check that it returned the accessToken
        if (accessToken) {
            // Log in
            return await this.login(accessToken, refreshToken)
        }
    }

    // Closed session
    static logout() {
        if (this.session) this.session.clear()
    }

    // Check if the user is authenticated
    static isAuthenticated() {
        return this.session?.length ? true : false
    }

    // API request header
    static AuthHeader() {
        const headers = { Authorization: `Bearer ${this.session.getItem('accessToken')}` }
        return { headers }
    }

    // User
    static User() {
        return {
            name: this.session.getItem('name'),
            email: this.session.getItem('email'),
            picture: this.session.getItem('picture')
        }
    }
    // Refresh Token
    static async RefreshToken() {
        try {
            // Pass the request to the API
            const { accessToken } = (await axios.post('https://lssn-production.up.railway.app/auth/refreshToken', {
                accessToken: this.session.getItem('accessToken'),
                refreshToken: this.session.getItem('refreshToken')
            })).data
            
            // Log in
            await this.login(accessToken,this.session.getItem('refreshToken'))
            
            // Redirect to Dashboard
            window.location.reload()
        } catch (err) {
            // If there is an error, delete the session and go to the login page
            if (err.response.data.statusCode == 401) {
                this.session.clear()
                window.location.href = '/login'
            }
            return err

        }
    }
}

addEventListener("error", (event) => {
    console.log('ErrorMio:', event)
});