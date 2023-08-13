import { getProfile } from "./services/auth"

export class Session {
    static session = null

    static async getProfile() {
        const profile = await getProfile()
        this.session.setItem('name', profile.data.name)
        this.session.setItem('email', profile.data.email)
        this.session.setItem('picture', profile.data.picture)
    }

    static init() {
        if (localStorage.getItem('accessToken')) {
            this.session = localStorage
        } else if (sessionStorage.getItem('accessToken')) {
            this.session = sessionStorage
        }
    }

    static rememberMe(r = false) {
        if (r) sessionStorage.setItem('rememberMe', 'true')
        else sessionStorage.removeItem('rememberMe')
    }

    static async login(accessToken) {
        this.session = sessionStorage.getItem('rememberMe') ? localStorage : sessionStorage
        this.session.setItem('accessToken', accessToken)
        try {
            await this.getProfile()
        } catch (err) {
            console.log(err)
            this.session.clear()
        }
    }

    static logout() {
        if (this.session) this.session.clear()
    }

    static isAuthenticated() {
        return this.session?.length
    }

    static AccessToken() {
        return this.session.getItem('accessToken')
    }

    static User() {
        return {
            name: this.session.getItem('name'),
            email: this.session.getItem('email'),
            picture: this.session.getItem('picture')
        }
    }
}