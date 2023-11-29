import { useParams } from 'react-router-dom';

import Page from '../../components/layout/Page.jsx';
import UpsertBook from '../../forms/UpsertBook.jsx';

const ManageBook = () => {
    const { id } = useParams();
    const breadcrumbs = [{ title: 'Books', to: '/books' }];

    if (id) {
        breadcrumbs.push({ title: id, to: `/books/${id}` });
    }

    return (
        <Page
            title={id ? `Edit Book - ${id}` : 'New Book'}
            breadcrumbs={breadcrumbs}
        >
            <UpsertBook id={id} />
        </Page>
    );
};

export default ManageBook;
