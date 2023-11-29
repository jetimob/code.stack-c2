import { useParams } from 'react-router-dom';

import Page from '../../components/layout/Page.jsx';
import UpsertPeople from '../../forms/UpsertPeople.jsx';

const ManagePeople = () => {
    const { id } = useParams();
    const breadcrumbs = [{ title: 'Peoples', to: '/peoples' }];

    if (id) {
        breadcrumbs.push({ title: id, to: `/peoples/${id}` });
    }

    return (
        <Page
            title={id ? `Edit People - ${id}` : 'New People'}
            breadcrumbs={breadcrumbs}
        >
            <UpsertPeople id={id} />
        </Page>
    );
};

export default ManagePeople;
