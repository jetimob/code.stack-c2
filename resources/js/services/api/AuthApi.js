import Api from './Api.js';

class AuthApi extends Api {
    constructor(axios) {
        super(axios, 'auth');
    }

    signIn(data, options = {}) {
        return this.axios.post(
            this.buildUrlWithOptions(`${this.basePath}/sign-in`, options),
            data,
            options
        );
    }

    signOut(options = {}) {
        return this.axios.post(
            this.buildUrlWithOptions(`${this.basePath}/sign-out`, options),
            options
        );
    }

    signUp(data, options = {}) {
        return this.axios.post(
            this.buildUrlWithOptions(`${this.basePath}/sign-up`, options),
            data,
            options
        );
    }

    me(options = {}) {
        return this.axios.get(
            this.buildUrlWithOptions(`${this.basePath}/me`, options),
            options
        );
    }

    initCsrfToken() {
        return this.axios.get('/sanctum/csrf-cookie');
    }
}

export default AuthApi;
