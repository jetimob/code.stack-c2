import Api from './Api.js';

class AuthorsApi extends Api {
    constructor(axios) {
        super(axios, 'authors');
    }

    books(authorId, options = {}) {
        return this.axios.get(
            this.buildUrlWithOptions(
                `${this.basePath}/${authorId}/books`,
                options
            )
        );
    }
}

export default AuthorsApi;
