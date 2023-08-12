import { getProfile } from "./services/auth"

export class Session {
    static session = null
    static rememberMe = false
    static init() {
        if (localStorage.getItem('accessToken')) {
            this.rememberMe = true
            this.session = localStorage
        } else if (sessionStorage.getItem('accessToken')) {
            this.rememberMe = false
            this.session = sessionStorage
        }
    }

    static async login(accessToken) {
        this.session = this.rememberMe ? localStorage : sessionStorage
        this.session.setItem('accessToken', accessToken)
        try {
            const profile = await getProfile()
            this.session.setItem('name', profile.data.name)
            this.session.setItem('email', profile.data.email)
            this.session.setItem('picture', profile.data.picture)
        } catch (err) {
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