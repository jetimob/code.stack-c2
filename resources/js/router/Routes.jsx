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
import LoanList from '../pages/loans/LoanList.jsx';
import LoanView from '../pages/loans/LoanView.jsx';
import ManageLoan from '../pages/loans/ManageLoan.jsx';
import ManagePeople from '../pages/peoples/ManagePeople.jsx';
import PeopleList from '../pages/peoples/PeopleList.jsx';
import PeopleView from '../pages/peoples/PeopleView.jsx';
import ManagePublisher from '../pages/publishers/ManagePublisher.jsx';
import PublisherList from '../pages/publishers/PublisherList.jsx';
import PublisherView from '../pages/publishers/PublisherView.jsx';

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

        <Route path='/publishers'>
            <Route index element={<PublisherList />} />
            <Route path=':id' element={<PublisherView />} />
            <Route path=':id/edit' element={<ManagePublisher />} />
            <Route path='new' element={<ManagePublisher />} />
        </Route>

        <Route path='/peoples'>
            <Route index element={<PeopleList />} />
            <Route path=':id' element={<PeopleView />} />
            <Route path=':id/edit' element={<ManagePeople />} />
            <Route path='new' element={<ManagePeople />} />
        </Route>

        <Route path='/loans'>
            <Route index element={<LoanList />} />
            <Route path=':id' element={<LoanView />} />
            <Route path=':id/edit' element={<ManageLoan />} />
            <Route path='new' element={<ManageLoan />} />
        </Route>

        <Route path='*' element={<NotFound />} />
    </RS>
);

export default Routes;
