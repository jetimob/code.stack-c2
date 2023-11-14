import Api from './Api.js';

class GenresApi extends Api {
    constructor(axios) {
        super(axios, 'genres');
    }
}

export default GenresApi;
