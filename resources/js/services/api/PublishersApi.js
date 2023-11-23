import Api from './Api.js';

class PublishersApi extends Api {
    constructor(axios) {
        super(axios, 'publishers');
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

export default PublishersApi;
