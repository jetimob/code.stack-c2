import { Routes as RS, Route } from 'react-router-dom';

import NotFound from '../pages/ NotFound.jsx';
import AuthorList from '../pages/authors/AuthorList.jsx';
import AuthorView from '../pages/authors/AuthorView.jsx';
import ManageAuthor from '../pages/authors/ManageAuthor.jsx';
import BookList from '../pages/books/BookList.jsx';
import BookView from '../pages/books/BookView.jsx';
import ManageBook from '../pages/books/ManageBook.jsx';
import GenreList from '../pages/genres/GenreList.jsx';
import GenreView from '../pages/genres/GenreView.jsx';
import ManageGenre from '../pages/genres/ManageGenre.jsx';

const Routes = () => (
    <RS>
        <Route index element={<BookList />} />

        <Route path='/authors'>
            <Route index element={<AuthorList />} />
            <Route path=':id' element={<AuthorView />} />
            <Route path=':id/edit' element={<ManageAuthor />} />
            <Route path='new' element={<ManageAuthor />} />
        </Route>

        <Route path='/books'>
            <Route index element={<BookList />} />
            <Route path=':id' element={<BookView />} />
            <Route path=':id/edit' element={<ManageBook />} />
            <Route path='new' element={<ManageBook />} />
        </Route>

        <Route path='/genres'>
            <Route index element={<GenreList />} />
            <Route path=':id' element={<GenreView />} />
            <Route path=':id/edit' element={<ManageGenre />} />
            <Route path='new' element={<ManageGenre />} />
        </Route>

        <Route path='*' element={<NotFound />} />
    </RS>
);

export default Routes;
