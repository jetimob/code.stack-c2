import { useParams } from 'react-router-dom';

import Page from '../../components/layout/Page.jsx';
import UpsertAuthor from '../../forms/UpsertAuthor.jsx';

const ManageAuthor = () => {
    const { id } = useParams();
    const breadcrumbs = [{ title: 'Authors', to: '/authors' }];

    if (id) {
        breadcrumbs.push({ title: id, to: `/authors/${id}` });
    }

    return (
        <Page
            title={id ? `Edit Author - ${id}` : 'New Author'}
            breadcrumbs={breadcrumbs}
        >
            <UpsertAuthor id={id} />
        </Page>
    );
};

export default ManageAuthor;
