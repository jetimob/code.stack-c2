import RemoteBookList from '../../components/book/RemoteBookList.jsx';
import Page from '../../components/layout/Page.jsx';

const BookList = () => {
    return (
        <Page title='Books' breadcrumbs={[{}]} addRoute='/books/new'>
            <RemoteBookList />
        </Page>
    );
};

export default BookList;
