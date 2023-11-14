import Api from './Api.js';

class BooksApi extends Api {
    constructor(axios) {
        super(axios, 'covers');
    }
}

export default BooksApi;
