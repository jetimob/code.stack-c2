import Api from './Api.js';

class GenresApi extends Api {
    constructor(axios) {
        super(axios, 'genres');
    }

    books(genreId, options = {}) {
        return this.axios.get(
            this.buildUrlWithOptions(
                `${this.basePath}/${genreId}/books`,
                options
            )
        );
    }
}

export default GenresApi;
