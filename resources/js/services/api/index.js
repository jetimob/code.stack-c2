import axios from 'axios';

import AuthApi from './AuthApi.js';
import AuthorsApi from './AuthorsApi.js';
import BooksApi from './BooksApi.js';
import CoversApi from './CoversApi.js';
import GenresApi from './GenresApi.js';
import LoansApi from './LoansApi.js';
import PeoplesApi from './PeoplesApi.js';
import PublishersApi from './PublishersApi.js';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        Referer: import.meta.env.VITE_APP_URL,
    },
});

api.interceptors.response.use(response => {
    return response.data;
});

export default {
    api,
    authors: new AuthorsApi(api),
    books: new BooksApi(api),
    peoples: new PeoplesApi(api),
    loans: new LoansApi(api),
    genres: new GenresApi(api),
    publishers: new PublishersApi(api),
    covers: new CoversApi(api),
    auth: new AuthApi(api),
};
