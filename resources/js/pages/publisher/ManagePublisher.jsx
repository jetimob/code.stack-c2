import { useParams } from 'react-router-dom';
import Page from '../../components/layout/Page.jsx';
import UpsertPublisher from '../../forms/UpsertPublisher.jsx';

const ManagePublisher = () => {
    const { id } = useParams();
    const breadcrumbs = [{ title: 'Publisher', to: '/publishers' }];

    if (id) {
        breadcrumbs.push({ title: id, to: `/publisher/${id}` });
    }

    return(
        <Page
            title={id ? `Edit Publisher - ${id}` : 'New publisher'}
            breadcrumbs={breadcrumbs}
        >
            <UpsertPublisher id={id} />
        </Page>
    );
};

export default ManagePublisher;