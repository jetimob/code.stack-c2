import Api from './Api.js';

class LoansApi extends Api {
    constructor(axios) {
        super(axios, 'loans');
    }

}

export default LoansApi;
