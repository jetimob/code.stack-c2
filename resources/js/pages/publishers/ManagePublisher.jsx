import { useParams } from 'react-router-dom';

import Page from '../../components/layout/Page.jsx';
import UpsertPublisher from '../../forms/UpsertPublisher.jsx';

const ManagePublisher = () => {
    const { id } = useParams();
    const breadcrumbs = [{ title: 'Publishers', to: '/publishers' }];

    if (id) {
        breadcrumbs.push({ title: id, to: `/publishers/${id}` });
    }

    return (
        <Page
            title={id ? `Edit Publisher - ${id}` : 'New Publisher'}
            breadcrumbs={breadcrumbs}
        >
            <UpsertPublisher id={id} />
        </Page>
    );
};

export default ManagePublisher;
