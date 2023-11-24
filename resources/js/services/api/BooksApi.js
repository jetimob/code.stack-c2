import Api from './Api.js';

class BooksApi extends Api {
    constructor(axios) {
        super(axios, 'books');
    }

    getOrdered(orderBy) {
        return this.axios.get(`${this.basePath}`, { params: { orderBy: orderBy } });
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
