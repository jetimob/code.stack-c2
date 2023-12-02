import Api from './Api.js';

class PublisherApi extends Api {
    constructor(axios) {
        super(axios, 'publisher');
    }

    books(publisherId, options = {}) {
        return this.axios.get(
            this.buildUrlWithOptions(
                `${this.basePath}/${publisherId}/books`,
                options
            )
        );
    }
}

export default PublisherApi;
