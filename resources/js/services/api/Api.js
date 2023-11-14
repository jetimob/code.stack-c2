class Api {
    constructor(axios, resource) {
        this.axios = axios;
        this.basePath = resource;
    }

    buildUrlWithOptions(url, options) {
        if (options.pathParams) {
            for (const key in options.pathParams) {
                url = url.replace(`{${key}}`, options.pathParams[key]);
            }
        }

        if (options.qs) {
            const params = new URLSearchParams(options.qs);
            url += '?' + params.toString();
        }
        return url;
    }

    getOne(id, options = {}) {
        return this.axios.get(
            this.buildUrlWithOptions(`${this.basePath}/${id}`, options),
            options
        );
    }

    get(options = {}) {
        return this.axios.get(
            this.buildUrlWithOptions(this.basePath, options),
            options
        );
    }

    post(data, options = {}) {
        return this.axios.post(
            this.buildUrlWithOptions(this.basePath, options),
            data,
            options
        );
    }

    patch(id, data, options = {}) {
        return this.axios.patch(
            this.buildUrlWithOptions(`${this.basePath}/${id}`, options),
            data,
            options
        );
    }

    delete(id, options = {}) {
        return this.axios.delete(
            this.buildUrlWithOptions(`${this.basePath}/${id}`, options),
            options
        );
    }
}

export default Api;
