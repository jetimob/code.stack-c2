import { useParams } from 'react-router-dom';

import Page from '../../components/layout/Page.jsx';
import UpsertBook from '../../forms/UpsertBook.jsx';

const ManageGenre = () => {
    const { id } = useParams();
    const breadcrumbs = [{ title: 'Genre', to: '/genres' }];

    if (id) {
        breadcrumbs.push({ title: id, to: `/genres/${id}` });
    }

    return(
        <Page
            title={id ? `Edit Genre - ${id}` : 'New Genre'}
            breadcrumbs={breadcrumbs}
        >
            <UpsertGenre id={id} />
        </Page>
    );
};

export default ManageGenre;
