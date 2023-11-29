import Api from './Api.js';

class PeoplesApi extends Api {
    constructor(axios) {
        super(axios, 'peoples');
    }

    loans(peopleId, options = {}) {
        return this.axios.get(
            this.buildUrlWithOptions(
                `${this.basePath}/${peopleId}/loans`,
                options
            )
        );
    }
}

export default PeoplesApi;
