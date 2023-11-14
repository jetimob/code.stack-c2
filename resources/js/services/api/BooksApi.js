import Api from './Api.js';

class BooksApi extends Api {
    constructor(axios) {
        super(axios, 'books');
    }

    associateCover(bookId, coverId, options = {}) {
        return this.axios.post(
            this.buildUrlWithOptions(
                `${this.basePath}/${bookId}/cover/${coverId}`,
                options
            )
        );
    }

    dissociateCover(bookId, coverId, options = {}) {
        return this.axios.delete(
            this.buildUrlWithOptions(
                `${this.basePath}/${bookId}/cover/${coverId}`,
                options
            )
        );
    }
}

export default BooksApi;
